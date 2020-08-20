# Scala notes

|||scala monad library |||scala monads |||monads
|||monad library |||scalaz library |||cats library |||scala cats library |||typelevel
|||scala functional programming library

- Scala World 2017 Conference – monad talk

<https://scala.world/typelevel>

Scala monad library

Scala functional programming library

Scala Cats

<https://typelevel.org/cats/>

- Scalaz

<https://github.com/scalaz/scalaz>

- Advanced Scala with Cats Free eBook

<https://underscore.io/books/advanced-scala/>

---

<https://akka.io/>

---

|||scala filter by predicate
|||scala predicate

```scala
// Returns a filtered list of people based on a predicate.
  private def getPeopleExample(examplePersonId: String, exampleListOfPeople: List[ExamplePerson]): List[ExamplePerson] = {
    val examplePredicateFilterById: (ExamplePerson) => Boolean = (x: ExamplePerson) => x.id == examplePersonId
    val examplePredicateFilterByRole: (ExamplePerson) => Boolean = (x: ExamplePerson) => x.role.equalsIgnoreCase("SENIOR-SOFTWARE-ENGINEER")

    examplePersonId.isEmpty match {
    	// Use this:
		case true => filterPeopleOrCorrespondentsBasedOnPredicate(filterByRole, exampleListOfPeople)
    	case false => filterPeopleOrCorrespondentsBasedOnPredicate(filterById, exampleListOfPeople)

    	// Instead of this:
      	// case true => filterPeopleOrCorrespondentsBasedOnPredicate(_.role.equalsIgnoreCase("SENIOR-SOFTWARE-ENGINEER"), exampleListOfPeople)
      	// case false => filterPeopleOrCorrespondentsBasedOnPredicate(_.id == examplePersonId, exampleListOfPeople)
    }
  }

  private def filterPeopleBasedOnPredicateExample(examplePredicate: (ExamplePerson) => Boolean, exampleListOfPeople: List[ExamplePerson]): List[ExamplePerson] = {
    var exampleListOfFilteredPeople = new mutable.MutableList[BylineElement]

    exampleListOfPeople.filter(predicate).foreach(
      examplePerson => exampleListOfFilteredPeople.+=(examplePerson)
    )
    exampleListOfFilteredPeople.toList
  }
```

---

|||scala avoiding mutable state example
|||scala mutable state

```scala
// Use this:

object ExampleTableParser {
  def apply(exampleTableNode: Node): List[TableRow] = {
    (exampleTableNode.child map (exampleTableElement => {
      exampleTableElement.label match {
        case "example-table-column" => Some(ExampleTableColumnParser())
        case "example-table-row" => Some(ExampleTableRowParser())
        case _ => None
      }
    })).toList.flatten
  }
}
```

```scala
// Instead of:

object ExampleInlineElementParser {
  def apply(exampleNodeSeqInlineElements: NodeSeq): List[ExampleInlineElement] = {
    var exampleInlineElements = new mutable.MutableList[ExampleInlineElement]
    exampleNodeSeqInlineElements.foreach(exampleNodeSeqInlineElement => {
      (exampleNodeSeqInlineElement.label, exampleNodeSeqInlineElement.text.trim()) match {
        case ("#PCDATA", "") => // if it's a empty text element, then do nothing!
        case (_, _) => exampleInlineElements.+=(ExampleInlineElementParser(exampleNodeSeqInlineElement))
      }
    })
    exampleInlineElements.toList
  }

  def apply(exampleNodeInlineElement: Node): ExampleInlineElement = {
    exampleNodeInlineElement.label match {
      case "b" => Bold(ExampleInlineElementParser(exampleNodeInlineElement.child.head))
      case "i" => Italic(ExampleInlineElementParser(exampleNodeInlineElement.child.head))
      case "#PCDATA" | _ => ExampleInlineText(exampleNodeInlineElement.text)
    }
  }
}
```

---

|||scala options examples

