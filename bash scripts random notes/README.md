# bash scripts random notes

|||bashscript
|||bash scripts
|||bake-scripts
|||bakescripts

`1-example-increase-ulimits.sh`

```bash
#!/bin/sh

echo ">>> increasing the ulimit to 65536 <<<"

cat > /etc/security/limits.conf <<EOF
td-agent hard  nofile  65536
td-agent soft  nofile  65536
root                hard  nofile  65536
root                soft  nofile  65536
EOF
```

---

`2-example-create-make-logs-dir.sh`

```bash
#!/bin/sh
# Make the /var/log directory executable
chmod -R a+X /var/log
mkdir /var/log/[NAME-OF-APP]
mkdir a+w /var/log/[NAME-OF-APP]
mkdir -p /var/run/[NAME-OF-APP]
mkdir -p /var/run/[NAME-OF-APP]/
```

---

`-example-add-pub-key.sh`

```bash
#!/bin/sh
keytool -noprompt -import -file /usr/lib/[EXAMPLE-APPLICATION-NAME]/conf/keys/example-public-key1.pub -alias example-alias -keystore /etc/pki/examplejks.jks -storepass [EXAMPLE-PASSWORD]
```

---

`-example-baketime-config.sh`
`-example-environment.sh`

```bash
#!/bin/bash
### The JSON configuration filename is only readable at bake-time and it's passed to this script. So this will dump it in the dir below on the machine it runs.
cat $1 > /etc/[EXAMPLE-APPLICATION-NAME]/[EXAMPLE-APPLICATION-NAME]-config.json
```

//---

`3-example-set-ssl-reneg-buffer-size.sh`

```bash
#!/bin/bash

echo "<Location />
  SSLRenegBufferSize 10485760
</Location>" > /opt/rh/httpd24/root/etc/httpd/conf.d/ssl-reneg-buffer.conf
```

---

`4-example-update-apache-ssl-config.sh`

```bash
#!/bin/bash

cp /etc/httpd/conf.d/[NAME-OF-APP]_termination.conf /opt/rh/httpd24/root/etc/httpd/conf.d/[NAME-OF-APP]_ssl_termination.conf
cp /etc/httpd/conf.d/[NAME-OF-APP]_http_termination.conf /opt/rh/httpd24/root/etc/httpd/conf.d/[NAME-OF-APP]_http_termination.conf
patch /opt/rh/httpd24/root/etc/httpd/conf.d/[NAME-OF-APP]_ssl_termination.conf /etc/bake-scripts/[NAME-OF-APP]/[NAME-OF-APP]_ssl_termination.conf.diff
patch /opt/rh/httpd24/root/etc/httpd/conf.modules.d/00-mpm.conf /etc/bake-scripts/[NAME-OF-APP]/mpm.conf.diff
patch /opt/rh/httpd24/root/etc/httpd/conf/httpd.conf /etc/bake-scripts/[NAME-OF-APP]/http.conf.diff

# Enable mod_status module for collectd.
cat <<\EOF >> /opt/rh/httpd24/root/etc/httpd/conf/httpd.conf
ExtendedStatus on
<Location /mod_status>
  SetHandler server-status
</Location>
EOF

mv /etc/crlrestart.d/httpd /etc/crlrestart.d/httpd24-httpd
```

---

`5-example-start-apache24.sh`

```bash
#!/bin/bash

set -e

chkconfig httpd off
chkconfig httpd24-httpd on
echo "service httpd stop" >> /etc/rc.local
echo "service httpd24-httpd start" >> /etc/rc.local
```

---

`[NAME-OF-APP]-example-ssl-termination.conf.diff`

```bash
29c29
< KeepAlive on
---
> KeepAlive On
31a32
> SSLCARevocationCheck leaf
33c34
< SSLProtocol -SSLv2 -SSLv3 +TLSv1 +TLSv1.1 +TLSv1.2
---
> SSLProtocol all -SSLv2 -SSLv3
```

---

`-example-http.conf.diff`

```bash
196c196
<     LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
---
>     LogFormat "%h %l %u %t \"%r\" %>s %b %D \"%{Referer}i\" \"%{User-Agent}i\" \"%{SSLClientCertSubject}i\"" combined
217a218
>     CustomLog "|/opt/rh/httpd24/root/usr/sbin/rotatelogs -n 2 /var/log/httpd24/access_log 500M"
```

//---

`-example-mpm.conf.diff`

