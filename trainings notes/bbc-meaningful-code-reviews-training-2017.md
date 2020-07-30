# BBC meaningful code reviews training 2017

|||training meaningful code reviews [2017-02-28]

|||meaningful code reviews

|||code review

---

Instructor email:
student@talkingbear.co.uk

Good comment:

`// This code is difficult to write, so it will be difficult to understand.`

---

- Static:

    Peer review

    Walkthrough

- Dynamic:

    Structural -> Whitebox

    Blackbox

- Documentation:

  - runbooks
  - comments
  - user stories
  - jira
  - schemas
  - db schemas
  - user guide
  - config
  - checklists
  - design guides
  - build scripts
  - wireframes
  - JSON
  - XML
  - API specs
  - tests

---

Use lint software programs to check the structure of the code.

<https://en.wikipedia.org/wiki/Lint_(software>)
https://stackoverflow.com/questions/14691926/is-there-a-simple-cli-java-linter

|||front end dev
|||web dev
|||web development
|||front end development
|||web dev html support compatibility testing
|||front end dev html support compatibility testing
|||bookmarks
|||links

<https://www.w3schools.com/>

<https://html5test.com/>

<http://caniuse.com/>

|||javascript performance
|||front end dev
|||web dev
|||web development
|||front end development
|||bookmarks
|||links

<https://jsperf.com/>

---

|||mobile dev
|||mobile phone app
|||smartphone app
|||mobile smartphone app dev
|||html javascript css to mobile app
|||bookmarks
|||links

<https://cordova.apache.org/>

<http://phonegap.com/>

---

|||pair programming

- Benefits:

  - knowledge sharing
  - no knowledge silos
  - learning
  - up skilling
  - delivering higher quality code
  - less bugs

Swap around pairs.

---

meaningful code reviews 2017-02-28 training general notes:

- Financial software:

transactional logging

- false feature rich

---

|||code review tools

Phabricator:

<https://www.phacility.com/>

---

|||code coverage tools

<https://cobertura.github.io/cobertura/>

---

|||code review checklists
|||code review check lists
|||checklist code review
|||check list code review

Code review checklist 1

```text
- Documentation
* All members are commented in clear language. If it is unclear to the reader, it's unclear to the user.
* All source code contains @authors fro all authors.
* @version should be included as required.
* All class, variable, and method modifiers should be examined for correctness.
* Describe behaviour for known input corner-cases.
* Complex algorithms should be explained with references. For example, document the reference that identifies the equation, formula or pattern. In all cases examine the algorithm and determine if it can be simplified.
* Code that depends on non-obvious behaviour in external frameworks is documented with reference to external documentation.
* Confirm that the code does not depend on a bug in an external framework which may be fixed later,  and result in an error condition. If you find a bug in an external framework or library, open an issue, and document it in the code as necessary.
* Units of measurement are documented for numeric values.
* Incomplete code is marked with //TODO markers.
* All public and private APIs are examined for updates.

- Testing
* Unit test are added for each code path, and behaviour. This can be facilitated by tools like Sonar and Cobertura.
* Unit tests must cover error conditions and invalid parameter cases.
* Unit tests for standard algorithms should be examined against the standard for expected results.
* Check that possible null pointers are always checked before use.
* Array indices are always checked to avoid ArrayIndexOutOfBound exceptions.
* Do not write a new algorithm for code that is already implemented in an existing public framework API and tested.
* Ensure that the code fixes the issue, or implements the requirement, and that the unit test confirms it. If the unit test confirms a fix for an issue, add the issue number to the documentation.

- Error handling
* Invalid parameter values are handled properly early in methods (Fast Fail).
* NullPointerException conditions from method invocations are checked.
* Consider using a general error handler to handle known error conditions.
* An Error handler must clean up state and resources no matter where an error occurs.
* Avoid using RuntimeException, or sub-classes to avoid making code changes to implement correct error handling.
* Define and create custom Exception sub-classes to match your specific exception conditions. Document the exception in detail with example conditions so the developer understands the conditions for the exception.
* For "JDK 7+" use try-with-resources. For "JDK < 7" check to make sure resources are closed.
* Don't pass the buck! Do not create classes which throw Exception rather then dealing with exception condition.
* Don't swallow exceptions! For example catch (Exception ignored) {}. It should at least log the exception.

- Thread safety
* Global (static) variables are protected by locks, or locking sub-routines.
* Objects accessed by multiple threads are accessed only through a lock, or synchronized methods.
* Locks must be acquired and released in the right order to prevent deadlocks even in error handling code.

- Performance
* Objects are duplicated only when necessary. If you must duplicate objects, consider implementing Clone and decide if deep cloning is necessary.
* No busy-wait loops instead of proper thread synchronization methods. For example, avoid while(true) {... sleep(10);...}. 
* Avoid large objects in memory, or using String to hold large documents which should be handled with better tools. For example, do not read a large XML document into a String, or DOM.
* Do not leave debugging code in production code.
* Avoid System.out.println(); statements in code, or wram them in a Boolean condition statement like if(DEBUG){...}.
* "Optimisation that makes code harder to read should only be implemented if a profiler or other tool has indicated that the routine stands to gain from optimisation. These kinds of optimisations should be well documented and code that performs the same task should be preserved." - Unknown
```

