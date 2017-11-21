package controllers.admin.reporting

import javax.inject.{Inject, Singleton}

import controllers.BaseController
import org.joda.time.{DateTime, Interval}
import play.api.data.Form
import play.api.data.Forms.{jodaDate, mapping}
import play.api.i18n.{I18nSupport, MessagesApi}
import services.SecurityService
import services.reporting.ActivityReportingService
import system.{RequestContext, Roles}

@Singleton
class ActivityReportingController @Inject()(
  activityReportingService: ActivityReportingService,
  securityService: SecurityService,
  val messagesApi: MessagesApi
) extends BaseController with I18nSupport {

  import Roles._
  import securityService._
  import system.ThreadPools.web

  private val form = Form(
    mapping(
      "fromDate" -> jodaDate("yyyy-MM-dd'T'HH:mm:ss"),
      "toDate" -> jodaDate("yyyy-MM-dd'T'HH:mm:ss")
    )(ActivityReportFormData.apply)(ActivityReportFormData.unapply) verifying(
      """"From" date must be before "To" date""",
      data => data.fromDate.isBefore(data.toDate)
    )
  )

  private def defaultData = ActivityReportFormData(
    DateTime.now().minusDays(14),
    DateTime.now()
  )

  private def defaultForm = form.fill(defaultData)

  def index = RequiredActualUserRoleAction(Sysadmin).async { implicit request =>
    render(defaultData, defaultForm)
  }

  def formSubmit = RequiredActualUserRoleAction(Sysadmin).async { implicit request =>
    defaultForm.bindFromRequest.fold(
      formError => render(defaultData, formError),
      data => render(data, defaultForm.fill(data))
    )
  }

  private def render(data: ActivityReportFormData, form: Form[ActivityReportFormData])(implicit ctx: RequestContext) =
    activityReportingService.allAlertsByProviders(data.interval).map { result =>
      Ok(views.html.admin.reporting.activity.index(result, form))
    }
}

case class ActivityReportFormData(fromDate: DateTime, toDate: DateTime) {
  def interval: Interval = new Interval(fromDate, toDate)
}
