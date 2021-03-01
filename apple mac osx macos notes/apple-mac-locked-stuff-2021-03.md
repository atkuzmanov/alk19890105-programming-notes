# apple-mac-locked-stuff-2021-03

## What else prevents file deletion on OS X beside permissions, ACL, flags or being in use?

<https://stackoverflow.com/questions/43880973/what-else-prevents-file-deletion-on-os-x-beside-permissions-acl-flags-or-being>

```sh
There might be a kext that protects the file (the antivirus trying to "defend" itself), but sudo kextunload <name> (see the kexts with kextstat | grep -v apple) should work... Or, even better, first eliminate the daemon (vs agent) that controls it with sudo launchctl remove <name> (see the daemons with sudo launchctl list | grep -v apple).
```

---

## How to completely uninstall software under Mac OS X [MacRx]

<https://www.cultofmac.com/90060/how-to-completely-uninstall-software-under-mac-os-x-macrx/>

Start with the Top Level Library on your hard drive /Library. You are looking to remove any files or folders which contain the name of the program (Acrobat, Word) or the vendor (Adobe, Microsoft) in their names. Search the following locations:

/Library
/Library/Application SupportIn these two locations you’re looking for non-Apple folders full of items: Adobe, Microsoft, etc.
/Library/PreferencesInside Preferences you may find single files, folders full of items – Adobe, Microsoft – along with .plist documents usually starting with com – com.Adobe.Acrobat.plist, com.microsoft.Word.plist
/Library/LaunchAgents
/Library/LaunchDaemons
/Library/PreferencePanes
/Library/StartupItemsMost software does not use LaunchAgents, Preference Panes or Startup Items, but some things do, particularly items which control system behavior or keep background processes running
Next, remove any similarly named items you find inside the User Library inside your Home Folder ~/Library in the same set of folders:

~/Library
~/Library/Application Support
~/Library/LaunchAgents
~/Library/Preferences
~/Library/PreferencePanes
~/Library/StartupItems
For the vast majority of applications that’s all you need to remove. Empty the Trash to complete the process. If you get a message that an item is “in use and can’t be deleted” reboot the Mac, then try again.

Kernel Extensions and Hidden Files

If you’ve deleted everything from the Applications and Library folders and some vestiges of old software still remain, you may be dealing with a kernel extension or hidden file. These items will not be obvious to find, doing a Google search about the components for your specific software situation is highly recommended.

Software that uses background processing – anti-virus and security programs, printers, device sync software – often install one or more kernel extensions. If your old installation of Symantec Utilities keeps telling you it’s out of date six years after you’ve deleted the program, chances are there’s still an old kernel extension loading up.




Warning: kernel extensions are necessary for correct operation of your system. Do not move or delete any items unless you have the ability to redo changes made by booting from a second Macintosh or drive and restoring changes made to the first hard drive.

Kernel extensions are located in /System/Library/Extensions and end with the extension .kext.  Again you are looking for items with the name of the program or vendor in the name. For example, with old copies of troublesome Symantec software you might find SymEvent.kext and SymOSXKernelUtilities.kext lurking on your system.

Drag any probable items to the desktop first to make a copy, then move the original to the trash. Don’t empty the trash yet – reboot and see if the issue is fixed. If not, restore the item and try another.


Hidden files are items whose name starts with a period (.) They don’t display in the Finder by default. Programs sometimes use hidden files for authentication purposes, many are located in your home folder. You can use Terminal (inside Applications/Utilities) to list the contents of the directory in question and delete the offending item.

For example, the following set of commands will navigate to the home folder (~), list all contents, then delete a hidden file named .parallels_settings:

%> cd ~
%> ls -al
%> sudo rm .parallels_settings

Using sudo to do the deletion will require you to enter an admin password when prompted.

---

<https://stackoverflow.com/questions/59890359/developer-cannot-be-verified-macos-error-exception-a-move-to-trash-b-cancel>

