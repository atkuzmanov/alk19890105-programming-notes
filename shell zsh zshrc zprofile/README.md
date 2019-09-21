# shell zsh zshrc zprofile

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