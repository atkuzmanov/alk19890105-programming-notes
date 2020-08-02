# Homebrew brew and cask notes

**undefined method `undent' error**

<https://github.com/Homebrew/homebrew-cask/issues/49716>

<http://flummox-engineering.blogspot.com/2018/12/homebrew-cask-cannot-reinstall-is-unreadable-undefined-method-undent.html>

<https://github.com/Homebrew/homebrew-bundle/issues/338>

<https://awesomeopensource.com/project/Homebrew/homebrew-bundle>

`brew cask list`

<https://github.com/Homebrew/homebrew-cask/issues/58046>

```bash
/usr/bin/find "$(brew --prefix)/Caskroom/"*'/.metadata' -type f -name '*.rb' -print0 | /usr/bin/xargs -0 /usr/bin/perl -i -pe 's/depends_on macos: \[.*?\]//gsm;s/depends_on macos: .*//g'
```

<https://wilsonmar.github.io/macos-homebrew/>

---

Homebrew brew cask directories

```bash
~/Library/Caches/Homebrew
~/Library/Caches/Homebrew/Cask

/usr/local/Cellar/

/usr/local/opt/

~/Applications/

/Volumes/Macintosh\ HD/Applications
```

---

## Command to generate Brewfile with descriptions

`brew bundle dump --describe`

===

<https://github.com/Homebrew/homebrew-bundle>

<https://docs.brew.sh/Manpage>

<https://medium.com/@satorusasozaki/automate-mac-os-x-configuration-by-using-brewfile-58a78ce5cc53>

===

<https://superuser.com/questions/1137780/how-do-i-reinstall-all-packages-installed-with-homebrew>

```################################```

to keep not only installed brews but also casks and taps i recommend to

```bash
brew bundle dump --describe --global
brew bundle install --global
```

the first command will write ~/.Brewfile which will be read again in the second call. it looks like this:

```bash
$ cat ~/.Brewfile
tap "buo/cask-upgrade"
tap "homebrew/cask-fonts"
brew "direnv"
brew "python"
cask "0xed"
cask "alacritty"
```

please issue

`$ brew bundle -h`

for [more details](https://github.com/Homebrew/homebrew-bundle) on the bundle command.

```################################```

It's as simple as that:

`$ brew list | xargs brew reinstall`

You don't need to uninstall anything, because doing so you may lose your settings and configs.

```################################```

I ran into a need for this after upgrading to OSX High Sierra. Most of the brew packages were failing form missing dylibs. Ended up writing a quick & dirty script that cleanly removes & replaces one at a time, ignoring dependencies so you don't force bulk purges. You need to fix each stopping point, but it picks up where it left off so it's not too painful.

YMMV as always

```bash
#!/bin/bash -e
if [ "$1" == "-h" ] ; then
    cat <<EOT
    Remove & reinstall all brew owned packages
    Fail on error to allow manual fixing
    Accept package name as arg1 to spec pick up point.
        $0 [<pickup point>]
    eg:
        $0
    or
        $0 ctags
            where <ctags> is the package to start from
EOT
    exit 1
fi

for l in $(brew list) ; do
    if [ "$1" ] ; then
        if [[ $l < $1 ]] ; then
            echo "skipping $l"
            continue
        fi
    fi
    echo "Remove $l"
    brew uninstall --ignore-dependencies $l
    echo "Re-add $l"
    brew install $l
done
```

```################################```

---

|||homebrew fix

<https://github.com/Homebrew/homebrew/blob/master/share/doc/homebrew/El_Capitan_and_Homebrew.md#if-usrlocal-exists-already>

<https://community.sophos.com/products/free-antivirus-tools-for-desktops/f/17/t/10029>

```bash
sudo chown -R $(whoami):admin /usr/local

chmod +w /usr/local/bin
```

---

|||homebrew fix 2

<https://github.com/caskroom/homebrew-cask/issues/15930>

```text
adidalal commented on Dec 18, 2015
@vitorgalvao We're might get a lot of issues about this because of the combination of moving to tap cmd and the cask header update (if people don't read).

Here's a copy pastable reply:

This error is not a bug, it's caused by an update to how homebrew-cask works. Details can be found here.

To fix the issue, please run:

brew update; brew cleanup; brew cask cleanup
brew uninstall --force brew-cask; brew update
If you are still having problems, open an issue with the appropriate template
```

---

|||brew update

<http://stackoverflow.com/questions/6024671/how-do-i-update-homebrew>

```bash
cd /usr/local

git status

Discard all the changes (unless you actually want to try to commit to Homebrew - you probably don't)

git status til it's clean

brew update
```

<http://www.commandlinefu.com/commands/view/4831/update-all-packages-installed-via-homebrew>

---

|||tap untap

<https://github.com/caskroom/homebrew-cask/issues/6177>

```text
Welcome. I’ve updated your comment for readability. You can use backticks to differentiate single lines of code (or code blocks) from the rest of the text.

We have been going through a lot of changes, so quickest way to try to solve this, untap and tap again — (with some cleaning up, in the middle) brew untap caskroom/cask && brew update && brew cleanup --force -s && rm -rf "$(brew --cache)"' && brew tap caskroom/cask.

If that does not solve it, what is the output of brew doctor?
```

---

|||cask
|||brew cask
|||homebrew cask

<https://github.com/caskroom/homebrew-cask/issues/21913>

How to migrate to the new location?

```text
==> Migrating cached files to /Users/kuzmaa01/Library/Caches/Homebrew/Cask...
Warning: The default Caskroom location has moved to /usr/local/Caskroom.

Please migrate your Casks to the new location and delete /opt/homebrew-cask/Caskroom,
or if you would like to keep your Caskroom at /opt/homebrew-cask/Caskroom, add the
following to your HOMEBREW_CASK_OPTS:

  --caskroom=/opt/homebrew-cask/Caskroom

For more details on each of those options, see https://github.com/caskroom/homebrew-cask/issues/21913.
```

---
