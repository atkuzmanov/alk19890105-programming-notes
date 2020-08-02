# Java notes

|||java avoid null checks in java
|||avoid null checks in java
|||null checks in java

<http://winterbe.com/posts/2015/03/15/avoid-null-checks-in-java/>

Found Optional in Java8 useful if you want to check if a variable will be null, but don’t want to surround it with an if else block. This way you don’t pollute the variable type with Optional, but even if it fails it won’t throw a null pointer. My use case for this is the fact that I want the variable to be put in a LOG message and in an exception and I don’t want some of the chained call to throw a null and cause a null pointer in the log or exception message:

```java
       String siteCode = Optional.ofNullable(this.asset.getSite().getCode())
                .orElse("[Something went wrong - siteCode is null.]");
```

---

|||time taken
|||java time taken

```java
long start = System.currentTimeMillis();
long timeTaken = System.currentTimeMillis() - start;
log.info(">>> TIME TAKEN: " + timeTaken);
```

---

|||java.net.UnknownHostException
|||java.net.unknownHostexception
|||unknownHostexception

```bash
scutil --get ComputerName

scutil --set HostName "localhost"
```

---

|||jvm metrics
|||metrics
|||java metrics
|||scala metrics
|||cloudwatch metrics
|||aws cloudwatch metrics
|||amazon aws

<https://github.com/dropwizard/metrics>

---

|||java books

- Core Java SE 9 For Impatient, Cay S. Horstmann

- Core Java Volume 1 and 2, Cay S. Horstmann

- Head First Java

- Effective Java, Third Edition by Joshua Bloch

- Core Java SE 9 For Impatient

- Spring in Action, 4th Edition by Craig Walls

- Clean Code: A Handbook of Agile Software Craftsmanship by Robert C. Martin

- Java Concurrency in Practice

- Java Performance From Binu John

- Modern Java in Action

- Thinking in Java by Bruce Eckel

- Java: The Complete Reference by Herbert Schildt

- Head First Design Patterns

- Java in a Nutshell: A Desktop Quick Reference 7th Edition

> References:

<https://www.java67.com/2018/02/3-books-to-learn-java-from-scratch-in.html>

<https://www.journaldev.com/6162/5-best-core-java-books-for-beginners>

<https://stackabuse.com/the-best-java-books-for-all-skill-levels/>

<https://dev.to/codegym_cc/18-best-java-books-for-beginners-in-2019-fme>

<https://www.quora.com/What-are-the-best-books-to-learn-Java>

<https://dzone.com/articles/10-all-time-great-books-for-java-programmers-best>

<https://www.freecodecamp.org/news/must-read-books-to-learn-java-programming-327a3768ea2f/>

<https://hackernoon.com/top-6-best-books-for-learning-java-programming-30b0af41c549>

---

|||java tutorials

<https://www.java67.com/2014/09/top-10-java-8-tutorials-best-of-lot.html>

<https://www.freecodecamp.org/news/these-are-the-best-free-courses-to-help-you-learn-java-8-and-java-9-a7615c8644ab/>

<https://winterbe.com/posts/2014/03/16/java-8-tutorial/>

---

## Java modules

||| java modules

> References:
>
> <http://tutorials.jenkov.com/java/modules.html>

---

|||java log and throw
|||java logandthrow
|||log and throw
|||logandthrow

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Example use:
 * logAndThrow(ExampleCurrentClassThrowingException.class, "error", "Example exception message.", exampleOriginaException);
 */
    public static void logAndThrow(Class<?> classThrowingException, String logLevel, String errorMessageOverride, Exception exceptionOverride) throws Exception {
        if(classThrowingException == null) {
            throw new InvalidArgumentException("Error, could not throw exception." +
                    " Class<?> classThrowingException is required for Utilities.logAndThrow(...) method.");
        }

        Logger localLogger = LoggerFactory.getLogger(classThrowingException);

        String errorMessage = "Error: Default error message.";
        if (!StringUtils.isBlank(errorMessageOverride)) errorMessage = errorMessageOverride;

        if (exceptionOverride != null) {
            switch (logLevel) {
                case "error": localLogger.error(errorMessage, exceptionOverride); break;
                case "warn": localLogger.warn(errorMessage, exceptionOverride); break;
                case "debug": localLogger.debug(errorMessage, exceptionOverride); break;
                default: localLogger.info(errorMessage, exceptionOverride);
            }
            throw exceptionOverride;
        } else {
            switch (logLevel) {
                case "error": localLogger.error(errorMessage); break;
                case "warn": localLogger.warn(errorMessage); break;
                case "debug": localLogger.debug(errorMessage); break;
                default: localLogger.info(errorMessage);
            }
            throw new RuntimeException(errorMessage);
        }
    }
