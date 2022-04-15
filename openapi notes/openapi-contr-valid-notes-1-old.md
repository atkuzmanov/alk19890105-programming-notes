# Openapi 3.0 Notes

---

## Presentation pitch

### Title: WIP

- Spec-first API development for speed and sanity

- Contract-first API development for speed and sanity

- Contract-first API Validation

- Contract-first API Auto Validation & Generation

- Remote/Pandemic Client Contract-first API Auto Validation & Generation

- Pandemic Remoting Client Contract-first API Auto Validation & Generation

- Get slapped across the hands automatically when breaking contracts
  - a.k.a Pandemic Remoting Client Contract-first API Auto Validation & Generation

- Break a contract?! => Get automatically hand slapped!
  - a.k.a Pandemic Remoting Client Contract-first API Auto Validation & Generation

- Break a contract?! => Get hand slapped!
  - a.k.a Contract-first API-first Auto Validation

- Break a contract?! => Get hand slapped!
  - a.k.a Contract-first and API-first dev with Auto Validation

- Break a contract?! => Get hand slapped!
  - a.k.a Contract-first and API-first dev with Auto Validation

- Breach a contract?! => Get hand slapped!
  - a.k.a Contract-first and API-first dev with Auto Validation

- API-first! Make Contract-first development great again!
  - a.k.a API-first and Contract-first dev with Auto Validation

- API-first! Contract-first! Make backend development great again!
  - a.k.a API-first and Contract-first development with Automatic Agnostic Fail-fast Validation

- API-first! Contract-first! Make backend development great again!
  - a.k.a API-first and Contract-first development with Automatic, Fail-fast, API Contract Validation

---

### Selling points

- Contract-First and API-First development done right, which means putting your clients and developers first!

- Automatic API contract Validation!
  - As early as during development, testing or CI/CD pipeline

- Cross platform and Language Agnostic

- Generation of Client code and stubs

- Ease and simplification of communication at all levels by means of common document in YAML or JSON which everyone can understand
  - A document which is a common ground for communication and development of both client and sever code

- Speed up development, prototyping, R&D

- Reduce costs

- Automatically generate code stubs in a plethora of languages for your clients or for prototyping

---

### Pitch

### - _**API-first! Contract-first! Make backend development great again!**_

#### - a.k.a API-first and Contract-first development with Automatic, Fail-fast, API Contract Validation

- Putting your developers, clients and client's developers first!

- Automatic, Fail-fast, API Contract Validation!

- OpenAPI is Cross-Platform and Language Agnostic!

- Generate clients, servers, and documentation from OpenAPI specs in a plethora of languages!

- Simplify communication by means of a common document in YAML or JSON!

- Speed up development, prototyping, R&D, etc.!

- Reduce costs!

In the current situation of increased remote working, having an common, easier to understand medium of communication such as an OpenAPI spec document is indispensable.
When dis OpenAPI document can also help you:

using contract tests in conjunction with (or as a replacement for) traditional end-to-end integration tests will be cheaper in the long run.

---

### Pitch 2

### _**API-first! Contract-first! Make backend development great again!**_

#### **a.k.a API-first and Contract-first development with Automatic, Agnostic, Fail-fast, API Contract Validation**

In the current situation of increased remote working, having an common, easier to understand medium of communication such as an OpenAPI spec document is indispensable.

Things get exciting when this so-called document can serve as a contract, generate clients, servers, documentation, help you build APIs and validate them!

When this OpenAPI document can also:

- Put your developers, clients and client's developers first!

- Have Automatic, Fail-fast, API Contract Validation!

- Be Cross-Platform and Language Agnostic!

- Generate clients, servers, and documentation from OpenAPI specs in a plethora of languages!

- Simplify communication by means of a common document in YAML or JSON!

- Speed up development, prototyping, R&D, etc.!

- Reduce costs! Using contract tests in conjunction with (or as a replacement for) traditional end-to-end integration tests will be cheaper in the long run.

