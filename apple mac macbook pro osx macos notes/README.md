# apple mac macbook pro osx macos notes

|||how to change your mac username

<https://www.macworld.co.uk/how-to/mac-software/how-change-mac-username-3689410/>

---

|||apple
|||macintosh
|||macosx
|||mac setup
|||macbook setup
|||mac display blurry |||mac blurry display
|||maco monitor blurry |||mac blurry monitor
|||mac external monitor blurry text

```bash
defaults -currentHost write -globalDomain AppleFontSmoothing -int 1


defaults write -g CGFontRenderingFontSmoothingDisabled -bool NO
```

return to defaults:

```bash
defaults -currentHost delete -globalDomain AppleFontSmoothing

defaults write -g CGFontRenderingFontSmoothingDisabled -bool YES
```

links:

<https://forums.macrumors.com/threads/macbook-pro-external-monitor-blurry-text.2032453/>

<https://apple.stackexchange.com/questions/269811/external-monitor-has-blurry-font-on-a-mbp-retina>

<https://discussions.apple.com/thread/4316156>

<https://www.mathewinkson.com/2013/03/force-rgb-mode-in-mac-os-x-to-fix-the-picture-quality-of-an-external-monitor>

<https://www.quora.com/How-do-I-fix-blurry-text-on-an-external-display-connected-to-a-MacBook-Pro>

<http://osxdaily.com/2018/09/26/fix-blurry-thin-fonts-text-macos-mojave/>

<http://osxdaily.com/2010/02/18/change-font-smoothing-settings/>

<https://www.macworld.com/article/2986118/security/how-to-modify-system-integrity-protection-in-el-capitan.html>

<https://gist.github.com/adaugherity/7435890>

<https://spin.atomicobject.com/2018/08/24/macbook-pro-external-monitor-display-problem/>

---

|||apple
|||macintosh
|||macosx
|||mac setup
|||macbook setup

**Should i disable guest account on my mac?**

Short answer - No.

<https://apple.stackexchange.com/questions/209049/disable-the-guest-user-completely-in-el-capitan-without-having-to-disable-find>

```text
@alan-shutko pointed out very important info about this in his comment:

The point is to make Find My Mac work. If you turn Find My Mac off, the guest account will go away. The reason it's there if Find My Mac is on is that if someone steals your mac, it cannot report its position unless the thief connects it to a wifi network.
Looks like we should keep it on.

shareimprove this answer
edited Dec 5 '15 at 5:40
answered Nov 11 '15 at 6:50

Rahul Desai
2812313
```

---

|||mac open finder in current command line location
|||unix commands
|||linux commands
|||mac commands

`open .`

---

|||mac hidden files show hide
|||mac show hide files
|||mac hide show files

```bash
### Terminal (YES/NO or TRUE/FALSE case sensitive):
defaults write com.apple.Finder AppleShowAllFiles YES
killall Finder
```

```bash
defaults write com.apple.Finder AppleShowAllFiles NO
killall Finder
```

---

|||mac free up wired ram memory

`purge`

---

|||apple
|||macintosh
|||macosx

|||symlink
|||symbolic link
|||symlink macosx

<http://osxdaily.com/2015/08/06/make-symbolic-links-command-line-mac-os-x/>

How to make symbolic  link

`ln -s /path/to/original/ /path/to/link`

# That will point /path/to/link to the original location, in this case /path/to/original/

Example Syntax for Making Soft Links at the Terminal
For example, to create a symbolic link for the user Downloads folder which links it to a directory on a separate mounted drive, syntax may look like the following:

`ln -s /Volumes/Storage/Downloads/ ~/Downloads/`

That will link the active users ~/Downloads/ folder to a directory named “Downloads” on the mounted drive called “Storage”. If such a directory and drive existed, this would basically allow all files that would typically appear in the user downloads folder to go to the other mounted volume instead, essentially offloading the storage burden to that separate drive, while still preserving the appearance of a ~/Downloads/ folder for the user. As mentioned before, this behaves much like an alias.

Another example would be to offer easier access to an otherwise buried binary by linking the command to /usr/sbin/

`sudo ln -s /A/Deeply/Buried/Path/ToApp.framework/Resources/command /usr/sbin/commmand`

This would allow the user to type ‘command’ and access the binary, without having to prefix the command execution with the entire path.

How to remove symbolic link

`rm /path/to/symlink`

or

`unlink /path/to/symlink/`

===

|||symlinks
|||symbolic links
|||symlink macosx

`/usr/local/bin/`

===

find symlinks

`find . -type l -ls`

create symlink

`ln -s [source] [target]`

---

|||mac software installation deletion locations
|||mac uninstall software
|||mac setup

```bash
/Volumes/HD/Applications/[name-of-software]

/Volumes/HD/Users/[username]/Library/Logs/[name-of-software]/[name-of-software]/

/Volumes/HD/Users/[username]/[name-of-software]/

/Volumes/HD/Users/[username]/Library/Application Support/[name-of-software]/[name-of-software]/

/Volumes/HD/Users/[username]/Library/Caches/com.[name-of-software]

/Volumes/HD/Users/[username]/Library/Preferences/[name-of-software].plist

/Volumes/HD/Users/[username]/Library/Preferences/[name-of-software].lockfile
```

