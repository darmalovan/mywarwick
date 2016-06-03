package services.dao

import helpers.{Fixtures, OneStartAppPerSuite}
import models.{ActivityTag, TagValue}
import org.scalatestplus.play.PlaySpec

class ActivityTagDaoTest extends PlaySpec with OneStartAppPerSuite {

  val activityDao = app.injector.instanceOf[ActivityDao]
  val dao = app.injector.instanceOf[ActivityTagDao]
  val activityPrototype = Fixtures.activitySave.submissionDue

  "ActivityTagDao" should {

    "tag an activity then find it by the tag" in transaction { implicit c =>

      val activityId = activityDao.save(activityPrototype, Seq.empty)
      dao.save(activityId, ActivityTag("name", TagValue("value", Some("Display value"))))

      val activities = dao.getActivitiesWithTags(Map("name" -> "value"), "tabula")

      activities must contain(activityId)

    }

    "return only activities with all tags" in transaction { implicit c =>

      val activityId = activityDao.save(activityPrototype, Seq.empty)
      dao.save(activityId, ActivityTag("a", TagValue("a", None)))
      dao.save(activityId, ActivityTag("b", TagValue("b", None)))

      dao.getActivitiesWithTags(Map("a" -> "a", "b" -> "b"), "tabula") must contain(activityId)
      dao.getActivitiesWithTags(Map("a" -> "a", "c" -> "c"), "tabula") mustNot contain(activityId)

    }

  }

}
