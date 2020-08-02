# gatling load testing notes

|||gatling |||performance testing |||load testing

|||2018

<https://gatling.io/#/docs>

|||gatling commands

```bash
sbt gatling:test -Dgatling.http.ssl.keyStore.file=/etc/pki/tls/private/defaultExampleCertificate.p12 -Dgatling.http.ssl.keyStore.password=defaultExamplePassword
```

|||gatling example performance tests

|||application.conf

```text
akka {
  actor {
    default-dispatcher {
      throughput = 20
    }
  }
}
```

|||application.properties

# uiBaseUrl=<http://example.com/example>

`uiBaseUrl=<http://example.com/example>`

|||gatling.conf

```text
# Gatling Configuration #

# This file contains all the settings configurable for Gatling with their default values

gatling {
  core {
    #outputDirectoryBaseName = "" # The prefix for each simulation result folder (then suffixed by the report generation timestamp)
    #runDescription = ""          # The description for this simulation run, displayed in each report
    #encoding = "utf-8"           # Encoding to use throughout Gatling for file and string manipulation
    #simulationClass = ""         # The FQCN of the simulation to run (when used in conjunction with noReports, the simulation for which assertions will be validated)
    #mute = false                 # When set to true, don't ask for simulation name nor run description (currently only used by Gatling SBT plugin)

    extract {
      regex {
        #cacheMaxCapacity = 200 # Cache size for the compiled regexes, set to 0 to disable caching
      }
      xpath {
        #cacheMaxCapacity = 200 # Cache size for the compiled XPath queries,  set to 0 to disable caching
      }
      jsonPath {
        #cacheMaxCapacity = 200 # Cache size for the compiled jsonPath queries, set to 0 to disable caching
        #preferJackson = false  # When set to true, prefer Jackson over Boon for JSON-related operations
        jackson {
          #allowComments = false           # Allow comments in JSON files
          #allowUnquotedFieldNames = false # Allow unquoted JSON fields names
          #allowSingleQuotes = false       # Allow single quoted JSON field names
        }

      }
      css {
        #cacheMaxCapacity = 200 # Cache size for the compiled CSS selectors queries,  set to 0 to disable caching
      }
    }

    timeOut {
      #simulation = 8640000 # Absolute timeout, in seconds, of a simulation
    }
    directory {
      #data = user-files/data               # Folder where user's data (e.g. files used by Feeders) is located
      #bodies = user-files/bodies           # Folder where bodies are located
      #simulations = user-files/simulations # Folder where the bundle's simulations are located
      #reportsOnly = ""                     # If set, name of report folder to look for in order to generate its report
      #binaries = ""                        # If set, name of the folder where compiles classes are located: Defaults to GATLING_HOME/target.
      #results = results                    # Name of the folder where all reports folder are located
    }
  }
  charting {
    #noReports = false       # When set to true, don't generate HTML reports
    #maxPlotPerSeries = 1000 # Number of points per graph in Gatling reports
    #accuracy = 10           # Accuracy, in milliseconds, of the report's stats
    indicators {
      lowerBound = 300      # Lower bound for the requests' response time to track in the reports and the console summary
      higherBound = 800    # Higher bound for the requests' response time to track in the reports and the console summary
      #percentile1 = 50      # Value for the 1st percentile to track in the reports, the console summary and GraphiteDataWriter
      #percentile2 = 75      # Value for the 2nd percentile to track in the reports, the console summary and GraphiteDataWriter
      #percentile3 = 95      # Value for the 3rd percentile to track in the reports, the console summary and GraphiteDataWriter
      #percentile4 = 99      # Value for the 4th percentile to track in the reports, the console summary and GraphiteDataWriter
    }
  }
  http {
    #elFileBodiesCacheMaxCapacity = 200        # Cache size for request body EL templates, set to 0 to disable
    #rawFileBodiesCacheMaxCapacity = 200       # Cache size for request body Raw templates, set to 0 to disable
    #fetchedCssCacheMaxCapacity = 200          # Cache size for CSS parsed content, set to 0 to disable
    #fetchedHtmlCacheMaxCapacity = 200         # Cache size for HTML parsed content, set to 0 to disable
    #redirectPerUserCacheMaxCapacity = 200     # Per virtual user cache size for permanent redirects, set to 0 to disable
    #expirePerUserCacheMaxCapacity = 200       # Per virtual user cache size for permanent 'Expire' headers, set to 0 to disable
    #lastModifiedPerUserCacheMaxCapacity = 200 # Per virtual user cache size for permanent 'Last-Modified' headers, set to 0 to disable
    #etagPerUserCacheMaxCapacity = 200         # Per virtual user cache size for permanent ETag headers, set to 0 to disable
    #warmUpUrl = "http://gatling.io"           # The URL to use to warm-up the HTTP stack (blank means disabled)
    #enableGA = true                           # Very light Google Analytics, please support
    ssl {
      trustStore {
        #qtype = ""      # Type of SSLContext's TrustManagers store
        file = "/etc/pki/example.jks"
        password = "example"
        #algorithm = "" # Algorithm used by SSLContext's TrustManagers store
      }
      keyStore {
        type = "PKCS12"
        file = "/etc/pki/example.p12"
        password = "example"
        #algorithm = "" # Algorithm used SSLContext's KeyManagers store
      }
    }
    ahc {
      #compressionEnforced = false                # Enforce gzip/deflate when Accept-Encoding header is not defined
      connectTimeout = 200000                       # Timeout when establishing a connection
      pooledConnectionIdleTimeout = 200000          # Timeout when a connection stays unused in the pool
      readTimeout = 200000                          # Timeout when a used connection stays idle
      connectionTTL = -1                          # Max duration a connection can stay open (-1 means no limit)
      maxRetry = 0                                # Number of times that a request should be tried again
      requestTimeout = 200000                       # Timeout of the requests
      #webSocketTimeout = 60000                   # Timeout when a used websocket connection stays idle
      #useRelativeURIsWithConnectProxies = true   # When set to true, use relative URIs when talking with an SSL proxy or a WebSocket proxy
      #acceptAnyCertificate = true                # When set to true, doesn't validate SSL certificates
      #httpClientCodecMaxInitialLineLength = 4096 # Maximum length of the initial line of the response (e.g. "HTTP/1.0 200 OK")
      #httpClientCodecMaxHeaderSize = 8192        # Maximum size, in bytes, of each request's headers
      #httpClientCodecMaxChunkSize = 8192         # Maximum length of the content or each chunk
      #keepEncodingHeader = true                  # Don't drop Encoding response header after decoding
      #webSocketMaxFrameSize = 10240              # Maximum frame payload size
      #httpsEnabledProtocols = ""                 # Comma separated enabled protocols for HTTPS, if empty use the JDK defaults
      #httpsEnabledCipherSuites = ""              # Comma separated enabled cipher suites for HTTPS, if empty  use the JDK defaults
      #sslSessionCacheSize = 20000                # SSLSession cache size (set to 0 to disable)
      #sslSessionTimeout = 86400                  # SSLSession timeout (default is 24, like Hotspot)
    }
  }
  data {
    #writers = "console, file" # The lists of DataWriters to which Gatling write simulation data (currently supported : "console", "file", "graphite", "jdbc")
    #reader = file             # The DataReader used by the charting engine for reading simulation results
    console {
      #light = false           # When set to true, displays a light version without detailed request stats
    }
    file {
      #bufferSize = 8192       # FileDataWriter's internal data buffer size, in bytes
    }
    leak {
      #noActivityTimeout = 30  # Period, in seconds, for which Gatling may have no activity before considering a leak may be happening
    }
    jdbc {
      db {
        #url = "jdbc:mysql://localhost:3306/temp" # The JDBC URL used by the JDBC DataWriter
        #username = "root"                        # The database user used by the JDBC DataWriter
        #password = "123123q"                     # The password for the specified user
      }
      #bufferSize = 20                            # The size for each batch of SQL inserts to send to the database
      create {
        #createRunRecordTable = "CREATE TABLE IF NOT EXISTS `RunRecords` ( `id` INT NOT NULL AUTO_INCREMENT , `runDate` DATETIME NULL , `simulationId` VARCHAR(45) NULL , `runDescription` VARCHAR(45) NULL , PRIMARY KEY (`id`) )"
        #createRequestRecordTable = "CREATE TABLE IF NOT EXISTS `RequestRecords` (`id` int(11) NOT NULL AUTO_INCREMENT, `runId` int DEFAULT NULL, `scenario` varchar(45) DEFAULT NULL, `userId` VARCHAR(30) NULL, `name` varchar(50) DEFAULT NULL, `requestStartDate` bigint DEFAULT NULL, `requestEndDate` bigint DEFAULT NULL, `responseStartDate` bigint DEFAULT NULL, `responseEndDate` bigint DEFAULT NULL, `status` varchar(2) DEFAULT NULL, `message` varchar(4500) DEFAULT NULL, `responseTime` bigint DEFAULT NULL, PRIMARY KEY (`id`) )"
        #createScenarioRecordTable = "CREATE TABLE IF NOT EXISTS `ScenarioRecords` (`id` int(11) NOT NULL AUTO_INCREMENT, `runId` int DEFAULT NULL, `scenarioName` varchar(45) DEFAULT NULL, `userId` VARCHAR(30) NULL, `event` varchar(50) DEFAULT NULL, `startDate` bigint DEFAULT NULL, `endDate` bigint DEFAULT NULL, PRIMARY KEY (`id`) )"
        #createGroupRecordTable = "CREATE TABLE IF NOT EXISTS `GroupRecords` (`id` int(11) NOT NULL AUTO_INCREMENT, `runId` int DEFAULT NULL, `scenarioName` varchar(45) DEFAULT NULL, `userId` VARCHAR(30) NULL, `entryDate` bigint DEFAULT NULL, `exitDate` bigint DEFAULT NULL, `status` varchar(2) DEFAULT NULL, PRIMARY KEY (`id`) )"
      }
      insert {
        #insertRunRecord = "INSERT INTO RunRecords (runDate, simulationId, runDescription) VALUES (?,?,?)"
        #insertRequestRecord = "INSERT INTO RequestRecords (runId, scenario, userId, name, requestStartDate, requestEndDate, responseStartDate, responseEndDate, status, message, responseTime) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
        #insertScenarioRecord = "INSERT INTO ScenarioRecords (runId, scenarioName, userId, event, startDate, endDate) VALUES (?,?,?,?,?,?)"
        #insertGroupRecord = "INSERT INTO GroupRecords (runId, scenarioName, userId, entryDate, exitDate, status) VALUES (?,?,?,?,?,?)"
      }
    }
    graphite {
      #light = false              # only send the all* stats
      #host = "localhost"         # The host where the Carbon server is located
      #port = 2003                # The port to which the Carbon server listens to
      #protocol = "tcp"           # The protocol used to send data to Carbon (currently supported : "tcp", "udp")
      #rootPathPrefix = "gatling" # The common prefix of all metrics sent to Graphite
      #bufferSize = 8192          # GraphiteDataWriter's internal data buffer size, in bytes
      #writeInterval = 1          # GraphiteDataWriter's write interval, in seconds
    }
  }
}
```

