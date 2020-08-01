# bash_profile notes

||bash_profile
|||.bash_profile
|||~/.bash_profile
|||bash profile
|||bash_profile sanitized

```bash
### Terminal Customisation
### terminal colours
### terminal highlighting
## Coloured ls
alias ls="ls -G"
## Enable Colouring
######Temp-commented-out###### export CLICOLOR=1
######Temp-commented-out###### export LSCOLORS=GxFxCxDxBxegedabagaced
## Colouring & Formatting
# export PS1="\[\033[36m\]\u\[\033[m\]@\[\033[32m\]\h:\[\033[33;1m\]\w\[\033[m\]\$ "
# export PS1="\[$(tput bold)\]\[$(tput setaf 3)\]\u \[$(tput setaf 6)\] \w \[$(tput setaf 2)\]\\$ \[$(tput sgr0) \]"
# export PS1="\[$(tput setb 1)\]\u@\[$(tput setb 4)\]\h\[$(tput setb 2)\]\\$ \[$(tput sgr0)\]"
export PS1="\[\033[m\]\u\[\033[31m\]:\[\033[34m\]\W\[\033[m\]\$\[$(tput sgr0)\] "
## Terminal Timestamp
# export PROMPT_COMMAND="echo -n \[\$(date +%H:%M:%S)\]\ "


### My Home
export MY_HOME=/Users/[USER]



### Proxies
export http_proxy=[HTTP-PROXY-URI]:[PORT-NUMBER]
export HTTP_PROXY=[HTTP-PROXY-URI]:[PORT-NUMBER]
export https_proxy=[HTTP-PROXY-URI]:[PORT-NUMBER]
export HTTPS_PROXY=[HTTP-PROXY-URI]:[PORT-NUMBER]
export NO_PROXY="localhost|[URL]|*[URL]|[IP-ADDRESS]|127.0.0.1|0.0.0.0"
export no_proxy="localhost|[URL]|*[URL]|[IP-ADDRESS]|127.0.0.1|0.0.0.0"
export ALL_PROXY=[HTTP-PROXY-URI]:[PORT-NUMBER]
export all_proxy=[HTTP-PROXY-URI]:[PORT-NUMBER]



### Proxies For NodeJS NPM
export npm_config_proxy=[PROXY-URI]:[PORT-NUMBER]
export npm_config_https_proxy=[PROXY-URI]:[PORT-NUMBER]



### GENERAL PATHS
export SERVER_ENV=dev
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_79.jdk/Contents/Home



### JAVA_OPTS
export JAVA_OPTS="-XX:PermSize=256M -XX:MaxPermSize=384M -Xms256M -Xmx12[PORT-NUMBER]M -XX:+CMSClassUnloadingEnabled"



### PLATFORM_JAVA_OPTS
export PLATFORM_JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.trustStore=/Users/[USER]/[SOME-PATH]/[TRUSTSTORE]
-Djavax.net.ssl.trustStorePassword=[PASSWORD]
-Djavax.net.ssl.keyStore=/Users/[USER]/[SOME-PATH]/[CERTIFICATE.P12] 
-Djavax.net.ssl.keyStorePassword=[PASSWORD]
-Djavax.net.ssl.keyStoreType=PKCS12
-Dhttp.proxyHost=[PROXY-URI]
-Dhttp.proxyPort=[PORT-NUMBER]
-Dhttps.proxyHost=[PROXY-URI]
-Dhttps.proxyPort=[PORT-NUMBER]
-Dhttp.nonProxyHosts=localhost|[URL]|*[URL]|[IP-ADDRESS]|127.0.0.1|0.0.0.0
-Dhttps.nonProxyHosts=localhost|[URL]|*[URL]|[IP-ADDRESS]|127.0.0.1|0.0.0.0
-Dfile.encoding=UTF-8"



### Maven

## export M2_HOME=/Users/[USER]/[SOME-PATH]/Installed-software-wmac/apache-maven-2.2.1
export M2_HOME=/usr/local/Cellar/maven2/2.2.1/libexec
export M2=$M2_HOME/bin
export MAVEN_OPTS=$PLATFORM_JAVA_OPTS



### Scala
## export SCALA_HOME=/usr/local/Cellar/scala/2.11.6
## export SCALA_HOME=/usr/local/Cellar/scala210/2.10.5/libexec




### SBT
export SBT_HOME=/usr/local/Cellar/sbt/0.13.8
export SBT_OPTS=$PLATFORM_JAVA_OPTS



### Activator
export ACTIVATOR_HOME=/usr/local/Cellar/typesafe-activator/1.3.2
export ACTIVATOR_OPTS=$PLATFORM_JAVA_OPTS



### Play Framework
## Replaced by Activator
# export PLAY_HOME=/Users/[USER]/Programs/play-2.2.2
# export PLAY_OPTS=$PLATFORM_JAVA_OPTS



### MongoDB
export MONGODB_HOME=/usr/local/Cellar/mongodb/3.0.3



### Groovy
export GROOVY_HOME=/usr/local/opt/groovy/libexec



### Grails
export GRAILS_HOME=/usr/local/opt/grails/libexec



### Tomcat export for monitoring
export CATALINA_HOME=/usr/local/Cellar/tomcat/8.0.23/libexec
export CATALINA_OPTS="$PLATFORM_JAVA_OPTS -Dcom.sun.management.jmxremote.port=[PORT-NUMBER]
-Dcom.sun.management.jmxremote.authenticate=false 
-Dcom.sun.management.jmxremote.ssl=false"


### JBOSS
export JBOSS_HOME=/usr/local/opt/jboss-as/libexec


### SVN
export SVN_HOME=/usr/local/bin/svn



### Sublime
## alias sublime="[SOME-PATH]/Applications/Sublime\ Text\ 2.app/Contents/SharedSupport/bin/subl"
## alias subl="[SOME-PATH]/Applications/Sublime\ Text\ 2.app/Contents/SharedSupport/bin/subl"
## alias subl='open -a Sublime\ Text\ 2'
## export SUBLIME_HOME=[SOME-PATH]/Applications/Sublime\ Text\ 2.app/Contents/SharedSupport/bin
## Brewed Sublime
## export SUBLIME_HOME=/usr/local/bin/subl



### Clojure
### Leiningen
## alias clj='java -cp [SOME-PATH]/Users/[USER]/Programs/clojure-1.6.0/clojure-1.6.0.jar clojure.main'
export LEININGEN_HOME=/usr/local/bin/lein


### PATH
## ALWAYS LAST
## Path concatenation
## Example:
## export PATH=$PATH:$JBOSS_HOME/bin
## OR
## export PATH=${PATH}:${JBOSS_HOME}/bin
## Make sure PATH precedence is correct, for example export PATH=/usr/local/bin:$PATH is not the same asexport PATH=$PATH:/usr/local/bin
export PATH=$PATH:$MY_HOME/bin
export PATH=/usr/local/bin:$PATH
export PATH=$PATH:/usr/bin
export PATH=$PATH:/bin
export PATH=$PATH:/usr/sbin
export PATH=$PATH:/bin
export PATH=$PATH:/sbin
export PATH=$PATH:/opt/local/bin
export PATH=$PATH:/opt/local/sbin
export PATH=$PATH:$M2
export PATH=$PATH:$GROOVY_HOME/bin
export PATH=$PATH:$GRAILS_HOME/bin
export PATH=$PATH:$PLAY_HOME
export PATH=$PATH:$MONGODB_HOME/bin
## export PATH=$PATH:$SCALA_HOME/bin
export PATH=$PATH:$ACTIVATOR_HOME
export PATH=$PATH:$SUBLIME_HOME
export PATH=$PATH:$SBT_HOME
export PATH=$PATH:$CATALINA_HOME
export PATH=$PATH:$JBOSS_HOME/bin
export PATH=$PATH:$SVN_HOME
export PATH=$PATH:$LEININGEN_HOME
export PATH=/usr/local/bin:$PATH



### How to switch JDK version on Mac OS X
## http://www.jayway.com/2014/01/15/how-to-switch-jdk-version-on-mac-os-x-maverick/
## Example use: setjdk 1.7 - selects the latest installed JDK version of the 1.7 branch
## Example use: setjdk 1.7.0_51 - select a specific version
## Run /usr/libexec/java_home -h to get more details on how to choose versions
function setjdk() {
  if [ $# -ne 0 ]; then
   removeFromPath '/System/Library/Frameworks/JavaVM.framework/Home/bin'
   if [ -n "${JAVA_HOME+x}" ]; then
    removeFromPath $JAVA_HOME
   fi
   export JAVA_HOME=`/usr/libexec/java_home -v $@`
   export PATH=$JAVA_HOME/bin:$PATH
  fi
 }
 function removeFromPath() {
  export PATH=$(echo $PATH | sed -E -e "s;:$1;;" -e "s;$1:?;;")
 }
```

---

|||.bashrc
|||bashrc
|||linking bash profile to bashrc
|||bash_profile
|||.bash_profile
|||~/.bash_profile
|||bash profile

```bash
[ -s $HOME/.bashrc ] && source $HOME/.bashrc

[ -s $HOME/.bash_profile ] && source $HOME/.bash_profile
```

---
