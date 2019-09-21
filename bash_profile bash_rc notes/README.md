# bash_profile bash_rc notes

## Sanitised .bash_profile

```bash
# Sanitised .bash_profile 2019-09-21-1521

### My Home
export MY_HOME=/Users/alkuzmanov

### Terminal Customisation
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


### Proxies
# export http_proxy=[HTTP-PROXY-URI]:[PORT-NUMBER]
# export HTTP_PROXY=[HTTP-PROXY-URI]:[PORT-NUMBER]
# export https_proxy=[HTTP-PROXY-URI]:[PORT-NUMBER]
# export HTTPS_PROXY=[HTTP-PROXY-URI]:[PORT-NUMBER]
## export NO_PROXY="localhost|[URL]|*[URL]|[IP-ADDRESS]|127.0.0.1|0.0.0.0"
## export no_proxy="localhost|[URL]|*[URL]|[IP-ADDRESS]|127.0.0.1|0.0.0.0"
## export NO_PROXY="localhost|192.168.192.10|127.0.0.1|0.0.0.0"
## export no_proxy="localhost|192.168.192.10|127.0.0.1|0.0.0.0"
# export ALL_PROXY=[HTTP-PROXY-URI]:[PORT-NUMBER]
# export all_proxy=[HTTP-PROXY-URI]:[PORT-NUMBER]


### Proxies for trainings without proxies
# export http_proxy=
# export HTTP_PROXY=
# export https_proxy=
# export HTTPS_PROXY=
## export NO_PROXY="localhost|192.168.192.10|127.0.0.1|0.0.0.0"
## export no_proxy="localhost|192.168.192.10|127.0.0.1|0.0.0.0"
# export ALL_PROXY=
# export all_proxy=

### Proxies For NodeJS NPM
# export npm_config_proxy=[PROXY-URI]:[PORT-NUMBER]
# export npm_config_https_proxy=[PROXY-URI]:[PORT-NUMBER]


### GENERAL PATHS
export SERVER_ENV=dev
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_121.jdk/Contents/Home


### JAVA_OPTS
export JAVA_OPTS="-XX:PermSize=256M -XX:MaxPermSize=384M -Xms256M -Xmx1280M -XX:+CMSClassUnloadingEnabled"


### JAVA_OPTS_DEBUG
## Note: If you enable these you can run only one instance of SBT, might be the same case with other build tools.
## export JAVA_OPTS_DEBUG="-Xdebug -Xrunjdwp:transport=dt_socket,address=5005,server=y,suspend=n"
## export JAVA_OPTS_DEBUG="-Djavax.net.debug=all"


### EXTRA_JAVA_OPTS
# export EXTRA_JAVA_OPTS="$JAVA_OPTS $JAVA_OPTS_DEBUG -Djavax.net.ssl.trustStore=/Users/[USER]/[SOME-PATH]/[TRUSTSTORE]
# -Djavax.net.ssl.trustStorePassword=[PASSWORD]
# -Djavax.net.ssl.keyStore=/Users/[USER]/[SOME-PATH]/[CERTIFICATE.P12] 
# -Djavax.net.ssl.keyStorePassword=[PASSWORD]
# -Djavax.net.ssl.keyStoreType=PKCS12
# -Dhttp.proxyHost=[PROXY-URI]
# -Dhttp.proxyPort=[PORT-NUMBER]
# -Dhttps.proxyHost=[PROXY-URI]
# -Dhttps.proxyPort=[PORT-NUMBER]
# -Dhttp.nonProxyHosts=localhost|[URL]|*[URL]|[IP-ADDRESS]|127.0.0.1|0.0.0.0
# -Dhttps.nonProxyHosts=localhost|[URL]|*[URL]|[IP-ADDRESS]|127.0.0.1|0.0.0.0
# -Dfile.encoding=UTF-8"
export EXTRA_JAVA_OPTS="$JAVA_OPTS -Dfile.encoding=UTF-8"


### brew ### homebrew
### brew cask ### homebrew cask
# export HOMEBREW_NO_GITHUB_API=1
# export HOMEBREW_CASK_OPTS=--caskroom=/opt/homebrew-cask/Caskroom
export HOMEBREW_NO_ANALYTICS=1
export HOMEBREW_GITHUB_API_TOKEN=""


### openssl
## export OPENSSL_HOME=/usr/local/Cellar/openssl/1.0.2k
export OPENSSL_HOME=/usr/local/opt/openssl

### curl
export CURL_HOME=/usr/local/opt/curl/bin

### Maven
## export M2_HOME=/Users/[USER]/[SOME-PATH]/Installed-software-wmac/apache-maven-2.2.1
export M2_HOME=/usr/local/Cellar/maven/3.3.9/libexec
export M2=$M2_HOME/bin
export MAVEN_OPTS=$EXTRA_JAVA_OPTS


### Scala
## export SCALA_HOME=/usr/local/Cellar/scala/2.11.6
## export SCALA_HOME=/usr/local/Cellar/scala210/2.10.5/libexec
export SCALA_HOME=/usr/local/Cellar/scala/2.12.1/libexec


### SBT
export SBT_HOME=/usr/local/Cellar/sbt/0.13.13
export SBT_OPTS=$EXTRA_JAVA_OPTS


### Activator
export ACTIVATOR_HOME=/usr/local/Cellar/typesafe-activator/1.3.12
export ACTIVATOR_OPTS=$EXTRA_JAVA_OPTS


### Play Framework
## Replaced by Activator
# export PLAY_HOME=/Users/[USER]/Programs/play-2.2.2
# export PLAY_OPTS=$EXTRA_JAVA_OPTS


### MongoDB
export MONGODB_HOME=/usr/local/Cellar/mongodb/3.4.3


### Redis
export REDIS_HOME=/usr/local/Cellar/redis/3.2.8


### Groovy
export GROOVY_HOME=/usr/local/opt/groovy/libexec
export GROOVYSDK_HOME=/usr/local/opt/groovysdk/libexec


### Grails
export GRAILS_HOME=/usr/local/opt/grails/libexec


### Tomcat export for monitoring
export CATALINA_HOME=/usr/local/Cellar/tomcat/8.5.13/libexec
export CATALINA_OPTS="$EXTRA_JAVA_OPTS -Dcom.sun.management.jmxremote.port=80
-Dcom.sun.management.jmxremote.authenticate=false 
-Dcom.sun.management.jmxremote.ssl=false"


### JBOSS
export JBOSS_HOME=/usr/local/opt/jboss-as/libexec


### Github
export GIT_TEMPLATE_DIR=/Users/kuzmaa01/.git_template


### SVN
export SVN_HOME=/usr/local/bin/svn


### Sublime
## alias sublime="[SOME-PATH]/Applications/Sublime\ Text\ 2.app/Contents/SharedSupport/bin/subl"
## alias subl="[SOME-PATH]/Applications/Sublime\ Text\ 2.app/Contents/SharedSupport/bin/subl"
## alias subl='open -a Sublime\ Text\ 2'
## export SUBLIME_HOME=[SOME-PATH]/Applications/Sublime\ Text\ 2.app/Contents/SharedSupport/bin
## Brewed Sublime
export SUBLIME_HOME=/usr/local/bin/subl


### Clojure
### Leiningen
## alias clj='java -cp [SOME-PATH]/Users/[USER]/Programs/clojure-1.6.0/clojure-1.6.0.jar clojure.main'
export LEININGEN_HOME=/usr/local/bin/lein


### Amazon AWS exports
## export AWS_DEFAULT_PROFILE=adminuser
## export AWS_PROXY_HOST=""
## export AWS_PROXY_PORT="80" ## ???
# export AWS_ACCESS_KEY=
# export AWS_SECRET_KEY=
# export AWS_ACCESS_KEY_ID=
# export AWS_SECRET_ACCESS_KEY=
### AWS-CLI
complete -C aws_completer aws


### PATH
## ALWAYS LAST
## Path concatenation
## Example:
## export PATH=$PATH:$JBOSS_HOME/bin
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
### export PATH=$PATH:$JAVA_HOME
export PATH=$PATH:$SCALA_HOME/bin
export PATH=$PATH:$OPENSSL_HOME
### export PATH=$PATH:$CURL_HOME ### Not sure if order of $PATH:$SOMETHING is correct
export PATH="/usr/local/opt/curl/bin:$PATH"
export PATH=$PATH:$M2
export PATH=$PATH:$GROOVY_HOME/bin
export PATH=$PATH:$GROOVYSDK_HOME/bin
export PATH=$PATH:$GRAILS_HOME/bin
export PATH=$PATH:$PLAY_HOME
export PATH=$PATH:$MONGODB_HOME/bin
export PATH=$PATH:$REDIS_HOME
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

----

```bash

