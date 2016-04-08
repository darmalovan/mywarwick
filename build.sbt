import warwick.Testing._
import warwick.Gulp

name := """start"""

version := "1.0-SNAPSHOT"

scalaVersion := Common.scalaVersion

lazy val root = (project in file(".")).enablePlugins(WarwickProject, PlayScala)
  .configs(FunTest)
  .settings(
    Gulp.settings,
    // Package up assets before we build tar.gz
    packageZipTarball in Universal <<= (packageZipTarball in Universal).dependsOn(Gulp.gulpAssets),

    funSettings
  )

val appDeps = Seq(
  jdbc,
  cache,
  ws,
  filters,
  evolutions,
  "com.typesafe.play" %% "anorm" % "2.4.0",
  "com.oracle" % "ojdbc6" % "11.2.0.3.0",
  "uk.ac.warwick.sso" %% "sso-client-play" % "2.14",
  "uk.ac.warwick.play-utils" %% "anorm" % "1.2",
  "com.typesafe.akka" %% "akka-cluster" % "2.4.0",
  "com.typesafe.akka" %% "akka-cluster-tools" % "2.4.0",
  "com.typesafe.akka" %% "akka-slf4j" % "2.4.0",
  "com.kenshoo" %% "metrics-play" % "2.4.0_0.4.1",
  "com.typesafe.play" %% "play-mailer" % "3.0.1",
  "com.notnoop.apns" % "apns" % "1.0.0.Beta6",
  "org.quartz-scheduler" % "quartz" % "2.2.1",
  "com.google.inject.extensions" % "guice-multibindings" % "4.0"
)

val testDeps = Seq(
  "org.mockito" % "mockito-all" % "1.10.19",
  "org.scalatest" %% "scalatest" % "2.2.5",
  "org.scalatestplus" %% "play" % "1.4.0-M4",
  "com.typesafe.akka" %% "akka-testkit" % "2.4.0",
  "uk.ac.warwick.sso" %% "sso-client-play-testing" % "2.14",
  "org.eclipse.jetty" % "jetty-server" % "9.3.6.v20151106",
  // Note - from 2.53 selenium-htmlunit is not bundled so will need to
  // play with dependencies if you need to upgrade.
  "org.seleniumhq.selenium" % "selenium-java" % "2.52.0"
).map(_ % Test)

libraryDependencies ++= (appDeps ++ testDeps).map(_.excludeAll(
  ExclusionRule(organization = "commons-logging"),
  // ehcache renamed ehcache-core, don't load in the old version
  ExclusionRule(organization = "net.sf.ehcache", name="ehcache")
))

// https://bugs.elab.warwick.ac.uk/browse/SSO-1653
dependencyOverrides += "xml-apis" % "xml-apis" % "1.4.01"

// Make gulp output available as Play assets.
unmanagedResourceDirectories in Assets <+= baseDirectory { _ / "target" / "gulp" }

resolvers += ("Local Maven Repository" at "file:///" + Path.userHome.absolutePath + "/.m2/repository")

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

// Run Gulp when Play runs
//playRunHooks <+= baseDirectory.map(base => Gulp(base))

// code coverage settings (run jacoco:cover)
jacoco.settings

parallelExecution in jacoco.Config := false
