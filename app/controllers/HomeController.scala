package controllers

import javax.inject.{Inject, Singleton}

import play.api.Configuration
import play.api.mvc._
import services.{PhotoService, SecurityService}
import system.AppMetrics

case class AnalyticsTrackingID(string: String)

@Singleton
class HomeController @Inject()(
  security: SecurityService,
  metrics: AppMetrics,
  photoService: PhotoService,
  configuration: Configuration
) extends BaseController {

  import security._

  implicit val analyticsTrackingId: Option[AnalyticsTrackingID] =
    configuration.getString("start.analytics.tracking-id").map(AnalyticsTrackingID)

  def index = Action(Ok(views.html.index()))

  def redirectToIndex = Action(Redirect(routes.HomeController.index()))

  def tile(id: String) = index

  def photo = RequiredUserAction { request =>
    request.context.user.get.universityId.map { id =>
      val photoUrl = photoService.photo(id)
      Redirect(photoUrl)
    }.getOrElse(
      NotFound
    )
  }

  def redirectToPath(path: String, status: Int = MOVED_PERMANENTLY) = Action {
    Redirect(s"/${path.replaceFirst("^/","")}", status)
  }
}