### Google Cloud SDK
# The next line updates PATH for the Google Cloud SDK.
# if [ -f '$MY_HOME/Documents/Installed-software/google-cloud-sdk/path.bash.inc' ]; then . '$MY_HOME/Documents/Installed-software/google-cloud-sdk/path.bash.inc'; fi
# The next line enables shell command completion for gcloud.
# if [ -f '$MY_HOME/Documents/Installed-software/google-cloud-sdk/completion.bash.inc' ]; then . '$MY_HOME/Documents/Installed-software/google-cloud-sdk/completion.bash.inc'; fi

```

----

```bash

### Tomcat export for monitoring
# export CATALINA_HOME=/usr/local/Cellar/tomcat/8.0.23/libexec
# export CATALINA_OPTS="$PLATFORM_JAVA_OPTS -Dcom.sun.management.jmxremote.port=[PORT-NUMBER]
# -Dcom.sun.management.jmxremote.authenticate=false 
# -Dcom.sun.management.jmxremote.ssl=false"

```

----

```bash

### PATH
## ALWAYS LAST
## Path concatenation
## Example:
## export PATH=$PATH:$JBOSS_HOME/bin
## OR
## export PATH=${PATH}:${JBOSS_HOME}/bin
## Make sure PATH precedence is correct, for example export PATH=/usr/local/bin:$PATH is not the same asexport PATH=$PATH:/usr/local/bin
# export PATH=$PATH:$MY_HOME/bin
# export PATH=/usr/local/bin:$PATH
# export PATH=$PATH:/usr/bin
# export PATH=$PATH:/bin
# export PATH=$PATH:/usr/sbin
# export PATH=$PATH:/bin
# export PATH=$PATH:/sbin
# export PATH=$PATH:/opt/local/bin
# export PATH=$PATH:/opt/local/sbin
# export PATH=$PATH:$GOPATH
# export PATH=$GOPATH/bin:$PATH
# export PATH=$PATH:$KUBECONFIG
# # export PATH=$PATH:$SUBLIME_HOME
# # export PATH=$PATH:$M2
# # export PATH=$PATH:$CATALINA_HOME
# export PATH=/usr/local/bin:$PATH

```