|||logback.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
      <pattern>%d{HH:mm:ss.SSS} [%-5level] %logger{15} - %msg%n%rEx</pattern>
      <immediateFlush>false</immediateFlush>
    </encoder>
  </appender>
  <!-- Uncomment for logging ALL HTTP request and responses -->
  <!-- <logger name="io.gatling.http.ahc" level="TRACE" /> -->
  <!-- <logger name="io.gatling.http.response" level="TRACE" /> -->
  <!-- Uncomment for logging ONLY FAILED HTTP request and responses -->
  <!-- <logger name="io.gatling.http.ahc" level="DEBUG" /> -->
  <!-- <logger name="io.gatling.http.response" level="DEBUG" /> -->
  <root level="ERROR">
    <appender-ref ref="CONSOLE" />
  </root>
</configuration>
```

|||recorder.conf

```text
recorder {
  core {
    #mode = "Proxy"
    #encoding = "utf-8"               # The encoding used for reading/writing request bodies and the generated simulation
    #outputFolder = ""                # The folder where generated simulation will we written
    #package = ""                     # The package's name of the generated simulation
    #className = "RecordedSimulation" # The name of the generated Simulation class
    #thresholdForPauseCreation = 100  # The minimum time, in milliseconds, that must pass between requests to trigger a pause creation
    #saveConfig = false               # When set to true, the configuration from the Recorder GUI overwrites this configuration
  }
  filters {
    #filterStrategy = "Disabled" # The selected filter resources filter strategy (currently supported : "Disabled", "BlackList", "WhiteList")
    #whitelist = []              # The list of ressources patterns that are part of the Recorder's whitelist
    #blacklist = []              # The list of ressources patterns that are part of the Recorder's blacklist
  }
  http {
    #automaticReferer = true       # When set to false, write the referer + enable 'disableAutoReferer' in the generated simulation
    #followRedirect = true         # When set to false, write redirect requests + enable 'disableFollowRedirect' in the generated simulation
    #removeCacheHeaders = true     # When set to true, removes from the generated requests headers leading to request caching
    #inferHtmlResources = true     # When set to true, add inferred resources + set 'inferHtmlResources' with the configured blacklist/whitelist in the generated simulation
    #checkResponseBodies = false   # When set to true, save response bodies as files and add raw checks in the generated simulation
  }
  proxy {
    #port = 8000                         # Local port used by Gatling's Proxy for HTTP/HTTPS
    https {
      #mode = "SelfSignedCertificate"    # The selected "HTTPS mode" (currently supported : "SelfSignedCertificate", "ProvidedKeyStore", "GatlingCertificateAuthority", "CustomCertificateAuthority")
      keyStore {
        #path = ""                       # The path of the custom key store
        #password = ""                   # The password for this key store
        #type = "JKS"                    # The type of the key store (currently supported: "JKS")
      }
      certificateAuthority {
        #certificatePath = ""            # The path of the custom certificate
        #privateKeyPath = ""             # The certificate's private key path
      }
    }
    outgoing {
      #host = ""     # The outgoing proxy's hostname
      #username = "" # The username to use to connect to the outgoing proxy
      #password = "" # The password corresponding to the user to use to connect to the outgoing proxy
      #port = 0      # The HTTP port to use to connect to the outgoing proxy
      #sslPort = 0   # If set, The HTTPS port to use to connect to the outgoing proxy
    }
  }
  netty {
    #maxInitialLineLength = 10000 # Maximum length of the initial line of the response (e.g. "HTTP/1.0 200 OK")
    #maxHeaderSize = 20000        # Maximum size, in bytes, of each request's headers
    #maxChunkSize = 8192          # Maximum length of the content or each chunk
    #maxContentLength = 100000000 # Maximum length of the aggregated content of each response
  }
}
```

|||/user-files/assertion-folder-name/1.json

```json
{
  "exampleJsonContent": "1"
}
```

|||2.json

```json
{
  "exampleJsonContent": "2"
}
```

|||3.json

```json
{
  "exampleJsonContent": "3"
}
```

|||/user-files/assertion-folder-name/example_file_1.json

```json
{
  "exampleJsonContent": "4"
}
```

|||fortifier-background.csv

```text
content
/examplePath1/asd12312easdf21
```

|||/user-files/data/example-fortifier/fortifier-slow.csv

```text
content
/example-sleep
```

|||/user-files/data/example-live-api/live-api.csv

```text
content
/examplePath/asd231234123asadfad
```

|||/user-files/data/exampleProductTeamName/example-matter-api-asset.csv

```text
content
/example-path-1/exampleId123
/example-path-1/exampleId123
/example-path-1/exampleId123
/example-path-1/exampleId123
/example-path-1/exampleId123
```

|||/user-files/data/orchestration-api/orchestration-api-orchestrations.json

`{"exampleJson": "example Json content"}`

---

|||/user-files/data/assertion-folder-name.csv

```text
"fileName"
1,
2,
3,
example_file_1
```

|||/user-files/data/example-messaging-service-pending.csv

```text
content
/exampleEndpoint
```

|||/user-files/data/example-theme-connector-search-terms.csv

```text
text
a
ab
abc
b
bc
bcd
c
cd
cde
```

|||/user-files/simulations/exampleFortifier/ExampleFortifier.scala

```scala
package examplePackageName.exampleLiveEnricher

