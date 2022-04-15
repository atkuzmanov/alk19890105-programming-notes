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

Make API development great again!

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

API-first! Contract-first! Make API development great again!

API Development / Backend and Frontend Development

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

Technical stack:

- Java
- SpringBoot
- OpenAPI Spec
- OpenAPI generator
- Swagger
- JavaScript
- TypeScript
- Angular
- MongoDB
- Docker

-

Technical requirements:

- Java
- SpringBoot
- OpenAPI Spec
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
[ISTAcon 2021]

https://istacon.org/

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
[hackconf2021]

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
[openfest2021]

API-First! Contract-First! Make API development great again!

Hi, my name is Atanas, nice to meet you!
I am a passionate software engineer with over 10 years of experience.
Studied and graduated at the University of Essex.
Lived for 10 years in the United Kingdom, 5 of which I have worked for the BBC.
Have successfully led large-scale projects involving cross-domain collaboration over high performance critical applications with clients worldwide.
My capabilities and passion for technology constantly lead me on an interesting path with new and interesting discoveries.

Other interests include: Music, Travelling, Hot Wheels model cars and more...

Please feel free to check out some of my social networks:
- https://www.linkedin.com/in/atkuzmanov/
- https://github.com/atkuzmanov
- https://twitter.com/atkuzmanov
- https://linktr.ee/atkuzmanov
- https://atkuzmanov.wordpress.com/

---
---
---
[twitter] [tweet]

--------------------------------

API-First! Contract-First! Make API development great again! 📜💻 🏗📈🚀
Things get exciting when а so-called API spec (OpenAPI) document can build, validate APIs, be a contract, generate clients, servers, docs, and much more... Come at our talk! #hackconf https://bit.ly/3hbxV7R

API-First! Contract-First! Make API development great again! 📜💻 🏗📈🚀
When а so-called API spec (OpenAPI) document can build, validate APIs, be a contract, generate clients, servers, docs, and much more... Come at our talk! #hackconf https://bit.ly/3hbxV7R

---
hashtags:

#hackconf #schwarzitbulgaria
#openapi #swagger #apis #apidevelopment #programming #coding #developers #coders #devs #programmers #devcommunity
#java #springboot #javascript #angular #typescript #development #share #like #backend #frontend #webdevelopment 

hashtags 2:

#hackconf #schwarzitbulgaria #schwarzit
#api #backend #frontend #fullstack #java #springboot #javascript #angular #typescript #development #dev
#programming #coding #developers #coders #devs #programmers #DEVCommunity

---

Original tweet:

https://twitter.com/HackConf_/status/1410875412096421888

---

My tweet:

https://twitter.com/atkuzmanov/status/1410903220768157702

https://twitter.com/atkuzmanov/status/1410903220768157702?s=20

---

images:

https://pbs.twimg.com/media/E5RvZHVX0AIpt4R?format=jpg&name=large

https://pbs.twimg.com/media/E5RvZHVX0AIpt4R?format=jpg&name=small

---

Facebook post:

API-First! Contract-First! Make API development great again!📜💻 🏗📈🚀
When а so-called API spec (OpenAPI) document can build, validate APIs, be a contract, generate clients, servers, docs, and much more... Come at our talk! #hackconf #schwarzitbulgaria
#programming #coding #developers #coders #devs #programmers #DEVCommunity
Please like and share the tweets and this post if you can! ( :
https://twitter.com/HackConf_/status/1410875412096421888
https://twitter.com/atkuzmanov/status/1410903220768157702

--- 

LinkedIn post:

API-First! Contract-First! Make API development great again!📜💻 🏗📈🚀

When а so-called API spec (OpenAPI) document can build, validate APIs, be a contract, generate clients, servers, docs, and much more... Come at our talk! #hackconf #schwarzitbulgaria



Please like and share the tweets and this post if you can!

https://lnkd.in/e42VBh5

https://lnkd.in/eqyRiD6 

#openapi #swagger #apis #apidevelopment #programming #coding #developers #coders #devs #programmers #devcommunity 

#java #springboot #javascript #angular #typescript #development #share #like #backend #frontend #webdevelopment


https://www.linkedin.com/posts/atkuzmanov_hackconf-on-twitter-activity-6816671881303793664-u7C0

--------------------------------

Hi Dude, 
Long time no hear.
How are you, how is the family?

Something good and positive I want to share with you, that I've been working on! :)

I will let you know when I have more details if/when/how you will be able to watch it. Right now I have a lot of work to do, to make it happen! :)

