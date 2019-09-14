# intelliJ notes

----

|||intellij remote debug
|||remote debug debug on file

/data/tomcat/apache-tomcat-example-api/bin/debug-on.sh


export SERVER_DEBUG=1
export SERVER_DEBUG_PORT=8989


IntelliJ remote debug settings:

Command line arguments for running remote JVM
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8787

For JDK 1.4.x
-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8787

For JDK 1.3.x or earlier
-Xnoagent -Djava.compiler=NONE -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8787

Transport = Socket

Debugger mode = Attach

Host: 192.168.192.10
Port: 8787

----

|||intellij remote run
|||remote run

Command line arguments for running remote JVM
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8989

For JDK 1.4.x
-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8989

For JDK 1.3.x or earlier
-Xnoagent -Djava.compiler=NONE -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8989

Host
192.168.192.10

Port
8989

-[Maven Run]-

Command line:
jetty:run

VM Options:
-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=4000

----

|||intellij default vm options

vim /Applications/IntelliJ IDEA 15 CE.app/Contents/bin/idea.vmoptions

-XX:MaxPermSize=384M

----