```

---

|||ruby cucumber
|||java cucumber test
|||cucumber tests bundle
|||bash script bundle
|||bundle
|||bundler

<https://cucumber.io/>
<http://www.rubydoc.info/github/cucumber/cucumber-ruby/Cucumber/Formatter/Json>

`bundle exec cucumber --tags ~@wip --format json --out "cucumber-tests-output.json"`

<https://stackoverflow.com/questions/3914694/bundle-command-not-found>

`#!/usr/bin/env bash
bundle exec cucumber --tags ~@wip`

---

|||java cucumber test
|||gem lock file
|||ruby cucumber
|||cucumber
|||ruby gem
|||gemfile.lock
|||bundle
|||bundler

Bundler

<https://bundler.io/v1.3/rationale.html>

Understanding the Gemfile.lock file

<https://stackoverflow.com/questions/7517524/understanding-the-gemfile-lock-file>

```yaml
GEM
  remote: https://rubygems.org/
  specs:
    ruby-debug (0.10.4)
      columnize (>= 0.1)
      ruby-debug-base (~> 0.10.4.0)
    ruby-debug-base (0.10.4)
      linecache (>= 0.3)
    archive-tar-minitar (0.5.2)
    builder (3.2.2)
    columnize (0.9.0)
    cucumber (1.3.19)
      builder (>= 2.1.2)
      diff-lcs (>= 1.1.3)
      gherkin (~> 2.12)
      multi_json (>= 1.7.5, < 2.0)
      multi_test (>= 0.1.2)
    diff-lcs (1.2.5)
    erubis (2.7.0)
    gherkin (2.12.2)
      multi_json (~> 1.3)
    json (1.8.1)
    linecache (0.46)
      rbx-require-relative (> 0.0.4)
    mime-types (1.25)
    multi_json (1.11.0)
    multi_test (0.1.2)
    open4 (1.3.4)
    rake (10.1.1)
    rbx-require-relative (0.0.9)
    rdoc (4.2.0)
      json (~> 1.4)
    relish (0.7)
      archive-tar-minitar (>= 0.5.2)
      json (>= 1.4.6)
      rest-client (>= 1.6.1)
    rest-client (1.6.8)
      mime-types (~> 1.16)
      rdoc (>= 2.4.2)
    rspec (3.2.0)
      rspec-core (~> 3.2.0)
      rspec-expectations (~> 3.2.0)
      rspec-mocks (~> 3.2.0)
    rspec-core (3.2.3)
      rspec-support (~> 3.2.0)
    rspec-expectations (3.2.1)
      diff-lcs (>= 1.2.0, < 2.0)
      rspec-support (~> 3.2.0)
    rspec-mocks (3.2.1)
      diff-lcs (>= 1.2.0, < 2.0)
      rspec-support (~> 3.2.0)
    rspec-support (3.2.2)

PLATFORMS
  ruby

DEPENDENCIES
  cucumber (= 1.3.19)
  erubis
  json (= 1.8.1)
  mime-types (= 1.25)
  open4 (~> 1.3.0)
  rake (= 10.1.1)
  relish
  rest-client (= 1.6.8)
  rspec
  ruby-debug

BUNDLED WITH
   1.11.2
```

---

|||java cucumber test
|||gemfile

```ruby
source 'https://rubygems.org'

gem "cucumber", "=1.3.19"
gem "rest-client", "=1.6.8"
gem 'json', "=1.8.1"
gem "mime-types", "=1.25"
gem "open4", "~> 1.3.0"
gem "relish"
gem "erubis"
gem "ruby-debug"
gem "rake", "=10.1.1"
gem "rspec"
```

```bash
junit: --format pretty --format junit --out /path/to/some/dir/target/cucumber-reports/ --format html --out /path/to/some/dir/target/cucumber-reports/html/report.html
ci:    -t ~@wip
```

---

|||java cucumber test
|||ruby cucumber steps step definition
|||ruby example cucumber steps

```ruby
Given /^example step which takes one argument "([^"]*)"$/ do |parameter1|
  if parameter1.end_with?'.erb'
    exampleTemplate = ERB.new load_fixture(parameter1)
    @xml = exampleTemplate.result(binding)
  else
    @xml = load_fixture(parameter1)
  end
end


Given(/^default sleep step$/) do
  #STDOUT.puts "Sleeping for #$sleep_duration"
  sleep $sleep_duration
end


Given /^example step for setting up response "([^"]*)" as "([^"]*)"$/ do |default-path, content_type|
  begin
    @response = put(default-path, @xml, content_type)
    sleep 0.5 #pause
  rescue => e
    if !e.respond_to?('response')
      throw e
    end
    @response = e.response
  end
end


When /^example step with request default-path "([^"]*)" and headers "([^"]*)" "([^"]*)"$/ do |default-path, accept, headers|
  begin
    headers += ",Cache-Control=no-cache"
    header_map = create_default_header_map_from_string(headers)
    @response = get_with_custom_header(default-path, accept, header_map)
  rescue => e
    if !e.respond_to?('response')
      throw e
    end
    @response = e.response
  end