... things get even more interesting... Come at our talk and find out more!

---

### **• What is Contract-First Development?**

Contract-First Development is about making your intent clear across team members and external teams. By using a tool like OpenAPI, we can define our programming API clearly at the outset. We also update the "contract" before we implement changes to the code.

Contract-Driven Development is a new approach to systematic software construction combining ideas from Design by Contract, from Test-Driven Development, from work on formal methods, and from advances in automatic testing.

### _**• What is API first?**_

API-first development is a strategy in which the first order of business is to develop an api that puts your target developer’s (clients) interests first and then build the product on top of it (be it a website, mobile application, or saas software).

### _**• What is OpenAPI?**_

The OpenAPI Specification (OAS) defines a standard, language-agnostic interface to RESTful APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.

An OpenAPI definition can then be used by documentation generation tools to display the API, code generation tools to generate servers and clients in various programming languages, testing tools, and many other use cases.

### **• Convince me**

The main thing that any organisation cares about when it comes to software development is cost.

When building a product, your time is probably the biggest cost to an organisation. One of the other significant costs is compute resources (eg. cloud provider, private data centre). While there will be initial overhead in learning how to use contract tests and integrating them into your build pipeline, using contract tests in conjunction with (or as a replacement for) traditional end-to-end integration tests will be cheaper in the long run, for several reasons.

- Contract tests save development time by:
  - providing very fast feedback to developers and testers, and fast feedback loops speed up software delivery.
  - clearly identifying where the problem is when they fail
  - enabling test failures to be debugged locally on a developer's machine rather than having to rely on system logs.
  - reducing the amount of time spent on test failures caused by environmental issues rather than integration bugs
- Contract tests save compute time and resources by:
  - reducing the number of, or even eliminating, tests that need to run in a deployed environment
  - executing faster than the integration tests they replace
- Consumer driven contract tests save development time by:
  - ensuring that only the parts of the API that will actually be used get developed

Try keeping track of how long your team currently spends on:

- Building and maintaining your test environments
- Writing and executing integration tests
- Debugging integration tests failures
- Fixing flakey integration tests

Wouldn't it be a better use of your time working on fast, reliable tests that allowed you to respond to change quickly, rather than slowing you down?

### _**• What is this contract testing thing?**_

When compared to E2E testing approaches, contract testing enables you to create consistent curves in your pipeline speed and complexity that look more like the below chart, whilst maintaining many of the safety guarantees of E2E test approaches:

![contract-tests-vs-e2e-tests](contract-tests-vs-e2e-tests.svg)

### _**• An implementation-first approach to API development is all well and good… but might spec-first be even better?**_

Over the years this has meant building a number of greenfield REST APIs for both internal and external consumption.

Historically, our API design has been largely implementation-driven. Recently though, we have moved to spec-first API design and have seen some great benefits including reduced development times, tighter feedback loops, and better API design overall.

---

## References

> References:

<https://swagger.io/>

<https://swagger.io/specification/>

<https://swagger.io/resources/articles/adopting-an-api-first-approach/>

<https://openapi-generator.tech/>

<https://docs.pact.io/faq/convinceme/>

<https://pactflow.io/blog/why-contract-testing/?utm_source=ossdocs&utm_campaign=convince_me_what_is>

<https://www.atlassian.com/blog/technology/spec-first-api-development>

<https://springframework.guru/defining-spring-cloud-contracts-in-open-api/>

<https://springframework.guru/using-swagger-request-validator-to-validate-spring-cloud-contracts/>

<https://springframework.guru/using-spring-cloud-contract-for-consumer-driven-contracts/>

<https://openpracticelibrary.com/practice/contract-first-development/>

<https://link.springer.com/chapter/10.1007/978-3-540-71289-3_2>

<https://dzone.com/articles/an-api-first-development-approach-1>

---

### toc - agenda - structure

- Pitch

- Use case

- What is Contract-First Development?

- What is API first?

- What is OpenAPI?

- What is this contract testing thing?

