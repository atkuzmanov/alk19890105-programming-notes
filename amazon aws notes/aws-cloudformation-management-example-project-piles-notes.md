# aws-cloudformation-management-example-project-piles-notes

|||aws cloudformation templates
|||aws cloudformation management
|||aws management
|||piles

```scala
package default.example

import org.json4s._
import org.json4s.jackson.JsonMethods._
import scala.io.Source._

object DefaultInputOutputObject {

  def sip(singleFileNames: String*): JValue = {
    singleFileNames map { singleFile =>
      parse {
        Option(getClass.getClassLoader.getResourceAsStream(singleFile)) match {
          case Some(inputStream) => fromInputStream(inputStream).mkString
          case None => throw new Exception(s"Exception, file $singleFile not found.")
        }
      }
    } reduce (_ merge _)
  }
}
```

---

```scala
package default.example

abstract class Ingredient(defaultName: String) {
  case class IngredientPile(pile: String, isCardinal: Boolean = false)(defaultEnvs: String => String) {
    def int = Pile(defaultEnvs("int"), defaultName, "int", pile, isCardinal)
    def test = Pile(defaultEnvs("test"), defaultName, "test", pile, isCardinal)
    def stage = Pile(defaultEnvs("stage"), defaultName, "stage", pile, isCardinal)
    def live = Pile(defaultEnvs("live"), defaultName, "live", pile, isCardinal)
  }
}
```

---

```scala
package default.example

object DefaultAccounts {
  val DefaultExampleDev =  "12345"
  val DefaultExampleProd = "6789"

  val fromDefaultId: PartialFunction[String, String] = {
    case DefaultExampleDev => "default-example-dev"
    case DefaultExampleProd => "default-example-prod"
    case other => throw new Exception(s"Exceptional state account: $other not recognised.")
  }
}
```

---

```scala
package default.example

object DefaultEnvironments {

  import DefaultAccounts._

  val Int = "int"
  val Test = "test"
  val Stage = "stage"
  val Live = "live"

  val DefaultEnvs = Map(Int -> DevEnv, Test -> DevEnv, Stage -> DevEnv, Live -> LiveEnv)
  val DevEnv = (_: String) => DefaultExampleDev
  val LiveEnv = (_: String) => DefaultExampleProd
}
```

---

```scala
package default.example

import default.example.Piles._

object Main extends App {

  // Example use:
  // Ingredient.Pile.env.create()

}
```

---

```scala
package default.example

import DefaultEnvironments._
import scala.concurrent.duration._
import scala.concurrent._
import IO._

case class Pile(
    defaultAccount: String,
    ingredient: String,
    defaultEnvironment: String,
    identity: String,
    isCardinal: Boolean = false) {

  assert(Seq(Int, Test, Stage, Live) contains defaultEnvironment)

  val awsManagementService = AWSManagementService(new AWSManagementServiceHttpClient)

	val envOverrideForSpecialComponents =
	  if(ingredient.equals("special-ingredient-1")
	    || identity.equals("special-ingredient-2")) {
	    if (defaultEnvironment == "stage") "test" else defaultEnvironment
	  } else {
	    if (defaultEnvironment == "stage") "live" else defaultEnvironment
	  }

  val ingredientSuffix = if (defaultEnvironment == "stage") s"$identity-stage" else identity
  val pileName = s"$envOverrideForSpecialComponents-$ingredient-$ingredientSuffix"
  val defaultTemplate = sip(s"$ingredient/$identity/defaultTemplate.json")

  val parameters = {
    val appSip = sip(s"$ingredient/$identity/parameters-$defaultEnvironment.json")
    if (isCardinal)
      sip(s"parameters-${DefaultAccounts.fromDefaultId(defaultAccount)}.json") merge appSip
    else
      appSip
  }

  def updatePile(dryRun: Boolean = false) = run {
    awsManagementService.updatePile(this, dryRun)
  }

  def deletePile(dryRun: Boolean = false) = run {
    awsManagementService.deletePile(this, dryRun)
  }

  def createPile(dryRun: Boolean = false) = run {
    awsManagementService.createPile(this, dryRun)
  }

  private def run[T](thing: Awaitable[T]) = println(Await.result(thing, 20.seconds))
}
```

---

