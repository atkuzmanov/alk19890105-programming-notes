# linux ubuntu setup notes

|||linux set up software
|||ubuntu set up software
|||unix set up

```bash
### Linux Software
## Ubuntu 16 LTS 
## 2016-07-01

#---#

### Linux Ubuntu generic
## http://askubuntu.com/questions/17823/how-to-list-all-installed-packages
## http://askubuntu.com/questions/9135/how-to-backup-settings-and-list-of-installed-packages


#---#

### Linux Ubuntu software notes

### List of open source java profilers:
## http://java-source.net/open-source/profilers

### Password managers safes
## KeePassX
## MyPasswords
## Gpassword Manager



### Sublime Text set up
## Dictionary set up
# https://www.sublimetext.com/docs/2/spell_checking.html
# http://extensions.openoffice.org/en/search?f%5B0%5D=field_project_tags%3A157
# https://github.com/titoBouzout/Dictionaries
# 
# http://stackoverflow.com/questions/18350790/sublime-text-3-and-2-newly-installed-dictionaries-do-not-work
# check that the first line of the .aff file is
# 
# SET UTF-8
# 
# For future reference, my workflow to add dictionaries to ST3 is:
# 
# To add a new language:
# 
# Download the language file from the appropiate OpenOffice extension
# Rename the "some.oxt" file to "some.zip"
# Unzip the file
# Look for two files: "lang.aff" and "lang.dic". For example es_ES.aff and es_ES.dic
# Open the "lang.aff" to check the encoding used. Such the line: SET ISO-8859-1
# Convert that file to UTF-8 from the used encoding
# Convert "lang.dic" to UTF-8 from the used encoding.
# Change SET ISO-8859-1 to SET UTF-8
# In ST3, click on Preferences -> Browse Packages
# Create a new folder, for example Language - Spanish
# Move lang.dic and lang.aff to that folder
# Activate the dictionary in ST3 (View -> Dictionary -> Language - Spanish -> es_ES)
# Press F6 to enable spell check
# adapted from the github repo for SublimeText/Dictionaries (https://github.com/titoBouzout/Dictionaries)
## Sublime Text other notes
# https://www.sublimetext.com/docs/2/column_selection.html
# Column selection - Multi line:
# Right Mouse Button + Shift

#---#
Web only:
Google Photos

#---#
### Linux Ubuntu Software Manual install:

### Google Chrome
## 1. Go to dash and type "Start" -> Startup Applications
## 2. Add command:
## /opt/google/chrome/google-chrome --no-startup-window
## http://askubuntu.com/questions/595622/start-google-chrome-in-background-on-boot
## http://superuser.com/questions/697618/getting-google-chrome-didnt-shut-down-correctly-every-week

## Google Drive alternative
### Insync
### Insync launcher configuration
## Name: Insync
## Command: insync start
### Comment: Launch Insync
### Insynch start up fix:
## $ atanaslk@Elena:~$ crontab -l
## $ @reboot insync-headless start >/dev/null 2>&1
## Remove the above line by editing crontab with:
## crontab -e

### Java JRE
### Java JDK
### OpenJDK
### Google Music Manager
### Google Earth
### Atom - text editor
### Comodo - antivirus
### Dropbox
### Eclipse JEE
### Sublime Text 2
### InteeliJ Idea Community Edition
### Opera
### Gparted Live
### JD-Gui ## Java de-compiler
### Pinta
### Skype
### Teamviewer
### Vagrant
### VirtualBox
### VirtualBox Guest Additions
### VeraCrypt
### Viber
### Visualvm
### Whatsie ## WhatsUp desktop client
### Solitaire
### Typesafe Activator
### Play2Framework
### Spring MVC Framework
### Grails
### yEd
### Slack ## Team chat software.
### yourkit java profiler ## Java profiler.
### jprofiler ## JProfiler is a commercial and cross-platform award-winning all-in-one Java profiler.
### jrat ## java profiler


#---#

### Java; ubuntu switch between java versions
### https://help.ubuntu.com/community/Java
### http://askubuntu.com/questions/121654/how-to-set-default-java-version
### http://superuser.com/questions/813737/temporarily-switch-java-version-in-bash-script-ubuntu-linux

# Choosing the default Java to use
# If your system has more than one version of Java, configure which one your system uses by entering the following command in # a terminal window
# $sudo update-alternatives --config java

# This will present you with a selection that looks similar to the following (the details may differ for you):
# 
# There are 2 choices for the alternative java (providing /usr/bin/java).  
# Selection Path Priority Status 
# ———————————————————— 
# * 0 /usr/lib/jvm/java-6-openjdk/jre/bin/java 1061 auto mode 
# 1 /usr/lib/jvm/jre1.7.0/jre/bin/java 3 manual mode  
# 
# Press enter to keep the current choice[*], or type selection number: 1

#---#

### Fix wi-fi not working after suspend
## http://askubuntu.com/questions/452826/wireless-networking-not-working-after-resume-in-ubuntu-14-04
## Use script:
# #!/bin/sh
# 
# case "${1}" in
#   resume|thaw)
#     nmcli r wifi off && nmcli r wifi on;
# esac
## Put this in /etc/pm/sleep.d/10_resume_wifi and the problem should be fixed immediately.
## Add correct permissions: 
## $sudo chmod +x 10_resume_wifi 
## Solution 2
## I got a solution but it is just for restarting your network manager.
# $sudo service network-manager restart
### Solution 3: My solution, the above script with the service network-manager restart command:
# #!/bin/sh
# 
# case "${1}" in
#   resume|thaw)
#     # nmcli r wifi off && nmcli r wifi on;
#     service network-manager restart
# esac
## Put this in /etc/pm/sleep.d/10_resume_wifi
## Add correct permissions: $sudo chmod +x 10_resume_wi

### GParted; GParted Live
## http://gparted.org/display-doc.php?name=help-manual#gparted-move-partition
## http://askubuntu.com/questions/435655/gparted-merge-unallocated-space-to-ext4-partition
## http://askubuntu.com/questions/269045/how-to-merge-an-unallocated-partition-with-an-extended-partition

### Disks; disk space; hdd free space;
## http://askubuntu.com/questions/73160/how-do-i-find-the-amount-of-free-space-on-my-hard-drive
## http://askubuntu.com/questions/432836/how-can-i-check-disk-space-used-in-a-partition-using-the-terminal-in-ubuntu-12-0

#---#

### Linux format exFat 
## https://github.com/relan/exfat
## https://www.maketecheasier.com/format-exfat-in-ubuntu/
## http://blog.campodoro.org/?p=261

## $sudo fdisk -lh
## $sudo fdisk -lu /dev/sda

## $sudo parted
## $sudo parted /dev/sda unit GB print free | grep 'Free Space' | tail -n1 | awk '{print $3}'

## $sudo lsblk
## $sudo lsblk -o NAME,FSTYPE,SIZE,MOUNTPOINT,LABEL


## $sudo mkfs.exfat -n LABEL /dev/sdXn

## $sudo mkfs.exfat -n Storage /dev/sda3

#---#

### apt; apt-get; sudo apt-get install; sudo apt install;

### Apt Google repo
### https://www.google.com/linuxrepositories/
### http://www.ubuntuupdates.org/ppa/google_chrome
### wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
### sudo apt update
### sudo apt upgrade

### Linux software package manager
sudo apt install synaptic

### Linux software package manager
sudo apt install aptitude

### Start up editor
sudo apt-get install alacarte

### Clam antivirus
sudo apt install clamav
sudo apt install clamav-base
sudo apt install clamav-docs
sudo apt install clamtk

### Video player
sudo apt install vlc

### Diff viewer
sudo apt install meld

### Java; openjdk;
sudo apt install openjdk-8-jdk

### Java; jvm;
sudo apt install visualvm

### Archive manager; zip; rar;
sudo apt install p7zip-full

### PDF Reader
sudo apt install xpdf

### PDF Viewer
sudo apt install qpdfview

### Adobe flash player
sudo apt install adobe-flashplugin
sudo apt install adobe-flash-properties-gtk
# sudo apt install adobe-flash-properties-kde

### Eclipse
sudo apt install eclipse

### Image editor
sudo apt install inkscape

### Virtual machine
sudo apt install virtualbox
sudo apt install virtualbox-guest-additions-iso

### Virtual machine
sudo apt install vagrant

### Image editor
sudo apt install pinta

### Skype; messenger;
sudo apt install skype

### Whatsap; messenger;
sudo apt install whatsie

### VIM
sudo apt install vim

### Firefox; web browser;
sudo apt intall firefox

### Office suite; Libreoffice; Database editor;
sudo apt install libreoffice-base
sudo apt install libreoffice-base-core
sudo apt install libreoffice-base-drivers

### Mysql
mysql-workbench

### Cleaner; CCleaner alternative;
sudo apt-get install bleachbit

### Github
sudo apt-get install git

### Emacs
sudo apt-get install emacs

### Curl
sudo apt install curl

### ZSH
sudo apt-get install zsh

### Xchat; IRC;
sudo apt install xchat-gnome

### Screen warm light; flux alternative;
sudo apt install redshift

### CD Burning
sudo apt install brasero

### Music editor
sudo apt install audacity

### Desktop wallpaper changer
sudo apt install variety

### Google golang go language
sudo apt install golang

###  cpu temperature monitoring sensors
## https://help.ubuntu.com/community/SensorInstallHowto
sudo apt install lm-sensors 
sensors-detect #and choose YES to all YES/no questions

###  HDD temperature
sudo apt install hddtemp

###  Temperature sensors graphics
sudo apt install psensor

###  Ubuntu temperature sensors graphics
sudo apt install sensors-applet

### SQLite
sudo apt install sqlite
sudo apt install sqlite-doc
sudo apt install sqlitebrowser
## sudo apt install sqlite3
## sudo apt install sqlite3-doc

### File system search tool
sudo apt install gnome-search-tool

## Cron jobs; Crontab
## https://help.ubuntu.com/community/CronHowto

### MP3 Tag editor
sudo apt install easytag

### Image editor
sudo apt install gimp

### Google drive command line alternative
## sudo apt install grive
## https://github.com/odeke-em/drive#requirements
## Install go language
## Add GOPATH to bashrc
## $ cat << ! >> ~/.bashrc
## > export GOPATH=\$HOME/gopath
## > export PATH=\$GOPATH:\$GOPATH/bin:\$PATH
## > !
## $ source ~/.bashrc # To reload the settings and get the newly set ones # Or open a fresh terminal
## Installation:
## $ go get -u github.com/odeke-em/drive/cmd/drive

### HDD Disk partition manager
sudo apt install gparted

### Terminal alternatives
## sudo apt install terminator
## sudo apt install tilda
## sudo apt install guake
## sudo apt install guake-indicator
## sudo apt install yakuake

### Necessary for VeraCrypt and TrueCrypt
sudo apt install dmsetup

### Good old games - games for linux: https://www.gog.com/

### Steam games
sudo apt install steam
sudo apt install steamcmd

### Screensaver; xscreensaver
sudo apt install xscreensaver
sudo apt install xscreensaver-data
sudo apt install xscreensaver-data-extra
sudo apt install xscreensaver-gl
sudo apt install xscreensaver-gl-extra
sudo apt install xscreensaver-screensaver-bsod
sudo apt install xscreensaver-screensaver-webcollage
sudo apt install xscreensaver-screensaver-dizzy

### Openarena; game; 3d first person shooter; Quake3Arena alternative;
sudo apt install openarena
sudo apt install openarena-server
sudo apt install openarena-dbg

### Wine; Microsoft Windows Compatibility Layer (meta-package)
sudo apt install wine

### Winetricks; Microsoft Windows Compatibility Layer (winetricks)
sudo apt install winetricks

### Maven
sudo apt install maven

### Scala
sudo apt install scala
sudo apt install scala-doc

### SBT
echo "deb https://dl.bintray.com/sbt/debian /" | sudo tee -a /etc/apt/sources.list.d/sbt.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2EE0EA64E40A89B84B2DF73499E82A75642AC823
sudo apt-get update
sudo apt-get install sbt

### MongoDB
sudo apt install mongodb

### jmeter; Load testing and performance measurement application (main application)
sudo apt install jmeter
sudo apt install jmeter-help
sudo apt install jmeter-apidoc
sudo apt install jmeter-java
sudo apt install jmeter-http

### groovy; Agile dynamic language for the Java Virtual Machine
sudo apt install groovy2
sudo apt install groovy2-doc

### gradle; Powerful build system for the JVM
sudo apt install gradle
sudo apt install gradle-doc

### sound-juicer; GNOME CD Ripper
sudo apt install sound-juicer

### tomcat; Apache Tomcat 8 - Servlet and JSP engine
sudo apt install tomcat8
sudo apt install tomcat8-docs
sudo apt install tomcat8-admin
sudo apt install tomcat8-examples
sudo apt install tomcat8-user

### jetty; Java servlet engine and webserver
# sudo apt install jetty8
sudo apt install jetty9

### svn; subversion; Advanced version control system
sudo apt install subversion
sudo apt install subversion-dbg
sudo apt install subversion-tools

### clojure; Lisp dialect for the JVM
sudo apt install clojure1.6

### tool to adjust advanced configuration settings for GNOME
sudo apt install gnome-tweak-tool

### stunnel - Universal SSL tunnel for network daemons
sudo apt install stunnel4

### dia - uml diagram editor
sudo apt install dia

### Mixxx - Digital Disc Jockey Interface
sudo apt install mixxx

### Midnight Commander - MC - a powerful file manager
sudo apt install mc

### htop - interactive processes viewer
sudo apt install htop

### hprof-conv - converts the HPROF file that is generated by the Android SDK tools to a standard format so you can view the file in a profiling tool of your choice.
sudo apt install hprof-conv

### redis - Persistent key-value database with network interface
sudo apt install redis-server

### cmatrix - simulates the display from "The Matrix"
sudo apt install cmatrix

### caffeine - prevents the desktop becoming idle in full-screen mode
sudo apt install caffeine

### keepassx - Cross Platform Password Manager
sudo apt install keepassx

### enca - file character encoding detector and converter
sudo apt install enca

### command-line JSON processor https://stedolan.github.io/jq/download/
sudo apt-get install jq


### Vysor for viewing Android devices on computers
sudo apt-get install vysor ### ??? not tested
```

---
