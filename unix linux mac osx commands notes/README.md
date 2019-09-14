# unix linux mac osx commands notes
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----
----



----

|||mac commands
|||system_profiler
|||system profiler

```bash
### Mac OS list all software applications.
system_profiler SPApplicationsDataType

### Mac OS list system information.
system_profiler
```

----

||find command
|||unix commands
|||linux commands
|||mac commands

```bash
sudo find . -name something.txt

sudo find ~/ -iname "*.backup*."

find . -name "*" -print0 | xargs -0 egrep example-search-term

# http://osxdaily.com/2013/01/29/list-all-files-subdirectory-contents-recursively/
# List All Files Recursively with Full Directory Paths Shown

find ~/Desktop/Sample/ -type f

# https://perishablepress.com/list-files-folders-recursively-terminal/
# Save everything to file*

find . -type f > ../files-all.txt
```
----

|||unix commands
|||linux commands
|||mac commands
|||sudo

```bash
# super user

sudo
```

----

|||unix commands
|||linux commands
|||mac commands
|||list ports
|||netstat
|||network 
|||networks
|||networking

lsof -i -P | grep -i "listen"


netstat -atp tcp | grep -i "listen"


netstat -ap tcp


whois 17.172.233.109


|||network 
|||networks
|||networking
|||nslookup
|||ping
|||ifconfig
|||trace
|||dig

```bash
nslookup www.google.co.uk

ping www.google.co.uk

ifconfig

trace -rt

### OS X has a DNS cache
$ sudo killall -HUP mDNSResponder

dig www.google.co.uk
```

----

|||ps -ef
|||kill
|||top
|||htop
|||pgrep
|||pkill
|||linux processes
|||mac processes
|||unix commands
|||linux commands
|||mac commands
 
ps -ef|grep java

ps ax|grep -i java

ps aux|grep java

kill -kill 18237

kill -9 18237

top

htop

pgrep -f java

pkill -f java

----

mac terminal count files in folder without ds_store

```bash
find . ! -name '.*' -type f | wc -l
```

https://stackoverflow.com/questions/23325305/count-only-visible-files-in-directory


----


|||unix commands

|||linux commands

|||mac commands

|||counting files in a directory from the terminal

|||count files in a dir without .ds_store

|||.ds_store

|||list files in a directory

```bash

http://hints.macworld.com/article.php?story=20010508182132282

$ cd directory_to_count

$ ls | wc -l

###

$ find / -print | wc -l


https://askubuntu.com/questions/34099/find-number-of-files-in-folder-and-sub-folders

To count files (even files without an extension) recursively from the root of the current directory, use:

$ ls -lR | grep ^- | wc -l

###

$ find . -type f | wc -l

###

$ tree share/some/directory/ | tail -1

558 directories, 853 files

$ tree -L 2 share/some/directory/ | tail -1

120 directories, 3 files


### recursively

tree -p share/some/directory/ | tail -1


http://hints.macworld.com/article.php?story=20020410125219343

$ find "Stuff/" \! -name ".*" | wc -l
```


|||bash count files |||mac count files |||linux count files |||count files


https://askubuntu.com/questions/34099/find-number-of-files-in-folder-and-sub-folders


http://hints.macworld.com/article.php?story=20010508182132282


https://stackoverflow.com/questions/12656427/count-number-of-specific-file-type-of-a-directory-and-its-sub-dir-in-mac


https://stackoverflow.com/questions/7058273/how-do-i-get-bash-on-os-x-lion-to-ignore-ds-store-files-during-tab-completion


https://discussions.apple.com/thread/5309983


```bash
142 files + directories + .DS_Store + .localized


136 files + directories


133 files - directories - .DS_Store - .localized


Commands:


ls -lR | grep ^- | wc -l

### Result: 133


find ~/Downloads/ -type f | wc -l

### Result: 138


find ~/Downloads/ -not -type d | wc -l

### Result: 138


find ~/Downloads/ -not -name ".DS_Store" | wc -l

### Result: 138


find ~/Downloads/ -not -name ".localized" | wc -l

### Result: 141



### https://askubuntu.com/questions/266179/how-to-exclude-ignore-hidden-files-and-directories-in-a-wildcard-embedded-find

find ~/Downloads/ -name ".*" -prune -o -print | wc -l

### Result: 137


find ~/Downloads/ -not -path '*/\.*' -type f \( ! -iname ".*" \) | wc -l

### Result: 133


find ~/Downloads/ \( ! -regex '.*/\..*' \) -type f | wc -l

### Result: 133



### https://unix.stackexchange.com/questions/90106/whats-the-most-resource-efficient-way-to-count-how-many-files-are-in-a-director

```


