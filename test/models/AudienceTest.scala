package models

import helpers.BaseSpec
import warwick.sso.Usercode

class AudienceTest extends BaseSpec {

  "Activity" should {
    "be able to tell usercode is invalid" in {
      var invalideUsercode = Usercode("1,bb")
      Audience.isValidUsercode(invalideUsercode) mustBe false

      invalideUsercode = Usercode("*jd0")
      Audience.isValidUsercode(invalideUsercode) mustBe false

      invalideUsercode = Usercode("abcsdf,skkdsf,ds233")
      Audience.isValidUsercode(invalideUsercode) mustBe false
    }

    "be able to tell usercode is valid" in {
      var valideUsercode = Usercode("u1574595")
      Audience.isValidUsercode(valideUsercode) mustBe true

      valideUsercode = Usercode("u15745_95")
      Audience.isValidUsercode(valideUsercode) mustBe true
    }

    "be able to tell usercodes are invalid" in {
      val invalid = Seq(
        Usercode("*jd0"),
        Usercode("abcsdf,skkdsf,ds233"),
        Usercode("u1444444"),
      )
      Audience.areValidUsercodes(invalid) mustBe false
    }

    "be able to tell usercodes are valid" in {
      val valid = Seq(
        Usercode("ksd_123"),
        Usercode("abcsdf"),
        Usercode("u1444444"),
      )
      Audience.areValidUsercodes(valid) mustBe true
    }

  }

}
