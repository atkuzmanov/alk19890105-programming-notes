# unix linux apple mac macos osx commands notes

|||symbolic links in terminal |||symlinks |||mac symlink |||linux symlink

<https://apple.stackexchange.com/questions/115646/how-can-i-create-a-symbolic-link-in-terminal>

```text
┌── ln(1) link, ln -- make links
│   ┌── Create a symbolic link.
│   │                         ┌── the optional path to the intended symlink
│   │                         │   if omitted, symlink is in . named as destination
│   │                         │   can use . or ~ or other relative paths
│   │                   ┌─────┴────────┐
ln -s /path/to/original /path/to/symlink
      └───────┬───────┘
              └── the path to the original file/folder
                  can use . or ~ or other relative paths
```

---

```bash
ls -R /Users/[user]/Downloads/untitled\ folder/ | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'
```

---

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

---

|||unix commands
|||linux commands
|||mac commands
|||sudo

```bash
# super user

sudo
```

---

|||unix commands
|||linux commands
|||mac commands
|||list ports
|||netstat
|||network
|||networks
|||networking

`lsof -i -P | grep -i "listen"`

`netstat -atp tcp | grep -i "listen"`

`netstat -ap tcp`

`whois 17.172.233.109`

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

---

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

`ps -ef|grep java`

`ps ax|grep -i java`

`ps aux|grep java`

`kill -kill 18237`

`kill -9 18237`

`top`

`htop`

`pgrep -f java`

`pkill -f java`

---

mac terminal count files in folder without ds_store

```bash
find . ! -name '.*' -type f | wc -l
```

<https://stackoverflow.com/questions/23325305/count-only-visible-files-in-directory>

---

|||unix commands

|||linux commands

|||mac commands

|||counting files in a directory from the terminal

|||count files in a dir without .ds_store

|||.ds_store

|||list files in a directory

<http://hints.macworld.com/article.php?story=20010508182132282>

```bash
$cd directory_to_count

$ls | wc -l
```

```bash
$find / -print | wc -l
```

<https://askubuntu.com/questions/34099/find-number-of-files-in-folder-and-sub-folders>

To count files (even files without an extension) recursively from the root of the current directory, use:

`$ ls -lR | grep ^- | wc -l`

`$ find . -type f | wc -l`

`$ tree share/some/directory/ | tail -1`

558 directories, 853 files

`$ tree -L 2 share/some/directory/ | tail -1`

120 directories, 3 files

**recursively**

`tree -p share/some/directory/ | tail -1`

<http://hints.macworld.com/article.php?story=20020410125219343>

`$ find "Stuff/" \! -name ".*" | wc -l`

|||bash count files |||mac count files |||linux count files |||count files

<https://askubuntu.com/questions/34099/find-number-of-files-in-folder-and-sub-folders>

<http://hints.macworld.com/article.php?story=20010508182132282>

<https://stackoverflow.com/questions/12656427/count-number-of-specific-file-type-of-a-directory-and-its-sub-dir-in-mac>

<https://stackoverflow.com/questions/7058273/how-do-i-get-bash-on-os-x-lion-to-ignore-ds-store-files-during-tab-completion>

<https://discussions.apple.com/thread/5309983>

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

---

||mac remove extended metadata
|||where from metadata
|||mac remove where from metadata
|||unix commands
|||linux commands
|||mac commands

<https://stackoverflow.com/questions/4833052/how-do-i-remove-the-extended-attributes-on-a-file-in-mac-os-x>

```bash
$ xattr s.7z
com.apple.metadata:kMDItemWhereFroms
com.apple.quarantine

# and use the -d option to delete one extended attribute:
$ xattr -d com.apple.quarantine s.7z
$ xattr s.7z
com.apple.metadata:kMDItemWhereFroms

# you can also use the -c option to remove all extended attributes:
$ xattr -c s.7z
$ xattr s.7z

xattr -h will # show you the command line options
```

---

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

---

|||unix commands
|||linux commands
|||mac commands
|||list linux users

`cat /etc/passwd`

---

|||unix commands
|||linux commands
|||mac commands
|||chmod

```bash
chmod +w /usr/local/bin

chmod 644 = -rw-r--r--

chmod 600 = -rw------

chmod 777 = xrwxrwxrw

chmod -R 777 = xrwxrwxrw
```

<https://www.maketecheasier.com/file-permissions-what-does-chmod-777-means/>