import io.gatling.core.Predef._
import io.gatling.http.Predef._

import scala.util.Random
import scala.concurrent.duration._

import examplePackageName.exampleUtilities.ExampleConfig._

class ExampleFortifier extends Simulation {
  val httpProtocol = http
      .baseURL("https://example.api.com")
      .shareConnections

  val exampleFortifierBackground = csv("example-fortifier/fortifier-background.csv").circular
  val enricherSlow = csv("example-fortifier/fortifier-slow.csv").circular

  val nameBackground = niceName(this) + " example-fortifier-background"
  val scnBackground = scenario(nameBackground)
      .feed(exampleFortifierBackground)
      .exec(http(nameBackground).get("${content}").check(status.in(Seq(200, 202))))

  val nameSlow = niceName(this) + " example-fortifier-slow"
  val scnSlow = scenario(nameSlow)
      .feed(enricherSlow)
      .exec(http(nameSlow).get("${content}"))

  setUp(
    scnBackground.inject(constantUsersPerSec(50) during(60 seconds)).protocols(httpProtocol),
    scnSlow.inject(
      nothingFor(30 seconds),
      atOnceUsers(usersPerSec)
    ).protocols(httpProtocol)
  )
}
```

---

|||/user-files/simulations/exampleLiveApi/ExampleLiveApi.scala

```scala
package examplePackageName.exampleLiveApi

