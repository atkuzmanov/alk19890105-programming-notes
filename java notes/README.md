# Java notes

----

|||java avoid null checks in java
|||avoid null checks in java
|||null checks in java

http://winterbe.com/posts/2015/03/15/avoid-null-checks-in-java/

Found Optional in Java8 useful if you want to check if a variable will be null, but don’t want to surround it with an if else block. This way you don’t pollute the variable type with Optional, but even if it fails it won’t throw a null pointer. My use case for this is the fact that I want the variable to be put in a LOG message and in an exception and I don’t want some of the chained call to throw a null and cause a null pointer in the log or exception message:

```java
       String siteCode = Optional.ofNullable(this.asset.getSite().getCode())
                .orElse("[Something went wrong - siteCode is null.]");
```

----

|||time taken
|||java time taken

```java
long start = System.currentTimeMillis(); 
long timeTaken = System.currentTimeMillis() - start; 
log.info(">>> TIME TAKEN: " + timeTaken);
```

----

|||java.net.UnknownHostException
|||java.net.unknownHostexception
|||unknownHostexception

```bash
scutil --get ComputerName

scutil --set HostName "localhost"
```

----

|||jvm metrics
|||metrics
|||java metrics
|||scala metrics
|||cloudwatch metrics
|||aws cloudwatch metrics
|||amazon aws

https://github.com/dropwizard/metrics

----

|||java books

- Core Java SE 9 For Impatient, Cay S. Horstmann

- Core Java Volume 1 and 2, Cay S. Horstmann

- Head First Java

- Effective Java, Third Edition by Joshua Bloch

- Spring in Action, 4th Edition by Craig Walls

- Clean Code: A Handbook of Agile Software Craftsmanship by Robert C. Martin

- Java Concurrency in Practice

- Java Performance From Binu John

- Modern Java in Action

- Thinking in Java by Bruce Eckel

- Java: The Complete Reference by Herbert Schildt

- Head First Design Patterns

`Reference:`
https://www.java67.com/2018/02/3-books-to-learn-java-from-scratch-in.html

https://www.journaldev.com/6162/5-best-core-java-books-for-beginners

https://stackabuse.com/the-best-java-books-for-all-skill-levels/

https://dev.to/codegym_cc/18-best-java-books-for-beginners-in-2019-fme

https://www.quora.com/What-are-the-best-books-to-learn-Java

https://dzone.com/articles/10-all-time-great-books-for-java-programmers-best

https://www.freecodecamp.org/news/must-read-books-to-learn-java-programming-327a3768ea2f/

https://hackernoon.com/top-6-best-books-for-learning-java-programming-30b0af41c549

----
----
----
----
----
----
----