```bash
6c6
< LoadModule mpm_prefork_module modules/mod_mpm_prefork.so
---
> #LoadModule mpm_prefork_module modules/mod_mpm_prefork.so
18c18
< #LoadModule mpm_event_module modules/mod_mpm_event.so
---
> LoadModule mpm_event_module modules/mod_mpm_event.so
```

---

`-example-start.sh`

```bash
#!/bin/bash

set -e

### Start application or service automatically.
chkconfig [NAME-OF-APP] on
```

---

|||bash script linux launch service automatically
|||launch service automatically

```bash
#!/bin/sh

### Create directories and set correct permissions.
mkdir -p /var/log/example-service-name/tmp
chown -R example-service-name:example-service-name /var/log/example-service-name/tmp
chown -R example-service-name:example-service-name /var/run/example-service-name

### Make some example dir to be owned by the root user.
chown -R root:root /tmp/example-service-name

### Set up example-service-name to be launched automatically.
/bin/chmod a+x /etc/init.d/example-service-name
chkconfig --add example-service-name
chkconfig example-service-name on

### Backup the original configuration file from the RPM.
mv /etc/example-service-name/example-service-name.conf /etc/example-service-name/example-service-name.conf.backup
echo "Backed up the default example-service-name configuration file from the RPM."
```

---

`-example-create-certificates.py`

```python
#! /usr/bin/env python
import os
import os.path
import sys
import base64
import json

if __name__ == "__main__":
    # the configuration.json file is passed in as a first argument
    config_file = sys.argv[1]

    cert_dir = os.path.dirname("/etc/pki/tls/private/")

    # read the config file and load it into a python dictionary
    configuration = json.load(open(config_file))

    # set the environment
    environment = configuration.get("environment")

    # load certificate from  configuration, live keys have '.live' as suffix
    if environment == 'production':
        print 'Loading LIVE keys from configuration.'
        example_cert1 = configuration["configuration"]["example.ssl.cert1.live"]
        example_trust_store1 = configuration["configuration"]["example.ssl.trustStore1.live"]
    else:
        print 'Loading DEVELOPMENT keys from secure configuration.'
        example_cert1 = configuration["configuration"]["example.ssl.cert1"]
        example_trust_store1 = configuration["configuration"]["example.ssl.trustStore1"]

    if example_cert1 != None:
    # decode it back from base64 to normal
           decoded_cert = base64.b64decode(example_cert1)
    # open a new file.p12 in the create_cert_in_dir
          cert_file =  os.path.join(cert_dir, "exampleCert1.p12")
    # write it
         with open(cert_file, "a") as f:
             f.write(decoded_cert)
    # check if file exist
          file_path = cert_dir + "/exampleCert1.p12"
          print 'exampleCert1.p12 is writtn to ' + file_path + " and file exist ",  os.path.exists(file_path)
    else:
       print 'example.ssl.cert1 key does not exist or is empty.'


    if example_trust_store1 != None:
        # decode it back from base64 to normal
       decoded_trust = base64.b64decode(example_trust_store1)
        # open a new file.p12 in the create_cert_in_dir
       trust_file =  os.path.join(cert_dir, "example_trust_store1")
        # write it
       with open(trust_file, "a") as f:
           f.write(decoded_trust)
    # check if file exist
          file_path = cert_dir + "/example_trust_store1"
         print 'example_trust_store1 is writtn to ' + file_path + " and file exist ", os.path.exists(file_path)
     else:
         print 'example.ssl.example_trust_store1 key does not exist or is empty.'
```

---

`-example-create-td-agent-config.py`

