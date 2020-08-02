# the way we work notes

|||2018

---

Overview
There are a number of ways in which the team works together, which are not always evident or explicit. This page is an attempt to capture the key areas - for existing team members, and few new starters who may join the team.

---

Communication
We value people over processes. So the general rule is: if you want something from us, come talk to us.

Communication
The primary form of communication is obviously verbal. But other methods are available:

---

Epic Teams
The team is a very large team, with over 20 developers, and responsible for multiple products.

The growth of the team means that we have gone well beyond the recommended cross-functional Agile team size of 5-10.

We also have a mix of front-end and back-end developers in the team which can make prioritisation of work difficult if the correct split of skills is not available.

For these reasons, and more, we have elected to work as Epic Teams in our team.

Working as Epic Teams allows us to build semi-permanent Agile sub-teams within our team, encourages front-end/back-end knowledge sharing whilst, crucially, maintaining the overall sense of a single team.

This way of working is a version of the Spotify model of tribes, squads and chapters. But instead of permanent squads and cross-cutting chapters within a tribe, we have multiple semi-permanent epic-teams containing front-end & back-end developers within our team. 

Developers are encouraged to pair-program and use TDD within the teams to facilitate knowledge-sharing and strengthen code quality.

![the way we work](resources/the%20way%20we%20work%201.png)

![the way we work](resources/the%20way%20we%20work%202.jpg)

![the way we work](resources/the%20way%20we%20work%203.png)


---

Epic Workflow
As an epic gets prioritised, we will elect an Epic Lead. It will be their responsibility to work with the Product Owner and Business Analyst to ensure that the requirements are understood before scheduling an Epic Kick-Off meeting.

The Epic Kick-Off meeting is open to all members of the team to provide them an initial insight into a piece of upcoming work.

The Epic Lead can then schedule one or more Tech Feasibility sessions to ensure that the technical effort is well understood for all of the stories in the epic. Tech Feasibility meetings involve the Epic Lead, the Software Engineering Manager, Development Leads and a selection of senior developers in the team.

Sometimes, depending on how well understood the requirements are, we may start Tech Feasibility before the Epic Kick-Off meeting.

It is the Epic Lead's responsibility to create the JIRA development tasks for the epic after Tech Feasibility has been completed. We also recommend creating a JIRA Kanban board for the epic to help track the work and as a visual aid during the daily epic stand-up.

The Epic Lead should also summarise progress in the "main" 10:20am Stand-up. There is no need for the rest of the Epic Team to attend this stand-up.

We do not have enough manual testers to allocate each to an individual epic. However, each Epic Team should ensure that they have identified a manual tester to attend the epic stand-up. The manual testers can also schedule 3-Amigo meetings to discuss acceptance tests for each of the stories.

Whilst the epic is in progress the Epic Lead should schedule Epic Check-In meetings that the entire team can attend. This is a chance to summarise the current state of play for the epic and to help assess whether the epic has the potential to run long.

When creating an epic, we try to set the scope to be around 1-1½ months in duration. If the technical effort is expected to take longer then we will split the epic into a series of shorter development epics. If an epic that has already started is taking longer than 1½ months we will likely change the team members around to freshen things up and to ensure that nobody - other than the Epic Lead - gets stuck on one thing for too long.

When epics finish, the Epic Lead will schedule an Epic Wash-up meeting and the team can focus on Prioritised BAU and Tech Debt tickets until we are ready to start up a new Epic Team for the next prioritised work.

---

FAQs
How does an epic get defined and prioritised?
It is the Product Owner, in collaboration with stakeholders and the senior team members that prioritises epics. Visit Engaging With our team page for more details on how to request new functionality.

How does an Epic Lead get chosen?
Upcoming epics are shown on the stand-up board and it is up to developers to investigate the details and volunteer to act as Epic Lead by talking to the Software Engineering Manager or Development Leads. 

How does an Epic Team get chosen?
Based on initial technical feasibility and current priorities, the Epic Lead and Software Engineering Manager can agree on the initial size of an Epic Team.

The Software Engineering Manager and Epic Lead will then discuss who should be in the team based on the many considerations, including:

