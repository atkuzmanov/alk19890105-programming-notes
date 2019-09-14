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
----
----
----
----
----
----
----