```python
#!/usr/bin/env python

import json
import sys

# Setup the TD-AGENT CONFIG
TD_AGENT_CONFIG_FILE = "/etc/bake-scripts/td-agent.conf"
TD_AGENT_CONFIG = """
<source>
  type tail
  path /var/log/[APPLICATION-NAME]/application.log
  refresh_interval 1
  read_from_head true
  pos_file /var/log/td-agent/tmp/[APPLICATION-NAME]_application_log.pos
  tag [APPLICATION-NAME]_application_log
  format none
</source>

<source>
  type tail
  path /var/log/[APPLICATION-NAME]/output.log
  refresh_interval 1
  read_from_head true
  pos_file /var/log/td-agent/tmp/[APPLICATION-NAME]_output_log.pos
  tag [APPLICATION-NAME]_output_log
  format none
</source>

<source>
  type tail
  path /var/log/[APPLICATION-NAME]/external-requests.log
  refresh_interval 1
  read_from_head true
  pos_file /var/log/td-agent/tmp/breaking-new_external-requests_log.pos
  tag [APPLICATION-NAME]_external-requests_log
  format none
</source>

<source>
  type tail
  path /var/log/[APPLICATION-NAME]/status.log
  refresh_interval 1
  read_from_head true
  pos_file /var/log/td-agent/tmp/[APPLICATION-NAME]_status_log.pos
  tag [APPLICATION-NAME]_status_log
  format none
</source>

<source>
  type tail
  path /var/log/httpd/access_log
  refresh_interval 1
  read_from_head true
  pos_file /var/log/td-agent/tmp/access_log.pos
  tag http_access_log
  format none
</source>

<source>
  type tail
  path /var/log/httpd/error_log
  refresh_interval 1
  read_from_head true
  pos_file /var/log/td-agent/tmp/error_log.pos
  tag http_error_log
  format none
</source>

<source>
  type monitor_agent
  bind 127.0.0.1
  port 24225
</source>

<match http_access_log>
  log_level error
  type s3
  s3_bucket {0}
  path [APPLICATION-NAME]/{1}/http_access_log
  s3_region eu-west-1
  check_apikey_on_start true
  buffer_type memory
  time_slice_format %Y%m%d%H
  # use longer flush_interval to reduce CPU usage.
  # note that this is a trade-off against latency.
  flush_interval 10s
  buffer_chunk_limit 64m
  format single_value
  store_as text
  num_threads 1
</match>

<match http_error_log>
  log_level error
  type s3
  s3_bucket {0}
  path [APPLICATION-NAME]/{1}/http_error_log
  s3_region eu-west-1
  check_apikey_on_start true
  buffer_type memory
  time_slice_format %Y%m%d%H
  # use longer flush_interval to reduce CPU usage.
  # note that this is a trade-off against latency.
  flush_interval 10s
  buffer_chunk_limit 64m
  format single_value
  store_as text
  num_threads 1
</match>

<match [APPLICATION-NAME]_output_log>
  log_level error
  type s3
  s3_bucket {0}
  path [APPLICATION-NAME]/{1}/application_logs
  s3_region eu-west-1
  check_apikey_on_start true
  buffer_type memory
  time_slice_format %Y%m%d%H
  # use longer flush_interval to reduce CPU usage.
  # note that this is a trade-off against latency.
  flush_interval 10s
  buffer_chunk_limit 64m
  format single_value
  store_as text
  num_threads 1
</match>

<match [APPLICATION-NAME]_application_log>
  log_level error
  type s3
  s3_bucket {0}
  path [APPLICATION-NAME]/{1}/application_logs
  s3_region eu-west-1
  check_apikey_on_start true
  buffer_type memory
  time_slice_format %Y%m%d%H
  # use longer flush_interval to reduce CPU usage.
  # note that this is a trade-off against latency.
  flush_interval 10s
  buffer_chunk_limit 64m
  format single_value
  store_as text
  num_threads 1
</match>

<match [APPLICATION-NAME]_external-requests_log>
  log_level error
  type s3
  s3_bucket {0}
  path [APPLICATION-NAME]/{1}/application_logs
  s3_region eu-west-1
  check_apikey_on_start true
  buffer_type memory
  time_slice_format %Y%m%d%H
  # use longer flush_interval to reduce CPU usage.
  # note that this is a trade-off against latency.
  flush_interval 10s
  buffer_chunk_limit 64m
  format single_value
  store_as text
  num_threads 1
</match>

<match [APPLICATION-NAME]_status_log>
  log_level error
  type s3
  s3_bucket {0}
  path [APPLICATION-NAME]/{1}/application_logs
  s3_region eu-west-1
  check_apikey_on_start true
  buffer_type memory
  time_slice_format %Y%m%d%H
  # use longer flush_interval to reduce CPU usage.
  # note that this is a trade-off against latency.
  flush_interval 10s
  buffer_chunk_limit 64m
  format single_value
  store_as text
  num_threads 1
</match>
"""

def main(component_json_path):
    config = json.load(open(component_json_path))

    try:
        bucket = config["configuration"]["s3_bucket_name"]
        environment = config["environment"]
        print "bucket name: ", bucket
        print "environment: ", environment
    except KeyError:
        raise Exception("Key 'configuration/s3_bucket_name' and/or 'environment' are missing from the configuration.")

    with open(TD_AGENT_CONFIG_FILE, "a") as f:
        f.write(TD_AGENT_CONFIG.format(bucket, environment))

print "sys.arg", sys.argv[1]

if __name__ == "__main__":
    main(sys.argv[1])
```