Establishing a blend of experienced / inexperienced developers
Ensuring the right balance of front-end vs back-end specialism
Encouraging knowledge-sharing across services
Aiding personal development of developers

---


JIRA Processes
In our team we use the ROADMAP JIRA space to manage development work.

Every Thursday the Product Owner, Business Analysts, Project Manager, Software Engineering Manager and Development Leads meet to triage new tickets.

---

`TODO`

**Ticket Types**

Ticket Type
Description
Created By
Sub-task
A specific development task required to complete a Story
Epic Lead or Developer
Story
A specific piece of required functionality
May or may not be part of an Epic
Business Analyst or Developer
Epic
High level features
Product Owner or Business Analyst
Bug
Issues with existing code
Any team member

![ticket types](resources/JIRA%20Ticket%20Types.png)

---

`TODO`

**JIRA Label Usage**

Label
Description
Filter/Board
bau
BAU work. Add Priority. of P1 - Blocker to expedite, P2 - Critical or P3 - High to mark as High-Priority BAU
High Priority BAU Kanban Board
nfr
Non-Functional Requirement
 
tech_debt
Tech Debt
Tech Debt Kanban Board
tech_debt_december
Tech Debt scheduled for December
Tech Debt December Kanban Board
triage
Marked for triage to discuss validity and priority. All JIRA tickets that were created within the last 7 days and are not associated with an epic will automatically be triaged regardless of label
Tickets to Triage Filter
triaged
Indicates that the task has been discussed in the triage meeting and prioritised accordingly
 
support
Quick task that can be completed by the CPS Support pair whilst on rota.
Support Board
non-epic-work
Tasks that are not part of prioritised epics that can be picked up by developers not currently assigned to an epic
Non-Epic Work

![jira lable usage](resources/JIRA%20Lable%20Usage.png)

---

JIRA Workflow

![jira workflow](resources/JIRA%20workflow.png)

The following table summarises how to manage JIRA statuses/assignees (based on the current board structure):

`TODO`
JIRA status
JIRA assignee
Pre-condition for entering status
Ready for Dev
(unassigned)
Ticket ready for development and contains all required technical information
On Hold
Developer working on ticket
Work on ticket has paused
In Progress
Developer working on ticket
Developer has begun work on ticket
Ready for Code Review
Developer that worked on ticket
Development is complete, all tests pass locally, pull-request created
Under Code Review
Developer responsible for code review
Code review has begun
Code Reviewed
Original developer
Change has passed review, review suggestions implemented, definition of done checks carries out
Resolved
Developer that worked on ticket
Development is complete, all tests pass locally. (Used as alternative to Ready for Code Review)
Ready for Test
Original developer
Change has been merged, successfully built and deployed to test
Testing
Manual tester
Manual testing has begun
Defect to Resolve
Original developer
Manual testing has discovered an issue that needs to be investigated or resolved
Testing Complete
Original developer
Change has passed manual testing
Ready to Deploy
Original developer
Change has passed all tests and is ready to deploy
Closed
Original developer
Change has been deployed to Live

![jira statuses](resources/JIRA%20statuses.png)

---

**10% Time**

To encourage innovation, the team allocates every other Thursday to 10% time. This is a chance for the entire team to work on something not directly related to the current roadmap. Whether that be experimenting with innovate new technologies, prototyping a potential new feature to one of our systems, taking online training sessions, or something else innovative.

There is a team-wide show and tell meeting on the following Friday afternoon for people to demo anything worth sharing.

To ensure that maximum time is available to innovate we strive to keep 10% day meeting-free.

Previous 10% work is documented here.

Support Rota
The team is often asked to provide technical support to others and it can be quite time-consuming. For this reason we have setup a support rota.

The weekly rota (found here) assigns a pair of developers to monitor the Support Inbox.

We try to pair front-end and back-end developers where possible together to ensure better breadth of knowledge.

As the work required to cover support is unplanned there may be time to do other development tasks which should be picked from the Support & High Priority BAU board.

Support Guidelines

The Support Inbox (support@example.com) is intended for use by Operations and development teams only.  

If you need to report an outage or error, please contact Tech Ops Support on xxxxx or via email at TechOps@example.com right away so that they can begin to follow correct procedures.

---
