package models

import play.api.libs.functional.syntax._
import play.api.libs.json.Json._
import play.api.libs.json.Reads._
import play.api.libs.json.Writes._
import play.api.libs.json._

/**
  * Builder for API response objects.
  */
object API {

  sealed abstract class Response[A: Reads : Writes](val success: Boolean, status: String) {
    implicit def reads = Response.reads[A]

    implicit def writes = Response.writes[A]

    // Maybe this is useful, if you like using Either
    def either: Either[Failure[A], Success[A]]
  }

  case class Error(id: String, message: String)

  case class Success[A: Reads : Writes](status: String = "ok", data: A, warnings: Seq[Error] = Seq.empty) extends Response[A](true, status) {
    def either = Right(this)
  }

  case class Failure[A: Reads : Writes](status: String, errors: Seq[Error]) extends Response[A](false, status) {
    def either = Left(this)
  }

  object Error {
    implicit val format = Json.format[Error]

    def fromJsError(jsError: JsError): Seq[Error] = JsError.toFlatForm(jsError).map {
      case (field, errors) =>
        val propertyName = field.substring(4) // Remove 'obj.' from start of field name
        Error(
          s"invalid-$propertyName",
          errors.flatMap(_.messages).mkString(", ")
        )
    }

  }

  object Response {
    implicit def reads[A: Reads : Writes]: Reads[Response[A]] = new Reads[Response[A]] {
      override def reads(json: JsValue): JsResult[Response[A]] = {
        val status = (json \ "status").validate[String]
        (json \ "success").validate[Boolean].flatMap { success =>
          if (success) {
            val data = (json \ "data").validate[A]
            val warnings = (json \ "warnings").validate[Seq[Error]]
            (status and data and warnings) (Success.apply[A] _)
          } else {
            val errors = (json \ "errors").validate[Seq[Error]]
            (status and errors) (Failure.apply[A] _)
          }
        }
      }
    }

    implicit def writes[A: Reads : Writes]: Writes[Response[A]] = new Writes[Response[A]] {
      override def writes(response: Response[A]): JsValue = response match {
        case Success(status, data, warnings) => {
          if (warnings.isEmpty) {
            Json.obj(
              "success" -> true,
              "status" -> status,
              "data" -> data,
            )
          } else {
            Json.obj(
              "success" -> true,
              "status" -> status,
              "data" -> data,
              "warnings" -> warnings,
            )
          }
        }
        case Failure(status, errors) => Json.obj(
          "success" -> false,
          "status" -> status,
          "errors" -> errors
        )
      }
    }
  }

}