---

`-example-configure-td-agent.sh`

```bash
#!/bin/sh

# Create a folder under which tailing positions are to be stored, one per tailed source.
# Adjust permissions afterwards.
mkdir -p /var/log/td-agent/tmp
chown -R td-agent:td-agent /var/log/td-agent/tmp
chown -R td-agent:td-agent /var/run/td-agent

# All Ruby Libraries should be owned by td-agent.
chown -R td-agent:td-agent /opt/td-agent

# Move away the original conf file shipped with the RPM.
mv /etc/td-agent/td-agent.conf /etc/td-agent/td-agent.conf.default
echo ">>> Backed-up original td-agent configuration"

# Replace it with what we prefer.
cat /etc/bake-scripts/td-agent.conf >> /etc/td-agent/td-agent.conf
echo ">>> Written custom td-agent configuration."
```

---

`-example-start-td-agent.py`

```python
#! /usr/bin/env python
import sys
import json
import subprocess

# The configuration.json file is passed in as a first argument to all bake-scripts.
config_file = sys.argv[1]

# Read the config file and load it into into a python dictionary.
config = json.load(open(config_file))

# Extracting just the secure configuration part.
environment = config.get("environment")

print "environment is " + environment

if environment == "live":
    print "Attempting to install td-agent"
    subprocess.call(["/bin/chmod", "a+x", "/etc/init.d/td-agent"])
    subprocess.call(["chkconfig", "--add", "td-agent"])
    subprocess.call(["chkconfig", "td-agent", "on"])
```

---

`-example-checks-before-starting.sh`

```bash
#!/bin/sh

DEFAULT_EXAMPLE_RUNNING_PID=target/universal/stage/DEFAULT_EXAMPLE_RUNNING_PID
DEFAULT_CERTIFICATES_DIRECTORY=/etc/pki/tls/private

echo -e "\n ---[Starting checks before start...]--- \n"

echo -e ">. Ensureing PID file and associated processes are destroyed...."

### 1. Destroy the process.

if [ -f ${DEFAULT_EXAMPLE_RUNNING_PID} ]
then
        echo "+ >. Stopping DEFAULT_EXAMPLE_RUNNING_PID";
        kill `cat ${DEFAULT_EXAMPLE_RUNNING_PID}` && sleep 5;
fi

### 2. Check that the PID file is removed.

if [ -f ${DEFAULT_EXAMPLE_RUNNING_PID} ]
then
        echo "+ >. Deleting DEFAULT_EXAMPLE_RUNNING_PID file as it is still here...";
        rm ${DEFAULT_EXAMPLE_RUNNING_PID};
fi

### 3. Confirm the correct certificates are in the right place.

echo -e ">. Checking certs in place..."

ARE_CERTIFICATES_IN_CORRECT_PLACE=true

if [ ! -f "${DEFAULT_CERTIFICATES_DIRECTORY}/DefaultExampleCertificateName.p12" ]
then
        echo " >. WARN ${DEFAULT_CERTIFICATES_DIRECTORY}/DefaultExampleCertificateName.p12 is not present.";
        $ARE_CERTIFICATES_IN_CORRECT_PLACE = false;
fi

if [ "$ARE_CERTIFICATES_IN_CORRECT_PLACE" = false ]
then
    echo "  * Run python to create missing certificates using the relevant json config e.g. /etc/app-name/config-for-app-name.json.";
fi

echo -e "\n ---[Finished checks before starting.]--- "
```

---

`-example-initd-script.sh`