---

Code review checklist 2

```text
- Structure
* Does the code completely and correctly implement the design?
* Does the code conform to any pertinent coding standards?
* Is the code well-structured, consistent in style, and consistently formatted?
* Are there any uncalled or unneeded procedures or nay unreachable code?
* Are there any leftover stubs or test routines in the code?
* Can any code be replaced by calls to external reusable components or framework or library functions?
* Are there any blocks of repeated code that could be condensed into a single procedure?
* Is storage use efficient?
* Are symbolics used rather than "magic number" constants or string constants?
* Are any modules excessively complex and should they be restructured or split into multiple routines?

- Documentation
* Is the code clearly and adequately documented, with an easy-to-maintain commenting style?
* Are all comments consistent with the code?

- Variables
* Are all variables properly defined with meaningful, consistent, and clear names?
* Do all assigned variables have proper type consistency or casting?
* Are there any redundant or unused variables?

- Arithmetic operations
* Does the code avoid comparing floating-point numbers for equality?
* Does the code systematically prevent rounding errors?
* Does the code avoid additions and subtractions on numbers with greatly different magnitudes?
* Are devisors tested for zero or noise?

- Loops and branches
* Are all loops, branches, and logic constructs complete, correct and properly nested?
* Are the most common cases tested first in IF-ELSEIF chains?
* Are all cases covered in an IF-ELSEIF or CASE block, including ELSE or DEFAULT clauses?
* Does every case statement have a default?
* Are loop termination conditions obvious and invariably achievable?
* Are indexes or subscripts properly initialised, just prior to the loop?
* Can any statements that are enclosed within loops be placed outside the loops?
* Does the code in the loop avoid manipulating the index variable or using it upon exit from the loop?

- Defensive programming
* Are indexes, pointers, and subscripts tested against array, record or file bounds?
* Are imported data and input arguments tested for validity and completeness?
* Are all output variables assigned?
* Are the correct data operated on in each statement?
* Is every memory allocation deallocated?
* Are timeouts or error traps used for external device accesses?
* Are files checked for existence before attempting to access them?
* Are all files and devices left in the correct state upon program termination?
```

---

Code review checklist 3

