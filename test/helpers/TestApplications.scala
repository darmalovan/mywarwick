package helpers

import play.Routes
import play.api.inject._
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.routing.Router
import play.api.test.Helpers._
import play.api.{Environment, Configuration}
import system.{H2DatabaseDialect, DatabaseDialect}
import warwick.sso.{MockSSOClient, SSOClient, User, LoginContext}


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
   * Minimal application that overrides the Router - useful to pass to
   * TestServer to fake up an external service.
   */
  def miniserver(router: Router) =
    new GuiceApplicationBuilder(
        loadConfiguration = e => config("test/minimal.conf", e))
      .in(Environment.simple())
      .overrides(
        bind[Router].toInstance(router)
      )
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
