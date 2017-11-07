package controllers.api

import javax.inject.{Inject, Singleton}

import controllers.BaseController
import play.api.db.{Database, NamedDatabase}
import play.api.libs.json.Json
import play.api.mvc.Action
import services.ActivityService
import uk.ac.warwick.userlookup.UserLookupInterface
import warwick.sso.Usercode

@Singleton
class NotificationsSnapshotController @Inject()(
  @NamedDatabase("default") db: Database,
  lookup: UserLookupInterface,
  activityService: ActivityService
) extends BaseController {

  val WARWICK_SSO_COOKIE_NAME: String = "WarwickSSO"

  def isValidOrigin(headerOption: Option[String]): Boolean = {
    headerOption.exists(origin =>
      (origin.startsWith("https://") && origin.endsWith(".warwick.ac.uk"))
        || origin.endsWith("://warwick.ac.uk")
        || origin.endsWith("://www2.warwick.ac.uk")
    )
  }

  /**
    * We need to be able to support users who don't have a session,
    * so we use the old-style `WarwickSSO` cookie token here. This isn't
    * ideal, but the data returned is of trivial significance.
    */
  def unreads = Action { implicit request =>
    val originHeader = request.headers.get(ORIGIN)
    val cookie = request.cookies.get(WARWICK_SSO_COOKIE_NAME)

    if (!isValidOrigin(originHeader))
      Forbidden("Not permitted: CORS origin not allowed.")
    else
      cookie.map(_.value).map(lookup.getUserByToken).filter(_.isFoundUser).map { user =>
        val userCode = user.getUserId
        // Be careful what you return here, the data is exposed
        // in a less secure manner.
        // SiteBuilder notably needs access, but it can be HTTP at time of writing.
        Ok(Json.obj(
          "unreads" -> activityService.countUnreadNotificationsForUsercode(Usercode(userCode))
        )).withHeaders(ACCESS_CONTROL_ALLOW_ORIGIN -> originHeader.get)
          .withHeaders(ACCESS_CONTROL_ALLOW_METHODS -> "GET")
          .withHeaders(ACCESS_CONTROL_ALLOW_HEADERS -> "x-requested-by")
          .withHeaders(ACCESS_CONTROL_ALLOW_CREDENTIALS -> "true")
          .withHeaders(VARY -> ORIGIN)
      }.getOrElse(Forbidden("Not permitted: unauthenticated."))
  }
}
