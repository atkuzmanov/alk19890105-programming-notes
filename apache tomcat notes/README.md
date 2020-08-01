# apache tomcat notes

|||tomcat
|||apache tomcat

```bash
## Tomcat script which clears logs, installs war file and restarts application

sudo /sbin/service apache-tomcat-name_of_example_application stop

sudo rm -rf /usr/local/apache-tomcat-name_of_example_application/webapps/name_of_example_application

sudo rm -rf /data/app-logs/apache-tomcat-name_of_example_application/*

sudo cp target/name_of_example_application.war

/usr/local/apache-tomcat-name_of_example_application/webapps/name_of_example_application.war

sudo /sbin/service apache-tomcat-name_of_example_application start

sudo /etc/init.d/memcached restart

./restart.sh
```

---

|||war
|||war file

<https://unix.stackexchange.com/questions/84093/how-to-read-a-war-file>

How to read a .war file?
war files are packed. You can extract the information by using either of the following commands:

```bash
jar -xvf Sample.war
unzip Sample.war
```

<https://stackoverflow.com/questions/23000741/one-liner-for-listing-contents-of-file-within-war-file>

One liner for listing contents of file within war file

```bash
unzip -qc SOME_WAR_FILE.war META-INF/MANIFEST.MF
```

---

|||rpm
|||rpm file

<https://blog.packagecloud.io/eng/2015/10/13/inspect-extract-contents-rpm-packages/>

The following command will list all the files inside an RPM package:

`$ rpm -qlp ./path/to/test.rpm`

List files inside of an already installed RPM package
Use the rpm command with -q and -l flags to list the files from an installed RPM package:

`$ rpm -ql packagecloud-test`

|||fedora
|||redhat
|||rpm

Creating RPM Packages with Fedora

<https://fedoraproject.org/wiki/How_to_create_an_RPM_package#SPEC_file_overview>

---