import io.gatling.core.Predef._
import io.gatling.http.Predef._

import scala.util.Random
import scala.concurrent.duration._
import examplePackageName.exampleUtilities.ExampleConfig._

class ExampleLiveApi extends Simulation {
   val httpProtocol = http
       .baseURL("https://example.api.com")
       .shareConnections

   val curationApi = csv("example-live-api/live-api.csv").circular

   val headers = Map("Accept" -> "text/event-stream", "Cache-Control" -> "no-cache","Connection" -> "keep-alive")
  val name = niceName(this)

   val scn = scenario(name)
       .feed(curationApi)
       .repeat(5) {
           exec(http(name).get("${content}").headers(headers).check(status.in(Seq(200, 202))))
       }

   setUp(scn.inject(
       rampUsersPerSec(1) to (usersPerSec) during (60 seconds),
       constantUsersPerSec(usersPerSec) during(period seconds)
   ).protocols(httpProtocol))

}
```

---

|||/user-files/simulations/exampleProductTeamName/ExampleMatterApiAsset.scala

```scala
package examplePackageName.exampleProductTeamName

import io.gatling.core.Predef._
import io.gatling.http.Predef._

import scala.concurrent.duration._

import examplePackageName.exampleUtilities.ExampleConfig._

class ExampleMatterApiAsset extends Simulation {

