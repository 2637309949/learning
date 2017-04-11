name := "binding-cross"
scalaVersion in ThisBuild := "2.12.1"

lazy val root = project.in(file(".")).
  aggregate(fooJS, fooJVM).
  settings(
    publish := {},
    publishLocal := {}
  )

lazy val foo = crossProject.in(file(".")).
  settings(
    name := "foo",
    version := "0.1-SNAPSHOT"
  ).
  jvmSettings(
    // Add JVM-specific settings here
  ).
  jsSettings(
    libraryDependencies += "com.thoughtworks.binding" %%% "dom" % "latest.release",
    addCompilerPlugin("org.scalamacros" % "paradise" % "2.1.0" cross CrossVersion.full),
    scalaJSUseMainModuleInitializer := true,
    jsDependencies += RuntimeDOM
  )

lazy val fooJVM = foo.jvm
lazy val fooJS = foo.js