end


Then /^example step for checking location header from response "([^"]*)"$/ do |default-pathToTest|
  @response.headers[:location].should == host() + default-pathToTest
end


Then /^example step for checking cache_control headers "([^"]*)" of "([^"]*)"$/ do |cache_control_key, cache_control_value|
  cache_control_headers_array = @response.headers[:cache_control].split(",")
  default_max_age_array = cache_control_headers_array[1].split("=")

  default_max_age_array[0].should == cache_control_key
  default_max_age_array[1].should == cache_control_value
end


Then /^example step definition that takes two arguments and compares them to JSON http response "([^"]*)" "([^"]*)"$/ do |parameter1, parameter2|
  jsonResult = JSON.parse(@response.body)
  jsonResult['results'][0]['parameter1'].should == parameter1
  jsonResult['results'][0]['parameter2'].should == parameter2
end

Then /^example comparing xml to response body$/ do
  compare_xml_files(@xml, @response)
end

Then /^example step for comparing http response code to (\d+)$/ do |response_code_parameter|
  @response.code.to_s.should == response_code_parameter
end


Then /^example step comparing vary headers "([^"]*)"$/ do |varyByHeader|
  @response.headers[:vary].should == varyByHeader
end


Then /^example step checking response for containing content "([^"]*)"$/ do |content|
  @response.should include(content)
end


Then /^example step to compare example JSON and a partial snippet "([^"]*)"$/ do |defaultFileName|
  body = @response.body.gsub(/some\.[a-z]+\.escaped\.uri\.url\.default\.example\.com/, "some.example.uri.url.default.example.com")
  body = body.gsub(/some\.example\.file\.default-path\/[a-z]+\/file/, "some.example.file.default-path/optionalChangingValue/file")
  JSON.parse(body).should == JSON.parse(default_load_expected_result(defaultFileName))
  default_contains_example_snippet(body, default_load_expected_result(defaultFileName)).should == true
end


Then /^example step to compare example XML and a partial snippet "([^"]*)"$/ do |defaultFileName|
  body = @response.body.gsub(/some\.[a-z]+\.escaped\.uri\.url\.default\.example\.com/, "some.example.uri.url.default.example.com")
  body = body.gsub(/some\.example\.file\.default-path\/[a-z]+\/file/, "some.example.file.default-path/optionalChangingValue/file")
  compare_xml_files(default_load_expected_result(defaultFileName), body)
  default_contains_example_snippet(body, default_load_expected_result(defaultFileName)).should == true
end


Then /^example step for comparing json structure to url from reposnse body "([^"]*)"$/ do |default_url|
  default_response_contains_url(@response.body, default_url).should == true
end


Then /^example checking last modified header "([^"]*)"$/ do |lastModifiedValue|
  @response.headers[:last_modified].should == lastModifiedValue
end


def default_contains_example_snippet(fullResponse, snippetResponse)
    defaultNormalisedFullString = fullResponse.gsub(/\s+/, "")
    defaultNormalisedSnippetString = snippetResponse.gsub(/\s+/, "")
    defaultNormalisedFullString.include? defaultNormalisedSnippetString
end


def create_default_header_map_from_string(default_header_string)
  header_statements = default_header_string.split(",")
  keys = header_statements.map{|statement| statement.split("=")[0]}
  values = header_statements.map{|statement| statement.split("=")[1]}
  Hash[*keys.zip(values).flatten]
end


def default_response_contains_url(response_body, default_url)
  JSON.parse(@response.body)['json_element'].each{|nested_json_element|
   if (nested_json_element['url'] == default_url) then
     return true
    end
  }
  false
end


  def compare_xml_files(fileA, fileB)
    differences = ''
 status = Open4::popen4("diff #{fileA} #{fileB}") do |pid, stdin, stdout, stderr|
  differences = stdout.read
    end

   if status != 0
  fail ("Found differences between expected (left) and actual (right) XML:\n" + differences)
 end

  end
```

---

|||java cucumber test
|||cucumber example xml fixture
|||cucumber fixture
|||fixture.xml.erb
|||cucumber erb
|||erb

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xmlNode xsi:schemaLocation="http://www.some.example.namespace.com/default defaultSchema.xsd" uri="http://www.example.com/default/2ueoiwejofuaufu089wu0eu09wjior08ur08" version="0.1" xmlns="http://www.some.example.namespace.com/default" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
</xmlNode>
```

|||java cucumber test
|||ruby rest client
|||cucumber rest client
|||cucumber ruby rest client api

