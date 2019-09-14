# scala notes

----
|||scala monad library |||scala monads |||monads
|||monad library |||scalaz library |||cats library |||scala cats library |||typelevel
|||scala functional programming library

Scala World 2017 Conference – monad talk???
https://scala.world/typelevel

Scala monad library

Scala functional programming library

Scala Cats
https://typelevel.org/cats/


Scalaz
https://github.com/scalaz/scalaz

Advanced Scala with Cats Free eBook
https://underscore.io/books/advanced-scala/

----

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

----

|||scala avoiding mutalbe state example
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

----

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

----

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

----

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

----

|||scala xml
|||xml scala
|||extract data from XML nodes in Scala

// http://alvinalexander.com/scala/how-to-extract-data-from-xml-nodes-in-scala

```scala
x.text                 // Returns a concatenation of text(n) for each child n.

x.toString             // Emits the XML literal as a String. 
                       Use scala.xml.PrettyPrinter to format the output, if desired.
```                       

----

|||scala for comprehension translation
|||for comprehension translation

http://stackoverflow.com/questions/14598990/confused-with-the-for-comprehension-to-flatmap-map-transformation
http://docs.scala-lang.org/tutorials/FAQ/yield.html

----

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

----

|||variance in scala |||variance |||covariance |||contravariance
|||scala variance |||scala covariance |||scala contravariance

https://lansalo.com/2017/10/22/variance-in-scala/
by Lorenzo Ansaloni

----

Scala Companion object pattern - object + trait pattern

----