- Convince me

- Convince me

  - An implementation-first approach to API development is all well and good… but might spec-first be even better

- Demo

---

### toc - agenda - structure 2

- Pitch

- Use case

- What is Contract-First Development?

- What is API first?

- What is OpenAPI?

- What is this contract testing thing?

- Convince me

- Convince me

- Demo

---

---
---
---

API-first!

Contract-first!

Make backend development great again!

a.k.a API-first and Contract-first development with Automatic, Agnostic, Fail-fast, API Contract Validation

In the current situation of increased remote working, having a common, easier to understand medium of communication such as an OpenAPI spec document is indispensable.

Things get exciting when this so-called document can serve as a contract, generate clients, servers, documentation, help you build APIs and validate them!

When this OpenAPI document can also:

- Put your developers, clients and client's developers first!
- Have Automatic, Fail-fast, API Contract Validation!
- Be Cross-Platform and Language Agnostic!
- Generate clients, servers, and documentation from OpenAPI specs in a plethora of languages!
- Simplify communication by means of a common document in YAML or JSON!
- Speed up development, prototyping, R&D, etc.!
- Reduce costs! Using contract tests in conjunction with (or as a replacement for) traditional end-to-end integration tests will be cheaper in the long run.

... things get even more interesting... Come at our talk and find out more!

---

API-FIRST!
CONTRACT-FIRST!
MAKE BACKEND DEVELOPMENT GREAT AGAIN!

For the very first time - AUTOMATIC OpenAPI ENDPOINT VALIDATION!

These so-called OpenAPI documents can help you AUTOMATICALLY VALIDATE YOUR APIs and also serve as a contract, generate clients, servers, documentation, and much more...

---

tags:

java, openapi, openapigenerator, JSON, YAML, API, api-first development, contract-first development, automatic validation, testing, build pipelines, ci/cd, continuous-integration, continuous-development, javascript

---

description:

API-first! Contract-first! Make backend and frontend development great again!

API-first! Contract-first! Make API development great again!

Java API Development / Java Backend & JavaScript Frontend API validation

# API-first! Contract-first! Make backend development great again!

## a.k.a API-first and Contract-first development with Automatic, Agnostic, Fail-fast, API Contract Validation

*In the current situation of increased remote working, having a common, easier to understand medium of communication such as an OpenAPI spec document is indispensable.*

**Things get exciting when this so-called OpenAPI spec document can help you build APIs and AUTOMATICALLY VALIDATE YOUR APIs! An OpenAPI spec document can also serve as a contract, generate clients, servers, documentation, and much more...**

When this OpenAPI document can also:

- Put your developers, clients and client's developers first!
- Have Automatic, Fail-fast, API Contract Validation!
- Be Cross-Platform and Language Agnostic!
- Generate clients, servers, and documentation from OpenAPI specs in a plethora of languages!
- Simplify communication by means of a common document in YAML or JSON!
- Speed up development, prototyping, R&D, etc.!
- Reduce costs! Using contract tests in conjunction with (or as a replacement for) traditional end-to-end integration tests will be cheaper in the long run.

*... things get even more interesting in the demo...*

**Come at our talk and find out more!**

---

I have previously participated in the BBC:Develop conference as a speaker on the topic of a project I led, relating to the BBC Breaking News feature, but I guess the talks are no longer available.
https://twitter.com/developbbc?lang=en

---

*Upon joining the company I was given a task which my colleagues have tried to solve 4 years ago, but have not succeeded due to the existing limitations and lack of information at the time.*
*Now 4 years later things have not moved much forward in terms of limitations or lack of information, however I was able to solve the task, implement a working prototype (proof of concept) and then apply it to one of our services, with more to come in the future.*
*I believe we are one of the first companies in the world using OpenAPI spec in this innovative way in practice and that sharing this with the world will be very useful for all teams, developers, tech leads, product owners, clients and everyone in the industry. I think once people see the benefits of it, they will gradually start adopting and implementing it in their teams and development processes and build pipelines.*