```ruby
module NameOfExampleCucumberRestApi

  def delete(default-path)
    example_ruby_cucumber_rest_client($default_base_url + default-path).delete
  end

  # silently ignore exceptions
  def silent_delete(example_guid)
    begin
      delete(example_guid)
    rescue
    end
  end

  def default_rest_put(default-path, data, content_type)
    example_ruby_cucumber_rest_client($default_base_url+default-path).put(data, {:content_type => content_type})
  end

  def default_rest_get(default-path, accept)
    example_ruby_cucumber_rest_client($default_base_url+default-path).get({:accept => accept})
  end

  def default_rest_get_with_header(default-path, accept, header_map)
    default_header_map[:accept] = accept
    example_ruby_cucumber_rest_client($default_base_url+default-path).get(default_header_map)
  end

  def host()
    $default_base_url
  end

  def default_base_url=(example_url)
    $default_base_url = example_url
  end
  module_function :default_base_url=

  def example_ruby_cucumber_rest_client example_url
    # Ruby's RestClient logging
    RestClient.log = 'stdout'

    if !$default_base_url.include? 'haveToUseProxy' then
      RestClient.proxy = ENV['http_proxy']
      RestClient::Resource.new(
        example_url,
        :ssl_client_cert  =>  OpenSSL::X509::Certificate.new(File.read("/etc/pki/tls/private/exampleCertificate.pem")),
        :ssl_client_key   =>  OpenSSL::PKey::RSA.new(File.read("/etc/pki/tls/private/exampleKey.pem"))
      )
    else
      RestClient::Resource.new(example_url)
    end
  end

end

World(NameOfExampleCucumberRestApi)
```

---

|||java cucumber test
|||cucumber ruby require

```ruby
# setup Bundler to use local gems
require "rubygems"
require 'ruby-debug'

class WebratWorld
  include RSpec::Matchers
end

World do
  WebratWorld.new
end

# Require modules for tests
require 'open4'
require 'erb'
require 'rspec'
require 'rest-client'
```

---

|||cucumber ruby hoooks
|||cucumber hooks
|||java cucumber test

```ruby
After('@exampleCucumberTag') do |s|
 start = Time.now
 end = Time.now
 #STDOUT.puts "Time to finish processing @exampleCucumberTag: #{seconds_time_difference(start, end)}s"
end


def seconds_time_difference(start, end)
 (end - start).round
end

# Force quit cucumber if a test fails
After do |s|
 if s.failed?
  STDOUT.puts "Forcing Cucumber to quit as a test scenario failed: " + s.name
  Cucumber.wants_to_quit = true
 end
end
```

---

|||cucumber ruby
|||ruby write file
|||ruby write xml
|||ruby write w3c xml
|||java cucumber test

```ruby
  def check_if_directory_exists_and_create_it_if_not(defaultFilename)
   FileUtils.mkdir_p(defaultFilename) unless File.exists?(defaultFilename)
  end

  def write_using_W3C_XML_Canonicalisation(xmlStringToCanonicalise, defaultFilename)
   errors = ''
   # Process using W3C XML Canonicalisation (--c14n) and then formatting (--format)
   defaultCommand = "xmllint --c14n - | xmllint --format - > #{defaultFilename}"
 status = Open4::popen4(defaultCommand) do |pid, stdin, stdout, stderr|
  stdin.write xmlStringToCanonicalise
  stdin.close
  errors = stderr.read
    end
 if status != 0
  fail ("Failed to run xmllint (writing to #{defaultFilename}) due to:\n#{errors}")
 end
  end

  def write_to_file(stringToWrite, defaultFilename)
 someDirectory = "default-path/to/some/dir"
 check_if_directory_exists_and_create_it_if_not(someDirectory)
 filename = defaultFilename.gsub(/[^A-Za-z0-9]+/, "-")
 File.open(someDirectory+ filename, 'w') { |actualFile| actualFile.write(stringToWrite) }
  end
```

---

|||instanceof
|||java instanceof

```java
Object exampleObj = new Object();

boolean exampleInstanceOf = exampleObj instanceof Object;
```

---

|||java load xml from file
|||java xml
|||xml from file

```java
import org.apache.commons.io.IOUtils;

// ClassLoader classLoader = getClass().getClassLoader();
String loadXmlFromFile = IOUtils.toString(ClassLoader.class.getResourceAsStream("/example/path/to/someXMLFile.xml"), "UTF-8");
```

---

|||java unit test assert exception is thrown
|||java junit test
|||junit test

<https://stackoverflow.com/questions/156503/how-do-you-assert-that-a-certain-exception-is-thrown-in-junit-4-tests>

