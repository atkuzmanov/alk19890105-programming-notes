# skills matter - fast track to akka with scala - 2016-06-06

|||skills matter - fast track to akka with scala - 2016-06-06 |||training

---

Vector - better for random access.


List - better for non-random access - head or tail.


Each actor has an address = handle = actor reference.


case _ => not recommended as it can hide un-handled messages and you will never get them.


In order to log unhandled messages, set the configuration setting akka.actor.debug.unhandled to on

---

```scala
Instead of "protected def createCoffeeHouse(): ActorRef =
    system.actorOf(Props(new CoffeeHouse), "coffee-house")" use a props method otherwise you will get serialization problems:
  
// factory method in app or actor that is the parent
protected def createCoffeeHouse(): ActorRef =
    system.actorOf(CoffeeHouse.props, "coffee-house")

  def props: Props =
    Props(new CoffeeHouse)
```

---

```scala
! - called a tell operator
```

communication - fire and forget manner

---

DON'T SEND MUTABLE THINGS TO ACTORS, ALWAYS IMMUTABLE. DON'T SEND STRINGS. SEND OBJECTS OR CLASSES - THEY ARE IMMUTABLE.

---

```scala
override def receive  = {
  
  val sndr = sender()

  Future {

    // YES
    sender ! "Something "

    // NO - bad
    // sender() ! "Something"
  }
}
```

---

```scala
  system.actorOf(Props(new Actor {
    coffeeHouse ! "Brew coffee"

    override def receive: Receive = {
//      case msg: String => log.info(msg)
      case msg @ (_ : String) => log.info(msg)
    }
  }))
```

---

```scala
forward does not change the original sender
```

---

```scala
var guestBook: Map[ActorRef, Int] = Map.empty[ActorRef, Int] withDefaultValue 0

guestBook += g -> (guestBook(g) + 1)
```

---
