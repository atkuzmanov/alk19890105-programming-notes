# apple-mac-locked-stuff-2021-03

<https://stackoverflow.com/questions/43880973/what-else-prevents-file-deletion-on-os-x-beside-permissions-acl-flags-or-being>

```sh
There might be a kext that protects the file (the antivirus trying to "defend" itself), but sudo kextunload <name> (see the kexts with kextstat | grep -v apple) should work... Or, even better, first eliminate the daemon (vs agent) that controls it with sudo launchctl remove <name> (see the daemons with sudo launchctl list | grep -v apple).
```

---

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
