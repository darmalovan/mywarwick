package controllers

import com.google.inject.Inject
import models.{ActivityResponse, ActivityTag}
import org.joda.time.DateTime
import play.api.libs.json.{JsString, JsValue, Json, Writes}
import play.api.mvc.Controller
import services.{ActivityService, SecurityService}

class ActivitiesController @Inject()(
  activityService: ActivityService,
  securityService: SecurityService
) extends Controller {

  import securityService._

  implicit val writesActivityTag = new Writes[ActivityTag] {
    override def writes(tag: ActivityTag): JsValue = Json.obj(
      "name" -> tag.name,
      "value" -> tag.value.internalValue,
      "display_value" -> JsString(tag.value.displayValue.getOrElse(tag.value.internalValue))
    )
  }

  implicit val writesActivityResponse = Json.writes[ActivityResponse]

  def get = RequiredUserAction { implicit request =>

    val before = request.getQueryString("before").map(date => new DateTime(date.toLong))
    val limit = request.getQueryString("limit").map(_.toInt).getOrElse(20)

    val activities = request.context.user
      .map(user => activityService.getActivitiesForUser(user, limit = limit, before = before))
      .getOrElse(Seq.empty)

    Ok(Json.obj(
      "success" -> true,
      "status" -> "ok",
      "activities" -> activities
    ))

  }

}