```text
0 - no permission
1 - execute
2 - write
3 - write and execute
4 - read
5 - read and execute
6 - read and write
7 - read, write, and execute
```
---

|||chmod

<https://service.futurequest.net/index.php?/Knowledgebase/Article/View/20/0/how-do-i-change-file-permissions-chmod>

```text
How do I change file permissions? (chmod)
Posted on 24 October 2003 05:52 PM
Change Mode: Automagically
You may change the permissions of any file or directory within your account using your CNC. Once inside your CNC, click on the File Manager menu option. From there, navigate to the file(s) or directory you would like to change the permissions on and check the box next to it, scroll down to the bottom of the list and select the Change Mode button from the Command Menu. Select the desired permissions and click the Change button. That's it! (As a shortcut, you can also just click the permissions link under the Attributes column for the file you wish to change.)
chmod = change mode = set the permissions
And here's what that means
Many are unsure how to change the permissions on a file or directory, and once the how is figured out the confusion between Octal and symbolic or what it all means appears. This tutorial is an effort to help take the confusion out of file and directory permissions.

 

Other Methods to Change Permissions
Via SSH: At the command line prompt, simply type: chmod mode filename
Example: chmod u=rwx,go=rx file.cgi
u = user, g = group, o = other
There is more information available from the command line by typing man chmod or better yet type info \(fileutils\)
Via FTP: If you are using an FTP program, the answer varies. Usually you need to right click on the file and the option will be in the menu. If not, access the help section of your FTP client and search for chmod, permissions, or change mode. Most FTP programs have this feature readily available. Some utilize octal, others utilize symbolic, yet others offer both. Making it equally important to understand how to convert between the two.

 

Octal and Symbolic
Some scripts may say 755 -- this is octal. Others may say -rwxr-xr-x -- this is symbolic. They both are telling you to set the permissions the same exact way:
Read = r = 4
Write = w = 2
Execute = x = 1
There are three types that can get to a file if you allow them to, The Owner, The Group, and Everyone.

So let's assume myfile.cgi requires the owner, to be able to do everything (read it, write to it, and execute it), and requires the group (people/machines with the same access as the owner) to be able to read it and execute it but we do not want them to write to it, and requires the same permissions that the group has given to everyone else.

User = rwx or 7 (since 4 + 2 + 1 = 7)
Group = r-x or 5 (since 4 + 0 + 1 = 5)
All = r-x or 5 (since 4 + 0 + 1 = 5)

The above equals chmod 755 or chmod u=rwx,go=rx

When you realize that setting the permissions on a script to mode 777 means you are giving yourself and the group and EVERYONE else permission to do things to your file, it's easy to see why mode 777 is not always a wise idea.

Default modes if you upload a file to the server and change nothing are:

All Files that are not scripts or directories
644 = -rw-r--r--

All directories and anything that looks like a script (.cgi and .pl files for example)
755 = -rwxr-xr-x
 

Summary
There are three types of permissions:
r	read the file or directory
w	write to the file or directory
x	execute the file or search the directory
Each of these permissions can be set for any one of three types of user:

u	the user who owns the file (usually you)
g	members of the group to which the owner belongs
o	all other users
The access permissions for all three types of user can be given as a string of nine characters:

user	group	others
r w x	r w x	r w x
Permission	File	Directory
r read	read a file	list files in ...
w write	write a file	create file in ...
rename file in ...
delete file ...
x execute	execute a
shell script	read a file in ...
write to a file in ...
execute a file in ...
execute a shell script in ...
 

Setting access permissions numerically

There is a shorthand way of setting permissions by using octal numbers. Read permission is given the value 4, write permission the value 2 and execute permission 1.
r	w	x
4	2	1
These values are added together for any one-user category:
1	=	execute only
2	=	write only
3	=	write and execute (1+2)
4	=	read only
5	=	read and execute (4+1)
6	=	read and write (4+2)
7	=	read and write and execute (4+2+1)
So access permissions can be expressed as three digits. For example:
 	user	group	others
chmod 640 file1	rw-	r--	---
chmod 754 file1	rwx	r-x	r--
chmod 664 file1	rw-	rw-	r--
Note: When installing scripts and the script author instructs you to set the permissions to mode 777, do not do this. It will not work on the FutureQuest servers. Anytime you are instructed to set the permissions to a script to 777 or 775, change them to 755 instead. Due to the way the servers are set up, mode 755 will work and offer you more security at the same time.
```

---