```text
- Data item declaration related
* Are the names of the variables meaningful?
* If the program language allows mixed case names, are the variable names with confusing use of lower case letter and capital letters?
* Are the variables initialised?
* Are there similar sounding names? (For unintended errors.) 
* Are all the common structures, constraints and flags to be used defined in a header file rather than in each file separately?

- Data usage related
* Are values of right data types being assigned to the variables?
* Is the access of data from any standard file, repositories or database done through publicly supported interface?
* If pointers are used, are they initialised properly?
* Are bounds to array subscription and pointers properly checked?
* Has the usage of similar looking operators been checked?

- Control flow related
* Are all the conditional paths reachable?
* Is there any part of the code that is unreachable?
* Are there any loops that will never execute?
* Are there any loops where the final condition will never be met and hence cause the program to go into an infinite loop?
* What is the level of nesting of the conditional statements? Can the code be simplified to reduce complexity?
* Are all the individual conditions, nested in a complex conditions, evaluated separately?
* If there is a nested IF statement, are the THEN and ELSE parts appropriately delimited?
* In the case of a multi-way branch like SWITCH/CASE statement, is a default clause provided? Are the breaks after each CASE appropriate?

- Standards related
* Does the code follow the coding conventions of the organisation?
* Does the code follow any coding conventions that are platform specific?

- Style related
* Are unhealthy programming constructs being used in the program? For example such as code duplication.
* Is there usage of specific idiosyncrasies of a particular machine architecture or a given version of an underlying product?
* Is sufficient attention being paid to readability issues like code indentation?

- Performance related
* Have you checked for memory leaks?

- Documentation related
* Is the code adequately documented, especially where the logic is complex or the section of code is critical for product functioning?
* Is appropriate change history documented?
* Are the interfaces and the parameters thereof properly documented?
```

---

Code review checklist 4

```text
- Coding standards
* Understandable
* Adhere code guidelines
* Indentation
* No magic numbers
* Naming
* Units, bounds
* Spacing: horizontal - between operators, keywords; vertical - between methods, code blocks;

- Comments
* No needless comments
* No obsolete comments
* No redundant comments
* Methods document parameters, it's modifiers, functional dependencies
* Comments consistent in format, length, level of detail
* No code commented out

- Logic
* Array indexes within bounds
* Conditions correct in ifs, loops
* Loops always terminate
* Check for division by zero
* Refactor statements in the loop to outside of the loop

- Error handling
* Error messages understandable and complete
* Edge cases handled, such as: null, 0, negative
* Parameters are valid
* Files and other input data are valid

- Code decisions
* Code is at right level of abstraction; methods have appropriate number, types of parameters
* No unnecessary features
* Redundancy minimised
* Mutability minimised
* Static preferred over nonstatic
* Appropriate accessibility modifiers: public, private, protected, etc.
* Enums used instead of int constants
* Defensive copies when needed
* No unnecessary new objects
* Variables in lowest scope
* Objects referred to by their interfaces, most generic supertype
```

---

Code review checklist 5 - Mixed

```text
- General
* error handling
* failure Handling
* conditional difficulty
* security
* happy path
* sad path
* performance
* accessibility standards
* non functional requirements - security, performance, stability, fault tolerance, monitoring, logging
* is logging slowing down performance

- Look out for
* Code smells https://en.wikipedia.org/wiki/Code_smell

- Caching
* is it used
* is it appropriate

- Versioning
* Is it maintained?

- Security

* General web security:
** Browser input
** Cookies
** Property files
** External processes
** Data feeds
** Service responses
** Flat files
** Command line parameters
** Environment variables
** SSL/TLS

* General transaction security:
** Data/Input Validation of data from all untrusted sources
** Authentication
** Session Management
** Authorization
** Cryptography (Data at rest and in transit)
** Error Handling /Information Leakage
** Logging /Auditing
** Secure Code Environment

* General security:
** Authentication and User Management
** Authorization
** Session Management
** Auditing and Logging

* General coding security (Java) (https://www.owasp.org/index.php/Java_leading_security_practice):

** Class Access - Methods; Fields; Mutable Objects; Put simply, don't have public fields or methods in a class unless required. Every method, field, or class that is not private is a potential avenue of attack.

** Initialisation - Allocation of objects without calling a constructor is possible. 

** Cloneability - Override the clone method to make classes unclonable unless required. Cloning allows an attacker to instantiate a class without running any of the class constructors.

** Scope - In some program languages, by default, all fields and methods not declared public or private are protected, and can only be accessed within the same package; Don’t rely on this for security.

** Inner Classes - Simply put, when translated into bytecode, inner classes are "rebuilt" as external classes in the same package. This means any class in the package can access this inner class. The owner/enclosing/father classes’ private fields are morphed into protected fields as they are accessible by the now external inner class.

** Hard Coding - Don't hard code any passwords, user IDs, etc in your code. Silly and bad design. Can be decompiled. Place them in a protected directory in the deployment tree.

** Serialization/Deserialization - Serialization can be used to save objects when the JVM is "switched off". Serialization flattens the object and saves it as a stream of bytes. Serialization can allow an attacker to view the inner state of an object and even see the status of the private attributes.

- Logging
* Do not log sensitive data, such as endpoints, passwords etc.
* Log success message when operation completed successfully, such as processing DB operation, queue message send/receive operation etc. This could be maybe only set at DEBUG level, as you might want the logs to only contain messages with exceptions when something has gone wrong.
* Log failure message with proper data id/encrypted user, url etc.
* Log the exception in full, and log the relevant objects which caused it, at level ERROR.
* Web services logging should provide unique identifier per session, that guarantees cross log tracking for each log message.

- Generic
* Exploratory testing
* Testing instructions for QAs
* Rollout strategy
* Rollback strategy
```

