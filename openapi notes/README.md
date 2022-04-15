# Open API notes 1

---
---
---

_Example part of pom.xml for generating OpenAPI yaml/json API spec on Maven compilation phase:_

```xml
    <build>
        <plugins>
            <plugin>
                <groupId>com.github.kongchen</groupId>
                <artifactId>swagger-maven-plugin</artifactId>
                <version>3.1.8</version>
                <executions>
                    <execution>
                        <phase>compile</phase>
                        <goals>
                            <goal>generate</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <apiSources>
                        <apiSource>
                            <springmvc>false</springmvc>
                            <locations>com.example.api</locations>
                            <schemes>http,https</schemes>
                            <basePath>/api</basePath>
                            <info>
                                <title>Property Directory</title>
                                <version>v1</version>
                            </info>
                            <swaggerDirectory>${project.basedir}/target/generated-sources/src/main/resources/static</swaggerDirectory>
                            <swaggerFileName>${project.artifactId}-swagger</swaggerFileName>
                            <outputFormats>json</outputFormats>
                        </apiSource>
                    </apiSources>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>javax.xml.bind</groupId>
                        <artifactId>jaxb-api</artifactId>
                        <version>2.3.1</version>
                    </dependency>
                </dependencies>
            </plugin>
            <plugin>
                <artifactId>maven-resources-plugin</artifactId>
                <version>3.0.2</version>
                <executions>
                    <execution>
                        <id>copy-resources</id>
                        <phase>process-classes</phase>
                        <goals>
                            <goal>copy-resources</goal>
                        </goals>
                        <configuration>
                            <outputDirectory>${project.build.outputDirectory}</outputDirectory>
                            <resources>
                                <resource>
                                    <directory>${project.basedir}/target/generated-sources/src/main/resources
                                    </directory>
                                    <filtering>false</filtering>
                                </resource>
                            </resources>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

    <dependencies>
        <dependency>
            <groupId>javax.ws.rs</groupId>
            <artifactId>javax.ws.rs-api</artifactId>
            <version>2.1</version>
        </dependency>
        <dependency>
            <groupId>io.swagger</groupId>
            <artifactId>swagger-annotations</artifactId>
            <version>1.5.15</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>
```

---

---

---

----
----
----