```sh
I have a company controlled Mac and I have tried all above instructions with no luck. This is what works for me.

Open up your Terminal and run this command to allow apps downloaded from Anywhere. After you run this command, go to your app and right click and select open. You have to have administrator right on your Mac.

sudo spctl --master-disable

Here is the link <https://github.com/hashicorp/terraform/issues/23033#issuecomment-540262070> Mac allow apps downloaded from Anywhere

answered Oct 29 '20 at 21:06
Michelle
```

---

Mandatory Chrome Policies on Mac

> References:

<https://stackoverflow.com/questions/38206916/mandatory-chrome-policies-on-mac>

```sh
~/Library/Preferences/com.google.Chrome.plist 
/Library/Managed Preferences/
/Library/Managed Preferences/$user
```

```sh
defaults write com.google.Chrome ExtensionInstallSources -array "http://install-url.com/*"
defaults write com.google.Chrome ExtensionInstallWhitelist -array "chrome-extension-id"
```

---

The Chromium Projects

Mac Quick Start

> References:

<https://www.chromium.org/administrators/mac-quick-start>

```sh
Debugging

If you have trouble, it usually pays off to examine whether the settings are correctly stored and read by Chrome. First of all, navigate to about:policy in Chrome. It lists any policy settings that Chrome has picked up. If your settings show up, good. If not, you can dig deeper and check whether macOS actually put them into place correctly. Mandatory policy is stored in /Library/Managed Preferences/<username>/com.google.Chrome.plist while recommended policy is stored in /Library/Preferences/com.google.Chrome.plist. The plutil command can be used from a terminal to convert it to XML format:
# sudo -s
# cd /Library/Managed Preferences/<username>
# plutil -convert xml1 com.google.Chrome.plist
# cat com.google.Chrome.plist
For debugging, this file is in a place where it can be edited manually. Chrome will pick up the updated preferences automatically. Note that this is not recommended for making persistent changes to policy, since macOS will rewrite the file with settings configured through Workgroup Manager.

Chrome on macOS does not show unknown policies on the chrome://policy page. If you don't find a policy you have set there check if the name is spelled correctly and if the policy is actually supported on the macOS platform.  
```

Policy List

<https://www.chromium.org/administrators/policy-list-3>

---

How do I unlock a .plist file so that I can change it?

> References:

<https://apple.stackexchange.com/questions/68646/how-do-i-unlock-a-plist-file-so-that-i-can-change-it>

```sh
sudo chown $USER aomDSP.plist
sudo chmod u+w aomDSP.plist
```

---

How to Edit /System/Library/LaunchAgents/

> References:

<https://developer.apple.com/forums/thread/122259>

```sh
To clarify some confusing points:

1) Catalina is a new version of the operating system and is currently in beta.

2) Review point 1 above. This means that THINGS HAVE CHANGED.

3) Apple system files are installed at /

4) User files are installed at /System/Volumes/Data

5) The while filesystem then has a layer of fairy dust applied to make it all look like it did before, with a single / file system

Give point 5 above, all you really need to worry about is that system files are at /System. Files in /Library are technically at /System/Volumes/Data/Library but you can just think of them being at /Library. /Library is therefore mounted read-write and you can modify it as root.

Copy the plist file you want to modify into /Library/LaunchAgents

Make your changes

You will still need to disable SIP to make system changes

sudo launchctl unload -Fw /System/Library/LaunchAgent/com.apple.service.to.hack.up.with.plist

Re-enable SIP

sudo launchctl load -Fw /Library/LaunchAgent/com.apple.service.to.hack.up.with.plist
```

---

What is launchd?

> References:

<https://www.launchd.info/>

```sh
User Agents	~/Library/LaunchAgents	Currently logged in user

Global Agents	/Library/LaunchAgents	Currently logged in user

Global Daemons	/Library/LaunchDaemons	root or the user specified with the key UserName

System Agents	/System/Library/LaunchAgents	Currently logged in user

System Daemons	/System/Library/LaunchDaemons	root or the user specified with the key UserName
```