----

||mac remove extended metadata
|||where from metadata
|||mac remove where from metadata
|||unix commands
|||linux commands
|||mac commands

https://stackoverflow.com/questions/4833052/how-do-i-remove-the-extended-attributes-on-a-file-in-mac-os-x

$ xattr s.7z
com.apple.metadata:kMDItemWhereFroms
com.apple.quarantine

and use the -d option to delete one extended attribute:
$ xattr -d com.apple.quarantine s.7z
$ xattr s.7z
com.apple.metadata:kMDItemWhereFroms

you can also use the -c option to remove all extended attributes:
$ xattr -c s.7z
$ xattr s.7z

xattr -h will show you the command line options

----

|||linux disk space
|||mac disk space
|||unix commands
|||linux commands
|||mac commands
|||disk space
|||free disk space
|||size of disk
|||disk size
|||directory size
|||size of directory

```bash
### lists directory sizes

du -sh /*


du -sh *


### disk space

df -h -l

http://www.codecoffee.com/tipsforlinux/articles/22.html

How to find - Size of a directory & Free disk space


This article explains 2 simple commands that most people want to know when they start using Linux. They are finding the size of a directory and finding the amount of free disk space that exists on your machine. The command you would use to find the directory size is ' du '. And to find the free disk space you could use ' df '.


All the information present in this article is available in the man pages for du and df. In case you get bored reading the man pages and you want to get your work done quickly, then this article is for you.



'du' - Finding the size of a directory


$ du

Typing the above at the prompt gives you a list of directories that exist in the current directory along with their sizes. The last line of the output gives you the total size of the current directory including its subdirectories. The size given includes the sizes of the files and the directories that exist in the current directory as well as all of its subdirectories. Note that by default the sizes given are in kilobytes.



$ du /home/david

The above command would give you the directory size of the directory /home/david



$ du -h

This command gives you a better output than the default one. The option '-h' stands for human readable format. So the sizes of the files / directories are this time suffixed with a 'k' if its kilobytes and 'M' if its Megabytes and 'G' if its Gigabytes.



$ du -ah

This command would display in its output, not only the directories but also all the files that are present in the current directory. Note that 'du' always counts all files and directories while giving the final size in the last line. But the '-a' displays the filenames along with the directory names in the output. '-h' is once again human readable format.



$ du -c

This gives you a grand total as the last line of the output. So if your directory occupies 30MB the last 2 lines of the output would be


30M .

30M total


The first line would be the default last line of the 'du' output indicating the total size of the directory and another line displaying the same size, followed by the string 'total'. This is helpful in case you this command along with the grep command to only display the final total size of a directory as shown below.



$ du -ch | grep total

This would have only one line in its output that displays the total size of the current directory including all the subdirectories.


Note : In case you are not familiar with pipes (which makes the above command possible) refer to Article No. 24 . Also grep is one of the most important commands in Unix. Refer to Article No. 25 to know more about grep.



$ du -s

This displays a summary of the directory size. It is the simplest way to know the total size of the current directory.



$ du -S

This would display the size of the current directory excluding the size of the subdirectories that exist within that directory. So it basically shows you the total size of all the files that exist in the current directory.



$ du --exculde=mp3

The above command would display the size of the current directory along with all its subdirectories, but it would exclude all the files having the given pattern present in their filenames. Thus in the above case if there happens to be any mp3 files within the current directory or any of its subdirectories, their size would not be included while calculating the total directory size.



'df' - finding the disk free space / disk usage


$ df

Typing the above, outputs a table consisting of 6 columns. All the columns are very easy to understand. Remember that the 'Size', 'Used' and 'Avail' columns use kilobytes as the unit. The 'Use%' column shows the usage as a percentage which is also very useful.



$ df -h

Displays the same output as the previous command but the '-h' indicates human readable format. Hence instead of kilobytes as the unit the output would have 'M' for Megabytes and 'G' for Gigabytes.


Most of the users don't use the other parameters that can be passed to 'df'. So I shall not be discussing them.


I shall in turn show you an example that I use on my machine. I have actually stored this as a script named 'usage' since I use it often.


Example :


I have my Linux installed on /dev/hda1 and I have mounted my Windows partitions as well (by default every time Linux boots). So 'df' by default shows me the disk usage of my Linux as well as Windows partitions. And I am only interested in the disk usage of the Linux partitions. This is what I use :


$ df -h | grep /dev/hda1 | cut -c 41-43


This command displays the following on my machine


45%


Basically this command makes 'df' display the disk usages of all the partitions and then extracts the lines with /dev/hda1 since I am only interested in that. Then it cuts the characters from the 41st to the 43rd column since they are the columns that display the usage in % , which is what I want.


Note : In case you are not familiar with pipes (which is used in the above command) then refer to Article No. 24 . 'cut' is another tool available in Unix. The above usage of cut gets the the characters that are present in the specified columns. If you are interested in knowing how to mount you Windows partitions under Linux, please refer to Article No. 3 .


There are a few more options that can be used with 'du' and 'df' . You could find them in the man pages.
```

