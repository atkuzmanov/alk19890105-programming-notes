# Homebrew brew and cask notes

## Command to generate Brewfile with descriptions

`brew bundle dump --describe`

---

<https://github.com/Homebrew/homebrew-bundle>

<https://docs.brew.sh/Manpage>

<https://medium.com/@satorusasozaki/automate-mac-os-x-configuration-by-using-brewfile-58a78ce5cc53>

---

<https://superuser.com/questions/1137780/how-do-i-reinstall-all-packages-installed-with-homebrew>

```################################```

to keep not only installed brews but also casks and taps i recommend to

```
$ brew bundle dump --describe --global
$ brew bundle install --global
```

the first command will write ~/.Brewfile which will be read again in the second call. it looks like this:

```
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