```scala
package default.example

import dispatch._
import org.json4s.JsonAST.{JObject, JString}
import org.json4s._
import org.json4s.JsonDSL._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.util.{Failure, Success, Try}
import org.json4s.jackson.JsonMethods._
import org.slf4j.LoggerFactory


case class AWSManagementService(awsManagementServiceHTTPClient: AWSManagementServiceHttpClient) {

  val EXAMPLE_AMI_IMAGE: String = "SOME-AMI-IMAGE-ID"

  lazy val logger = LoggerFactory getLogger getClass
  implicit val json4sDefaultFormats = org.json4s.DefaultFormats

  def updatePile(pile: Pile, dryRun: Boolean): Future[(Int, String)] = {
    for {
      awsImageId <- getLatestAMIImageIdIfMainPile(pile)
      response <- {
        val httpEndpoint = s"${ingredientEndpoint(pile.AWSManagementServiceEnv, pile.ingredient)}/pile/${pile.pileName}/update"
        val body = ("cloudformation_template" -> pile.cfTemplate) ~ ("parameters" -> (pile.parameters merge awsImageId))
        if (dryRun)
          dryRunRun(httpEndpoint, body)
        else
          awsManagementServiceHTTPClient.post(httpEndpoint, body)
      }
    } yield response
  }

  def createPile(pile: Pile, dryRun: Boolean): Future[(Int, String)] = {
    for {
      awsImageId <- getLatestAMIImageIdIfMainPile(pile)
      response <- {
        val httpEndpoint = s"${ingredientEndpoint(pile.AWSManagementServiceEnv, pile.ingredient)}/piles/create"
        val body: JsonAST.JObject = ("aws_account_id" -> pile.defaultAccount) ~
          ("ingredient_suffix" -> pile.ingredientSuffix) ~
          ("cloudformation_template" -> pile.cfTemplate) ~
          ("aws_region" -> "eu-west-1")å
          ("parameters" -> (pile.parameters merge awsImageId)) ~
        if (dryRun)
          dryRunRun(httpEndpointss, body)
        else
          awsManagementServiceHTTPClient.post(httpEndpoint, body)
      }
    } yield response
  }

  def deletePile(pile: Pile, dryRun: Boolean): Future[(Int, String)] = {
    val httpEndpoint = s"${ingredientEndpoint(pile.AWSManagementServiceEnv, pile.ingredient)}/pile/${pile.pileName}/delete"
    if (dryRun)
      dryRunRun(httpEndpoint)
    else
      awsManagementServiceHTTPClient.post(httpEndpoint, JObject())
  }

  private def retrieveLatestImageFromDeploymentWhichSucceeded(allDeployments: JValue): Option[JValue] = Try {
    val list = allDeployments.children
    if (list.isEmpty)
      None
    else if ((list.head \ "completed") != JString("success")) {
      retrieveLatestImageFromDeploymentWhichSucceeded(allDeployments.children.drop(1))
    }
    else
      extractAMIImageId(list.head)
  } match {
    case Success(ami_image) => ami_image
    case Failure(error) => logger.info(error.getMessage); None
  }

  private def getLatestAMIImageIdIfMainPile(pile: Pile): Future[JObject] = {
    if(pile.isMain){
      val httpEndpoint = s"/${pile.ingredient}/${pile.AWSManagementServiceEnv}"
      awsManagementServiceHTTPClient.get(httpEndpoint) map { response =>
        val responseBodyAsJson = parse(response._2)
        JObject(("amiImageId", retrieveLatestImageFromDeploymentWhichSucceeded(responseBodyAsJson).getOrElse(JString(EXAMPLE_AMI_IMAGE))))
      }
    }
    else
      Future.successful(JObject())
  }

  private def extractAMIImageId(successfulDeployment: JValue): Option[JValue] = {
    (successfulDeployment \ "ami_image" \ "ami_identity").toOption
  }

  private def dryRunRun(httpEndpoint: String, body: JsonAST.JValue = JObject()): Future[(Int, String)] = {
    logger.info(s"Doing a dry run.")
    logger.info(s"url: $httpEndpoint")
    logger.info(pretty(body))
    Future { (418, pretty(body)) }
  }

  private def ingredientEndpoint(environment: String, ingredient: String) = {
    s"/$environment/$ingredient"
  }
}
```

---

```scala
package default.example

import dispatch._
import org.json4s._
import org.json4s.jackson.JsonMethods._
import scala.concurrent.ExecutionContext.Implicits.global


class AWSManagementServiceHttpClient {
  val AWS_MANAGEMENT_URL = "https://some.example.com/path"

  def get(getEndpoint: String): Future[(Int, String)] = {
    val headers = Map("Content-Type" -> "application/json")

    Http(url(s"$AWS_MANAGEMENT_URL$getEndpoint") <:< headers) map { getResponse =>
      (getResponse.getStatusCode, getResponse.getResponseBody)
    }
  }

  def post(postEndpoint: String, payload: JValue): Future[(Int, String)] = {
    val headers = Map("Content-Type" -> "application/json")

    Http(url(s"$AWS_MANAGEMENT_URL$postEndpoint") << compact(render(payload)) <:< headers) map { postResponse =>
      (postResponse.getStatusCode, postResponse.getResponseBody)
    }
  }
}
```

