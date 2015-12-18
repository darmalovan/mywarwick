package actors

/**
  * Messages relating to work processing.
  */
object MessageProcessing {
  sealed trait Message
  //trait Epic[T] extends Iterable[T] //used by master to create work (in a streaming way)
  //case object GimmeWork extends Message
  //case object CurrentlyBusy extends Message
  case object WorkAvailable extends Message
  //case class RegisterWorker(worker: ActorRef) extends Message
  //case class Work[T](work: T) extends Message

  // TODO could just use an Either[String, String]
  case class ProcessingResult(success: Boolean, message: String)
}