---

|||mac missing tray bar menu icons

Run in terminal:

`killall SystemUIServer`

---
|||mac system information command
|||system profiler

`system_profiler SPApplicationsDataType`

---

|||mac list programms
|||mac list software
|||find command

`find / -iname *.app > ~/applications.txt`

---

|||process for changing exchange password on a mac

```text
1. ALWAYS CHANGE PASSWORD ON NETWORK CABLE!!!

2. Go to "System Preferences" --> Users & Groups --> Change Password

3. Delete password from KeyChain Access.

4. Restart computer.

5. When prompted select to create new keychain.

6. Restart and Outlook. Go into File --> Account and change password. Or it should prompt you for a new password. Tick "remember password in keychain".

7. Print something and change password.

8. NOTE: This step is deprecated, so will be kept for info just in case.
Go to "Keychain Access" --> Edit --> 'Change password for keychain "login"...'
NOTE: If it doesn't accept the old password try the new one in all three fields.
```

---

|||mac nrg to iso |||nrg to iso |||convert nrg to iso

Extract ISO9660 data from Nero nrg files

<http://gregory.kokanosky.free.fr/v4/linux/nrg2iso.en.html>
nrg2iso

<http://osxdaily.com/2009/09/25/convert-a-nero-image-file-to-iso/>

`dd bs=1k if=image.nrg of=image.iso skip=300`

"Essentially what this command is saying is that using 1k block sizes, from the input file of image.nrg (our Nero image that needs converting), create an output of image.iso (the desired ISO image file), after skipping the first 300k of the input file (aka the Nero 300k header)."

---

|||pdfwriter for mac |||print to pdf |||print pdf |||pdf print

<https://sourceforge.net/projects/pdfwriterformac/>

"Printed PDF isn't readable by Adobe"

<https://sourceforge.net/p/pdfwriterformac/discussion/1246009/thread/a41f8c97/>

"M.G. - 2017-01-04
you need to choose the driver-file manually during the adding process of the printer. You can find it at following path: /Library/Printers/Lisanet/PDFwriter/pdfwriter.ppd
Delete the printer and add it with the correct printer - works for me on El Capitan"

"can't find my printed pdf files on my mac"

<https://sourceforge.net/p/pdfwriterformac/discussion/1246009/thread/d66abec3/>

"Richard - 2012-07-14
Hi Dennis,
  Go to Macintosh HD, then click on "Users" then click on "Shared" then click on "PDFwriter." Your printed files will be in the next folder which is named after the user of the computer.
           Richard"

"n2nguyen - 2014-01-19
You don't need to repath, you can create a shortcut. Here's the command I used to put it in Dropbox in Dropbpx/Documents/PDFs folder

$ sudo ln -s /var/spool/pdfwriter/[user] ~/Dropbox/Documents/PDFs"

"trickyt57 - 2014-08-15
Here is a much simpler solution:

Locate the file located at Macintosh HD/private/var/spool/pdfwriter/your_name
(note the folder called "private" may be hidden or greyed out. Use the usual method for displaying such hidden folders)
Right click on the folder.
Choose "Make Alias"
You will now see a new folder with the same name followed by "alias".
Drag and drop the alias file into any folder you like on your hard drive. In my case, I dropped it in my_name/pdf_documents.
Now anytime you create a printed pdfwriter doc you can find it in the new alias file located in the directory of your choice."

---

|||format exfat mac os |||erase efi |||erase exefi |||diskutil |||partition disk mac os x

<https://superuser.com/questions/1001369/how-do-i-remove-the-efi-partition-on-my-usb-using-mac-os-x-10-11>

How do I remove the EFI Partition on my USB using Mac OS X 10.11?

`diskutil list`

to identify the partition (shown as partition s1 on disk 2), and

`diskutil eraseVolume "Free Space" ExEFI disk2s1`

---

<http://osxdaily.com/2016/08/30/erase-disk-command-line-mac/>

`diskutil eraseDisk ExFAT DiskName /dev/nodename`

`diskutil eraseDisk JHFS+ DiskName /dev/DiskNodeID`

---

<http://www.theinstructional.com/guides/disk-management-from-the-command-line-part-2>

"Partitioning a Disk
To partition a disk, we use:

diskutil partitionDisk /dev/disk2 GPT JHFS+ New 0b

The first three parts of the command are self explanatory, there's the actual diskutil command followed by the option partitionDisk and the disk's identifier /dev/disk(n). You'll also recognise JHFS+ as the filesystem, followed by the label to give the newly-created volume.

Partition Scheme
GPT is an option for the Partition Scheme. There are three you can use:

GPT: GUID Partition Table
APM: Apple Partition Map
MBR: Master Boot Records
Unless you intend to boot a PowerPC-based Mac or Windows PC with your hard disk, there's no reason to select anything other than GPT. Intel Macs can only boot from GUID partitions."

---

|||formatting guid vs mrb |||guid partition |||master boot record partition |||mrb partition