```java
How can I use JUnit4 idiomatically to test that some code throws an exception?

While I can certainly do something like this:

@Test
public void testFooThrowsIndexOutOfBoundsException() {
  boolean thrown = false;

  try {
    foo.doStuff();
  } catch (IndexOutOfBoundsException e) {
    thrown = true;
  }

  assertTrue(thrown);
}


I recall that there is an annotation or an Assert.xyz or something that is far less kludgy and far more in-the-spirit of JUnit for these sorts of situations.


java exception junit junit4 assert


shareeditflag
edited Nov 15 '13 at 20:28

rgettman
125k15146234
asked Oct 1 '08 at 6:56

SCdF
```

```java
JUnit 4 has support for this:

@Test(expected=IndexOutOfBoundsException.class)
public void testIndexOutOfBoundsException() {
    ArrayList emptyList = new ArrayList();
    Object o = emptyList.get(0);
}
shareeditflag
answered Oct 1 '08 at 7:12

skaffman
```

---

|||test exception

```java
in junit, there are three ways to test exception.

use the optional 'expected' attribute of Test annonation
@Test(expected = IndexOutOfBoundsException.class)
public void testFooThrowsIndexOutOfBoundsException() {
    foo.doStuff();
}
use the ExpectedException rule
public class XxxTest {
    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Test
    public void testFooThrowsIndexOutOfBoundsException() {
        thrown.expect(IndexOutOfBoundsException.class)
        //you can test the exception message like
        thrown.expectMessage("expected messages");
        foo.doStuff();
    }
}
finally, you also can use the classic try/catch way widely used under junit 3 framework
@Test
public void testFooThrowsIndexOutOfBoundsException() {
    try {
        foo.doStuff();
        fail("expected exception was not occured.");
    } catch(IndexOutOfBoundsException e) {
        //if execution reaches here,
        //it indicates this exception was occured.
        //so we need not handle it.
    }
}
so
the 1st way used when you only want test the type of exception
the 2nd and 3rd way used when you want test exception message further
if you use junit 3, then the 3rd one is preferred.
for more info, you can read this document for details.
shareeditflag
answered Aug 5 '15 at 8:05

walsh
```

---

|||java junit test
|||junit test
|||junit spring
|||spring junit

```java
import static org.junit.Assert.*;
import org.junit.Test;
import org.junit.Before;

import org.apache.commons.io.IOUtils;

public class ExampleJunitTestClass {

    @Before
    public void setUp() throws Exception {
        String loadXmlFromFile = IOUtils.toString(ClassLoader.class.getResourceAsStream("/example/path/to/someXMLFile.xml"), "UTF-8");
    }

 @Test
 public void exampleTest1() throws Exception {
  int exampleInt1 = 1;
  String exampleString1 = "Example 1";
  
  assertEquals(1, exampleInt1);
  assertNotNull(exampleString1);
  assertNull(null);
 }
}
```

---

|||assert

```java
import static org.junit.Assert.*;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;

import org.junit.Test;
import org.junit.Before;
import org.junit.runner.RunWith;

import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "/example/path/to/applicationContext-ForTests.xml" })
public class ExampleJunitTestClass2 {

 @Autowired
 private Object someAutowiredObjInstance = new Object()

 @Test
 public void exampleTest1() throws Exception {
  int exampleInt1 = 1;
  String exampleString1 = "Example 1";
  
  assertEquals(1, exampleInt1);
  assertNotNull(exampleString1);
  assertNull(null);
  assertFalse(false);
  assertTrue(true);
  assertSame(1,1);
  assertEquals(someAutowiredObjInstance.getClass(), Object.class);
 }
}
```

---

|||mockito
|||java mockito
|||java mock
|||java test mock
|||java test mockito

```java
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.Assert.*;
import org.junit.Test;
import org.junit.Before;

public class ExampleJunitTestClass3 {

 @Mock
 private Object someMockedObj = new Object();
}
```

---

```java
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

public class ExampleTestClass {

 @BeforeClass
 public static void initialise() {
 }

 @AfterClass
 public static void tearDown() {
  SomeStaticClass.reset();
 }
}
```

---

|||junit assert fail
|||fail

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.junit.Test;

import static org.junit.Assert.fail;

public class ExampleTestClass {

 private static final Logger LOG = LoggerFactory.getLogger(ExampleTestClass.class);

 @Test
 public void exampleTest1() throws Exception {
  try {
   // some code
   fail("Should have thrown an IllegalArgumentException");
  } catch (Exception e) {
   LOG.error("Error: " + e.getMessage(), e);
  }
 }

 @Test
 public void exampleTest2() throws Exception {
  try {
   // Some processing...
  } catch(DocumentException ex) {
   fail("Some failure message.");
  }
 }

