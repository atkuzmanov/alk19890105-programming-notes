# homebrew brew and cask install script notes

|||brew install script

```bash
### Brew and Brew Cask bash install script

clear
 
die () {
    echo >&2 "$@"
    exit 1
}
echo ".> Start"

### Timestamp as variable
## timestamp2=$(date "+%Y.%m.%d-%H.%M.%S")
timestamp() {
    date "+%Y.%m.%d-%H.%M.%S"
}

brew_items=(
	### Brew items go here. Example: htop
    htop
)

cask_items=(
    ### Brew Cask items go here. Example: atom
    atom
)

function install_items {
    local items_list=("${!1}")
    local brew_info_command=${2}
    local brew_install_command=${3}

    for item in ${items_list[@]}; do        
        ### Debug logging
        ## echo -e "\n.> [LOG-$(timestamp)] Running info command: \$${brew_info_command} ${item}"
        echo -e "\n.>   ______[INFO]______"        
        ${brew_info_command} "${item}"

        while true; do
            read -p ".> Do you wish to install this program? " yn
            case $yn in
                [Yy]* ) echo ".> Running install command: \$${brew_install_command} ${item}"; ${brew_install_command} "${item}"; break;;
                [Nn]* ) echo ".> Install cancelled, not running: \$${brew_install_command} ${item}"; break;;
                Exit|exit|EXIT|Quit|quit|QUIT|q|Q ) echo ".> Terminating program"; exit;;
                * ) echo ".> Please answer yes or no. ";;
            esac
        done
    done
}

echo -e "\n.> ------[BREW ITEMS]------\n"
install_items brew_items[@] "brew info" "brew install"

echo -e "\n.> ------[BREW CASK ITEMS]------\n"
echo -e "\n.> [$(timestamp)] Running \$brew tap caskroom/versions"
brew tap caskroom/versions
install_items cask_items[@] "brew cask info" "brew cask install"
 
echo ".> End"
 
exit 0
```

---
