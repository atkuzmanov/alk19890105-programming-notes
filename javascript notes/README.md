# javascript notes

|||javascript reference |||mdn web docs |||es6 |||mozilla developer |||moz://a

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference>

---

|||nvm

```bash
mkdir ~/.nvm

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.7/install.sh | bash
```

```bash
export NVM_DIR="/Users/[user]/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```

---

|||grunt |||npm grunt |||npm install grunt
|||sass css |||css |||grunt sass

`npm install -g grunt`

`### The –g option means – install this dependency globally for the current version of node in use.`

`grunt sass`

---

|||bower |||npm install bower |||npm bower

`npm install -g bower`

---

|||nvm automatically read .nvmrc files when you change directory |||.nvmrc |||nvmrc

```bash
### Add the below to your ~/.bash_profile

### NVM for NPM
export NVM_DIR="/Users/[EXAMPLE-USER]/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
### NVM
### automatically read .nvmrc files when you change directory
###    see https://github.com/creationix/nvm/issues/110#issuecomment-180570373
read_nvm() {
    if [ "$PWD" != "$PREV_PWD" ]; then
        PREV_PWD="$PWD";
        if [ -e ".nvmrc" ]; then
            nvm use;
        fi
    fi
}
export PROMPT_COMMAND=read_nvm
```

---