 @Test
 public void exampleTest3() throws Exception {
     try {
     // Some processing that should throw an exception...

  fail("An exception was supposed to be thrown.");
  } catch (IllegalArgumentException ex) {
   assertTrue("Incorrect argument supplied", ex.toString().contains("Incorrect argument supplied"));
  }  catch (Exception ex) {
   fail("The expected exception was not thrown, or a wrong exception was thrown.");
     }
    }
}
```

---

|||java junit test
|||argumentcaptor
|||assertThat
|||assert

```java
import static org.mockito.Matchers.notNull;
import static org.mockito.Matchers.isNotNull;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.ArgumentCaptor;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.*;
import static org.junit.matchers.JUnitMatchers.containsString;

import org.junit.runner.RunWith;
import org.junit.Test;
import org.junit.Before;

import static org.hamcrest.core.IsNull.nullValue;
import static org.hamcrest.core.IsNot.not;
import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsInstanceOf.instanceOf;

@RunWith(MockitoJUnitRunner.class)
public class ExampleTestClass1 {

 private Object someObject = new Object();

 @Test
 public void exampleTest() throws Exception {
  
  assertThat(1, is(1));

  assertThat("some string value", is("some string value"));

  assertThat(null, is(not(nullValue())));
  
  assertThat(someObject, instanceOf(Object.class));
 }


 @Test
 public void exampleUnitTestUsingVerifyAndArgumentCaptor() throws Exception {
  // This mock can be outside of this unit test.
  @Mock
  private SomeExampleContentObject someExampleContentObject;

  // ArgumentCaptor for object of type Object.class
  ArgumentCaptor<Object> argument = ArgumentCaptor.forClass(Object.class);

  // Invoke some processing which is expected to call someExampleContentObject.setSomeExampleObject(Object obj) with
  // a certain instance of Object.class with populated fields with certain values.
  // ... some processing.

  // setSomeExampleObject(Object obj) takes an object of type Object.class
  // Verify that setSomeExampleObject() has been called as a method of an instance of SomeExampleContentObject.class
  // and capture the parameter it has been called with, in this case an instance of Object.class, with populated fields with certain values.
  verify(someExampleContentObject).setSomeExampleObject(argument.capture());

  // If setSomeExampleObject() was taking two arguments, the first being the one we are interested in
  // and the second, one which we want to be of specific value, we can use eq()
  // verify(someExampleContentObject).setSomeExampleObject(argument.capture(), eq("specific value"));

  // getValue() returns the instance of type Object.class which has been captured when setSomeExampleObject() has been called during processing above.
  Object someObject2 = argument.getValue();

  // Assert and verify that the parameter (argument), in our case instance of Object.class, has it's fields populated with the expected values.
  assertEquals("Value of some example object field.", someObject2.getSomeExampleObjectFieldValue());
 }
}
```

---

|||java junit test injectmocks
|||injectmocks
|||initmocks
|||spring junit test

```java
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

import org.mockito.MockitoAnnotations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertTrue;

// import org.mockito.runners.MockitoJUnitRunner;
// @RunWith(MockitoJUnitRunner.class)

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class ExampleUnitTestClass2 {
 
 @InjectMocks
 Object someExampleMockObject1;

 @Autowired
 @InjectMocks
 Object someExampleMockObject2;

 @Mock
 Object someExampleMockObject3;
 
 @Before
 public void setUp() throws Exception {
  MockitoAnnotations.initMocks(this);
 }

 @Test
    public void some_featureflag_should_be_on_after_initialisation() {
     when(someExampleMockObject3.isItTrue()).thenReturn(true);
        assertTrue(someExampleMockObject3.isItTrue());
    }
}
```

---

|||java junit test
|||unit test verify
|||mockito
|||verify

```java
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.Assert.*;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.mockito.atLeast;

public class ExampleUnitTestClass3 {

 @Mock
 private SomeObject1 someObject1;

 @Test
 public void testAssetParserHelperIsCalledToParseItemMeta() throws Exception {
  Object expectedObject = new Object();

  // Do some processing that will call someObject1.someMethod1() with some object instance, which we expect to be of the type of Object.class.

  verify(someObject1).someMethod1(any(Object.class), eq(expectedObject));


  verify(someObject1, atLeast(3)).someMethod2(any(String.class));
 }

 // Another way of using mock:
 Object someMockObject2 = mock(Object.class);
}

public class SomeObject1 {
 public void someMethod1(Object obj){
  System.out.println(obj.toString());
 }
}
```

---

|||mockito matchers isA
|||isA
|||isa

```java
import static org.mockito.Mockito.*;

public class ExampleUnitTestClass4 {

 @Mock
 private SomeObject2 someObject2;

 @Test
 public void testAssetParserHelperIsCalledToParseItemMeta() throws Exception {
  Object exampleObject = new Object();

  when(someObject2.someMethod2(isA(Object.class), eq("String value a"), eq("String value b"))).thenReturn(true);

  assertTrue(someObject2.someMethod2(exampleObject, "String value a", "String value b"));
 }
}