---

How do I edit Managed Client preferences without them getting replaced?

> References:

<https://apple.stackexchange.com/questions/17054/how-do-i-edit-managed-client-preferences-without-them-getting-replaced?newreg=f29fe4925ea2484b9e6af87f06497902>

```sh
Turns out that the master copy of com.apple.applicationaccess is kept in 

/private/var/db/dslocal/nodes/Default/[user].plist.

Editing that solved the problem for me. Thanks to Lyken for helping me find this on this question.

edited Apr 13 '17 at 12:45

answered Jul 7 '11 at 21:35
DanielGibbs
```

---

How can I determine plist changes while changing System Preferences to automate them next time?

> References:

<https://apple.stackexchange.com/questions/336873/how-can-i-determine-plist-changes-while-changing-system-preferences-to-automate>

```sh
If you know the file which is being changed, you can compare the output before/after in the terminal in order to find the exact setting name. For example:

/usr/libexec/PlistBuddy -c Print ~/Library/Preferences/.GlobalPreferences.plist > /tmp/before.txt
And, diff /tmp/before.txt /tmp/after.txt to see the items being changed. But, be careful, because it's likely that the preference you're changing will be buried in the hierarchical structure.

If you don't already know the file which is being changed, then you can monitor the Library/Preferences folder with ls -lFat to see the most recently changed files listed first, and you can probably determine which file you're interested in from there.

answered Sep 27 '18 at 2:46
Kent
```

---

Configure advanced content caching settings on Mac

> References:

<https://support.apple.com/lt-lt/guide/mac-help/mchl91e7141a/mac>

```sh
For example, to set the Interface key to en1, execute this command as an administrator:

$ sudo -u _assetcache defaults write /Library/Preferences/com.apple.AssetCache.plist Interface -string en1
ListenRanges is a complex key that takes an array of dictionaries. For example, execute this command as an administrator to set two IP address ranges for the ListenRanges key:

$ sudo -u _assetcache defaults write /Library/Preferences/com.apple.AssetCache.plist ListenRanges '( { first = 10.0.0.1; last = 10.0.0.254; }, { first = 10.1.0.1; last = 10.1.0.254; } )'
After using the defaults command, be sure to run the following command to reload the content cache settings:

$ sudo AssetCacheManagerUtil reloadSettings
```

<https://support.apple.com/lt-lt/guide/mac-help/mchla6d4541e/11.0/mac/11.0>

---

10.9 Managed Preferences Workaround

> References:

<https://www.jamf.com/jamf-nation/discussions/11090/10-9-managed-preferences-workaround>

```sh
Posted: 7/22/2014 at 12:15 PM CDT by nigelg
i can log in as a user, pick up the managed preference which denies access to the system preferences then ssh as admin and run "defaults write /Library/Managed\ Preferences/<username>/com.apple.systempreferences.plist HiddenPreferencePanes -array" then "killall cfprefsd"

When I reload the system preferences, nothing is hidden anymore.

```

---

Change macOS user preferences via command line

Published: 2017.12.18 | 4 minutes read

> References:

<https://pawelgrzybek.com/change-macos-user-preferences-via-command-line/>

```sh
defaults write com.apple.finder AppleShowAllFiles -string YES
```

---

How to Use launchd to Run Services in macOS

> References:

<https://medium.com/swlh/how-to-use-launchd-to-run-services-in-macos-b972ed1e352>

```sh
Some of the popular commands in launchctl are defined in the below.
Getting information about available (loaded) jobs :
$ launchctl list
Getting information about a given job :
$ launchctl list | grep <LABEL>
Loading a job (a global daemon) :
$ launchctl load /Library/LaunchDaemons/<LABEL>.plist
Unloading a job (a global daemon) :
$ launchctl unload /Library/LaunchDaemons/<LABEL>.plist
Starting a job (a loaded job) :
$ launchctl start <LABEL>
Stoping a job (a loaded job) :
$ launchctl stop <LABEL>
Restarting a job (a loaded job) :
$ launchctl restart <LABEL>
```

