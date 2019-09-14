# skills matter advanced scala training 2016-05-23

----

|||training
|||skills matter - advanced scala - 2016-05-23
|||skillsmatter - advanced scala - 2016-05-23
|||advanced scala - 2016-05-23


Look into Scala collection library.

Every object is a singleton.

For expressions and for loops require obj to have map, flatmap and filter.

val l = List(1,2,3)
for {j <- l} // j <- l is a generator


Can override a def with a val, but cannot override a val with a def because it's supposed to be immutable.

Always write out "override" when overriding, it protects from errors.

Databricks code style guides standards.


//Todo: Article trait linearisation


Traits that come last have higher importance, mixing order is important.


case valueOfX @ x => 1 + valueOfX // @ captures the value in a local variable



---


partial function ?!

higher order functions ?!

Method != Function ?!

zip ?!

:+ +: ?!

covariance contravariance ?!


---


import scala.collection.immutable.Seq


  def isIncreaseing(times: Seq[Time]): Boolean = {

    def isIncreasingTime() = {
      
    }

    true
  }


---

  import scala.collection.immutable.Seq
  def isIncreasing(times: Seq[Time]): Boolean = {
    times match {
      case t1 +: t2 +: _ => (t1 < t2) && isIncreasing(times.tail)
      case Nil => true // empty sequence
      case _ +: Nil => true // only one time
    }
  }


---

package misc

object Recurse {

  def map[A, B](as: Seq[A])(f: A => B): Seq[B] = {
    as match {
      case a +: rem => f(a) +: map(rem)(f)
      case Nil => Nil
    }
  }

  def flatMap[A, B](as: Seq[A])(f: A => Seq[B]): Seq[B] = {
    as match {
      case a +: rem => f(a) ++ flatMap(rem)(f)
      case Nil => Nil
    }
  }

  def filter[A](as: Seq[A])(condition: A => Boolean): Seq[A] = {
    as match {
      case a +: rem if (condition(a)) => a +: filter(rem)(condition)
      case a +: rem => filter(rem)(condition)
      case Nil => Nil
    }
  }
}
  

---


  def isIncreasingSliding(times: Seq[Time]): Boolean = {
    times.sliding(2).forall {
      case t1 +: t2 +: Nil => t1 < t2
      case _ => true
    }
  }


---


val backToBackStations: Seq[(Station, Station)] = stations zip stations.tail



---


val departureTimes: Map[Station, Time] = (schedule map { schedule => (schedule._2, schedule._1)}).toMap

  val departureTimes: Map[Station, Time] =
//    (schedule map { schedule => (schedule._2, schedule._1)}).toMap
//  schedule.map{ case (time, station) => (station, time)}.toMap
//    schedule.map{schedule => schedule.swap}.toMap
//    schedule.map{ _.swap}.toMap
//    schedule.map{ _.swap}(breakOut)
    schedule.map{ _.swap}.toMap



---



package misc

import scala.collection.immutable.Seq


object Queue {
  def apply[A](elements: A*): Queue[A] = {
    new Queue(elements.toVector)
  }
}


//private class Queue[A] private (private val elements: Seq[A]) {
//private[misc] class Queue[A] private (private val elements: Seq[A]) {
//private[this] class Queue[A] private (private val elements: Seq[A]) {
class Queue[+A] private (private val elements: Seq[A]) {

  override def equals(other: Any): Boolean = {
    other match {
      case that: Queue[_] => (this eq that) || this.elements == that.elements
      case _ => false
    }
  }

  def dequeue: (A, Queue[A]) = elements match {
    case a +: rem => (a, new Queue(rem))
    case Nil => throw new UnsupportedOperationException("Cannot deque from empty queue.")
  }

  def enqueue[B >: A](b: B): Queue[B] = new Queue(elements :+ b)

  override def hashCode: Int = {
    elements.hashCode()
  }

  override def toString: String =
//    s"Queue(${elements.mkString(", ")}})"
  elements.mkString("Queue: (", ", ", ")")
}





--




package misc

object Equals {
  // At compilation time insure that a1 and a2 are of the same time, so not just using old ==
  implicit class EqualsOps[A](val a: A) extends AnyVal{
    def ===(a2: A): Boolean = {
      a == a2
    }
  }
}

----