# shell zsh zshrc zprofile

|||iterm2 zsh |||zsh iterm2

<https://stackoverflow.com/questions/13476232/make-iterm2-launch-with-zsh>

```text
Change your default shell to /bin/zsh by running the chsh -s /bin/zsh command.

shareimprove this answer
edited May 6 at 8:49

Nishant
2,35222 gold badges1515 silver badges3434 bronze badges
answered Nov 20 '12 at 
```

```text
Although the change with chsh -s $(which zsh) worked perfectly for me, my iTerm2 wouldn't automatically open new terminals with zsh.

Instead I went to iTerm2 -> Preferences -> Profiles -> Default and in the General Tab set the Command to /usr/local/bin/zsh instead of Login shell.

Update: With the current version of iTerm (as of 2.1.1) it perfectly worked for me by changing the default shell (shown above) only.

shareimprove this answer
edited Jul 9 '15 at 12:04
answered Jul 28 '14 at 8:43

Thomas Fankhauser
4,14611 gold badge2525 silver badges30
```

----

```zsh

### zsh-autosuggestions
## To activate the autosuggestions, add the following at the end of your .zshrc:
## source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh
## You will also need to force reload of your .zshrc:
## source ~/.zshrc
source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh

### zsh-completions
## To activate these completions, add the following to your .zshrc:
## 
##   fpath=(/usr/local/share/zsh-completions $fpath)
## 
## You may also need to force rebuild `zcompdump`:
## 
##   rm -f ~/.zcompdump; compinit
## 
## Additionally, if you receive "zsh compinit: insecure directories" warnings when attempting
## to load these completions, you may need to run this:
## 
##   chmod go-w '/usr/local/share'
fpath=(/usr/local/share/zsh-completions $fpath)


### zsh-syntax-highlighting
## To activate the syntax highlighting, add the following at the end of your .zshrc:
##   source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
## 
## If you receive "highlighters directory not found" error message,
## you may need to add the following to your .zshenv:
##   export ZSH_HIGHLIGHT_HIGHLIGHTERS_DIR=/usr/local/share/zsh-syntax-highlighting/highlighters
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

### zsh-navigation-tools
## To run zsh-navigation-tools, add the following at the end of your .zshrc:
##   source /usr/local/share/zsh-navigation-tools/zsh-navigation-tools.plugin.zsh
## 
## You will also need to force reload of your .zshrc:
##   source ~/.zshrc
source /usr/local/share/zsh-navigation-tools/zsh-navigation-tools.plugin.zsh

```
