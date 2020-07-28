# Presentation/Presentations notes

|||presentations
|||presentation technologies

<https://slides.com/>

---
|||presentations
|||Hype Driven Development

<https://blog.daftcode.pl/hype-driven-development-3469fc2e9b22#.kl6u92o04>

---

|||presentations
|||acceptance tests infrastructure

The codebase is a bit like a collection of external services. It does not do any transformation to the data before it sends it to one of the external services. We also have no verification of the data we send out, so an acceptance test would not be able to provide sufficient confidence if all test functionality is predefined in mocks and stubbed responses from Wiremock.

After mocking and/or stubbing the external services we end up with almost a duplicate application in terms of the amount of duplicated components. This makes the application hard to maintain as even a small change will have to be duplicated to the relevant mocks.

The Play Framework is designed for web applications and RESTful APIs. This codebase is more like a service rather than an API and therefore has no endpoints and controllers which would be suitable hooks or entry points for acceptance tests. Even if we add controllers for the sake of acceptance tests, they are still not suitable entry points, as the service is continuously running, unlike a RESTful API which is triggered by hitting one of it’s endpoints.

The service is running continuously and it is very hard to get access to an instance of a class, in order to manipulate it to simulate a test scenario, or to extract a result from it, in order to verify it in a test. This also makes it very hard to break test functionality into separate steps for the cucumber tests. I have still not been able to implement a way of verifying the end result.

In order to use Wiremock for stubbing external requests Play requires a fake application to be running. Play offers more than one type of DI and the one we have gone for is from a google library which is integrated in Play. In this case Play requires that we use a specific type of a fake application – Guice fake application. The Guice fake application is hard to work with.

Implementing the acceptance tests infrastructure has been a struggle so far, and has resulted in a lot difficult to understand code.

All of the above seem to come across as signals that we are putting too much effort for what seems to be very little or no rewards.

We should maybe assume that our external dependencies are tested by the relevant parties and maybe we should investigate if we can implement unit tests which can provide us with sufficient confidence.

---
