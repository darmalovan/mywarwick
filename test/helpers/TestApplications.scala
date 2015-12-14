package helpers

import play.api.inject._
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.test.Helpers._
import play.api.{Configuration, Environment}
import system.{DatabaseDialect, H2DatabaseDialect}
import warwick.sso.{LoginContext, MockSSOClient, SSOClient, User}


object TestApplications {

  def testConfig(environment: Environment) =
    config("test/test.conf", environment)

  def config(file: String, environment: Environment) =
    Configuration.load(environment, Map("config.file" -> file))

  /**
    * As minimal an Application as can be created. Use for any tests
    * where you just can't do without an Application, like something that
    * requires WSAPI which is a pain to build by hand.
    */
  def minimal() =
    new GuiceApplicationBuilder(loadConfiguration = e => config("test/minimal.conf", e))
      .in(Environment.simple())
      .build()

  /**
    * As full an Application as can be created while still talking to
    * mock external services only, and an in-memory database. Used for
    * DAO tests and integration tests.
    */
  def full() =
    new GuiceApplicationBuilder(loadConfiguration = testConfig)
      .in(Environment.simple())
      .configure(inMemoryDatabase("default", Map("MODE" -> "Oracle")))
      .bindings(
        bind[LoginContext].toInstance(new LoginContext {
          override val user: Option[User] = None
          override val actualUser: Option[User] = None

          override def loginUrl(target: Option[String]): String = "https://example.com/login"
        })
      )
      .overrides(
        bind[SSOClient].to[MockSSOClient],
        bind[DatabaseDialect].to[H2DatabaseDialect]
      )
      .build()

}