---

How to start/stop/restart launchd services from the command line?

> References:

<https://serverfault.com/questions/194832/how-to-start-stop-restart-launchd-services-from-the-command-line>

```sh
Hi launchctl(8) is your friend. Just keep in mind that some of the services (sshd for example) are disabled in the configuration file so you will need to use the -w switch when loading them. Here is a sshd example:

$ sudo launchctl load -w /System/Library/LaunchDaemons/ssh.plist 
You can stop the service using the unload subcommand.

$ sudo launchctl unload  /System/Library/LaunchDaemons/ssh.plist 
To list the services, as you might have already guessed use the 'list' subcommand ;)

have fun, n


edited Jun 17 '18 at 15:41
Community

answered Oct 26 '10 at 14:00
nayden
```

---

How to force reload preference plist for an app in OS X?

> References:

<https://stackoverflow.com/questions/51153974/how-to-force-reload-preference-plist-for-an-app-in-os-x>

```sh
The reason is, from Mac OS Mavericks, apple started to cache plist files, which results in replacing a plist file manually has no effect until the cache is reloaded automatically. If you open the application which uses this plist file to early, it overwrites your copied file with the old/cached one.

To reload the preference file manually, use defaults read <filename>.plist to read the new plist values.

Source: nethack

Now, I just use a sh script to call the defaults after executing my program.

answered Jul 4 '18 at 7:26
Goutham Ganesan
```

---

How to add user to a group from Mac OS X command line?

> References:

<https://superuser.com/questions/214004/how-to-add-user-to-a-group-from-mac-os-x-command-line>

```sh
sudo dseditgroup -o edit -a $username_to_add -t user admin
sudo dseditgroup -o edit -a $username_to_add -t user wheel

It's also possible to do this with dscl, but to do it properly you need to both add the user's short name to the group's GroupMembership list, and add the user's GeneratedUID to the group's GroupMembers list. dseditgroup takes care of both in a single operation.


edited Nov 29 '15 at 23:37
Quanlong

answered Nov 23 '10 at 19:57
Gordon Davisson
```

```sh
For those who are looking for the same answer to newer versions of Mac OS, I've found this: To add a user to a group, you need this command ($USER is the current logged-in user) :

$ sudo dscl . append /Groups/wheel GroupMembership $USER
I was trying to add my user to the wheel group, to be able to manipulate the /Library/WebServer/Documents folder. Besides that, I had to change the permissions to that folder, as by default it is 755. I've changed it to 775 with:

$ sudo chmod -R 775 /Library/WebServer/Documents
This way I can manipulate the folder content without changing the owner of the folder.

ps. Still working on Catalina (10.15.3)

edited Apr 4 '20 at 11:52
Dave M

answered Feb 6 '18 at 17:59
Brosig
```

---

Sudo not working in terminal

> References:

<https://stackoverflow.com/questions/43537500/sudo-not-working-in-terminal>

```sh
Might be a good idea to compare your current /etc/sudoers with an old version just in case.

Also, keep in mind the expect file permission is:

chmod 0440 /etc/sudoers

answered Apr 21 '17 at 18:36
Paulo Mattos
```

<https://macperformanceguide.com/blog/2017/20170328_1326-macOS-10_12_4-sudo-broken.html>

<https://macperformanceguide.com/blog/2017/20170407_1157-macOS-10_12_4-sudo-broken-fix.html>

