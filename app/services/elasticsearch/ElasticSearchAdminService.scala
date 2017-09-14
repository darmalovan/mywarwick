package services.elasticsearch

import java.util
import java.util.Collections
import javax.inject.{Inject, Singleton}

import com.google.inject.ImplementedBy
import org.apache.http.nio.entity.NStringEntity
import org.elasticsearch.client.{Response, ResponseListener, RestClient}
import play.api.libs.json.{JsValue, Json}
import warwick.core.Logging
import org.apache.http.entity.ContentType
import play.api.http.HttpEntity

import scala.concurrent.{Future, Promise}

@ImplementedBy(classOf[ElasticSearchAdminServiceImpl])
trait ElasticSearchAdminService {

  val lowLevelClient: RestClient

  val templateRootPath = "_template"

  // template
  def putTemplate(template: JsValue, name: String, lowLevelClient: RestClient = lowLevelClient): Future[Response]

  def deleteTemplate(name: String, lowLevelClient: RestClient = lowLevelClient): Future[Response]

  def getTemplate(name: String, lowLevelClient: RestClient = lowLevelClient): Future[Response]

  def hasTemplate(name: String, lowLevelClient: RestClient = lowLevelClient): Future[Response]

  // remove index

  // etc.

}

@Singleton
class ElasticSearchAdminServiceImpl @Inject()(
  eSClientConfig: ESClientConfig
) extends ElasticSearchAdminService with Logging {

  object Method {
    val put = "PUT"
    val delete = "DELETE"
    val post = "POST"
    val get = "GET"
  }

  override lazy val lowLevelClient: RestClient = eSClientConfig.newClient.getLowLevelClient

  val emptyParam: util.Map[String, String] = Collections.emptyMap()[String, String]

  def httpEntityFromJsValue(json: JsValue) = new NStringEntity(Json.stringify(json), ContentType.APPLICATION_JSON)

  def defaultResponseHandler(
    res: Option[Any],
    responsePromise: Promise[Response]
  ): Unit = {
    res match {
      case Some(e: Exception) =>
        responsePromise.failure(e)
        logger.error("Exception thrown after sending request to elasticsearch", e)
      case Some(r: Response) =>
        responsePromise.success(r)
        logger.debug(s"Response received from elasticsearch: ${r.toString}")
    }
  }

  def defaultResponseListener(
    responsePromise: Promise[Response],
    callbackHandler: (Option[Any], Promise[Response]) => Unit = defaultResponseHandler
  ): ResponseListener = {
    new ResponseListener() {
      def onFailure(exception: Exception): Unit = {
        callbackHandler(Some(exception), responsePromise)
      }

      override def onSuccess(response: Response): Unit = {
        callbackHandler(Some(response), responsePromise)
      }
    }
  }

  def performRequestAsync(
    method: String,
    path: String,
    param: util.Map[String, String] = Collections.emptyMap()[String, String],
    entity: Option[NStringEntity] = None,
    responseListener: (Promise[Response], (Option[Any], Promise[Response]) => Unit) => ResponseListener = defaultResponseListener,
    lowLevelClient: RestClient = this.lowLevelClient
  ): Future[Response] = {

    val responsePromise: Promise[Response] = Promise[Response]
    entity match {
      case Some(e: NStringEntity) =>
        lowLevelClient.performRequestAsync(
          method,
          path,
          param,
          e,
          responseListener(responsePromise)
        )
      case _ =>
        lowLevelClient.performRequestAsync(
          method,
          path,
          param,
          responseListener(responsePromise)
        )
    }
    responsePromise.future
  }

  override def putTemplate(
    template: JsValue,
    name: String,
    lowLevelClient: RestClient
  ): Future[Response] = {
    performRequestAsync(
      Method.get,
      s"$templateRootPath/$name",
      emptyParam,
      Some(httpEntityFromJsValue(template))
    )
  }

  override def deleteTemplate(name: String, lowLevelClient: RestClient): Future[Response] = {
    performRequestAsync(
      Method.delete,
      s"$templateRootPath/$name",
      emptyParam
    )
  }

  override def getTemplate(name: String, lowLevelClient: RestClient): Future[Response] = ???

  override def hasTemplate(name: String, lowLevelClient: RestClient): Future[Response] = ???
}
