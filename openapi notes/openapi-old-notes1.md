# Openapi3.0 Notes

## Notes random

--------------------------------
[permalink-service] [openapi 3.0]

    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-smallrye-openapi</artifactId>
    </dependency>

--------------------------------
[permalink-service] [openapi 3.0]

oidc-test-server:
  image: schwarzit-xx-sit-ecm-docker-local.jfrog.io/oidc-test-server:1.0.0
  volumes:
    - ./oidc-test-server:/app/config
  ports:
    - "3000:3000"

--------------------------------
[permalink-service] [openapi 3.0]

mvn package 

mvn compile quarkus:dev

---
---
---

## permalink-service

```xml
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-smallrye-openapi</artifactId>
    </dependency>
```

```sh
mvn package 

mvn compile quarkus:dev
```

## permalink-service-rest-api-spec

- Generated spec

```yml
---
openapi: 3.0.3
info:
  title: Generated API
  version: "1.0"
paths:
  /permalinks:
    get:
      responses:
        "200":
          description: OK
          content:
            text/plain:
              schema:
                type: string
    post:
      requestBody:
        content:
          text/plain:
            schema:
              type: string
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Permalink'
  /permalinks/{id}:
    get:
      parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
      responses:
        "200":
          description: OK
  /requestInfo:
    get:
      responses:
        "200":
          description: OK
          content:
            text/plain:
              schema:
                type: string
components:
  schemas:
    Permalink:
      type: object
      properties:
        url:
          type: string

```

- swagger-codegen

```sh
swagger-codegen generate -i openapi3-1.yml -g java -o tmp2/
```

- openapi-generator spring try 1

```sh
openapi-generator generate -i openapi3-1.yml -g spring -o tmp3/
```

- openapi-generator angular try 1

```sh
openapi-generator generate -i openapi3-1.yml -g typescript-angular -o tmp4/
```

- openapi-generator spring try 2

> Reference: <https://openapi-generator.tech/docs/generators/spring/>

```sh
openapi-generator generate -i src/main/resources/openapi3-1.yml -g spring --additional-properties=interfaceOnly=true -o src/main/resources/tmp6/
```

## No information for Quarkus, but lots of inconsistent information about SpringBoot => Try SpringBoot

- No or little information at the time about Quarkus generation.
- No or little information at the time about validation using Quarkus framework, there seem to be more options available to explore with SpringBoot.
- It would be a huge task on its own to write custom Quarkus generator, but not impossible.

## choice-values-service-rest-api-spec

```xml
<!-- OPENAPI 3.O WIP START -->
            <plugin>
                <groupId>org.springdoc</groupId>
                <artifactId>springdoc-openapi-maven-plugin</artifactId>
                <version>0.2</version>
                <executions>
                    <execution>
                        <phase>install</phase>
                        <goals>
                            <goal>generate</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
<!-- OPENAPI 3.O WIP END -->
```

- WIP, currently fails with:

