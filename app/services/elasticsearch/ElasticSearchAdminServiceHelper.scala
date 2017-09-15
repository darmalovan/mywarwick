package services.elasticsearch

import java.util
import java.util.Collections

import org.apache.http.entity.ContentType
import org.apache.http.nio.entity.NStringEntity
import org.elasticsearch.client.{Response, ResponseListener, RestClient}
import org.jdom.IllegalDataException
import play.api.libs.json.{JsValue, Json}
import warwick.core.Logging
import collection.JavaConverters._
import scala.concurrent.{Future, Promise}

trait ElasticSearchAdminServiceHelper extends Logging {

  val templateRootPath = "/_template"

  object Method {
    val put = "PUT"
    val delete = "DELETE"
    val post = "POST"
    val get = "GET"
    val head = "HEAD"
  }

  val emptyParam: util.Map[String, String] = Collections.emptyMap()

  def httpEntityFromJsValue(json: JsValue) = new NStringEntity(Json.stringify(json), ContentType.APPLICATION_JSON)

  val responseListener: (Promise[Response]) => ResponseListener = (responsePromise) => {
    new ResponseListener() {
      def onFailure(exception: Exception): Unit = {
        responsePromise.failure(exception)
        logger.error("Exception thrown after sending request to elasticsearch", exception)
      }

      override def onSuccess(response: Response): Unit = {
        responsePromise.success(response)
        logger.debug(s"Response received from elasticsearch: ${response.toString}")
      }
    }
  }

  def performRequestAsync(
    method: String,
    path: String,
    lowLevelClient: RestClient,
    suppliedParam: Option[Map[String, String]] = None,
    entity: Option[NStringEntity] = None,
    suppliedResponseListener: Option[(Promise[Response]) => ResponseListener] = None
  ): Future[Response] = {

    val responsePromise: Promise[Response] = Promise[Response]

    val param = suppliedParam.getOrElse(Map()).asJava

    val responseListener = suppliedResponseListener.getOrElse(this.responseListener)(responsePromise)

    entity match {
      case Some(nStringEntity: NStringEntity) =>
        lowLevelClient.performRequestAsync(
          method,
          path,
          param,
          nStringEntity,
          responseListener
        )
      case _ =>
        lowLevelClient.performRequestAsync(
          method,
          path,
          param,
          responseListener
        )
    }
    responsePromise.future
  }
}