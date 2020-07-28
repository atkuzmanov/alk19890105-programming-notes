# Splunk notes

## How can i query to get all alerts which are configured?

<https://answers.splunk.com/answers/498981/how-can-i-query-to-get-all-alerts-which-are-config.html>

```text
ALL APPS:

 |rest/servicesNS/-/-/saved/searches | search alert.track=1 | fields title description search disabled triggered_alert_count actions action.script.filename alert.severity cron_schedule
```

```text
Search app only:

 |rest/servicesNS/-/search/saved/searches | search alert.track=1 | fields title description search disabled triggered_alert_count actions action.script.filename alert.severity cron_schedule
```