```java
[INFO] --- springdoc-openapi-maven-plugin:0.2:generate (default) @ choice-values-rest-api-spec ---
[ERROR] An error has occured
java.net.ConnectException: Connection refused (Connection refused)
    at java.net.PlainSocketImpl.socketConnect (Native Method)
    at java.net.AbstractPlainSocketImpl.doConnect (AbstractPlainSocketImpl.java:399)
    at java.net.AbstractPlainSocketImpl.connectToAddress (AbstractPlainSocketImpl.java:242)
    at java.net.AbstractPlainSocketImpl.connect (AbstractPlainSocketImpl.java:224)
    at java.net.Socket.connect (Socket.java:609)
    at java.net.Socket.connect (Socket.java:558)
    at sun.net.NetworkClient.doConnect (NetworkClient.java:182)
    at sun.net.www.http.HttpClient.openServer (HttpClient.java:474)
    at sun.net.www.http.HttpClient.openServer (HttpClient.java:569)
    at sun.net.www.http.HttpClient.<init> (HttpClient.java:242)
    at sun.net.www.http.HttpClient.New (HttpClient.java:341)
    at sun.net.www.http.HttpClient.New (HttpClient.java:362)
    at sun.net.www.protocol.http.HttpURLConnection.getNewHttpClient (HttpURLConnection.java:1253)
    at sun.net.www.protocol.http.HttpURLConnection.plainConnect0 (HttpURLConnection.java:1187)
    at sun.net.www.protocol.http.HttpURLConnection.plainConnect (HttpURLConnection.java:1081)
    at sun.net.www.protocol.http.HttpURLConnection.connect (HttpURLConnection.java:1015)
    at sun.net.www.protocol.http.HttpURLConnection.getInputStream0 (HttpURLConnection.java:1592)
    at sun.net.www.protocol.http.HttpURLConnection.getInputStream (HttpURLConnection.java:1520)
    at java.net.HttpURLConnection.getResponseCode (HttpURLConnection.java:527)
    at org.springdoc.maven.plugin.SpringDocMojo.execute (SpringDocMojo.java:43)
    at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo (DefaultBuildPluginManager.java:137)
    at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:210)
    at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:156)
    at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:148)
    at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:117)
    at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:81)
    at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:56)
    at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:128)
    at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:305)
    at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:192)
    at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:105)
    at org.apache.maven.cli.MavenCli.execute (MavenCli.java:957)
    at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:289)
    at org.apache.maven.cli.MavenCli.main (MavenCli.java:193)
    at jdk.internal.reflect.NativeMethodAccessorImpl.invoke0 (Native Method)
    at jdk.internal.reflect.NativeMethodAccessorImpl.invoke (NativeMethodAccessorImpl.java:62)
    at jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke (DelegatingMethodAccessorImpl.java:43)
    at java.lang.reflect.Method.invoke (Method.java:566)
    at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:282)
    at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:225)
    at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:406)
    at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:347)
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  57.290 s
[INFO] Finished at: 2021-03-02T16:01:50+02:00
[INFO] ------------------------------------------------------------------------
```

## choice-values-service attempt 1

```xml
<!-- OPENAPI 3.O WIP START -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-ui</artifactId>
            <version>1.5.4</version>
        </dependency>
<!--        <dependency>-->
<!--            <groupId>org.springdoc</groupId>-->
<!--            <artifactId>springdoc-openapi-webmvc-core</artifactId>-->
<!--            <version>1.5.4</version>-->
<!--        </dependency>-->
<!--        <dependency>-->
<!--            <groupId>org.apache.cxf</groupId>-->
<!--            <artifactId>cxf-spring-boot-starter-jaxrs</artifactId>-->
<!--            <version>3.2.4</version>-->
<!--        </dependency>-->
<!--        <dependency>-->
<!--            <groupId>org.apache.cxf</groupId>-->
<!--            <artifactId>cxf-rt-rs-service-description-openapi-v3</artifactId>-->
<!--            <version>3.2.4</version>-->
<!--        </dependency>-->
<!--        <dependency>-->
<!--            <groupId>org.webjars</groupId>-->
<!--            <artifactId>swagger-ui</artifactId>-->
<!--            <version>3.13.6</version>-->
<!--        </dependency>-->
<!-- OPENAPI 3.O WIP END -->
```

- WIP, currently generates only:

```yml
openapi: 3.0.1
info:
  title: OpenAPI definition
  version: v0
servers:
- url: http://localhost:8240
  description: Generated server url
paths: {}
components: {}
```

## choice-values-service attempt 2

- POM file

