# jenkins notes

|||jenkins

---

|||jenkins envinject plugin

https://wiki.jenkins-ci.org/display/JENKINS/EnvInject+Plugin

The Jenkins Slack plugin was clashing with the EnvInject one so I ended up uninstalling the Slack plugin.

Here is how to uninstall Jenkins plugins:

https://wiki.jenkins-ci.org/display/JENKINS/Removing+and+disabling+plugins

I tried injecting the SVN_REVISSION using the EnvInject plugin in various ways, including as as script, but it would not get inserted in the rpm name.

I have tried using it in various ways, including "export SVN_REVISION=$(date +%Y-%m-%d-%H-%M-%S)" etc, but fruitless so far, so abandoning as it's not fatal. As long as we bump the app version in the POM file each time we release we should be safe, even if the Jenkins build number get's reset.

In such a scenario maybe we can bump the Jenkins build number manually by SSH-ing onto the instance and changing: /var/lib/jenkins/jobs/<JOB_NAME>/nextBuildNumber to whatever number we need.

---

|||jenkins jobs
|||jenkins cucumbers
|||rubygem-bundler
|||bundler

```bash
set +e

cd cucumber

pwd
echo 'Going to execute cucumber tests.'

rm -rf target/
mkdir -p target/cucumber-reports/json/
mkdir -p target/cucumber-reports/html/

bundle install --deployment

bundle exec cucumber --tags ~@wip host=int -p junit -p ci
```

---

|||jenkins rest api

https://wiki.jenkins-ci.org/display/JENKINS/Remote+access+API

---

https://stackoverflow.com/questions/15909650/create-jobs-and-execute-them-in-jenkins-using-rest

```bash
Usually, when parsing through the documentation, it can take one or two days. It is helpful to be able to access code or curl commands to get you up and running in one hour. That is my objective with a lot of third party software.

See the post at http://scottizu.wordpress.com/2014/04/30/getting-started-with-the-jenkins-api/ which lists several of the curl commands. You will have to replace my.jenkins.com (ie JENKINS_HOST) with the your own url.

To create a job, for instance, try:

curl -X POST -H "Content-Type:application/xml" -d "<project><builders/><publishers/><buildWrappers/></project>" "http://JENKINS_HOST/createItem?name=AA_TEST_JOB2"
This uses a generic config. You can also download a config from a manually created job and then use that as a template.

curl "http://JENKINS_HOST/job/MY_JOB_NAME/config.xml" > config.xml
curl -X POST -H "Content-Type:application/xml" -d @config.xml "http://JENKINS_HOST/createItem?name=AA_TEST_JOB3" 
To execute the job (and set string parameters), use:

curl "http://JENKINS_HOST/job/MY_JOB_NAME/build"
curl "http://JENKINS_HOST/job/MY_JOB_NAME/buildWithParameters?PARAMETER0=VALUE0&PARAMETER1=VALUE1"
shareeditflag
answered Apr 30 '14 at 0:24

Scott Izu
959108
```

---

|||jenkins send message to slack
|||jenkins slack
|||slack jenkins

```bash
RETVAL=$?
if (($RETVAL != 0)); then
  curl -X POST --data-urlencode 'payload={"channel": "#channel", "username": "user_name", "text": "TEXT", "icon_emoji": ":skull:"}' https://hooks.slack.com/services/REST/OF/URL
fi
exit $RETVAL
```

---

|||jenkins wipe workspace

In Jenkins console:

```groovy
import hudson.model.*
// For each project
for(item in Hudson.instance.items) {
  // check that job is not building
  if(!item.isBuilding()) {
    println("Wiping out workspace of job "+item.name)
    item.doDoWipeOutWorkspace()
  }
  else {
    println("Skipping job "+item.name+", currently building")
  }
}

import hudson.model.*

item = Hudson.instance.items.find { it.name == 'vivo-api-rpm' }

println("About to wipe out: "+item.name)

item.doDoWipeOutWorkspace()
```

---

|||jenkins kill stuck job |||jenkins kill stuck build |||jenkins job |||jenkins build

How to stop an unstoppable zombie job on Jenkins without restarting the server?

https://stackoverflow.com/questions/14456592/how-to-stop-an-unstoppable-zombie-job-on-jenkins-without-restarting-the-server

```groovy
I had also the same problem and fix it via Jenkins Console.

Go to "Manage Jenkins" > "Script Console" and run a script:

Jenkins.instance.getItemByFullName("JobName").getBuildByNumber(JobNumber).finish(hudson.model.Result.ABORTED, new java.io.IOException("Aborting build")); 

You'll have just specify your JobName and JobNumber.

answered Jul 20 '16 at 12:49
Alexandru Bantiuc
```

---
