package services.dao

import javax.inject.Inject

import com.google.inject.ImplementedBy
import play.api.Configuration
import play.api.libs.json._
import play.api.libs.ws.{WSAPI, WSRequest}
import system.Logging
import uk.ac.warwick.util.cache.{CacheEntryUpdateException, Caches, SingularCacheEntryFactory}

import scala.concurrent.Await
import scala.concurrent.duration._

case class DepartmentInfo(
  code: String,
  name: String,
  shortName: String,
  veryShortName: String,
  `type`: String
)

object DepartmentInfo {
  implicit val jsReads = Json.reads[DepartmentInfo]
}

@ImplementedBy(classOf[WsDepartmentInfoDao])
trait DepartmentInfoDao {
  def allDepartments: Seq[DepartmentInfo]
}

class WsDepartmentInfoDao @Inject() (
  ws: WSAPI,
  config: Configuration
) extends DepartmentInfoDao with Logging {

  import system.ThreadPools.externalData

  val factory = new SingularCacheEntryFactory[String, List[DepartmentInfo]] {
    override def shouldBeCached(value: List[DepartmentInfo]): Boolean = true

    override def create(key: String): List[DepartmentInfo] = {
      val future = request.get.map { response =>
        response.json.as[List[DepartmentInfo]]
      }.recover { case e =>
        logger.error("Error fetching departments", e)
        throw new CacheEntryUpdateException(e)
      }
      Await.result(future, Duration.Inf)
    }
  }

  val cache = Caches.newCache("departmentInfo", factory, 24.hours.toSeconds)

  private lazy val url: String = config.getString("start.departments.list.url")
    .getOrElse(throw new IllegalArgumentException("start.departments.list.url missing"))

  private lazy val request: WSRequest = ws.url(url).withRequestTimeout(5.seconds)

  override def allDepartments: Seq[DepartmentInfo] = cache.get("value")

}