---

> Generic checklist for code reviews - Code review checklist 2
Copyright 2001 by Karl E. Wiegers. Permission is granted to use, modify, and distribute this document.

---

|||tdd checklist
|||tdd check list
|||tdd code review check list

Test driven development checklist

```text
* Does the name of the class still reflect its purpose?
Rename
* Does the name of the method describe the functionality?
Rename 
* Is a Method code more than 40 lines long ?
Split method
* Does the method rely on many class instance states ?
Pull the method out into its own class 
* Has the class too many responsibilities ? 
Follow the Single Responsibility Principle 
* Is there deeply nested IF/ELSE ? 
Refactor with the state/strategy pattern 
* Does a class is dependent on a friend of a friend ? 
Apply the Law of Demeter principle 
* Is a class not following the Tell, Don’t Ask principle? 
Refactor the class 
* Is there any magic numbers ? 
Replace magic numbers by constants 
* Is there a class or namespace you avoid changing out of fear? 
Look at the dependencies 
* Is there any repetition ? 
Follow the DRY principle 
* Does the code do no more and no less than it claims to do ? 
Design with Contracts 
* Does the code verify assumptions ? 
Follow the crash early principle
* Checks how likely a bug will be detected by the unit tests
Introduce bugs on purpose in a separate copy of the source to verify that testing will catch them. 
```

---

Webservice checklist

```text
* Reliability
Checks the level of risk and the likelihood of potential application failures
* Efficiency
Checks that we have high performance once the application is in run-time mode
* Security
Checks the risk of encountering critical vulnerabilities that damage the business
* Maintainability
Checks adaptability, portability and transferability between teams
```

/*--------------------------------*/

|||code review
|||security code review checklist

Security code review checklist

```text
*** Input and output validation

- Validate all input parameters - i.e. query parameters, headers, form fields, cookies.

- Validate input from all possible entry points.
-- Normalise input prior to validation.
-- Apply validation both on the server and the client.

- Apply encoding to output from the application.


*** Access and authentication

- If SSH access is enabled, is it required?

- The application should not store any credentials in memory, or locally, unencrypted.

- Periodically expire or renew credentials.

- Authentication tokens such as secrets and cookies should be transmitted over SSL.

- Check if third party access has limited permissions - e.g. read only access.

- The application should restrict some number of calls, perhaps have some kind of api management and throttling for:
-- Bad requests.
-- Failed login attempts.

- Check if the application needs to block ip addresses from some regions.

- Bring the whitelist of the application up to date.



*** Logs and error handling

- The application should have a non modifiable log format.

- Is the application logging any secure information - e.g. passwords? 
-- The log files should be stored in a secure location?

- Check if error messages show any sensitive information?
```

---

|||code review
|||definition of done
|||done
|||done checklist
|||dod

Definition of done