```bash
#!/usr/bin/env bash
###!/bin/sh
###
### default-example-application-name service
###
### chkconfig:   35 99 99
### description: default-example-application description

### Source function library.
. /etc/rc.d/init.d/functions

exec="java -jar -Dhttp.port=8080 /usr/lib/default-example-application-name/default-example-application-name.jar"
prog="default-example-application-name"
pidfile="/var/run/default-example-application-name/default-example-application-name.pid"
output_logfile=/var/log/default-example-application-name/output.log

[ -e /etc/sysconfig/$prog ] && . /etc/sysconfig/$prog

lockfile=/var/lock/subsys/$prog

start() {
    echo -n $"Initialising $prog: "
    daemon --pidfile=${pidfile} $exec
    retval=$?
    echo
    [ $retval -eq 0 ] && touch $lockfile
    return $retval
}

stop() {
    echo -n $"Shutting down $prog: "
    killproc -p $pidfile
    retval=$?
    echo
    [ $retval -eq 0 ] && rm -f $lockfile
    echo "Application shut down." >> $output_logfile
    return $retval
}

reload() {
    restart
}

restart() {
    stop
    start
}

rh_status_q() {
    rh_status >/dev/null 2>&1
}

force_reload() {
    restart
}

rh_status() {
    # Check to see if the service is running or use generic status instead.
    status -p $pidfile $prog
}

case "$1" in
    start)
        rh_status_q && exit 0
        $1
        ;;
    stop)
        rh_status_q || exit 0
        $1
        ;;
    restart)
        $1
        ;;
    reload)
        rh_status_q || exit 7
        $1
        ;;
    force-reload)
        force_reload
        ;;
    status)
        rh_status
        ;;
    conditionalrestart|try-restart)
        rh_status_q || exit 0
        restart
        ;;
    *)
        echo $"How to use: $0 {stop|start|restart|status|force-reload|try-restart|conditionalrestart|reload}"
        exit 2
esac
exit $?
```

---

`-example-python-packaging-script.py`

```python
def package(self):
    specfile = self.spec
    specfile.set_build_arch("x86_64")
    default_jar_file_location_example = self.root +"default-example-target/scala-2.11/" + self.name + ".jar"
    default_init_d_script_location_example = self.root +"initd_script.sh"

    # Copy the required files in the source "src/" directory.
    self.run(["cp", "-R", default_init_d_script_location_example, self.sources_dir])
    self.run(["cp", "-R", default_jar_file_location_example, self.sources_dir])

    # Add required files as sources in the specfile.
    source = specfile.add_source(self.name + ".jar")
    init_d_script = specfile.add_source("initd_script.sh")

    # Adding required install steps.
    specfile.add_install_steps([
        ["mkdir", "-p", "%{buildroot}/usr/lib/" + self.name],
        ["cp", "-R", source, "%{buildroot}/usr/lib/" + self.name],
        ["mkdir", "-p", "%{buildroot}%{_initddir}"],
        ["cp", "-R", init_d_script, "%{buildroot}%{_initddir}/" + self.name]
    ])

    # Add the required files permissions.
    specfile.add_files(["/usr/lib/" + self.name])
    self.spec.add_files(
        ["%{_initddir}/" + self.name],
        file_permissions=755,
        dir_permissions=755
    )
```

---

`-example-python-package.py`

```python
def package(self):
    specfile = self.spec
    specfile.set_build_arch("x86_64")
    location_to_my_jar = self.root +"/target/scala-2.11/" + self.name + ".jar"
    location_to_init_d_script = self.root +"/initd_script.sh"
    location_to_whitelist_test = self.root + "/conf/whitelist/test.txt"
    location_to_whitelist_live = self.root + "/conf/whitelist/live.txt"

    # Copy the required files in src/ into the sources dir
    self.run(["cp", "-R", location_to_my_jar, self.sources_dir])
    self.run(["cp", "-R", location_to_init_d_script, self.sources_dir])
    self.run(["cp", "-R", location_to_whitelist_test, self.sources_dir])
    self.run(["cp", "-R", location_to_whitelist_live, self.sources_dir])

    # Add them as sources in the specfile
    source = specfile.add_source(self.name + ".jar")
    init_d_script = specfile.add_source("initd_script.sh")
    whitelist_source_test = specfile.add_source("conf/whitelist/test.txt")
    whitelist_source_live = specfile.add_source("conf/whitelist/live.txt")

    # Add the required install steps
    specfile.add_install_steps([
        ["mkdir", "-p", "%{buildroot}/usr/lib/" + self.name],
        ["cp", "-R", source, "%{buildroot}/usr/lib/" + self.name],
        ["mkdir", "-p", "%{buildroot}%{_initddir}"],
        ["cp", "-R", init_d_script, "%{buildroot}%{_initddir}/" + self.name],
        ["mkdir", "-p", "%{buildroot}/usr/lib/"+ self.name + "/conf/whitelist/"],
        ["cp", "-R", whitelist_source_test, "%{buildroot}/usr/lib/" + self.name + "/conf/whitelist/test.txt"],
        ["cp", "-R", whitelist_source_live, "%{buildroot}/usr/lib/" + self.name + "/conf/whitelist/live.txt"]
    ])

    # Add the required files permissions
    specfile.add_files(["/usr/lib/" + self.name])
    self.spec.add_files(
        ["%{_initddir}/" + self.name],
        file_permissions=755,
        dir_permissions=755
    )
```

---