```xml
            <!-- OPENAPI 3.O WIP START -->
<!--            <plugin>-->
<!--                <groupId>org.springframework.cloud</groupId>-->
<!--                <artifactId>spring-cloud-contract-maven-plugin</artifactId>-->
<!--                <version>2.1.2.RELEASE</version>-->
<!--                <extensions>true</extensions>-->
<!--                <configuration>-->
<!--                    <packageWithBaseClasses>com.example.fraud</packageWithBaseClasses>-->
<!--                </configuration>-->
<!--                <dependencies>-->
<!--                    &lt;!&ndash;needed to include oa3 converter&ndash;&gt;-->
<!--                    <dependency>-->
<!--                        <groupId>guru.springframework</groupId>-->
<!--                        <artifactId>spring-cloud-contract-oa3</artifactId>-->
<!--                        <version>2.0.1</version>-->
<!--                    </dependency>-->
<!--                </dependencies>-->
<!--            </plugin>-->
            <!-- OPENAPI 3.O WIP END -->

<!-- OPENAPI 3.O WIP START -->
        <dependency>
            <groupId>com.atlassian.oai</groupId>
            <artifactId>swagger-request-validator-core</artifactId>
            <version>2.15.1</version>
<!--            <version>${swagger-request-validator.version}</version>-->
        </dependency>
<!--        <dependency>-->
<!--            <groupId>org.springframework.cloud</groupId>-->
<!--            <artifactId>spring-cloud-starter-contract-verifier</artifactId>-->
<!--            <scope>test</scope>-->
<!--        </dependency>-->
<!--        <dependency>-->
<!--            <groupId>org.springdoc</groupId>-->
<!--            <artifactId>springdoc-openapi-ui</artifactId>-->
<!--            <version>1.5.4</version>-->
<!--        </dependency>-->
<!--        <dependency>-->
<!--            <groupId>org.springdoc</groupId>-->
<!--            <artifactId>springdoc-openapi-webmvc-core</artifactId>-->
<!--            <version>1.5.4</version>-->
<!--        </dependency>-->
<!--        <dependency>-->
<!--            <groupId>org.apache.cxf</groupId>-->
<!--            <artifactId>cxf-spring-boot-starter-jaxrs</artifactId>-->
<!--            <version>3.2.4</version>-->
<!--        </dependency>-->
<!--        <dependency>-->
<!--            <groupId>org.apache.cxf</groupId>-->
<!--            <artifactId>cxf-rt-rs-service-description-openapi-v3</artifactId>-->
<!--            <version>3.2.4</version>-->
<!--        </dependency>-->
<!--        <dependency>-->
<!--            <groupId>org.webjars</groupId>-->
<!--            <artifactId>swagger-ui</artifactId>-->
<!--            <version>3.13.6</version>-->
<!--        </dependency>-->
<!-- OPENAPI 3.O WIP END -->
```

- Hand-written spec

```yml
openapi: 3.0.1
info:
  title: OpenAPI definition
  version: v0
servers:
  - url: http://localhost:8240
    description: Generated server url
paths:
  /choiceValues:
    get:
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ChoiceValues'
components:
  schemas:
    ChoiceValues:
      type: object
      properties:
        name:
          type: string
        authorities:
          type: object
        values:
          type: array
```

## Looking into help from Docker

- swagger-all-in-one-docker-container
  <https://github.com/elevennines-inc/swagger-all-in-one-docker-compose>

## Validation

### WIP

- Comparing spec files?
- Some kind of JSON schema?
- Some kind of Wiremock or other server?
- Spring Cloud Contracts?

## SOLUTION

- <https://bitbucket.org/atlassian/swagger-request-validator/src/master/>

- <https://bitbucket.org/atlassian/swagger-request-validator/src/master/swagger-request-validator-restassured/>

- <https://docs.pact.io/>

- <https://stackoverflow.com/questions/44305059/how-can-i-use-swaggervalidatorcom-atlassian-oai-validator-to-validate-lagom-ap>

- <https://stackoverflow.com/questions/34817307/how-to-validate-api-in-tests-with-swagger>

## References

### Most relevant

<https://bitbucket.org/atlassian/swagger-request-validator/src/master/>