```text
- Check lists read: as defined in code review checklists.

- Documentation is updated.

- StatsD metrics: Metrics at API endpoint level and also at DAO level - capture a given request at entry and exit points. Add counter and timer metrics. Also add any application-specific metrics as required.

- Alarms: for any metric, consider if a corresponding alarm is also necessary.

- Swagger documentation updated.

- Update architecture diagrams: New diagrams for new software, and update existing ones. New dependencies, making new calls, etc.

- Dependencies updated: go through the dependencies and check if they are up to date. If more than one dependency is behind, then choose just one to upgrade - the "boy scout" rule - 'Leave your code better than you found it.' (http://deviq.com/boy-scout-rule/). Over time everything will get up to date, and then keep it current. Upgrading a library will be a significant amount of work - do it as a separate piece of work.

- Update database indexes: make sure any new queries or updates to existing ones have appropriate indexes set up.

- Sufficient logging for support: Sufficient logging, so it is easy to diagnose faults.

- New services added to Spin-Up-and-Down Jenkins jobs for Cloud components.

- Update component health: Changes that would affect the health definition should be incorporated in the logic that sends AWS the 'health OK' message.

- End-2-end tests updated.

- Inspect HTTPS SSL certificate warnings: Read carefully any warning messages from HTTPS SSL connections regarding certificates. It may highlight insufficient permissions.

- Inspect breaking changes: make sure that no breaking changes were introduced. If there are any, make sure that there is a phased deployment approach - feature flags etc.

- Roll back: if the roll out fails, make sure that it is possible to easily roll back - very important for deployments that change data structures and mandatory for breaking changes. 

- Exploratory testing: Test it yourself.

- Test instructions: Add comprehensive test instructions and scenarios for QAs to the ticket.

- Tested: May have to work with the QAs on this.

- Rolled out and verified on Live: rolled out all the way to Production and verified.

- Use, spread and keep this definition of done up to date.
```

---

|||dod v2 |||defenition of done v2 |||done checklist v2
|||code review

```text
- Relevant sections from the code review lists were used.


- Documentation is updated.
-- Including Swagger documentation, if available.


- Metrics
Metrics are checked and updated. Any application-specific metrics are added as required. Please consider:
-- API endpoint metrics
-- DAO metrics
-- Counter metrics
-- Timer metrics


- Alarms
Alarms are checked and updated. Please also consider adding any new required alarms.
For any metric, consider if a corresponding alarm is also necessary.


- Update architecture diagrams
Update existing diagrams, or create new ones for new software, including new dependencies, making new calls, etc.


- Dependencies updated
Go through the dependencies and check if they are up to date. If more than one dependency is behind, then choose just one to upgrade - the "boy scout" rule - 'Leave your code better than you found it.'. This way over time everything will get up to date, and then this way it will stay current.
Upgrading a library will be a significant amount of work - do it as a separate piece of work.


- Update database indexes
Make sure any new queries or updates to existing ones have appropriate DB indexes set up.


- Sufficient logging for support
Make sure there is sufficient logging in place, so it is easy to diagnose faults.
Do not overdo it! Please log something only when needed, otherwise the logs could be flooded and become unreadable.



- Update component health
Changes that would affect the health definition should be incorporated in the logic that sends AWS the 'health OK' message.


- Tests are updated
-- Unit tests
-- Integration tests
-- Load tests


- Check HTTPS SSL certificate warnings
Read carefully any warning messages from HTTPS SSL connections regarding certificates. It may highlight insufficient permissions.


- Check for breaking changes
 make sure that no breaking changes were introduced. If there are any, make sure that there is a phased deployment approach - feature flags etc.


- Roll back
Make sure you have a Roll back strategy.
If the roll out fails, make sure that it is possible to easily roll back - very important for all deployments and mandatory for deployments that change data structures and for breaking changes.


- Exploratory testing
Give the new functionality a try yourself and test it yourself.


- Test instructions
Add comprehensive test instructions and scenarios to the ticket, so that other people can have a look as well.


- Tested
May have to work with other people on this. You might want to ask one of your colleagues to also have a go and test your code.


- Rolled out and verified on Live
Rolled out to Production and verified that all is working ok.


- Use, spread and keep this definition of done up to date.
```

---