```scala
val exampleTitle = (exampleNode \ "@title").text.isEmpty match {
  case true => exampleTitleArg
  case false => (exampleNode \ "@title").text
}


val exampleObject: Option[ExampleObject] = (exampleNode \ "exampleElement").headOption match {
  case Some(exampleElement: Node) => Some(ExampleElementParser(exampleElement))
  case _ => None
}


val exampleObjOptions = ExampleObjOptionsParser((exampleNode \ "example-obj-options").head)


val exampleObjOptions = (content \ "example-obj-options").isEmpty match {
  case true => List.empty
  case _ =>  AssetOptionsParser((content \ "example-obj-options").head)
}

val exampleObject: Option[ExampleObject] = (exampleNode \ "exampleElement").headOption map (_.text))


def textAsOption(nodes: NodeSeq): Option[String] = {
  val text = nodes.text
  if (text.isEmpty) None else Some(text)
}
```

---

|||scala patterns
|||scala try vs option |||scala try vs. option
|||scala option vs try |||scala option vs. try

```scala
def exampleDivideAbyBFunction(a: Double, b:Double): Double = {return a/b}

def exampleFunctionString1(): String = {return "Example string."}

def exampleFunctionObject1(): Object = {return new String("Example string.")}
```

|||scala play2 json
|||play2 json

```scala
val json = {}

(json \ "name").as[String]
(json \ "name").asOpt[String]


Try {
	(json \ "name").get
} match {
	case Success(a) => a
	case Failure(e) => new Exception(e.getMessage())
}

// Or you can use .asOpt and to something like:

(json \ "name").asOpt[String] match {
	case Some(c) => println(s"Result is: %c")
	case None => println("Error.")
}
```

---

|||scala multiple parsing
|||scala xml parsing
|||xml parsing

```scala
    var keyPoints = new mutable.MutableList[ExamplePoint]
    (exampleNode \ "example-points" \ "example-point").foreach(
      examplePoint => examplePoints.+=(ExamplePointParser(examplePoint))
    )


    val exampleRepresentationsNodeSeq: NodeSeq = urlNode \ "example-url-representation"
    var exampleRepresentations = new mutable.MutableList[ExampleUrlRepresentation]

    exampleRepresentationsNodeSeq.foreach(representationNode =>
      exampleRepresentations.+=(ExampleUrlRepresentationParser(representationNode)))
```

---

|||scala xml
|||xml scala
|||extract data from XML nodes in Scala

<http://alvinalexander.com/scala/how-to-extract-data-from-xml-nodes-in-scala>

```scala
x.text                 // Returns a concatenation of text(n) for each child n.

x.toString             // Emits the XML literal as a String.
                       Use scala.xml.PrettyPrinter to format the output, if desired.
```

---

|||scala for comprehension translation
|||for comprehension translation

<http://stackoverflow.com/questions/14598990/confused-with-the-for-comprehension-to-flatmap-map-transformation>

<http://docs.scala-lang.org/tutorials/FAQ/yield.html>

---

|||setting proxies pragmatically
|||proxy
|||proxies
|||scala
|||networks proxies
|||networking proxies

```scala
  def useProxy() = {
    println(s">>> Setting up the proxy: [DEV] environment")
    System.setProperty("http.useProxy", "true")
    System.setProperty("com.ning.http.client.AsyncHttpClientConfig.useProxyProperties", "true")
    System.setProperty("http.proxyHost", "www-cache.example.proxy.com")
    System.setProperty("http.proxyPort", "80")
    System.setProperty("https.proxyHost", "www-cache.example.proxy.com")
    System.setProperty("https.proxyPort", "80")
    System.setProperty("http.nonProxyHosts", "localhost|national.core.example.com|*.sandbox.dev.example.com|127.0.0.1")
    System.setProperty("https.nonProxyHosts", "localhost|national.core.example.com|*.sandbox.dev.example.com|127.0.0.1")
  }

  useProxy()
```

---

|||variance in scala |||variance |||covariance |||contravariance
|||scala variance |||scala covariance |||scala contravariance

<https://lansalo.com/2017/10/22/variance-in-scala/>

by Lorenzo Ansaloni

---

Scala Companion object pattern - object + trait pattern

---

|||scala logging |||logging scala
|||scala logger |||logger scala

|||slf4j scala logging |||slf4j logging scala |||scala slf4j logging

|||logging slf4j
|||log slf4j scala

```scala
import org.slf4j.LoggerFactory

trait ExampleLogging {
  protected[this] val log = LoggerFactory.getLogger(this.getClass)

  def exampleWriteInOneLine(value: Any): String = value.toString.replaceAll("\n"," ")
}
```

---