public class SomeObject2 {
 public void someMethod2(Object obj, String a, String b){
  System.out.println(obj.toString() + a + b);
 }
}
```

---

|||mockito inorder
|||mockito verifyNoMoreInteractions
|||verify

```java
import static org.junit.Assert.*;

// import static org.mockito.Matchers.*;
// import static org.mockito.Mockito.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Matchers.isA;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;

import org.mockito.InOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class ExampleUnitTestClass5 {

 @Mock
 private ObjectProcessor objectProcessorMock;

 @Mock
 private Object someObjectMockForZeroInteractions;

 @Before
 public void initialiseMocks() throws Exception {
  MockitoAnnotations.initMocks(this);
  // Some other mock set up using when().thenReturn(); etc...
 }

 @Test
 public void someTestUsingMockitoInOrder() throws Exception {
  Object someObjectMock = mock(Object.class);
  when(objectProcessorMock.processObject(any(SomeClass.class), eq("Some string"), eq(1))).thenReturn(someObjectMock);

  // Start some processing which will invoke objectProcessorMock.processObject(...); at some point.

  // I think inOrder will verify the order in which the expected methods are called, to see if it's the same as the expected order we have written the verifys below.
  InOrder objectProcessorInOrder = inOrder(objectProcessorMock);
  
  //  times(...) is used to specify the number of times it is expected the method to be called.
  objectProcessorInOrder.verify(objectProcessorMock, times(5)).someObjectProcessingMethod1(any(SomeClass2.class));
  objectProcessorInOrder.verify(objectProcessorMock).someObjectProcessingMethod2(eq(2));
  objectProcessorInOrder.verify(objectProcessorMock).someObjectProcessingMethod3(any(SomeClass.class), eq("Some string 2."));

  verifyNoMoreInteractions(objectProcessorMock);
  verifyNoMoreInteractions(someObjectMock);

  verifyZeroInteractions(someObjectMockForZeroInteractions);
 }
}


//---


|||collections of certain type unit test assert empty list java
|||java collections test

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

public class ExampleUnitTestClass6 {

 List<Object> emptyListOfTypeObject = new ArrayList<Object>();

 @Test
 public void someUnitTest1() throws Exception {
  assertEquals(Collections.<Object>emptyList(), emptyListOfTypeObject);
 }

 Object object1 = new Object();
 Object object2 = new Object();
 List<Object> nonEmptyListOfTypeObject = new ArrayList<Object>();
}
```

---

|||easymock

```java
PublishableAsset referencedAsset = createMock(PublishableAsset.class);
expect(referencedAsset.assetId()).andReturn(1).anyTimes();
replay(referencedAsset);
assertTrue(circularTestValidator.isValid(referencedAsset, context));
```

---

|||java xml string escaping example

```java
    String javaXMLStringEscaping1xmlAsStringJava =
     "<foo uri=\"http://www.example.com/path\" xmlns=\"http://www.example.com/namespace\" >\n" +
             "  <bar>\n" +
             "   <xmlTagElementNode1 pathParameter=\"/foo/bar\"/>\n" +
             "   <xmlTagElementNode2>Some value.</xmlTagElementNode2>" +
             "  </bar>" +
             "</foo>";