----

|||unix commands
|||linux commands
|||mac commands
|||list linux users

cat /etc/passwd

----

|||unix commands
|||linux commands
|||mac commands
|||chmod

```bash
chmod +w /usr/local/bin

chmod 644 = -rw-r--r--

chmod 600 = -rw-------

chmod 777 = xrwxrwxrw

chmod -R 777 = xrwxrwxrw
```

https://www.maketecheasier.com/file-permissions-what-does-chmod-777-means/

0 - no permission
1 - execute
2 - write
3 - write and execute
4 - read
5 - read and execute
6 - read and write
7 - read, write, and execute

----

|||unix commands
|||linux commands
|||mac commands
|||chown

sudo chown -R $(whoami):admin /usr/local

----

|||unix commands
|||linux commands
|||mac commands
|||ls
|||list directory

ls

ls -a

ls -la

ls -hal

ls -halt

----

|||unix directory depth filename path limits
|||linux directory depth filename path limits
|||mac directory depth filename path limits
|||windows directory depth filename path limits
|||file system limits

https://unix.stackexchange.com/questions/28997/on-deep-created-directories

```bash
The actual limits can depend both on the filesystem you're using, and the kernel.

To find out the limits for a particular mount point, you can use getconf (ex. for / on my machine):

$ getconf  PATH_MAX /
4096
$ getconf  NAME_MAX /
255
PATH_MAX is the maximum total length, NAME_MAX if for the filename. The kernel limits are in include/linux/limits.h in the kernel source:

#define NAME_MAX         255    /* # chars in a file name */
#define PATH_MAX        4096    /* # chars in a path name including nul */
For a list of filesystem limits, see Comparison of file systems.

The filesystem limits dictate the maximum nesting level (if any) for directories and then length of file and directory names for that filesystem. The kernel limits dictate how long strings that refer to paths can be.
You can actually have a nesting structure that exceeds the PATH_MAX limit. But you won't be able to refer to it with a fully-qualified path from root. You should also expect strange software bugs if you use such deep structures, since a lot of code expects paths to fit within PATH_MAX buffers, and checking for ENAMETOOLONG errors (and correctly recovering from them) is probably not one of the best-tested code paths out there.

As for organization, just use whatever feels more natural. Keep hierarchies reasonable, avoid strange characters (and whitespace) if you want to be script-safe/friendly. Those limits are quite generous. If you ever get near PATH_MAX, it's probably time to reorganize things.

If you do want to test out how things behave in very lengthy paths, here's a fast way to generate huge paths:

#! /usr/bin/perl

my $kd = "a" x 255;
for my $i (1..64) {
  mkdir($kd); chdir($kd);
}
If you want a deep hierarchy, try with:

#! /usr/bin/perl

my $kd = "a";
for my $i (1..8192) {
  mkdir($kd); chdir($kd);
}
And you can get:

$ pwd | wc -c
16394
But ksh gets a bit confused:

$ cd ..
ksh: cd: ..: [File name too long]
bash does do the cd .., but the prompt is messed up, the directory name is not resolved - so pwd | wc -c is actually 16397 after that.

share
improve this answer
edited Jan 15 '12 at 11:52
answered Jan 13 '12 at 6:04

Mat

```

----