  val httpProtocol = http
    .baseURL("https://api.example.com/examplePath")

  val data = csv("exampleProductTeamName/example-matter-api-asset.csv").circular

  val defaultHeaders = Map("Accept" -> "application/json")

  val headers =
    if (cacheControl.nonEmpty) {
      defaultHeaders + ("Cache-Control" -> cacheControl)
    } else {
      defaultHeaders
    }

  println(s">>> headers are: $headers")

  val scn = scenario("Example Matter API Asset")
    .feed(data)
    .repeat(5) {
      exec(http("Example Matter API").get("${content}").headers(headers).check(status is 200))
    }

  setUp(
    scn.inject(constantUsersPerSec(usersPerSec) during (2 minutes)).protocols(httpProtocol)
  )
    .assertions(global.responseTime.mean.lessThan(500), global.successfulRequests.percent.greaterThan(100)
  )

}
```

---

|||/user-files/simulations/exampleProductTeamName/ExampleMessagingServiceSim.scala

```scala
package examplePackageName.exampleProductTeamName

import io.gatling.core.Predef._
import io.gatling.http.Predef._

import scala.util.Random
import scala.concurrent.duration._
import examplePackageName.exampleUtilities.ExampleConfig._

class ExampleMessagingServiceSim extends Simulation {
  val httpProtocol = http
    .baseURL("https://example.api.com")
    .shareConnections