*Because of the above and because I am a developer with over 10 years of experience, having lived for 10 years in the United Kingdom, having worked at the BBC, where I have developed good communication and presentation skills, as well as fluent english, I believe I am the best person to present this topic, its usecases, benefits and practical applications with a live demo included as part of the presentation as well.*

Technical requirements:

- Java
- SpringBoot
- OpenAPI spec
- OpenAPI generator
- Swagger
- JavaScript (The OpenAPI generator can generate clients, servers, stubs in plethora of languages including JavaScript, GoLang and others...)

---

**Hi, my name is Atanas, nice to meet you!**

*I am a passionate software engineer with over 10 years of experience.*\
*Studied and graduated at the University of Essex.*\
*Lived for 10 years in the United Kingdom, 5 of which I have worked for the BBC.*\
*Have successfully led large-scale projects involving cross-domain collaboration over high performance critical applications with clients worldwide.*\
*My capabilities and passion for technology constantly lead me on an interesting path with new and interesting discoveries.*

*Other interests include: Music, Travelling, Hot Wheels model cars and more...*

*Please feel free to check out some of my social networks:*


- https://github.com/atkuzmanov
- https://www.linkedin.com/in/atkuzmanov/
- https://twitter.com/atkuzmanov
- https://linktr.ee/atkuzmanov
- https://atkuzmanov.wordpress.com/

---

[jprime 2021]

https://jprime.io/

---

[openfest 2021]

https://www.openfest.org/2020/bg/

https://cfp.openfest.org/

---

[HackConf 2021 CPF]

https://www.papercall.io/cfps/3532/submissions/new

https://hackconf.bg/#about

---

[java2days 2021 CPF]

https://2021.java2days.com/

https://docs.google.com/forms/u/0/d/e/1FAIpQLSdOd6rDr1j1mb0tSauOQ93cfsDlh9OjtQD_QludvT0cOFGaBw/formResponse

https://docs.google.com/forms/u/0/d/e/1FAIpQLSeQAP1t7NFsEWR6rqVJR4lGupMqYD65_dOobm1XEdTPKRXvQg/formResponse?edit2=2_ABaOnufWvPuID9GVMhOjx9zvq_DTV7z9zexXUmmWD6lamjumszcfmVlufukgAGD3BMWiFn4

-

https://bg.it.schwarz/schwarz-it-bulgaria

https://github.com/atkuzmanov
https://avatars.githubusercontent.com/u/55227621?v=4

https://www.linkedin.com/in/atkuzmanov/

https://twitter.com/atkuzmanov

https://atkuzmanov.wordpress.com/

---

[CodeMonsters 2021 CPF]

https://docs.google.com/forms/d/e/1FAIpQLSf_ty0djfp2sq0QS3Uq8XJ8l6QJNDj7aAICUcvcOVd6W3FeqQ/viewform?c=0&w=1

https://docs.google.com/forms/u/0/d/e/1FAIpQLSf_ty0djfp2sq0QS3Uq8XJ8l6QJNDj7aAICUcvcOVd6W3FeqQ/formResponse

---

Name:
Atanas Kuzmanov

Current work position:
Senior Software Engineer

Short bio:
A passionate software engineer with over 10 years of experience.
Studied and graduated at the University of Essex.
Lived for 10 years in the United Kingdom, 5 of which spent working for the BBC.
Has successfully led large-scale projects involving cross-domain collaboration over high performance critical applications with clients worldwide.
Constantly lead on a path of exciting challenges by an everlasting passion for technology.
Other interests include: Music, Travelling, Model cars, and more...

Preferred social media channels:
- https://www.linkedin.com/in/atkuzmanov/
- https://github.com/atkuzmanov
- https://atkuzmanov.wordpress.com/
- https://twitter.com/atkuzmanov
- https://linktr.ee/atkuzmanov

Talk title:
"API-First!
Contract-First!
Make API development great again!"

---
---
---