<https://bitbucket.org/atlassian/swagger-request-validator/src/master/swagger-request-validator-restassured/>

<https://bitbucket.org/atlassian/swagger-mock-validator/src/master/>

<https://www.atlassian.com/blog/technology/spec-first-api-development>

<https://docs.pact.io/faq/convinceme/#:~:text=OpenAPIs%20and%20Pact%20are%20designed,and%20structure%20of%20an%20API.&text=Pact%20on%20the%20other%20hand,framework%20using%20specification%20by%20example>.

<https://stackoverflow.com/questions/44305059/how-can-i-use-swaggervalidatorcom-atlassian-oai-validator-to-validate-lagom-ap>

<https://stackoverflow.com/questions/34817307/how-to-validate-api-in-tests-with-swagger>

<https://www.baeldung.com/spring-rest-openapi-documentation>

<https://github.com/springdoc/springdoc-openapi-maven-plugin/issues/6>

<https://stackoverflow.com/questions/59616165/what-is-the-function-of-springdoc-openapi-maven-plugin-configuration-apidocsurl>

<https://github.com/springdoc/springdoc-openapi-maven-plugin>

<https://springframework.guru/using-swagger-request-validator-to-validate-spring-cloud-contracts/>

<https://springframework.guru/defining-spring-cloud-contracts-in-open-api/>

<https://springframework.guru/using-spring-cloud-contract-for-consumer-driven-contracts/>

<https://openapi.tools/#description-validators>

<https://www.openapi4j.org/schema-validator.html>

<https://github.com/swagger-api/swagger-codegen/wiki/Server-stub-generator-HOWTO>

<https://github.com/pact-foundation/pact-jvm>

<http://localhost:8240/v3/api-docs>

<http://localhost:8240/api/choiceValues>

<http://localhost:8081/>

<https://swagger.io/docs/specification/describing-responses/>

<https://stackoverflow.com/questions/6876266/java-net-connectexception-connection-refused>

<https://github.com/elevennines-inc/swagger-all-in-one-docker-compose>

### More relevant

<https://www.baeldung.com/spring-rest-openapi-documentation>

<https://github.com/springdoc/springdoc-openapi-maven-plugin/issues/6>

<https://stackoverflow.com/questions/59616165/what-is-the-function-of-springdoc-openapi-maven-plugin-configuration-apidocsurl>

<https://github.com/springdoc/springdoc-openapi-maven-plugin>

<https://github.com/swagger-api/swagger-codegen/wiki/Server-stub-generator-HOWTO>

<https://docs.pact.io/faq/convinceme/#:~:text=OpenAPIs%20and%20Pact%20are%20designed,and%20structure%20of%20an%20API.&text=Pact%20on%20the%20other%20hand,framework%20using%20specification%20by%20example>.

<http://localhost:8240/v3/api-docs>

<http://127.0.0.1:8082/openapi.json>

<https://github.com/springframeworkguru/spring-cloud-contract-oa3#spring-cloud-contract-open-api-30-contract-converter>

<https://bitbucket.org/atlassian/swagger-request-validator/src/master/>

<https://bitbucket.org/atlassian/swagger-request-validator/src/master/swagger-request-validator-restassured/>

<https://www.atlassian.com/blog/technology/spec-first-api-development>

<https://javadoc.io/doc/com.atlassian.oai/swagger-request-validator-core/latest/index.html>

<https://docs.pact.io/>

<https://stackoverflow.com/questions/44305059/how-can-i-use-swaggervalidatorcom-atlassian-oai-validator-to-validate-lagom-ap>

<https://stackoverflow.com/questions/34817307/how-to-validate-api-in-tests-with-swagger>

<https://github.com/swagger-api/swagger-codegen#to-build-a-server-stub>

<https://github.com/swagger-api/swagger-codegen/wiki/Server-stub-generator-HOWTO>

<https://github.com/pact-foundation/pact-jvm>

