# maven mvn notes

## maven mvn pom

<https://maven.apache.org/guides/introduction/introduction-to-the-pom.html>

## maven mvn changing the project version

<https://www.mojohaus.org/versions-maven-plugin/examples/set.html>

## maven mvn version plugin

<https://www.mojohaus.org/versions-maven-plugin/usage.html>

<https://www.mojohaus.org/versions-maven-plugin/commit-mojo.html>

<https://stackoverflow.com/questions/29995139/maven-versions-maven-plugin-versions-plugin-2-2-maven-uncle-situation>

<https://stackoverflow.com/questions/19123013/maven-version-with-a-property>

<http://maven.40175.n5.nabble.com/version-contains-an-expression-but-should-be-a-constant-Better-way-to-add-a-new-version-td5146537.html#a5146727>

```bash
mvn versions:set -DnewVersion=0.1
mvn versions:commit
```

---

|||maven
|||jboss
|||java properties
|||intellij
|||maven jboss
|||mvn jboss
|||jetty

```bash
mvn -Djetty.port=8000 jetty:run-war -Pexample-component-name
-Djboss.server.home.dir=local_jboss
-Djetty.systemPropertiesFile=example-component-name/example-component-name-config/conf/example-component-name.properties
-Dcom.example.configuration=Local-EOF
```

```text
IntelliJ -> Debug Remote -> Remote Java Application -> Connect Project: example-project-name Connection Type: Standard
(Socket Attach) Connection Properties: Host: localhost Port: 8000
```

---

|||maven
|||mvn

|||Possible alternative to using EnvInject Jenkins plugin
|||jenkins maven
|||maven jenkins

```bash
    export SVN_REVISION="$(BUILD_NUMBER}.$(date '+s')"
    mvn -U -e -Dforce.graceful=true -Dmaven.deploy.skip=false clean resources:resources deploy -B help:system
```

---

|||maven goals

```bash
clean package deploy javadoc:javadoc

clean test deploy

mvn -e clean package deploy:deploy -Dmaven.deploy.skip=true -DskipTests
```

---

|||maven
|||mvn
|||apache maven apache mvn

```bash
mvn install:install-file -DgroupId=com.example.groupId -DartifactId=example-artefact-id
-Dversion=1.0.1 -Dpackaging=jar -Dfile=/path/to/file

mvn clean install mvn clean compile

mvn -o install -DskipTests

mvn -o clean install -DskipTests

mvn dependency:tree

mvn dependency:tree > /mnt/hgfs/workspace/deptree01.txt

mvn -B clean deploy -DskipTests -DreplaceVersion=true

-e = stacktrace enable
```

> References
>
> <http://stackoverflow.com/questions/15727356/intellij-idea-cannot-resolve-anything-in-maven>

```text
In IntelliJ 12.1.4 I went through Settings --> Maven --> Importing and made sure the following was selected:

Import Maven projects automatically
Create IDEA modules for aggregator projects
Keep source...
Exclude build dir...
Use Maven output...
Generated souces folders: "detect automatically"
Phase to be...: "process-resources"
Automatically download: "sources" & "documentation"
Use Maven3 to import project
VM options for importer: -Xmx512m
This took me from having a lot of unresolved import statements to having everything resolved. I think the key here was using Maven3 to import project... Hopefully this helps.

share|edit
answered Aug 5 '13 at 17:39

MCP

 have encountered this problem，idea cannot download all dependent jar packages using maven,i just tried the following operations:

 mvn -U idea:idea

then all the dependent jar packages are download from the maven repository

share|edit
answered Jan 8 at 8:11

ranpengcoder
```

---
