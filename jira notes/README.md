# jira notes

|||jira

```text
Query:
project IN (EXAMPLE-JIRA-PROJECT-NAME) AND fixVersion in ("Week 234", "Week 234 RC1", "Week 232 RC2") ORDER BY Project, status


###Filters

#JiraFilter01

"Active Participants" = currentUser() OR "Assignee" = currentUser() OR "Watcher" = currentUser() OR "Reporter" = currentUser() OR "Voter" = currentUser() ORDER BY createdDate DESC

"Active Participants" = currentUser() OR "Assignee" = currentUser() OR "Watcher" = currentUser() OR "Reporter" = currentUser() OR "Voter" = currentUser()


"Active Participants" = "example@email.com" OR "Assignee" = "example@email.com" OR "Watcher" = "example@email.com" OR "Reporter" = "example@email.com" OR "Voter" = "example@email.com"

assignee = currentUser()

reporter = currentUser()

key in watchedIssues()

key in votedIssues()

"Active Participants" = "example@email.com"

"summary" ~ "Search term" AND "Active Participants" = "example@email.com" ORDER BY fixVersion ASC


summary ~ "Example summary." OR description ~ "Example description."
```

---

|||jira priority
|||jira incident priority

```text
P1 - No Service. Service to the end user has completely stopped or is so seriously impaired that the service is unusable 
P2 - High Impact. Service to the end user is severely impacted but is still usable 
P3 - Low Impact. Service to the end user is impeded, has lost some functionality, or customer has low impact 
P4 - No Impact. End user request that has no unplanned service impact


P1 - If PRODUCT is causing other products or services to break in some way.
P2 - If the tool is accessible but key functionality has been lost.
P3 - If a subset of pages/ functions are inaccessible/not working.
P4 - For all else.
```

---
