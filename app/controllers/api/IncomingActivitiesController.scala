package controllers.api

import com.google.inject.Inject
import models._
import org.joda.time.DateTime
import play.api.i18n.{I18nSupport, Messages, MessagesApi}
import play.api.libs.functional.syntax._
import play.api.libs.json.Reads._
import play.api.libs.json._
import play.api.mvc.{Controller, Result}
import services.{ActivityService, NoRecipientsException, ProviderPermissionService, SecurityService}
import warwick.sso.{AuthenticatedRequest, User}

import scala.util.{Failure, Success}

class IncomingActivitiesController @Inject()(
  securityService: SecurityService,
  activityService: ActivityService,
  providerPermissionService: ProviderPermissionService,
  val messagesApi: MessagesApi
) extends Controller with I18nSupport {

  import securityService._

  implicit val readsActivityRecipients = Json.reads[ActivityRecipients]

  implicit val readsActivityTag: Reads[ActivityTag] =
    ((__ \ "name").read[String] and
      __.read[TagValue]((
        (__ \ "value").read[String] and
          (__ \ "display_value").readNullable[String]
        ) (TagValue))
      ) (ActivityTag.apply _)

  def readsPostedActivity(providerId: String, shouldNotify: Boolean): Reads[ActivityPrototype] =
    (Reads.pure(providerId) and
      (__ \ "type").read[String] and
      (__ \ "title").read[String] and
      (__ \ "text").read[String] and
      (__ \ "tags").read[Seq[ActivityTag]].orElse(Reads.pure(Seq.empty)) and
      (__ \ "replace").read[Map[String, String]].orElse(Reads.pure(Map.empty)) and
      (__ \ "generated_at").readNullable[DateTime] and
      Reads.pure(shouldNotify) and
      (__ \ "recipients").read[ActivityRecipients]) (ActivityPrototype.apply _)

  def postActivity(providerId: String) = APIAction(parse.json) { implicit request =>
    postItem(providerId, shouldNotify = false)
  }

  def postNotification(providerId: String) = APIAction(parse.json) { implicit request =>
    postItem(providerId, shouldNotify = true)
  }

  def postItem(providerId: String, shouldNotify: Boolean)(implicit request: AuthenticatedRequest[JsValue]): Result =
    request.context.user.map { user =>
      if (providerPermissionService.canUserPostForProvider(providerId, user)) {
        request.body.validate[ActivityPrototype](readsPostedActivity(providerId, shouldNotify)).map { data =>
          activityService.save(data) match {
            case Success(activityId) => created(activityId)
            case Failure(NoRecipientsException) => noRecipients
            case Failure(_) => otherError
          }
        }.recoverTotal {
          e => validationError(e)
        }
      } else {
        forbidden(providerId, user)
      }
    }.get // APIAction calls this only if request.context.user is defined

  private def forbidden(providerId: String, user: User): Result =
    Forbidden(Json.obj(
      "success" -> false,
      "status" -> "forbidden",
      "errors" -> Json.arr(
        Json.obj(
          "id" -> "no-permission",
          "message" -> s"User '${user.usercode.string}' does not have permission to post to the stream for provider '$providerId'"
        )
      )
    ))

  private def created(activityId: String): Result =
    Created(Json.obj(
      "success" -> true,
      "status" -> "ok",
      "id" -> activityId
    ))

  private def noRecipients: Result =
    PaymentRequired(Json.obj(
      "success" -> false,
      "status" -> "request_failed",
      "errors" -> Json.arr(
        Json.obj(
          "id" -> "no-recipients",
          "message" -> "No valid recipients for activity"
        )
      )
    ))

  private def otherError: Result =
    InternalServerError(Json.obj(
      "success" -> false,
      "status" -> "internal_server_error",
      "errors" -> Json.arr(
        Json.obj(
          "id" -> "internal-error",
          "message" -> "An internal error occurred"
        )
      )
    ))

  private def validationError(error: JsError): Result =
    BadRequest(Json.obj(
      "success" -> false,
      "status" -> "bad_request",
      "errors" -> JsError.toFlatForm(error).map {
        case (field, errors) =>
          val propertyName = field.substring(4)

          Json.obj(
            "id" -> s"invalid-$propertyName",
            "message" -> errors.flatMap(_.messages).map(Messages(_, propertyName)).mkString(", ")
          )
      }
    ))

}
