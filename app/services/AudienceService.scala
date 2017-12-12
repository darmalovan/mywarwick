package services

import javax.inject.{Inject, Named}

import com.google.inject.ImplementedBy
import models.Audience
import models.Audience.{LocationOptIn, _}
import play.api.db.Database
import play.api.libs.json.{JsValue, Json}
import services.dao._
import system.Logging
import warwick.sso._

import scala.concurrent.duration._
import scala.concurrent.{Await, Future}
import scala.util.Try

@ImplementedBy(classOf[AudienceServiceImpl])
trait AudienceService {
  def resolve(audience: Audience): Try[Set[Usercode]]

  def getAudience(audienceId: String): Audience

  def resolveUsersForComponentsGrouped(audienceComponents: Seq[Audience.Component]): Try[Seq[(Audience.Component, Set[Usercode])]]

  def audienceToJson(audience: Audience): JsValue

  def validateUsers(usercodes: Set[Usercode]): Either[Set[Usercode], Set[Usercode]]
}

class AudienceServiceImpl @Inject()(
  groupService: GroupService,
  dao: AudienceDao,
  optInDao: UserNewsOptInDao,
  @Named("tabula") audienceLookupDao: AudienceLookupDao,
  db: Database,
  userLookupService: UserLookupService
) extends AudienceService with Logging {

  import system.ThreadPools.externalData

  override def resolve(audience: Audience): Try[Set[Usercode]] = {
    Await.ready(resolveFuture(audience), 30.seconds).value.get
  }

  private def resolveUsersForComponent(audienceComponent: Audience.Component): Future[Set[Usercode]] = resolveUsersForComponentWithGroup(audienceComponent).map(
    _.flatMap {
      case (_, usercodes) => usercodes
    }
  ).map(_.toSet)


  private def resolveUsersForComponentWithGroup(audienceComponent: Audience.Component): Future[Seq[(Audience.Component, Set[Usercode])]] = {
    def makeResult(futureUsercodes: Future[Iterable[Usercode]], group: Audience.Component = audienceComponent): Future[Seq[(Audience.Component, Set[Usercode])]] = {
      futureUsercodes.map { usercodes =>
        Seq(
          (group, usercodes.toSet),
        )
      }
    }

    audienceComponent match {
      case PublicAudience => makeResult(Future.successful(Seq(Usercode("*"))))
      case WebGroupAudience(name) => makeResult(Future.fromTry(webgroupUsers(name)))
      case ModuleAudience(code) => makeResult(audienceLookupDao.resolveModule(code))
      case SeminarGroupAudience(groupId) => makeResult(audienceLookupDao.resolveSeminarGroup(groupId))
      case RelationshipAudience(relationshipType, agentId) => makeResult(audienceLookupDao.resolveRelationship(agentId, relationshipType))
      case UsercodesAudience(usercodes) => makeResult(Future.successful(usercodes))
      case ds: DepartmentSubset => makeResult(Future.fromTry(resolveUniversityGroup(ds)))
      case DepartmentAudience(code, subsets) => Future.sequence(subsets.map(subset =>
        makeResult(resolveDepartmentGroup(code, subset), subset)
      )).map(_.flatten)
      case optIn: OptIn => makeResult(Future.successful(Nil))
    }
  }

  def resolveUsersForComponents(audienceComponents: Seq[Audience.Component]): Future[Set[Usercode]] = {
    Future.sequence(audienceComponents.map(this.resolveUsersForComponent)).map(_.flatten.toSet)
  }

  override def resolveUsersForComponentsGrouped(audienceComponents: Seq[Audience.Component]): Try[Seq[(Audience.Component, Set[Usercode])]] = {
    Await.ready(Future.sequence(audienceComponents.map(this.resolveUsersForComponentWithGroup)).map(_.flatten), 30.seconds).value.get
  }

  def resolveFuture(audience: Audience): Future[Set[Usercode]] = {
    val (optInComponents, audienceComponents) = audience.components.partition {
      case _: OptIn => true
      case _ => false
    }

    val audienceUsers = this.resolveUsersForComponents(audienceComponents)

    if (optInComponents.nonEmpty) {
      // AND each opt-in type with the selected audience

      val optInUsersByType = optInComponents.collect { case o: OptIn => o }
        .groupBy(_.optInType)
        .values.toSeq.map(_.flatMap(o => db.withConnection(implicit c => optInDao.getUsercodes(o))).toSet)

      val optInUsers = optInUsersByType.tail.foldLeft(optInUsersByType.head) { case (result, usercodes) => result.intersect(usercodes) }

      audienceUsers.map(_.intersect(optInUsers))
    } else {
      audienceUsers
    }
  }

  private def resolveUniversityGroup(component: DepartmentSubset): Try[Seq[Usercode]] =
    component match {
      case All => webgroupUsers(GroupName("all-all"))
      case Staff => webgroupUsers(GroupName("all-staff"))
      case UndergradStudents => for {
        ft <- webgroupUsers(GroupName("all-studenttype-undergraduate-full-time"))
        pt <- webgroupUsers(GroupName("all-studenttype-undergraduate-part-time"))
      } yield ft ++ pt
      case ResearchPostgrads => for {
        ft <- webgroupUsers(GroupName("all-studenttype-postgraduate-research-ft"))
        pt <- webgroupUsers(GroupName("all-studenttype-postgraduate-research-pt"))
      } yield ft ++ pt
      case TaughtPostgrads => for {
        ft <- webgroupUsers(GroupName("all-studenttype-postgraduate-taught-ft"))
        pt <- webgroupUsers(GroupName("all-studenttype-postgraduate-taught-pt"))
      } yield ft ++ pt
      case TeachingStaff => webgroupUsers(GroupName(s"all-teaching"))
      case AdminStaff =>
        // Webgroups has no concept of 'admin staff' so assume it's all staff that aren't teaching staff
        webgroupUsers(GroupName("all-staff")).flatMap(allStaff =>
          webgroupUsers(GroupName(s"all-teaching")).map(teachingStaff => allStaff.diff(teachingStaff))
        )
      case _ => Try(Nil)
    }


  private def resolveDepartmentGroup(departmentCode: String, subset: DepartmentSubset): Future[Seq[Usercode]] =
    subset match {
      case All => audienceLookupDao.resolveDepartment(departmentCode)
      case Staff => Future.sequence(Seq(
        audienceLookupDao.resolveAdminStaff(departmentCode),
        audienceLookupDao.resolveTeachingStaff(departmentCode)
      )).map(_.flatten.toSeq)
      case UndergradStudents => audienceLookupDao.resolveUndergraduates(departmentCode)
      case ResearchPostgrads => audienceLookupDao.resolveResearchPostgraduates(departmentCode)
      case TaughtPostgrads => audienceLookupDao.resolveTaughtPostgraduates(departmentCode)
      case TeachingStaff => audienceLookupDao.resolveTeachingStaff(departmentCode)
      case AdminStaff => audienceLookupDao.resolveAdminStaff(departmentCode)
      case ModuleAudience(code) => audienceLookupDao.resolveModule(code)
      case SeminarGroupAudience(groupId) => audienceLookupDao.resolveSeminarGroup(groupId)
      case RelationshipAudience(relationshipType, agentId) => audienceLookupDao.resolveRelationship(agentId, relationshipType)
      case UsercodesAudience(usercodes) => Future.successful(usercodes.toSeq)
    }

  private def webgroupUsers(groupName: GroupName): Try[Seq[Usercode]] =
    groupService.getWebGroup(groupName).map { group =>
      group.map(_.members).getOrElse(Nil)
    }

  override def getAudience(audienceId: String): Audience =
    db.withConnection(implicit c => dao.getAudience(audienceId))


  override def audienceToJson(audience: Audience): JsValue = {

    def resolveStaffRelationship(agentId: UniversityID, checkedRelationships: Seq[String]): Future[JsValue] = {
      audienceLookupDao.findRelationships(agentId).map { rel =>
        Json.obj(
          "value" -> agentId.string,
          "text" -> userLookupService.getUsers(Seq(agentId)).get.get(agentId).map {
            case u: User =>
              s"${u.name.full.getOrElse("")} ${if (u.department.isDefined) s"(${u.department.get.name.get})"}"
            case _ => ""
          },
          "options" -> rel.map {
            case (r: LookupRelationshipType, users: Seq[User]) => Json.obj(
              r.id -> Json.obj(
                "agentRole" -> r.agentRole,
                "studentRole" -> r.studentRole,
                "students" -> users.map(_.name.full),
                "selected" -> checkedRelationships.contains(r.id)
              )
            )
          }
        )
      }
    }

    var department: String = ""
    var departmentSubsets: Seq[String] = Seq.empty[String]
    var listOfUsercodes: Seq[String] = Seq.empty[String]
    var modules: Seq[JsValue] = Seq.empty[JsValue]
    var seminarGroups: Seq[JsValue] = Seq.empty[JsValue]
    var locations: Seq[String] = Seq.empty[String]
    var staffRelationships: Map[UniversityID, Seq[String]] = Map[UniversityID, Seq[String]]()

    def matchDeptSubset(subset: DepartmentSubset): Unit =
      subset match {
        case ModuleAudience(code) =>
          modules ++= Await.result(audienceLookupDao.findModules(code.trim), 5.seconds).map { m =>
            Json.obj(
              "value" -> m.code.toUpperCase,
              "text" -> s"${m.code.toUpperCase}: ${m.name}"
            )
          }
        case SeminarGroupAudience(groupId) =>
          seminarGroups ++= Await.result(audienceLookupDao.getSeminarGroupById(groupId.trim), 5.seconds).map { group =>
            Json.obj(
              "value" -> groupId,
              "text" -> s"${group.name}" //: ${group.groupSetName}"
            )
          }
        case RelationshipAudience(relationshipType, agentId) =>
          staffRelationships += agentId -> (staffRelationships.getOrElse(agentId, Seq.empty[String]) :+ relationshipType)
        case UsercodesAudience(usercodes) => listOfUsercodes ++= usercodes.map(_.string)
        case _ => Nil
      }

    audience.components.foreach {
      case ds: DepartmentSubset => ds match {
        case All | TeachingStaff | ResearchPostgrads | TaughtPostgrads | UndergradStudents | AdminStaff =>
          departmentSubsets :+= ds.toString
        case subset => matchDeptSubset(subset)
      }
      case DepartmentAudience(code, subsets) => {
        department = code
        subsets.foreach {
          case subset@(All | TeachingStaff | ResearchPostgrads | TaughtPostgrads | UndergradStudents | AdminStaff) =>
            departmentSubsets :+= s"Dept:${subset.entryName}"
          case subset => matchDeptSubset(subset)
        }
      }
      case optIn: OptIn if optIn.optInType == LocationOptIn.optInType => locations :+= optIn.optInValue
      case _ => Nil
    }

    val audienceType =
      if (department.isEmpty)
        "universityWide"
      else "department"

    val locationsJson =
      if (locations.nonEmpty) Json.obj("locations" -> Json.obj("yesLocation" ->
        Json.obj(locations.map(l => l -> Json.toJsFieldJsValueWrapper("undefined")): _*)))
      else Json.obj()

    val staffRelationshipJson =
      if (staffRelationships.nonEmpty)
        Json.obj("staffRelationships" ->
          staffRelationships.map { case (k, v) =>
            Await.result(resolveStaffRelationship(k, v), 5.second)
          }.toSeq
        )
      else Json.obj()

    val seminarGroupsJson =
      if (seminarGroups.nonEmpty)
        Json.obj("seminarGroups" -> seminarGroups)
      else Json.obj()

    val modulesJson =
      if (modules.nonEmpty)
        Json.obj("modules" -> modules)
      else Json.obj()

    val listOfUsercodesJson =
      if (listOfUsercodes.nonEmpty)
        Json.obj("listOfUsercodes" -> listOfUsercodes)
      else Json.obj()

    val deptSubsets: (String, Json.JsValueWrapper) =
      if (departmentSubsets.contains("Dept:All"))
        "Dept:All" -> Json.toJsFieldJsValueWrapper("undefined")
      else
        "groups" -> (Json.obj(
          departmentSubsets.map(_ -> Json.toJsFieldJsValueWrapper("undefined")): _*
        ) ++ staffRelationshipJson ++ seminarGroupsJson ++ modulesJson ++ listOfUsercodesJson)

    Json.obj(
      "department" -> department,
      "audience" -> Json.obj(
        audienceType -> Json.obj(
          deptSubsets
        )
      )
    ) ++ locationsJson
  }

  private def validateUsercodesOLD(usercodes: Set[Usercode]): Either[Set[Usercode], Set[Usercode]] = {
    val uniIds: Set[String] = usercodes.map(_.string).filter(_.forall(Character.isDigit))
    val validIds: Option[Map[UniversityID, User]] = userLookupService.getUsers(uniIds.map(id => UniversityID(id)).toSeq).toOption
    val validCodes: Set[Usercode] = userLookupService.getUsers(usercodes.toSeq).toOption
      .map(_.keys).getOrElse(Nil).toSet

    val maybeinvalidStrings: Set[String] = validIds.map(_.keys).getOrElse(Nil).map(_.string).toSet
    val maybeInvalid: Set[Usercode] = usercodes.diff(validCodes).filterNot(u => maybeinvalidStrings.contains(u.string))

    // NEWSTART-1235 handles case where user enters university id prepended with 'u'
    val maybeInvalidToIds: Seq[UniversityID] = maybeInvalid.collect {
      case uc if uc.string.startsWith("u") => UniversityID(uc.string.drop(1))
    }.toSeq
    val foundFromMaybeInvalid: Option[Map[UniversityID, User]] = userLookupService.getUsers(maybeInvalidToIds).toOption
    val usercodesFromIds: Set[Usercode] = foundFromMaybeInvalid.map(_.values.map(_.usercode)).getOrElse(Nil).toSet

    val actuallyInvalidString: Set[String] = foundFromMaybeInvalid.map(_.keys).getOrElse(Nil).map(u => s"u${u.string}").toSet
    val actuallyInvalid: Set[Usercode] = maybeInvalid.filterNot(u => actuallyInvalidString.contains(u.string))

    if (actuallyInvalid.isEmpty) {
      Right(usercodesFromIds ++ validCodes ++ validIds.map(_.values.map(_.usercode)).getOrElse(Nil).toSet)
    } else {
      Left(actuallyInvalid)
    }
  }

  override def validateUsers(inputUsercodes: Set[Usercode]): Either[Set[Usercode], Set[Usercode]] = {
    def validateUsercodes(usercodes: Set[Usercode]): (Set[String], Set[String]) = {
      val valid = userLookupService.getUsers(usercodes.toSeq).toOption.map(_.keys).getOrElse(Nil).map(_.string).toSet
      val invalid = usercodes.map(_.string).diff(valid)
      (valid, invalid)
    }

    def validateUniIds(uniIds: Set[UniversityID]): (Set[String], Set[String]) = {
      val valid = userLookupService.getUsers(uniIds.toSeq).toOption
      val validUniIds: Set[String] = valid.map(_.keys).getOrElse(Nil).map(_.string).toSet
      val validUsercodes = valid.map(_.values).getOrElse(Nil).map(_.usercode.string).toSet
      val invalid = uniIds.map(_.string).diff(validUniIds)
      (validUsercodes, invalid)
    }

    // split codes into allDigits and not allDigits
    val (ids, codes) = inputUsercodes.map(_.string).partition(_.forall(Character.isDigit))

    // run Usercode lookup for anything that isn't all digits
    val (validUsercodes, invalidUsercodes) = validateUsercodes(codes.map(Usercode))

    // university ids mistyped as usercodes
    val (mistypedUniIds, badCodes) = invalidUsercodes.partition(_.matches("^u\\d.+"))

    // run lookup as UniversityIDs for anything that is allDigits
    val (validCodesFromIds, invalidCodesFromIds) = validateUniIds((ids ++ mistypedUniIds.map(_.drop(1))).map(UniversityID))

    val allValid: Set[String] = validUsercodes ++ validCodesFromIds

    val allInvalid: Set[String] = invalidCodesFromIds ++ badCodes

    if (allInvalid.isEmpty) {
      Right(allValid.map(Usercode))
    }
    else {
      Left(allInvalid.map(Usercode))
    }
  }
}