Feel free to share it with any of the folks back at BBC and CPS.
Also I lost everyone's details, if anybody from our mates at the Beeb and CPS wants to keep in touch please feel free to forward me their details or give mine to them. :)

https://twitter.com/HackConf_/status/1410875412096421888

--------------------------------
[hackconf-video-script]

Hi folks, my name is Atanas Kuzmanov and I am a software engineer at Schwarz IT.
Coming from real world experience from my career, in my presentation this year I would like to tell you and show you, how to make API development great again using API contracts.
We will talk about what is API First and Contract First development and why its so beneficial.
And most importantly we will tie this whole thing neatly in a knot in a live Demo, where I will show you contract validation and contract testing, and the tools you need to achieve that.
I will tell you about why having an OpenAPI spec document is indispensable when building your APIs.
And things will get even more exciting when this so-called document can:
- Serve as a contract
- Generate clients, servers, and documentation in a plethora of languages
- Put your developers and clients first
- Have Automatic, Fail-fast, API Validation
- Is Cross-Platform and Language Agnostic
- Is both human and machine readable in YAML or JSON
- Speeds up development and prototyping and reduces costs
If this sparks your interest, come at my talk and find out more!
I will see you there!

--------------------------------

Icebreaker questions:

1. Does it work with other libraries than RestAssured?
 - Yes, it works with SpringMVC, WireMock, MockMVC, spring-web-client.
2. Can you use it for real-time validation?
  - Yes, although you need to be careful. You can fine tune it with different levels of validation for example only requests or only responses or both.
3. Is it too late to use contract testing if we are not starting from scratch and the project is already built?
  - No, it's never too late, although you might loose some benefits, and it might be easier to only use it for testing and not feasible for realtime validation.
4. Do you know of any other contract validation tools?
  - Yes, Pact is one of them, although I have not personally used it: https://docs.pact.io/
  - Stoplight is another one: https://stoplight.io/

--------------------------------

Icebreaker questions:

1. Does it work with other libraries than RestAssured?
2. Can you use it for real-time validation?
3. Is it too late to use contract testing if we are not starting from scratch and the project is already built?
4. Do you know of any other contract validation tools?

--------------------------------

Добър вечер и от мен! Радвам се, че имам възможност да съм тук и да си поговорим за Позицията Java Developer. 
 
Аз съм Атанас Кузманов и съм tech lead в Шварц Ай Ти България.
 
Имам над 10-годишен опит като софтуерен инженер, повечето от който е преминал в Англия, а 5 от тези години работих за BBC. 
 
Успешно съм ръководил мащабни проекти, включващи кръстосано сътрудничество и високопроизводителни критични системи и приложения с клиенти по целия свят.
 
След 10 години прекарани в чужбина, реших да се завърна в България преди 3г, и това, което продължава да ме задържа тук и в момента, освен семейството и приятелите, са колегите ми в Schwarz IT Bulgaria, които са професионалисти и добри хора, както и самата компания.
 
Моята страст към технологиите непрекъснато ме води по интересен път на открития и приключения и в момента следвам този път в Schwarz IT Bulgaria вече от близо година..
 
Шварц Груп има близо половин млн. служители по целия свят и над 12 900 магазина в повече от 30 страни.
 
В момента сме близо 350 души в България, а наскоро получихме инвестиционен cepтификaт клac „A“ зa нашия проект зa paзшиpявaнe нa дeйнocттa на компанията тук. В резултат на тази инвестиция, планираме да разкрием още 100 нови paбoтни мecтa в Coфия, като част от тях вече са факт! 
 
Ние от Schwarz IT Bulgaria обичаме да казваме, че сме „дигиталното сърце на Шварц Груп“ , и сме най-голям ритейлър в Европа! Което не е малко.
 
Head office-ът на Групата Шварц е в Германия, като тя обединява познатите ни търговски вериги Lidl, Kaufland и заводите Schwarz Produktion. 
 