|||scalatra
|||continuous compilation running
|||automatic code reloading
|||hot code

```bash
$sbt
> container:start
> ~ ;copy-resources;aux-compile
> container:stop
```

---

|||scala cucumber tests |||cucumber tests scala
|||cucumber step parameter |||cucumber step parameterisation

```scala
Given ("""^ Blah blah ([^"]*) blah blah$""") { (stepParameterValue: String) =>
	println(">>>" + stepParameterValue)
}



Given ("""^ Blah blah (.*?) blah blah$""") { (stepParameterValue: String) =>
	println(">>>" + stepParameterValue)
}
```

---

|||sbt

```bash
sbt
gen-idea
gen-idea no-classifiers

clean
update
compile
run
~run
test
~test
cucumber

styleCheck

# reload, if it doesn't pick up the correct version for publishLocal or publish-loca
publishLocal //publish to local ivy repo
publish-local  //publish to local ivy repo
publishLocal

console

clean
gen-idea no-classifiers
reload
compile
test
cucumber
it:test


# sbt version
sbt 'inspect sbtVersion'
sbt about
sbt sbt-version
```

---

|||sbt
|||sbt test
|||sbt testOnly

<https://stackoverflow.com/questions/11159953/scalatest-in-sbt-is-there-a-way-to-run-a-single-test-without-tags>
http://sgeb.io/posts/2016/11/til-sbt-testonly/

```text
"This is now supported (since ScalaTest 2.1.3) with:

testOnly *MySuite -- -z foo
to run only the tests whose name includes the substring "foo". For exact match rather than substring, use -t instead of -z.

shareeditflag
edited Sep 8 '16 at 17:19
answered Mar 18 '14 at 20:59

Seth Tisue"


sbt testOnly *ExampleSuiteSpec* -- -z "name of unit test"
```

---

```bash
sbt run -Dcom.ning.http.client.AsyncHttpClientConfig.useProxyProperties=true
```

---

http://stackoverflow.com/questions/14507688/sbt-debug-port-per-project

```text
SBT Debug port per project

up vote
4
down vote
favorite
2
How do I change the SBT debug port on a per project basis?

I can add the debug JVM options to the environment variable SBT_OPTS

-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005
But this will apply to all SBT instances and if I want to run SBT in debug for two separate projects simultaneously, I get this error because the port is already in use:

ERROR: transport error 202: bind failed: Address already in use
debugging scala sbt
shareimprove this question
edited Dec 20 '15 at 21:54
asked Jan 24 '13 at 17:57

theon
6,74522559
add a comment
1 Answer
active oldest votes
up vote
5
down vote
accepted
Modifying the sbt script that came with sbt via homebrew, I made this script that lets you start sbt and specify the debug port like so:

sbt-debug 5005


https://gist.github.com/4625742


#!/bin/sh
test -f ~/.sbtconfig && . ~/.sbtconfig

SBT_LAUNCH=/usr/local/Cellar/sbt/0.12.1/libexec/sbt-launch.jar
# Take leading integer as debug port and not sbt args
DEBUG_PORT=$1
SBT_ARGS=`echo "$@" | grep -oE "[^0-9].*"`

exec java -Xmx512M -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=${DEBUG_PORT} ${SBT_OPTS} -jar $SBT_LAUNCH $SBT_ARGS
shareimprove this answer
answered Jan 24 '13 at 17:57

theon
6,74522559
  	 	
Nice. This isn't a big deal, but I made it a little more generic by not hard-coding the path to sbt-launch.jar. I replaced the SBT_LAUNCH= line with this: SBT_LAUNCH=$(grep -oE '/[^ ]+sbt-launch.jar' $(which sbt)) – Mike Morearty Jul 10 '14 at 7:23
```

---

<http://www.coderanch.com/t/87270/Tomcat/ERROR-transport-error-connect-failed>

