package services.dao

import java.sql.Connection

import anorm.SqlParser._
import anorm._
import com.google.inject.{ImplementedBy, Singleton}
import models.{Publisher, PublisherPermission, PublishingRole}
import services.Provider
import warwick.sso.Usercode

@ImplementedBy(classOf[PublisherDaoImpl])
trait PublisherDao {

  def all(implicit c: Connection): Seq[Publisher]

  def find(id: String)(implicit c: Connection): Option[Publisher]

  def getPublisherPermissions(publisherId: String, usercode: Usercode)(implicit c: Connection): Seq[PublisherPermission]

  def getPublisherDepartments(publisherId: String)(implicit c: Connection): Seq[String]

  def getParentPublisherId(providerId: String)(implicit c: Connection): Option[String]

  def getProviders(publisherId: String)(implicit c: Connection): Seq[Provider]

}

@Singleton
class PublisherDaoImpl extends PublisherDao {

  val publisherParser = str("id") ~ str("name") map { case id ~ name => Publisher(id, name) }

  val publisherPermissionParser = str("usercode") ~ str("role") map { case usercode ~ role => PublisherPermission(Usercode(usercode), PublishingRole.withName(role)) }

  var providerParser = str("id") ~ str("display_name") map { case id ~ name => Provider(id, name) }

  override def all(implicit c: Connection) =
    SQL"SELECT * FROM PUBLISHER"
      .executeQuery()
      .as(publisherParser.*)

  override def find(id: String)(implicit c: Connection) =
    SQL"SELECT * FROM PUBLISHER WHERE ID = $id"
      .executeQuery()
      .as(publisherParser.singleOpt)

  override def getPublisherPermissions(publisherId: String, usercode: Usercode)(implicit c: Connection) =
    SQL"SELECT * FROM PUBLISHER_PERMISSION WHERE PUBLISHER_ID = $publisherId AND USERCODE = ${usercode.string}"
      .executeQuery()
      .as(publisherPermissionParser.*)

  override def getPublisherDepartments(publisherId: String)(implicit c: Connection) =
    SQL"SELECT DEPARTMENT_CODE FROM PUBLISHER_DEPARTMENT WHERE PUBLISHER_ID = $publisherId"
      .executeQuery()
      .as(scalar[String].*)

  override def getParentPublisherId(providerId: String)(implicit c: Connection) =
    SQL"SELECT p.id FROM publisher p JOIN provider pr ON p.id = pr.publisher_id AND pr.id = $providerId"
    .executeQuery()
    .as(scalar[String].singleOpt)

  override def getProviders(publisherId: String)(implicit c: Connection): Seq[Provider] =
    SQL"SELECT id, display_name FROM provider WHERE publisher_id = $publisherId ORDER BY display_name"
    .executeQuery()
    .as(providerParser.*)

}