  val service = csv("example-messaging-service-pending.csv").circular

  val headers = Map("Accept" -> "application/json")

  val name = niceName(this)

  val scn = scenario(name)
    .feed(service)
    .repeat(1) {
      exec(http(name).get("${content}").headers(headers).check(status.in(Seq(200, 201, 202))))
    }

  setUp(scn.inject(
    constantUsersPerSec(usersPerSec) during(period seconds)
  ).protocols(httpProtocol))

}
```

---

|||/user-files/simulations/exampleProductTeamName/ExamplePresentationApiTests.scala

```scala
package examplePackageName.exampleProductTeamName

import io.gatling.core.Predef._
import io.gatling.http.Predef._

import scala.util.Random
import scala.concurrent.duration._
import examplePackageName.exampleUtilities.ExampleConfig._

class ExamplePresentationApiTests extends Simulation {
  val feeder = csv("assertion-folder-name.csv").random
  val httpProtocol = http.baseURL("https://example.api.com")
  val name = niceName(this)
  val component = scenario(name)
    .feed(feeder)
    .exec(http(name)
    .post("/present-something")
    .header("Content-Type", "application/json;charset=utf-8")
    .body(RawFileBody("assert-folder-name/${fileName}.json"))
    .check(status.is(200)))

  setUp(component.inject(
    nothingFor(5 seconds),
    atOnceUsers(10),
    rampUsersPerSec(10) to (usersPerSec) during(1 minutes),
    constantUsersPerSec(usersPerSec) during(period seconds)
  ).protocols(httpProtocol))
}
```

---

|||/user-files/simulations/exampleThemeApi/ExampleThemeApi.scala

```scala
package examplePackageName.exampleProductTeamName.exampleLive

import io.gatling.core.Predef._
import io.gatling.http.Predef._

import scala.concurrent.duration._
import examplePackageName.exampleUtilities.ExampleConfig._
import examplePackageName.exampleUtilities.TopicTempDataConfig

class ExampleThemeApi extends Simulation {

  val httpProtocol =  httpBase(http, themeApi)

  val name = niceName(this)

  object ExampleThemeDBReader {

    val printSession = exec({session =>
      println(">>> session: "+session)
      session
    })

    val readSubject = exec(http(s"$name by Id")
      .get("/theme")
      .queryParam("id", "${id}")
      .check(status.is(200))
      .check(jsonPath("$.results[0].themeId").saveAs("foundTheme"))
    )

  }
  val scn = scenario(name)
    .feed(csv(ExampleThemeTempDataConfig.feedname).circular)
    .exec(ExampleThemeDBReader.readSubject)

  setUp(scn.inject(
    constantUsersPerSec(usersPerSec) during(period seconds)
  ).protocols(httpProtocol)).assertions(
    global.responseTime.mean.lessThan(1000),
    global.successfulRequests.percent.greaterThan(95)
  )
}
```

---

|||/user-files/simulations/exampleThemeConnector/ExampleThemeConnector.scala

```scala
package examplePackageName.topicBridge

import java.util

import io.advantageous.boon.core.value.{ValueContainer, LazyValueMap, ValueList}
import io.advantageous.boon.json.JsonFactory
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.collection.JavaConverters._
import scala.collection.mutable

import scala.concurrent.duration._
import examplePackageName.exampleUtilities.ExampleConfig._

import examplePackageName.exampleUtilities.SubjectTempData

class ExampleThemeConnector extends Simulation {

  val httpProtocol =  httpBase(http, themeConnectorApi)

  val searchTerms = csv("example-theme-connector-search-terms.csv").circular

  val name = niceName(this)