|||unix commands
|||linux commands
|||mac commands
|||chown

`sudo chown -R $(whoami):admin /usr/local`

---

|||unix commands
|||linux commands
|||mac commands
|||ls
|||list directory

```bash
ls

ls -a

ls -la

ls -hal

ls -halt
```

---

|||unix directory depth filename path limits
|||linux directory depth filename path limits
|||mac directory depth filename path limits
|||windows directory depth filename path limits
|||file system limits

<https://unix.stackexchange.com/questions/28997/on-deep-created-directories>

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

---

|||unix commands
|||linux commands
|||mac commands
|||mac locale
|||export environment variables
|||environment variables

```bash
# OS X Terminal UTF-8 issues

$ locale
LANG="en_GB.UTF-8"
LC_COLLATE="en_GB.UTF-8"
LC_CTYPE="en_GB.UTF-8"
LC_MESSAGES="en_GB.UTF-8"
LC_MONETARY="en_GB.UTF-8"
LC_NUMERIC="en_GB.UTF-8"
LC_TIME="en_GB.UTF-8"
LC_ALL="en_GB.UTF-8"

$ export LC_ALL=en_GB.UTF-8
```

---

|||unix commands
|||linux commands
|||mac commands
|||curl
|||bash http https request maker

CURL + Mavericks + Homebrew

The default curl which comes with Mavericks is not working.
To get curl working with Mavericks get a new version using Homebrew

```bash
brew install curl --with-openssl
```

After this you need to link it so it can replace the default curl in your terminal:

```bash
brew link curl --force
```

You might need to use brew switch as well:

```bash
brew switch curl [CURL-VERSION-INSTALLED-WITH-BREW-YOU-WANT-TO-SWITCH-TO]
```

Verify in the command line by running:

```bash
curl --version
```

The "/usr/local/bin" path in your $PATH environment variable must be the last thing that gets added onto it, so that it has precedence to the Mac OSX default curl.
One way of enforcing this is to add this as the very last line in your bash profile:

```bash
export PATH=/usr/local/bin:$PATH
```

Now you should be able to use curl with the following parameters:

```bash
curl --cert "$PATH_TO_DEV_CERT:$CERT_PASS" --cert-type p12 --insecure [URL-YOU-WANT-TO-CURL]
```

To simplify things so you don't have to type all those details, you can add them to a .curlrc file in your home dir (~/.curlrc):

```bash
cert "$PATH_TO_DEV_CERT:$CERT_PASS"
cert-type p12
insecure
```

Now you should be able to use curl like this:

```bash
curl [URL-YOU-WANT-TO-CURL]
```

Links:
<http://curl.haxx.se/docs/mk-ca-bundle.html>
<http://curl.haxx.se/docs/caextract.html>

---

|||curl bypass proxies

```bash
export NO_PROXY=localhost,127.0.0.1,127.0.0.0/8,::1,192.168.59.103,sandbox.dev.example.co.uk
```

---

|||curl with parameters and verb

```bash
curl -X DELETE -G \
'http://localhost:5000/locations' \
-d id=3 \
-d name=Mario \
-d surname=Bros
```

```bash
curl -X GET 'https://api-ssl.bitly.com/v3/shorten?access_token=XXX&longUrl=http%3A%2F%2Fwww.example.co.uk%2Fnews%2F2XXXXXXXXX'
```

```bash
curl --cert /etc/pki/tls/certs/client.crt --key /etc/pki/tls/private/exampleKey.key --cacert /etc/pki/tls/certs/example-ca-chain.crt <endpoint>
```

```bash
curl -v --proxy http://www-example.proxy.com:80/ --cacert /etc/pki/tls/example-ca.pem --cert /Volumes/example/dir/example-cert.cert --key /Volumes/example/dir/example-key.key https://example.com
```

```bash
curl -i -v -X GET \
  -x 'http://www-example.proxy.com:80' \
  -d \
  '' \
  'https://example.com/example/path?access_token=example_token123&longUrl=http%3A%2F%2Fwww.example.com%2Fexample_path%2F' \
  --cacert '/etc/pki/example_certificate.pem' \
  --capath '/etc/pki/'
```

---
|||curl loop script

