package controllers.api

import com.google.inject.Inject
import controllers.BaseController
import play.api.libs.json.{JsValue, JsObject, Json}
import services.SecurityService
import services.messaging.GCMOutputService

class GCMPushNotificationsController @Inject()(
  securityService: SecurityService,
  gcmOutputService: GCMOutputService
) extends BaseController {

  import securityService._

  def subscribe = RequiredUserAction { request =>
    request.context.user.map { user =>
      request.body.asJson.map { json =>
        val endpoint = (json \ "endpoint").as[String]
        val token = endpoint.split("/").last
        gcmOutputService.subscribe(user.usercode, token) match {
          case true => Created("subscribed to push notifications")
          case false => InternalServerError("oh dear there's been an error")
        }
      }.get
    }.get
  }


  def fetchNotifications = RequiredUserAction { request =>
    request.body.asJson.map { json =>
      val endpoint = (json \ "endpoint").as[String]
      val token = endpoint.split("/").last
      val notifications: JsValue = gcmOutputService.fetchNotifications(token)
      Ok(notifications)
    }.get
  }
}