<https://www.howtogeek.com/193669/whats-the-difference-between-gpt-and-mbr-when-partitioning-a-drive/>

"GPT’s Advantages
GPT stands for GUID Partition Table. It’s a new standard that’s gradually replacing MBR. It’s associated with UEFI, which replaces the clunky old BIOS with something more modern. GPT, in turn, replaces the clunky old MBR partitioning system with something more modern. It’s called GUID Partition Table because every partition on your drive has a “globally unique identifier,” or GUID—a random string so long that every GPT partition on earth likely has its own unique identifier.

GPT doesn’t suffer from MBR’s limits. GPT-based drives can be much larger, with size limits dependent on the operating system and its file systems. GPT also allows for a nearly unlimited number of partitions. Again, the limit here will be your operating system—Windows allows up to 128 partitions on a GPT drive, and you don’t have to create an extended partition to make them work.

On an MBR disk, the partitioning and boot data is stored in one place. If this data is overwritten or corrupted, you’re in trouble. In contrast, GPT stores multiple copies of this data across the disk, so it’s much more robust and can recover if the data is corrupted.

GPT also stores cyclic redundancy check (CRC) values to check that its data is intact. If the data is corrupted, GPT can notice the problem and attempt to recover the damaged data from another location on the disk. MBR had no way of knowing if its data was corrupted—you’d only see there was a problem when the boot process failed or your drive’s partitions vanished."

<https://superuser.com/questions/324525/what-are-the-differences-between-mbr-vs-gpt-vs-any-other-partition-scheme>

"Differences between MS-DOS style Master Boot Record (MBR), the Apple Partition Map (APM), and the UEFI-style GUID Partition Table (GPT) are such:

Disk size
MBR and APM limit the usable disk size to 2 TiB (a partition can neither start nor end beyond the 2 TiB limit). With GPT, the disk can be up to 8 ZiB.

Partition count
MBR is limited to four partitions.

To get around the limit, one of the partitions is usually created as an "extended partition" which nestedly contains a series of "logical partitions". The most common scheme for this is an Extended Boot Record, though BSD systems often nest a BSD disklabel instead.

APM can grow up to 62 partitions; GPT can have at least 128.

Partition metadata
MBR partitions have a 1-byte "type" code, which is too small to be useful (most operating systems use very generic type codes and just guess the rest). Windows NT also introduced a 4-byte "disk ID" for distinguishing between multiple disks of the same model.

APM uses textual "type identifiers" (32 ASCII bytes), e.g. Apple_UFS. It also reserves 32 bytes for a descriptive partition name.

GPT, as its name tells, uses a 16-byte GUID for partition type, another GUID for identifying a specific partition (the partuuid), and yet another GUID for identifying the whole disk (similar in purpose to the MBR "disk ID"). It also reserves 72 bytes (UTF-16) for a partition label.

System architectures
Intel-based Macs can only boot from GPT drives, while PowerPC-based Macs only support APM.

"Regular" IBM-compatible PCs can boot any disk as long as the 0th sector contains a valid BIOS bootloader and the AA55h boot signature. This usually means MBR, but all GPT-partitioned disks have a "protective MBR" that satisfies this requirement.

PCs using UEFI are required support both GPT and MBR – again, as long as an UEFI-compatible bootloader is present. (UEFI keeps bootloaders in a FAT32 partition with specific type code.)

(Exceptions: Some specific BIOS versions reject the GPT "protective MBR" as invalid, due to bugs or misfeatures. Also, Windows will refuse to boot from a GPT disk on BIOS systems, or from a MBR disk on UEFI systems, due to reasons unknown.)

Boot loaders
In BIOS systems, the initial boot loader is part of the MBR. There can only be one bootloader in the MBR, resulting in conflicts when installing dual-boot systems. Due to the x86 DOS origins of the MBR bootloader, code is specific to the x86 architecture.

On the other hand, UEFI uses a dedicated FAT32 partition for bootloaders (potentially multiple) and other EFI tools. The partition contents can be easily managed from any OS.

Technical bits and pieces
There is only one MBR or APM per disk, both starting at sector 0. GPT keeps a backup copy near the end of the disk.
A more detailed info related to MBR and GPT: Windows and GPT FAQ

shareedit
edited Jan 29 '15 at 19:50
answered Aug 17 '11 at 22:16

grawity
204k28408481

1
Given the Question's context of Macs, your original first bullet point was in error. I took the liberty of editing rather than downvoting. I hope you don't mind. – Spiff Aug 17 '11 at 22:56
Most Intel-based Macs can boot from Apple Partition Map (APM)-formatted drives, but it's a secret so don't tell anyone. – Gordon Davisson Aug 18 '11 at 2:35
2
Since earlier this year, one can bootstrap in the old PC98 way with an EFI partitioned disc. – JdeBP Aug 20 '11 at 4:14
1
Well done for being the first to spot an almost 15-year-old error, by the way. 16EiB is of course the maximum file size with 64-bit file pointers, not volume or disc size with 64-bit sector numbers. 8ZiB is correct for the latter, according to the trusty log tables. – JdeBP Aug 20 '11 at 4:22"

---