```bash
clear

echo "[CURL-Loop-Bash-v2.1]" ;

counter=1

while [ true ] ;
do
  # UNIX timestamp concatenated with nanoseconds
  T1="$(date +%s)"

  curl \
  --insecure \
  --request GET \
  --proxy "http://www-example.proxy.com:80" \
  --url "https://example.com/example/path" \
  --header "Cache: no-cache" \
  --header "Content-Type: text/plain" \
  --header "Content-Length: 1024" \
  --data-urlencode "cash_buster=$counter" \
  --data-urlencode "cash_buster-2=$counter" \
  --user-agent "[CURL-Loop-Bash-v2.1]" \
  --include \
  --verbose \
  --location \
  --output "/dev/null" \
  --write-out "\\n Response-HTTP-code: %{http_code} | Current-time: $(date "+%H:%M:%S %d-%m-%Y") | Size: %{size_download} | Total-time-to-complete: %{time_total} \\n"

    ## curl -X POST --data-urlencode 'payload=SOME_DATA' \
    ##  --trace-ascii \

  T2="$(date +%s)"
  T="$(($T2-$T1))"
  ## echo "[Request-Time]: ${T}"

  counter=$((counter+1))
  ## echo "$counter";

  sleep 1 ;
done
```

---

|||curl watch |||watch curl

```bash
watch -n1\
curl -i GET \
   -H "Cache-Control:no-cache" \
   -H "Accept:application/xml" \
 'http://example.com/example/path'
```

---

|||curl formatted output
|||curl formatted time output
|||curl time output |||curl time formatted

<https://blog.josephscott.org/2011/10/14/timing-details-with-curl/>
<https://stackoverflow.com/questions/18215389/how-do-i-measure-request-and-response-times-at-once-using-curl>

Create a new file, curl-format.txt, and paste in:

```bash
    time_namelookup:  %{time_namelookup}\n
       time_connect:  %{time_connect}\n
    time_appconnect:  %{time_appconnect}\n
   time_pretransfer:  %{time_pretransfer}\n
      time_redirect:  %{time_redirect}\n
 time_starttransfer:  %{time_starttransfer}\n
                    --------\n
         time_total:  %{time_total}\n
```

Make a request:

```bash
curl -w "@curl-format.txt" -o /dev/null -s "http://wordpress.com/"
```

Or on Windows, it's...

```bash
curl -w "@curl-format.txt" -o NUL -s "http://wordpress.com/"
```

What this does:

```bash
-w "@curl-format.txt" tells cURL to use our format file
-o /dev/null redirects the output of the request to /dev/null
-s tells cURL not to show a progress meter
"http://wordpress.com/" is the URL we are requesting. Use quotes particularly if your URL has "&" query string parameters
```

---

|||wget
|||bash http https request maker

```bash
wget "https://example.com/example/path"

wget "https://example.com/example/path" --no-check-certificate

wget "https://example.com/example/path" --ca-certificate="/etc/pki/example_truststore"

wget -qO- "https://example.com/example/path" --ca-certificate="/etc/pki/example_truststore"

wget -O- -v -d "https://example.com/example/path" --no-check-certificate
```

---

|||bash |||bash script |||bashscript
|||bash concurrency |||bash script concurrency |||bashscript concurrency
|||concurrent bash |||concurrent bash script |||concurrent bashscript
|||xargs |||xargs concurrency

<https://stackoverflow.com/questions/3002493/bash-how-to-simply-parallelize-tasks>

```bash
# find . -iname "*png" -print0 | xargs -0 --max-procs=4 -n 1 pngout

# xargs -P0 --max-procs=4 -n 1 pngout

find . -iname "*png" -print0 | xargs -P 4 -n 2 pngout
```

---

|||bash
|||bash script
|||grep multiline
|||pcrepgrep multiline
|||multiline grep
|||multiline pcregrep

```bash
pcregrep -M  'ERROR(\n|.)*?TimeoutException'

cat /var/log/example-app/application.log | pcregrep -M  'ERROR(\n|.)*?TimeoutException'
```

<https://stackoverflow.com/questions/2686147/how-to-find-patterns-across-multiple-lines-using-grep>

How to find patterns across multiple lines using grep?

```bash
pcregrep -M  'abc.*(\n|.)*efg' test.txt
```

```bash
perl -ne 'if (/abc/) { $abc = 1; next }; print "Found in $ARGV\n" if ($abc && /efg/); }' yourfilename.txt

perl -e '@lines = <>; $content = join("", @lines); print "Found in $ARGV\n" if ($content =~ /abc.*efg/s);' yourfilename.txt
```

```bash
grep -Pzo "abc(.|\n)*efg" /tmp/tes*
grep -Pzl "abc(.|\n)*efg" /tmp/tes*
```