<https://github.com/pact-foundation/pact-jvm/tree/master/consumer/java8>

<https://github.com/pact-foundation/pact-jvm/tree/master/consumer/junit5>

<https://github.com/DiUS/pact-workshop-jvm>

<https://cloud.spring.io/spring-cloud-static/spring-cloud-contract/2.1.0.RELEASE/single/spring-cloud-contract.html#maven-project>

<https://springframework.guru/using-swagger-request-validator-to-validate-spring-cloud-contracts/>

<https://github.com/springframeworkguru/sccoa3-fraud-example/tree/master/oa3-http-server>

<https://springframework.guru/defining-spring-cloud-contracts-in-open-api/>

<https://springframework.guru/using-spring-cloud-contract-for-consumer-driven-contracts/>

<https://github.com/springframeworkguru/spring-cloud-contract-oa3#spring-cloud-contract-open-api-30-contract-converter>

<https://bitbucket.org/atlassian/swagger-request-validator/src/master/>

<https://dzone.com/articles/moving-with-the-times-towards-openapi-v300-adoptio>

<https://www.baeldung.com/spring-rest-openapi-documentation>

<https://openapi.tools/#description-validators>

<https://www.openapi4j.org/schema-validator.html>

<https://docs.pact.io/faq/convinceme>

<https://bitbucket.org/atlassian/swagger-mock-validator/src/master/>

<https://stackoverflow.com/questions/55938207/how-to-generate-openapi-3-0-spec-from-existing-spring-boot-app>

<https://openapi-generator.tech/docs/generators/spring/>

<https://blog.qaware.de/posts/openapi-for-spring-generator/>

<https://github.com/qaware/openapi-generator-for-spring>

<https://stackoverflow.com/questions/60216133/how-to-validate-openapi-3-0-0-yaml-spec>

<https://www.google.com/search?q=generate+json+schema+from+java+class&rlz=1C5GCEM_enBG937BG937&oq=generate+json+schem&aqs=chrome.2.0j69i57j0j0i20i263l2j0l3.9838j0j4&sourceid=chrome&ie=UTF-8>

<https://stackoverflow.com/questions/26199716/generate-json-schema-from-java-class>

<https://www.google.com/search?q=generate+json+schema+from+openapi&rlz=1C5GCEM_enBG937BG937&oq=generate+json+schema+from+op&aqs=chrome.1.69i57j0j0i22i30.8678j0j7&sourceid=chrome&ie=UTF-8>

<https://stackoverflow.com/questions/24118243/how-to-generate-json-schema-from-swagger-api-declaration>

<http://localhost:8240/v3/api-docs>

<http://localhost:8240/v3/api-docs>

<https://app.swaggerhub.com/home>

<http://localhost/>

### Initial research

<https://swagger.io/specification/>

<https://reflectoring.io/spring-boot-openapi/>

<https://github.com/springdoc/springdoc-openapi>

<https://springdoc.org/>

<https://www.baeldung.com/spring-rest-openapi-documentation>

<https://github.com/OpenAPITools/openapi-generator>

<https://github.com/OpenAPITools/openapi-generator/blob/master/docs/customization.md>

<https://github.com/OpenAPITools/openapi-generator>

<https://openapi-generator.tech/docs/usage/>

<https://openapi-generator.tech/docs/usage>

<https://openapi-generator.tech/docs/generators/spring>

<https://openapi-generator.tech/docs/generators/java/>

<https://quarkus.io/guides/openapi-swaggerui>

<https://www.mokkapps.de/blog/how-to-generate-angular-and-spring-code-from-open-api-specification/>

<https://bartko-mat.medium.com/openapi-generator-to-spring-boot-with-custom-java-validations-623381df9215>

<https://github.com/openapi4j/openapi4j>

<https://swagger.io/tools/swagger-inspector/>

<https://github.com/RobWin/assertj-swagger>

<http://localhost:8240/v3/api-docs>