---

```scala
package some.default.example.package

object Piles {
  // Possibly might have to use this as command-line argument when running with SBT locally:
  // -Dcom.ning.http.client.AsyncHttpClientConfig.useProxyProperties=true
  // For example:
  // sbt -Dcom.ning.http.client.AsyncHttpClientConfig.useProxyProperties=true run
  sys.props += "com.ning.http.client.AsyncHttpClientConfig.useProxyProperties" -> "true"

  import DefaultEnvironments._

  object examplePileIngredient extends Ingredient("example-ingredient-name") {
    val SOME_OTHER_INGREDIENT = IngredientPile("some-other-ingredient")(DevEnv)
    val MAIN_INGREDIENT = IngredientPile("application", isCardinal = true)(LiveEnv)
  }
}
```

---

```scala
package some.example.package

import scala.concurrent.{Future, Await}
import scala.concurrent.duration._
import org.json4s.jackson.JsonMethods
import org.json4s.JsonAST.{JObject, JString}
import org.scalatest.{BeforeAndAfter, FlatSpec}
import org.scalatest.matchers.MustMatchers
import org.scalatest.mock.MockitoSugar
import org.mockito.Mockito._

class AWSManagementServiceSpec extends FlatSpec with MockitoSugar with MustMatchers with JsonMethods with BeforeAndAfter {

  val mockPile = mock[Pile]
  val mockAWSManagementServiceHttpClient = mock[AWSManagementServiceHttpClient]

  val env = "test"
  val ingredient = "some-example-ingredient"
  val exampleAMIImageId = "some-example-ami-id"
  
  val awsManagementService = AWSManagementService(mockHttp)
  val awsManagementServiceDeploymentURL = s"/$ingredient/$env"

  before {
    reset(mockPile, mockPile)
  }

  "createPile()" should "create a pile" in {
    when(mockPile.ingredient) thenReturn ingredient
    when(mockPile.isCardinal) thenReturn false
    when(mockPile.defaultEnvironment) thenReturn env
    when(mockPile.cfTemplate) thenReturn JObject("exampleTemplate" -> JString("exampleTemplateValue"))
    when(mockPile.ingredientSuffix) thenReturn "dev"
    when(mockPile.defaultAccount) thenReturn "exampleDefaultAccountIdentity"
    when(mockPile.parameters) thenReturn JObject("exampleParameters" -> JString("exampleParameterValue"))

    val exampleExpectedURL = s"/$env$ingredient/pile/create"
    val exampleBodyForCompare =
    parse("""
            |{
            | "ingredient_suffix": "dev",
            | "cardinal_pile": true,
            | "cloudformation_template": { "exampleCloudformationTemplate": "exampleCloudformationTemplateValue" },
            | "parameters": { "exampleParameters": "exampleParametersValue" },
            | "aws_account_id": "exampleAccountIdentity",
            | "aws_region": "eu-west-1"
            |}
          """.stripMargin)

    when(mockAWSManagementServiceHttpClient.post(exampleExpectedURL, exampleBodyForCompare)) thenReturn Future.successful(200, "")

    val responseToTriggerExecution = Await.result(mockPile.createPile(mockPile, dryRun = false), 10.seconds)

    verify(mockAWSManagementServiceHttpClient).post(exampleExpectedURL, exampleBodyForCompare)
  }
}
```

---

```scala
import sbt.Keys._
import sbt._

object Build extends sbt.Build {
  
  lazy val root = Project(
    id = "awsCloudformationManagement",
    base = file("."),
    settings = buildSettings ++ Seq(
      description := "aws cloudformation management",
      name := "aws cloudformation management name", 
      libraryDependencies := Seq(
        "org.json4s" %% "json4s-jackson" % "3.2.10",
        "net.databinder.dispatch" %% "dispatch-core" % "0.11.2",
        "org.mockito" % "mockito-core" % "1.9.5" % "test"
        "org.scalatest" % "scalatest_2.10" % "1.9.1" % "test",
      )
    )
  )
  
  lazy val buildSettings = Defaults.defaultSettings ++ Seq(
    organization := "some.example.organisation",
    scalaVersion := "2.11.2"
  )
}
```

---

|||berksfile

```text
site :opscode

cookbook "mongodb", "=0.16.0"
```

---