```bash
awk '/abc/{ln1=NR} /efg/{ln2=NR} END{if(ln1 && ln2 && ln1 < ln2){print "found"}else{print "not found"}}' foo
```

```bash
sed -e '/abc/,/efg/!d' [file-with-content]
```

instead of !d you can simply use p to print:

```bash
sed -n '/abc/,/efg/p' file
```

<https://stackoverflow.com/questions/3717772/regex-grep-for-multi-line-search-needed/7167115#7167115>

Regex (grep) for multi-line search needed `[duplicate]`

Without the need to install the grep variant pcregrep, you can do multiline search with grep.

```bash
grep -Pzo "(?s)^(\s*)\N*main.*?{.*?^\1}" *.c
```

Explanation:

-P activate perl-regexp for grep (a powerful extension of regular extensions)

-z suppress newline at the end of line, subtituting it for null character. That is, grep knows where end of line is, but sees the input as one big line.

-o print only matching. Because we're using -z, the whole file is like a single big line, so if there is a match, the entire file would be printed; this way it won't do that.

In regexp:

(?s) activate PCRE_DOTALL, which means that . finds any character or newline

\N find anything except newline, even with PCRE_DOTALL activated

.*? find . in nongreedy mode, that is, stops as soon as possible.

^ find start of line

\1 backreference to first group (\s*) This is a try to find same indentation of method

As you can imagine, this search prints the main method in a C (*.c) source file.

```bash
awk '/select/,/from/' *.sql
```

<https://stackoverflow.com/questions/152708/how-can-i-search-for-a-multiline-pattern-in-a-file>
How can I search for a multiline pattern in a file?

```bash
find . -iname '*.py' | xargs pcregrep -M '_name.*\n.*_description'
```

<https://serverfault.com/questions/408265/what-are-pcre-limits/408272>
What are PCRE limits?

These appear to be settings internal to the PCRE engine in order to limit the maximum amount of memory/time spent on trying to match some text to a pattern.

<https://linux.die.net/man/3/pcreapi>

<https://stackoverflow.com/questions/16856308/segmentation-fault-in-bash-script-using-find-grep-sed>
Segmentation fault in bash script using find, grep, sed

UPDATE #2: So apparently sed doesn't support non greedy matching, which makes part of my answer invalid. There are ways around this, but I will not include them here as it's far removed from the original question. The answer to this question is using the --disable-stack-for-recursion flag as described below.

---

What is the “You have new mail” message in Linux/UNIX?

> References
> <https://superuser.com/questions/306163/what-is-the-you-have-new-mail-message-in-linux-unix>

Where is this mail?
-

It's likely to be in the spool file: `/var/mail/$USER` or `/var/spool/mail/$USER` are the most common locations on Linux and BSD.

(Other locations are possible &ndash; check if `$MAIL` is set &ndash; but by default, the system only informs you about `/var(/spool)/mail`.)

Usually the spool file is in a very simple *mbox* format, so you can open it in a text editor or pager.

For a slightly more convenient way, most distributions come with a program called `mail` (or `Mail`, `mailx`). You can try `mutt` or `alpine`; you can even configure it to be sent to an outside mailbox. (See "is this real mail?" below.)

What does it contain, and who/what sent it?
-

Most often the messages contain output of cron jobs, or a system security report by *logwatch*, or similar junk. Read it and find out.

How important is it?
-

Depends greatly on the contents of each message.

You *should* at least scan the subject headers &ndash; often people ignore the mail for months never realizing that their daily cron jobs fail.

Is this even actual "mail" in the same sense as email? Or is it just my system telling me something?
-

Yes to both &ndash; it's generated by your system telling you something, but it's also actual email and can be handled as such.

You can (and should) configure your mail software &ndash; the "MTA" aka `/usr/sbin/sendmail` &ndash; to forward the messages to your personal mail address. The exact instructions vary depending on which MTA (if any) you have installed, whether this is a personal computer or a server, whether you have your own domain or use a *@gmail.com*, and so on.

Note that `/usr/sbin/sendmail` nowadays is a shared API and _doesn't_ necessarily mean the original Sendmail MTA. In fact, you _shouldn't_ use Sendmail, but something more modern like OpenSMTPD, Postfix, or Exim4. All of them provide the same `/usr/sbin/sendmail` tool, but they're easier to configure, more secure, and just as powerful.

---