```text
Jaikiran Pai
Marshal
Pie
Posts: 10444
227  
I like...
IntelliJ IDE  Ubuntu
  posted 8 years ago Mark post as helpful  send pies  Quote  Report post to moderator
I have been watching another thread where the user has a similar problem on JBoss. The user came back with a reply saying that he got it working by swapping the position of address=8787 (in your case the port is 8011) and server=y

Like this:

?
1
-Xdebug -Xrunjdwp:transport=dt_socket,server=y,address=8011,suspend=n


The server=y comes before the "address". It might just be a coincidence that it started working after this change. I am still trying to understand how the positioning works. You might want to give this a try.
[My Blog] [JavaRanch Journal]

Jaikiran Pai
Marshal
Pie
Posts: 10444
227  
I like...
IntelliJ IDE  Ubuntu
  posted 8 years ago Mark post as helpful  send pies  Quote  Report post to moderator
I am going through this article and it says that 


Sun's VM implementations require command line options to load the JDWP agent for debugging. From 5.0 onwards the -agentlib:jdwp option is used to load and specify options to the JDWP agent. For releases prior to 5.0, the -Xdebug and -Xrunjdwp options are used (the 5.0 implementation also supports the -Xdebug and -Xrunjdwp options but the newer -agentlib:jdwp option is preferable as the JDWP agent in 5.0 uses the JVMTI interface to the VM rather than the older JVMDI interface).


So if none of the suggested options, in my earlier posts, work for you then you might want to try using

?
1
-agentlib:jdwp=transport=dt_socket,address=8787,server=y,suspend=n
[My Blog] [JavaRanch Journal]

Meir Yan
Ranch Hand
Posts: 599
  posted 8 years ago Mark post as helpful  send pies  Quote  Report post to moderator
bingo!!
its working thanks allot
Jaikiran Pai
Marshal
Pie
Posts: 10444
227  
I like...
IntelliJ IDE  Ubuntu
  posted 8 years ago Mark post as helpful  send pies  Quote  Report post to moderator
Originally posted by Meir Yan:
bingo!!
its working thanks allot


Great!!   

Which option worked for you? Using -agentlib:jdwp or was it by swapping the position of "server" and "address"?
[ November 07, 2007: Message edited by: Jaikiran Pai ]
[My Blog] [JavaRanch Journal]

Meir Yan
Ranch Hand
Posts: 599
  posted 8 years ago Mark post as helpful  send pies  Quote  Report post to moderator
the last option
```

---

|||sbt debug

```bash
export SBT_OPTS="$SBT_OPTS -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=9999"
echo $SBT_OPTS
```

---

|||sbt global.sbt |||global.sbt

```scala
resolvers += "Example Repo Artifactory" at "https://repo.example.com/repo"

resolvers += "Example Repo Releases" at "https://repo.example.com/releases/"

resolvers += "Example Repo Snapshots" at "https://repo.example.co.uk/snapshots"

externalResolvers <<= resolvers map { rs =>
  Resolver.withDefaultResolvers(rs, false)
}
```

---



|||scala
|||scalatra
|||json4s dateFormatter
|||json4s dateFormatter thread safe
|||json4s thread safe
|||scala json4s dateFormatter
|||dateFormatter

/*
Each thread must have its own instance for it to be thread safe, since SimpleDateFormat instances maintain variable state.
Json4s makes it thread safe by using Java’s ThreadLocal, which guarantees each thread will have its own local instance of whatever you’re working with.
We were negating that by overriding the dateFormatter to a "val", meaning all threads shared that one val, and you’re back to the thread issue.
*/

import org.json4s.ext.JodaTimeSerializers
import org.json4s.DefaultFormats

import java.util.TimeZone
import java.text.SimpleDateFormat

// This was not thread safe as it was overriding dateFormatter as a val.
trait JsonSupport {
	implicit def jsonFormats = new DefaultFormats {
  		// ISO 8601 date format with millisecond precision.
  		// Examples: 2014-08-07T09:19:07.123+00:00, 2014-08-07T09:19:07.123Z
  		override val dateFormatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
  		dateFormatter.setTimeZone(TimeZone.getTimeZone("UTC"))
  	}
} ++ JodaTimeSerializers.all


// This makes it thread safe as it overrides dateFormatter as def.

import org.json4s.ext.JodaTimeSerializers
import org.json4s.DefaultFormats

import java.util.TimeZone
import java.text.SimpleDateFormat

trait JsonSupport {