Но тъй, като ние сме отговорни не спираме само до там. Стремим се да обхванем целия  цикъл – от производство и продажби до рециклиране и за това направихме компанията Pre Zero част от нас, която се занимава с това.
Сега малко, за Schwarz IT България – ние обслужваме и предоставяме IT решения за четирите компании, и сме един от централните доставчици на IT услуги. Отговаряме за предоставянето на IT инфраструктура, платформи и бизнес приложения. 
Какви позиции има в нашата компания? 
Ние сме дигиталният център нашият бизнес.
Имаме разнообразни екипи с различен фокус! Например, Development team, работещ по различни проекти, от собствен клауд, до мобилни приложения, до електронни магазини. 
 
Ние сме Един от най-големите клиенти на SAP в световен аспект. В тази връзка си имаме и Central Application Support звено, където колегите осъществяват поддръжка на над 1000 SAP системи и модули. В AI екипа ни отговаряме за различни решения, свързани с Data Science, Data Engineering и Cloud технологии. 
 
Не на последно място е нашият Инфраструктурен екип – наричаме го „кръвоносната система“ на цялата Шварц група, който осъществява поддръжка на компанията за повече от 30 държави.
Всяко едно от звената ни се разраства и в тази връзка си търсим много нови колеги, сред които,  разбира се, и Java Engineers. 
Работим с up-to-date технологии.
 
Гордеем се с факта, че компанията ни предлага едни от най-добрите условия на работа – като заплащане, придобивки, работна среда – стабилност, сигурност, разнообразни и вълнуващи проекти, нови технологии, обмяна на опит с международни екипи и изключително добри възможности за развитие.
 
 Ще се радвам да си поговорим за възможностите, които компанията ни ви предлага – и да отговоря на въпросите, които ви вълнуват.
Те ще коментират пазара на кадри в Java областта и по-конкретни:

·      Как се променя броят на отворените позиции?
Това мисля, че го коментирах вече – отваряме 100 нови позиции.
Търсим все повече хора.
Профила се променя постоянно.
 
·      Какъв микс от знания, умения, опит и лични качества търсят фирмите?
Освен технически умения се държи много на емоционална интелигентност и комуникационни умения.
Tech
Java core classes
SpringBoot както и други frameworks, като Dropwizard, Quarkus
DB tech – SQL and NoSQL – MongoDB
Front end – JavaScript – Angular/React
Cloud – AWS, Azure, GoogleCloud, OpenShift,
Docker & Kubernetes
Shell
Other languages
Kotlin, Scala
DevOps
Linux
Testing
Monitoring
Personal
Responsibility (Отговорност)
Accountability (Отдаденост)
Emotional intelligence
Communication
 
·      Какво заплащане и възможности за развитие предлагат?
Нашите заплати са обявени, можете да ги разгледате.
Поле за изява и развитие има.
·      Какво е бъдещето на Java?
Ако разгледаме графиките на Гугъл Трендс, Джава е все още стабилна.
Джава все още е сила и се развива и адаптира към новостите.
 
·      Какви са бъдещите ИТ позиции, свързани с Java?
Джава фул бек енд, джава фул стак
Котлин
Скала
Джава + Пайтън
Ние търсим хора с мислене на софтуерни инжинери, за нас няма значение токлова технологията, която ползваме стига да постигнем крайният резултат. Tech agnostic сме.
 
·      Как компаниите привличат и мотивират кандидатите?
     
·      Какво е заплащането в чужбина сравнено с това в България?
На пръв поглед човек би си помислил, че заплащането в чужбина е значително по-високо от това в България, но когато се замислим, че и нивото на стандарт е по-високо гледната точка се променя. 
 

Обект на дискусията ще бъдат също:

·      Каква е ролята на soft skills уменията
·      Как преминава едно интервю за Java позиция? Примери и насоки.
Junior – string vs. stringbuilder
Mid – design patterns
Senior – GC
…         
·      Кой и как определя заплащането на одобрените кандидати?

--------------------------------

Ivelina Abadjieva <iva@innovationcenter.tech>

Nadia Todorova <nadia@innovationcenter.tech>

--------------------------------
[hackconf2021 video 1]