  def convertMapToTopicMatterId(value: AnyRef): String = {
    value.asInstanceOf[LazyValueMap].get("id").toString
  }
  def getTopicMatterIds(valList: ValueList): List[String] = {
    if (valList.isEmpty) {
      return List.empty
    }

    var idList = new scala.collection.mutable.MutableList[String]

    for (i <- 0 to valList.size()-1) {
      val topicMatter = valList.get(i)
      val id = convertMapToTopicMatterId(topicMatter)
      idList += id
    }
    idList.toList
  }

  object ThemeConnectorSearcher {

    val printSession = exec({session =>
      println(">>> session: "+session)
      session
    })

    val searchByTxt = exec(http(s"$name by text")
      .get("/search?txt=${text}")
      .check(status.is(200))
      .check(jsonPath("$.results").saveAs("results"))
    )

    case class TopicMatter(topicMatterId: String)

    val saveTopicMatters = exec({ session =>
      val results = session("results").as[String]
      val mapper = JsonFactory.create();
      val valueList = mapper.fromJson(results.toString()).asInstanceOf[ValueList]
      val ids = getTopicMatterIds(valueList)
      TopicMatterTempData.addData(ids)
      session
    })

  }
  val scn = scenario(name)
    .feed(searchTerms)
    .exec(ThemeConnectorSearcher.searchByTxt, ThemeConnectorSearcher.saveTopicMatters)

  setUp(scn.inject(
    constantUsersPerSec(usersPerSec) during(period seconds)
  ).protocols(httpProtocol)).assertions(
    global.responseTime.mean.lessThan(1000),
    global.successfulRequests.percent.greaterThan(95)
  )

  after {
    val topicMatterLists = TopicMatterTempData.dedupe()
    println("Simulation finished!" + topicMatterLists.length)
  }
}
```

---

|||/user-files/simulations/exampleThemeCreate/ExampleThemeCreate.scala

```scala
package examplePackageName.topicStore

import io.gatling.core.Predef._
import io.gatling.http.Predef._

import scala.collection.mutable
import scala.concurrent.duration._
import examplePackageName.exampleUtilities.ExampleConfig._
import examplePackageName.exampleUtilities.TopicTempData

class ExampleThemeCreate extends Simulation {
  val httpProtocol =  httpBase(http, themeDBApi)

  val randomUUIDs = Iterator.continually(Map("UUID" -> java.util.UUID.randomUUID.toString))

  val name = niceName(this)

  object ExampleThemeDB {
    val createTheme = exec(
      http(name)
        .post("/theme")
        .body(StringBody(
          """{
            |"exampleJSONfield1": "8881a2a7-8102-4edc-861f-f8bbf5dXXXXX",
            |"exampleJSONfield2": true
            |}""".stripMargin)).asJSON
        .check(status.is(201))
        .check(jsonPath("$.themeId").saveAs("themeId"))
    )

    val saveTheme = exec({ session =>
      val topicMatterId = session("UUID").as[String]
      val themeId = session("topicId").as[String]
      ThemeTempData.addData(themeId, topicMatterId)
      session
    })

    val printSession = exec({session =>
      println(">>> session: "+session)
      session
    })
  }

  val scnCreate = scenario(name)
    .feed(randomUUIDs)
    .exec(ExampleThemeDB.createTheme, ExampleThemeDB.saveTheme)

  setUp(
    scnCreate
      .inject(
        constantUsersPerSec(usersPerSec) during(period seconds)
      ).protocols(httpProtocol)
   )
}
```

---

|||/user-files/simulations/exampleUtilities/ExampleConfig.scala

```scala
package examplePackageName.exampleUtilities

import io.gatling.http.Predef._
import io.gatling.http.protocol.HttpProtocolBuilder

object ExampleConfig {
  val themeDBApi = "https://example.api.com"
  val themeConnectorApi = "https://example.api.com"
  val themeApi = "https://example.api.com"
  val localhost = "http://localhost:8080"

  val cacheControl: String = sys.env.get("CACHE_CONTROL").getOrElse("no-cache")
  val usersPerSec: Int = sys.env.get("USERS_PER_SEC").getOrElse("1").toInt
  val period = 60
  def niceName(obj: Object) = s"${obj.getClass.getSimpleName} with $usersPerSec for $period seconds"