```sh
The fix
This fix worked for the iMac 5K and the Mac Pro, so it is not machine-specific.

For security reasons it is a bad idea to just paste some replacement /etc/sudoers file without understanding it in full, so I did not want to do that. Instead I went sleuthing, commenting out lines until I found the problem line or lines.

It turns out that one line in /etc/sudoers was causing sudo to hang on the 2015 iMac 5K and 2015 MacBook Pro:

%users ALL= NOPASSWD: /sbin/kextload, /sbin/kextunload <=== responsible for sudo hang

Comment it out like this, and all is well:

# %users ALL= NOPASSWD: /sbin/kextload, /sbin/kextunload <== comment out and all is well

Why was that line there? I don’t know, and I do not recall ever adding it. That this problematic line was there as long ago as July 2013 (nearly 4 years ago!) can be see in Extending the 'sudo' Timeout. So clearly Apple changed and broke something, since nothing had gone wrong until 10.12.4.

As a precaution, since the presence of that line is odd, I validated all my kernel extensions. I found one or two not code signed (printer drivers, old Accelsior driver), but nothing amiss. Look for "signed" to find unsigned kext in the output from this command in Terminal:

kextutil -entZ /System/Library/Extensions/*.kext /Library/Extensions/*.kext

Fresh 'stock' sudoers file
I highly recommend TextWrangler and BBEdit (free 30 day trial), they are among my most-used tools. I actually prefer the free TextWrangler for its greater simplicity, but it is being sunsetted in favor of BBEdit.

This file is an unmodified version of what macOS 10.12.4 installs on a fresh erase/install. To use it, open /etc/sudoers using TextWrangler (it shows hidden files in its Open dialog), and then select-all / delete / paste this file and save.

Copy this text and paste into a plain-text window first (in order to make sure nothing is added or lost or changed after copying from this web page). Lines that begin with a # are harmless comments.

#-------------------- use contents below --------------------
#
# Sample /etc/sudoers file.
#
# This file MUST be edited with the 'visudo' command as root.
#
# See the sudoers man page for the details on how to write a sudoers file.

##
# Override built-in defaults
##
Defaults	env_reset,timestamp_timeout=120
Defaults	env_keep += "BLOCKSIZE"
Defaults	env_keep += "COLORFGBG COLORTERM"
Defaults	env_keep += "__CF_USER_TEXT_ENCODING"
Defaults	env_keep += "CHARSET LANG LANGUAGE LC_ALL LC_COLLATE LC_CTYPE"
Defaults	env_keep += "LC_MESSAGES LC_MONETARY LC_NUMERIC LC_TIME"
Defaults	env_keep += "LINES COLUMNS"
Defaults	env_keep += "LSCOLORS"
Defaults	env_keep += "SSH_AUTH_SOCK"
Defaults	env_keep += "TZ"
Defaults	env_keep += "DISPLAY XAUTHORIZATION XAUTHORITY"
Defaults	env_keep += "EDITOR VISUAL"
Defaults	env_keep += "HOME MAIL"

Defaults	lecture_file = "/etc/sudo_lecture"
##
# User alias specification
##
# User_Alias	FULLTIMERS = millert, mikef, dowdy

##
# Runas alias specification
##
# Runas_Alias	OP = root, operator

##
# Host alias specification
##
# Host_Alias	CUNETS = 128.138.0.0/255.255.0.0
# Host_Alias	CSNETS = 128.138.243.0, 128.138.204.0/24, 128.138.242.0
# Host_Alias	SERVERS = master, mail, www, ns
# Host_Alias	CDROM = orion, perseus, hercules

##
# Cmnd alias specification
##
# Cmnd_Alias	PAGERS = /usr/bin/more, /usr/bin/pg, /usr/bin/less

##
# User specification
##

# root and users in group wheel can run anything on any machine as any user
root		ALL = (ALL) ALL
%admin		ALL = (ALL) ALL

## Read drop-in files from /private/etc/sudoers.d
## (the '#' here does not indicate a comment)
#includedir /private/etc/sudoers.d
#-------------------- use contents above --------------------
```

---