```

---

|||jenv
|||java environment
|||java version
|||mac
|||macosx
|||mac java
|||mac jvm
|||mac java bash_profile

```java
jenv versions --bare | xargs -I {} jenv remove {}

    find /System/Library/Java/JavaVirtualMachines/** -depth 0 -print0 \
        | xargs -0 -I {} jenv add "{}/Contents/Home"
    find /Library/Java/JavaVirtualMachines/** -depth 0 -print0 \
        | xargs -0 -I {} jenv add "{}/Contents/Home"

    jenv rehash


|||andy stanton bash script jenv

https://andy.stanton.is/

### the old_jdks bit is because jdk 1.6 goes in a different folder to 1.7 and 1.8
old_jdks=$('ls' -d -1 /System/Library/Java/JavaVirtualMachines/**)
    new_jdks=$('ls' -d -1 /Library/Java/JavaVirtualMachines/**)

    jdks=(${old_jdks[@]} ${new_jdks[@]})

    jenv versions --bare | xargs -I {} jenv remove {}

    for jdk in ${jdks[@]}; do
      jdk_home_path=${jdk}/Contents/Home
      jenv add ${jdk_home_path}
    done

    jenv rehash
```

---

|||logback.xml
|||src/main/resources/logback.xml

```xml
<configuration>
    <!-- !!!DO NOT UNCOMMENT AND COMMIT!!!
    If you need console output, you can uncomment this while running the app on your local machine for dev and debug.
    This will make logs synchronous which impacts performance. We want logs to be asynchronous.

    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level [%thread] %logger{36} - %message%n%xException</pattern>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="STDOUT" />
    </root>
    -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>[PATH-TO-LOGS]/output.log</file>
        <encoder>
            <pattern>%date - [%level] - from %logger in %thread %n%message%n%xException%n</pattern>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
            <fileNamePattern>[PATH-TO-LOGS]/output.%i.log</fileNamePattern>
            <minIndex>1</minIndex>
            <maxIndex>3</maxIndex>
        </rollingPolicy>
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <maxFileSize>5MB</maxFileSize>
        </triggeringPolicy>
    </appender>

    <appender name="ASYNC" class="ch.qos.logback.classic.AsyncAppender">
        <queueSize>1000</queueSize>
        <appender-ref ref="FILE"/>
    </appender>

    <root level="WARN">
        <appender-ref ref="ASYNC"/>
    </root>

    <!-- Logger 'logger' below not tested. -->
    <logger level="DEBUG" name="default example logger name" additivity="false">
        <appender-ref ref="ASYNC"/>
    </logger>
</configuration>
```

---

|||cool join sublist iterator use
|||sublist

Cool join sublist iterator use

```java
public String postProcess(String output) throws Exception { try { StringReader stringReader = new
StringReader(noSSIsCopy.trim()); BufferedReader bufferedReader = new BufferedReader(stringReader);

			List<String> lines = new ArrayList<String>(); String line = null; while ((line =
			bufferedReader.readLine()) != null) { lines.add(line);
			}
			}
			int numLines = lines.size(); if (numLines < 3) { log.warn("Unable to parse JSONP for reformatting
			- leaving in current format. (It doesn't appear to have a JSONP header/footer on separate
			lines)"); return output;
			}
			}
			String jsonBody = StringUtils.join(lines.subList(1, numLines - 1).iterator(), '\n'); StringBuilder
			formattedJsonp = new StringBuilder(); formattedJsonp.append(lines.get(0)).append('\n'); //appends
			first ssi formattedJsonp.append(jsonFormatterPostProcessor.postProcess(jsonBody)).append('\n');
			formattedJsonp.append(lines.get(numLines - 1)).append('\n'); //appends last ssi

			return formattedJsonp.toString();
		} catch (Exception e) {
			log.warn("Unable to parse JSONP for reformatting - leaving in current format", e); return output;
		}
		}}
		}}
		}}
		}}
```

---

`|||TODO`

**List Interface in Java with Examples**

`Reference:`
https://www.geeksforgeeks.org/list-interface-java-examples/

The Java.util.List is a child interface of Collection. It is an ordered collection of objects in which duplicate values can be stored. Since List preserves the insertion order, it allows positional access and insertion of elements. List Interface is implemented by the classes of ArrayList, LinkedList, Vector and Stack.

===

**ArrayList in Java**

`Reference:`
https://www.geeksforgeeks.org/arraylist-in-java/

ArrayList in Java

ArrayList is a part of collection framework and is present in java.util package. It provides us dynamic arrays in Java. Though, it may be slower than standard arrays but can be helpful in programs where lots of manipulation in the array is needed.

- ArrayList inherits `AbstractList class` and implements `List interface`.

- ArrayList is initialized by a size, however the size can increase if collection grows or shrunk if objects are removed from the collection.

- Java ArrayList allows us to `randomly access` the list.

- ArrayList can not be used for `primitive types`, like `int`, `char`, etc. We need a wrapper class for such cases (see [this](https://www.geeksforgeeks.org/array-vs-arraylist-in-java/) for details).

- ArrayList in Java can be seen as similar to vector in C++.

- Allows `null`.

===

**Set in Java**

`Reference:`
https://www.geeksforgeeks.org/set-in-java/

- Set is an interface which extends Collection. It is an unordered collection of objects in which duplicate values cannot be stored.

- Basically, Set is implemented by HashSet, LinkedHashSet or TreeSet (sorted representation).

- Set has various methods to add, remove clear, size, etc to enhance the usage of this interface

===

**HashSet in Java**

`Reference:`
https://www.geeksforgeeks.org/hashset-in-java/

The HashSet class implements the Set interface, backed by a hash table which is actually a HashMap instance. No guarantee is made as to the iteration order of the set which means that the class does not guarantee the constant order of elements over time. This class permits the null element. The class also offers constant time performance for the basic operations like add, remove, contains and size assuming the hash function disperses the elements properly among the buckets, which we shall see further in the article.
Few important features of HashSet are:

- Implements Set Interface.

- Underlying data structure for HashSet is hashtable.

- As it implements the Set Interface, duplicate values are not allowed.

- Objects that you insert in HashSet are not guaranteed to be inserted in same order. 
- Objects are inserted based on their hash code.

- `NULL` elements are allowed in HashSet.

- HashSet also implements Searlizable and Cloneable interfaces.

---
