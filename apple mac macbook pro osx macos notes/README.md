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