  implicit def jsonFormats = new DefaultFormats {
    /* ISO 8601 date format with millisecond precision
     * Examples: 2014-08-07T09:19:07.123Z
     * Note this must be a def - SimpleDateFormat is not thread
     * safe so we must make sure each thread gets its own instance
     */
    override def dateFormatter = {
      val df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
      df.setTimeZone(TimeZone.getTimeZone("UTC"))
      df
    }
  } ++ JodaTimeSerializers.all



/*--------------------------------*/

|||scala futures
|||scala notes

Interesting point about Scala Futures - They’re great, obviously, but they’re probably best avoided in test code if possible since asynchronous tests can be flaky if not handled right. Often they’ll pass locally but fail on Jenkins as its generally slower. If using a library that returns Futures in test code you can just use Await.result the to block until the result is ready.

Some of our tests have to be asynchronous because the input to the system is a queue rather than a HTTP request - that’s where it gets tricky.


//---

A:
How to write tests asserting a method returns a failed future: http://stackoverflow.com/questions/20925352/scalatest-assert-exceptions-in-failed-futures-non-blocking

ScalaTest: Assert exceptions in failed futures (non-blocking)
import org.scalatest.{ FlatSpec, Matchers, ParallelTestExecution } import org.scalatest.concurrent.ScalaFutures import org.apache.thrift.TApplicationException class Test extends FlatSpec with Matc...


My personal preference is to use ScalaTest's `ScalaFutures.whenReady` method: http://stackoverflow.com/a/25572204

ScalaTest: Assert exceptions in failed futures (non-blocking)
import org.scalatest.{ FlatSpec, Matchers, ParallelTestExecution } import org.scalatest.concurrent.ScalaFutures import org.apache.thrift.TApplicationException class Test extends FlatSpec with Matc...


warning: using `Await.result` and `intercept` to capture exceptions is not the same. Like this its not possible to distinguish between a thrown exception and one returned inside of a failed future.


B:
I specifically used the fact that Await.ready blocks to check that an operation inside the future was not blocking.  I'm sure there is a better way


https://github.com/example/pub-time-mon/blob/master/src/test/scala/com/ /monitoring/QueueProcessorSpec.scala


it should "not block thread when checking messages" in



C:
To test for failed futures, I'm doing this:

   val result = intercept[SomeException] {
     complete { foo }
   }.getMessage

result mustBe("whatever")


where complete is:

def complete[T](awaitable: => Awaitable[T]): T = Await.result(awaitable, 5.seconds)


But I take A's point that you can't differentiate between exceptions that are wrapped within a failed future and those that are thrown explicitly.


A:
yes, Await.result will unpack any failed futures and actually throw the exception they contain, so it ends up looking the same


you could say that if you're intercepting a specific exception type with a specific message that you can be pretty certain that's the one you returned in a failed future, which is fair enough


but in most projects we're using Scalatest anyway and its as trivial to be even more explicit:


val f: Future[Something] = someObject.giveMeAFuture
 ScalaFutures.whenReady(f.failed) { e =>
   e shouldBe a [SomeExceptionType]
 }


/*--------------------------------*/

|||scala future
|||scalatra future

```scala
import dispatch.{Future, Http}
import org.scalatra.FutureSupport

with FutureSupport

  protected implicit def executor: ExecutionContext = ExecutionContext.global

  before() {
    contentType = "application/json"
  }

  get("/status") {
    val futureResponse: dispatch.Future[Response] = Http(dispatch.url(http://www.example.com).GET)
    (for {
      resp <- futureResponse
    } yield resp) map { response =>
      s"""{
          |"status": "${response.getStatusCode}"
          |}
          |""".stripMargin
    }
    futureResponse map { response =>
      s"""{
          |"status": "${response.getStatusCode}"
          |}
          |""".stripMargin
    }
  }

  get("/status") {
    val futureResponse: dispatch.Future[Response] = Http(dispatch.url(http://www.example.com).GET)
    futureResponse map { response =>
      response.getStatusCode match {
        case 200 => Ok {
          s"""{
              |"status": "${response.getStatusCode}"
              |}
              |""".stripMargin
        }
        case _ =>
          halt(response.getStatusCode,
            s"""{
                |"status": "non-200 status: [${response.getStatusCode}]"
                |}
                |""".stripMargin)
      }
    }
  }
```

---

|||scala gitignore |||scala .gitignore

```bash
*.class
*.log

# sbt specific
.cache/
.history/
.lib/
dist/*
target/
lib_managed/
src_managed/
project/boot/
project/plugins/project/

# Scala-IDE specific
.scala_dependencies
.worksheet
```

---
