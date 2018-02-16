package services.messaging

import java.io.FileInputStream

import actors.MessageProcessing.ProcessingResult
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential
import com.google.inject.Inject
import models.MessageSend
import models.Platform.Google
import play.api.Configuration
import play.api.db._
import play.api.libs.json._
import play.api.libs.ws.WSClient
import services.dao.PushRegistrationDao
import system.Logging
import warwick.sso.Usercode
import collection.JavaConverters._
import scala.concurrent.Future


class FCMOutputService @Inject()(
  pushRegistrationDao: PushRegistrationDao,
  @NamedDatabase("default") db: Database,
  configuration: Configuration,
  ws: WSClient
) extends MobileOutputService with Logging {

  import system.ThreadPools.mobile

  private val ARROW_EMOJI = "↗️"

  private val FCMProjectId = configuration.getOptional[String]("mywarwick.fcm.projectId")
    .getOrElse(throw new IllegalStateException("Missing FCM API key - set mywarwick.fcm.projectId"))

  private val FCMServiceAccountKeyPath = configuration.getOptional[String]("mywarwick.fcm.serviceAccountKeyPath")
    .getOrElse(throw new IllegalStateException("Missing FCM API key - set mywarwick.fcm.serviceAccountKeyPath"))

  private val FCMScope = "https://www.googleapis.com/auth/firebase.messaging"

  private lazy val googleCredential: GoogleCredential =
    GoogleCredential.fromStream(new FileInputStream(FCMServiceAccountKeyPath)).createScoped(Seq(FCMScope).asJava)

  private def getFCMAccessToken: String = {
    // Check if there's a valid token that expires more than a minute from now
    Option(googleCredential.getExpiresInSeconds)
      .filter(_ > 60)
      .map(_ => googleCredential.getAccessToken)
      .getOrElse {
        googleCredential.refreshToken()
        googleCredential.getAccessToken
      }
  }

  def send(message: MessageSend.Heavy): Future[ProcessingResult] = {
    val usercode = message.user.usercode

    db.withConnection { implicit c =>
      val sendNotifications =
        pushRegistrationDao.getPushRegistrationsForUser(usercode)
          .filter(_.platform == Google)
          .map(_.token)
          .map(sendNotification(message))

      Future.sequence(sendNotifications).map(_ => ProcessingResult(success = true, "yay"))
    }
  }

  def sendNotification(message: MessageSend.Heavy)(token: String): Future[Unit] = {
    val body = Json.obj(
      "message" -> Json.obj(
        "token" -> token,
        "notification" -> Json.obj(
          "title" -> JsString(message.activity.url.map(_ => s"${message.activity.title} $ARROW_EMOJI").getOrElse(message.activity.title)),
          "body" -> message.activity.text
        ),
        "android" -> Json.obj(
          "notification" -> Json.obj(
            "sound" -> "default"
          )
        )
      )
    )

    val FCMToken = getFCMAccessToken

    ws.url(s"https://fcm.googleapis.com/v1/projects/$FCMProjectId/messages:send")
      .addHttpHeaders(
        "Authorization" -> s"Bearer $FCMToken",
        "Content-Type" -> "application/json"
      )
      .post(body)
      .map { response =>
        (response.json \ "error_code").validateOpt[String].fold(
          errors => {
            logger.error(s"Could not parse JSON result from FCM:")
            errors.foreach { case (path, validationErrors) =>
              logger.error(s"$path: ${validationErrors.map(_.message).mkString(", ")}")
            }
          },
          e => e.foreach { error =>
            if (error == "UNREGISTERED") {
              logger.info(s"Received UNREGISTERED FCM error, removing token=$token")
              db.withConnection { implicit c =>
                pushRegistrationDao.removeRegistration(token)
              }
            } else {
              logger.warn(s"FCM error: $error")
            }
          }
        )
      }
  }

  override def clearUnreadCount(user: Usercode): Unit = {
    // Not a thing on FCM, do nothing.
  }
}