  val useProxy = sys.env.get("SERVER_ENV").getOrElse("non-dev") == "dev"

  def httpBase(http: HttpProtocolBuilder, baseUrl: String) = http.baseURL(baseUrl)
}
```

---

|||/user-files/simulations/exampleUtilities/TopicMatterTempData.scala

```scala
package examplePackageName.exampleUtilities

import java.io.{FileWriter}
import sys.process._
import scala.io.Source

object TopicMatterTempDataConfig {
  val feedname = "/var/tmp/example1-load-testing.csv"
}

object TopicMatterTempData {

  def emptyFile = {
    val writer = new FileWriter(TopicMatterTempDataConfig.feedname, false)
    writer.write("");
    writer.close();
  }

  def initFileWriter = {
    emptyFile
    val writer = new FileWriter(TopicMatterTempDataConfig.feedname, true)
    writer
  }

  val fw = initFileWriter

  def addData(subjectIds: List[String]) = {
    val text = subjectIds.mkString("\n")
    fw.write(s"$text\n")
    fw.flush()
  }

  def dedupe(): List[String] = {
    val uniqList = Source.fromFile(TopicMatterTempDataConfig.feedname).getLines.toList.distinct
    emptyFile
    fw.write("subjectId\n")
    fw.flush()
    addData(uniqList)
    uniqList
  }
}
```

---

|||/user-files/simulations/orchestrationApi/ExampleOrchestrationApi.scala

```scala
package examplePackageName.curationApi

import io.gatling.core.Predef._
import io.gatling.http.Predef._

import scala.concurrent.duration._

class ExampleOrchestrationApi extends Simulation {

  val httpProtocol = http.baseURL("https://example.api.com")

  val scn = scenario("Orchestration Api /orchestrations")
    .exec(session =>
      session.set("id", randomAlphaNumericString(24))) // <https://groups.google.com/forum/#!topic/gatling/ggR6L4ukmqU>
    .exec(http("Orchestration Api /orchestrations")
    .put("/orchestrations?about=BD8B96DA7858A8FC0D7XXXX")
    .body(ElFileBody("orchestration-api/orchestration-api-orchestrations.json")).asJSON
    .header("Content-Type", "application/json")
    .check(status.in(Seq(204)))
  )

  setUp(scn.inject(
    rampUsersPerSec(1) to 50 during (2 minutes),
    constantUsersPerSec(5) during (5 minutes)
  ).protocols(httpProtocol))

  // <http://alvinalexander.com/scala/creating-random-strings-in-scala>
  def randomAlphaNumericString(length: Int): String = {
    val chars = ('a' to 'f') ++ ('A' to 'F') ++ ('0' to '9')
    randomStringFromCharList(length, chars)
  }

  def randomStringFromCharList(length: Int, chars: Seq[Char]): String = {
    val sb = new StringBuilder
    for (i <- 1 to length) {
      val randomNum = util.Random.nextInt(chars.length)
      sb.append(chars(randomNum))
    }
    sb.toString
  }
}
```

---

|||/example-loadtests-gatling/run.sh

```bash
# !/bin/sh
set -e

if [ -z "$1" ];
then
  echo "You must provide a simulation to run"
  exit 1
fi

filePath="user-files/simulations/*/$1*"

function exit_on_error {
  echo $1
  exit 1
}

ls $filePath 1>/dev/null 2>/dev/null || exit_on_error "The simulation pattern provided did not match any simulations"

# list files that match simulation pattern

# remove file path prefixes

# remove file extensions

# replace / with . to give class names

# add examplePackageName. to give complete class names

tests=`ls $filePath | \
  sed "s/user-files\/simulations\///" | \
  sed "s/\.scala//" | \
  sed "s/\//\./g" | \
  sed "s/^/examplePackageName\./"`

echo "Tests to be run:"
echo "$tests" | xargs -L1 echo

# append each class name to the gatling script command

# this produces a string with one or more gatling commands to run

commands=`echo $tests | \
  tr ' ' '\n' | \
  sed "s/^/\.\/bin\/gatling\.sh -m -s /g" | \
  sed "s/$/;/g"`

eval $commands
```

---