See you @ Hackconf2021! ( :
"API-First! Contract-First! Make API development great again!"📜💻 🏗📈🚀

#hackconf #schwarzitbulgaria #schwarzit
#api #backend #frontend #fullstack #java #springboot #javascript #angular #typescript #development #dev
#programming #coding #developers #coders #devs #programmers #DEVCommunity

Social media links:
https://twitter.com/HackConf_/status/1448615899745894402?s=20
https://www.linkedin.com/posts/hackconf_atanas-kuzmanov-api-first-contract-first-activity-6854382198246674432-dQxF
https://www.facebook.com/HackConference/videos/397132632049472


Personal social media links:
https://twitter.com/atkuzmanov/status/1448633648056524801?s=20
https://www.linkedin.com/posts/atkuzmanov_atanas-kuzmanov-api-first-contract-first-activity-6854399635801346048-auQz
https://www.facebook.com/watch/?v=397132632049472&ref=sharing
https://fb.watch/8DUuMEyjqL/
https://www.facebook.com/HackConference/videos/397132632049472

--------------------------------
[hackconf2021 photos and videos]

https://www.flickr.com/photos/hackconf/albums/72157720108927557/page1

https://www.youtube.com/channel/UClxooLdBT49Kp9_UC0l_7gQ

--------------------------------
[hackconf2021 videos and slides]

https://www.youtube.com/watch?v=yqrZMEraAJ8&list=PLmpSOHJJON0D0u7Cy_k68UqCgBWSKrieu&index=14

https://www.hackconf.bg/news/slides-photos-videos-hackconf-2021-online-edition/
https://drive.google.com/file/d/1CBQ8eO2yPjB3W8p-BtF7_3QZSnRITTe8/view


HackConf Facebook post:

Didn't get a chance to catch all the sessions at HackConf 2021 Online edition? Worry not! 🙌
- Videos from the talks: https://www.youtube.com/playlist?list=PLmpSOHJJON0D0u7Cy_k68UqCgBWSKrieu
- Slides: https://www.hackconf.bg/news/slides-photos-videos-hackconf-2021-online-edition/
Check them out and enjoy!


Social media links:
https://twitter.com/HackConf_/status/1458405455223533569
https://www.linkedin.com/posts/hackconf_didnt-get-a-chance-to-catch-all-the-sessions-activity-6864170954583506944-ZFrS
https://www.facebook.com/HackConference/posts/3639014929716886

---

- Video of my talk: https://www.youtube.com/watch?v=yqrZMEraAJ8&list=PLmpSOHJJON0D0u7Cy_k68UqCgBWSKrieu&index=16
- Slides from my talk: https://drive.google.com/file/d/1CBQ8eO2yPjB3W8p-BtF7_3QZSnRITTe8/view
- Videos of the other talks: https://www.youtube.com/playlist?list=PLmpSOHJJON0D0u7Cy_k68UqCgBWSKrieu
- Slides from the other talks: https://www.hackconf.bg/news/slides-photos-videos-hackconf-2021-online-edition/

- Video: shorturl.at/sOPX6
- Videos from the talks: shorturl.at/rEMW7
- Slides: shorturl.at/behrH

---
[my-links]

Personal social media links:
https://twitter.com/atkuzmanov/status/1458443030399176706
https://www.linkedin.com/posts/atkuzmanov_didnt-get-a-chance-to-catch-all-the-sessions-activity-6864215381284831233-rn0q
https://www.linkedin.com/feed/update/urn:li:activity:6864215381284831233/
https://www.facebook.com/atkuzmanov/posts/4703583576352406
https://www.instagram.com/p/CWGY1JHKN-LzAOKCrwjiccAshsGf-6MPGjQsxU0/


"API-First! Contract-First! Make API development great again!"📜💻 🏗
Didn't get a chance to catch my session at HackConf 2021 Online edition? Worry not!
- Video: shorturl.at/sOPX6
- Videos from the talks: shorturl.at/rEMW7
- Slides: shorturl.at/behrH
Check them out and enjoy!

#hackconf #schwarzitbulgaria #schwarzit
#api #backend #frontend #fullstack #java #springboot #javascript #angular #typescript #development #dev
#programming #coding #developers #coders #devs #programmers #DEVCommunity

---

"API-First! Contract-First! Make API development great again!"📜💻 🏗
🎬🍿✨VIDEO and SLIDES are out! 🎬🍿✨
- Video of my talk: https://www.youtube.com/watch?v=yqrZMEraAJ8&list=PLmpSOHJJON0D0u7Cy_k68UqCgBWSKrieu&index=16
- Slides from my talk: https://drive.google.com/file/d/1CBQ8eO2yPjB3W8p-BtF7_3QZSnRITTe8/view
- Videos of the other talks: https://www.youtube.com/playlist?list=PLmpSOHJJON0D0u7Cy_k68UqCgBWSKrieu
- Slides from the other talks: https://www.hackconf.bg/news/slides-photos-videos-hackconf-2021-online-edition/
Check them out and enjoy!

Twitter: https://twitter.com/atkuzmanov/status/1458443030399176706
LinkedIn: https://www.linkedin.com/posts/atkuzmanov_didnt-get-a-chance-to-catch-all-the-sessions-activity-6864215381284831233-rn0q

#hackconf #schwarzitbulgaria #schwarzit
#api #backend #frontend #fullstack #java #springboot #javascript #angular #typescript #development #dev
#programming #coding #developers #coders #devs #programmers #DEVCommunity

--------------------------------

Ето видео от конференцията:
https://www.youtube.com/watch?v=yqrZMEraAJ8&list=PLmpSOHJJON0D0u7Cy_k68UqCgBWSKrieu&index=15

И снимки от събитието:
https://www.flickr.com/photos/hackconf/51648932581/in/album-72157720108927557/

--------------------------------

Hi Dude,
Long time no hear.
How are you, how is the family?
I hope you and everyone else is healthy and well?

Something good and positive I want to share with you, that I've been working on! :)

The video and slides from the conference I mentioned to you previously are out:

- Video of my talk: https://www.youtube.com/watch?v=yqrZMEraAJ8&list=PLmpSOHJJON0D0u7Cy_k68UqCgBWSKrieu&index=16
- Slides from my talk: https://drive.google.com/file/d/1CBQ8eO2yPjB3W8p-BtF7_3QZSnRITTe8/view
- Videos of the other talks: https://www.youtube.com/playlist?list=PLmpSOHJJON0D0u7Cy_k68UqCgBWSKrieu
- Slides from the other talks: https://www.hackconf.bg/news/slides-photos-videos-hackconf-2021-online-edition/

Also here are some photos from the event. :D

https://www.flickr.com/photos/hackconf/51648932581/in/album-72157720108927557/

Feel free to share it with any of the folks back at BBC and CPS.
Also I lost everyone's details, if anybody from our mates at the Beeb and CPS wants to keep in touch please feel free to forward me their details or give mine to them:

- https://www.linkedin.com/in/atkuzmanov/
- https://twitter.com/atkuzmanov
- https://linktr.ee/atkuzmanov
- Email: atkuzmanov@gmail.com

--------------------------------
[video-demo-links-youtube]
[youtube-videos]
[youtube-demo-videos]
[youtube-links]

YouTube demo videos links

Part 1:
https://www.youtube.com/watch?v=KGgqdpDWh0I
https://youtu.be/KGgqdpDWh0I

API-first! Contract-first! Make API development great again!

OpenAPI Contract Testing and Validation Demo Part 1

0:00 OpenAPI spec
1:10 Generate back-end from OpenAPI spec
2:00 Compile back-end
2:45 Run back-end
3:00 Generated API in browser
3:28 Developing back-end and front-end in parallel
4:35 Create a new empty Angular project
5:39 Generate front-end from OpenAPI spec
7:30 Switching to same projects with added "glue" code
8:30 Start a Docker container with MongoDB
8:50 Compile front-end
10:32 Try out the back-end with a test pet
10:52 Check the database
11:11 Run front-end

Part 2:
https://www.youtube.com/watch?v=0AvPftcZvWY
https://youtu.be/0AvPftcZvWY

API-first! Contract-first! Make API development great again!

OpenAPI Contract Testing and Validation Demo Part 2

0:00 Access the front-end
0:08 View test pet from the back-end in the front-end
0:26 Innovation - introduction 
0:47 Innovation - back-end api contract validation tests
2:56 Innovation - make back-end api validation test fail because of code
3:48 Innovation - make back-end api validation test fail because of OpenAPI spec document
6:50 Innovation - enforcing contracts
7:20 Innovation - front-end api contract validation tests
8:45 Innovation - make front-end api validation test fail because of code
9:08 Innovation - make front-end api validation test fail because of OpenAPI spec document
10:00 Angular test
10:38 Summary
12:30 Thank you

--------------------------------
[presentation-quotes]

“API-first! Contract-first! Make API development great again!”

“API contracts first! API testing first! Make great API development!”

“API contracts first! Test your API contracts! Make great API development!”

---

I would like to leave you with some lyrics from the song "Everything Counts" by Depeche Mode:

"The handshake seals the contract
From the contract there’s no turning back
...
The holiday was fun-packed
The contract, still intact
..."

So, people, please keep your API contracts intact!

References:
https://www.depechemode.de/lyrics/everything-counts-2/
https://www.youtube.com/watch?v=1t-gK-9EIq4
https://en.wikipedia.org/wiki/Everything_Counts

--------------------------------
[istacon]

Come to the excellent FREE ISTAcon2021 and find out how to do:

"API-First! Contract-First! Make API development great again!"📜💻 🏗📈🚀

When а so-called OpenAPI spec document can generate, test and APIs, be a contract, generate clients, servers, docs, and much more... Come at my talk!

https://istacon.org/

#istacon2021 #ista2021 #istacon
#api #openapi #swagger #backend #frontend #fullstack #java #springboot #javascript #angular #typescript #devs

#dev #devs #development #programming #coding #developers #coders #programmers #DEVCommunity

---
ISTAcon2021 is ✨FREE✨, come and find out how to:

"API-First! Contract-First! Make API development great again!"📜💻 🏗🚀

See you on 18-Nov-2021!

https://istacon.org/

#istacon #istacon2021 #ista2021 #conference
#api #openapi #swagger #backend #frontend #fullstack #java #springboot #javascript #angular #devs #dev #development #programming #coding #developers #coders #programmers #DEVCommunity

---

ISTAcon2021 is ✨FREE✨, come and find out how to:
"API-First! Contract-First! Make API development great again!"📜💻 🏗🚀
https://istacon.org/
#istacon #istacon2021 #ista2021 #conference
#api #openapi #swagger #backend #frontend #fullstack #java #springboot #javascript #angular #devs

---

Social media links:
https://twitter.com/ISTA_Conference/status/1453969414609539076
https://www.facebook.com/ISTAConference/posts/4603769396347226
https://www.linkedin.com/posts/ista-conference_istacon2021-activity-6859734527728721920-XbTG



Personal social media links:
https://twitter.com/atkuzmanov/status/1454078122182291472
https://www.facebook.com/ISTAConference/posts/4603769396347226
https://www.linkedin.com/posts/atkuzmanov_istacon2021-activity-6859845398723403776-sOuT
https://www.instagram.com/p/CVnVosRKY5o3kbzeIL6NIyQ5-7yGrW5V2N5QL80/

--------------------------------
[istacon-videos]

https://www.youtube.com/watch?v=t_mjnH-vOaQ

---

Start:
https://youtu.be/fotjvAfnjGE?t=7531

End:
https://youtu.be/fotjvAfnjGE?t=8905

--------------------------------

"API-First! Contract-First! Make API development great again!"📜💻 🏗
🎬🍿✨VIDEO is out! 🎬🍿✨
- Video of my talk: https://www.youtube.com/watch?v=t_mjnH-vOaQ
Check it out and enjoy!

Twitter: 
LinkedIn: 

#istacon #schwarzitbulgaria #schwarzit
#api #backend #frontend #fullstack #java #springboot #javascript #angular #typescript #development #dev
#programming #coding #developers #coders #devs #programmers #DEVCommunity

--------------------------------
[java2days-2022]

"API-First! Contract-First! Make API development great again!"💻 🏗🚀

See you at my talk! ( :

https://2022.java2days.com/register/


#java2days #virtual #event #live #developers
#api #openapi #swagger #backend #frontend #fullstack #java #springboot #javascript #angular #devs

---

Social media links:
https://www.linkedin.com/posts/java2days_atanas-kuzmanov-from-schwarz-it-bulgaria-activity-6905605391812505600-XEee

Schwarz IT Bulgaria social media links:
https://www.linkedin.com/posts/schwarz-it-bulgaria_are-you-ready-for-the-java2days-which-activity-6906496558938804224-85IA

Personal social media links:


---
---
---

--------------------------------
--------------------------------
--------------------------------


