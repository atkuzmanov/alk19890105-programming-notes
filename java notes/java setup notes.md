# java setup notes

|||java setup

---

> References
> <https://stackoverflow.com/questions/26252591/mac-os-x-and-multiple-java-versions>

1
===

The cleanest way to manage multiple java versions on Mac is to use [`Homebrew`](http://brew.sh).

And within `Homebrew`, use:

 - `homebrew-cask` to install the versions of java
 - `jenv` to manage the installed versions of java


----------


As seen on http://hanxue-it.blogspot.ch/2014/05/installing-java-8-managing-multiple.html , these are the steps to follow.

 1. install homebrew
 2. install homebrew jenv
 3. install homebrew-cask
 4. install a specific java version using cask (see "homebrew-cask versions" paragraph below)
 5. add this version for jenv to manage it
 6. check the version is correctly managed by jenv
 7. repeat steps 4 to 6 for each version of java you need
  

----------


### homebrew-cask versions

Add the [`homebrew/cask-versions`](https://github.com/Homebrew/homebrew-cask-versions) tap to homebrew using:

    brew tap homebrew/cask-versions

Then you can look at all the versions available:

    brew search java

Then you can install the version(s) you like:

    brew cask install java7
    brew cask install java6

And add them to be managed by jenv as usual.

    jenv add <javaVersionPathHere>

I think this is the cleanest & simplest way to go about it.

----------

Another important thing to note, as mentioned in https://stackoverflow.com/questions/6141180/mac-os-x-10-6-7-java-path-current-jdk-confusing/24792251#24792251 :

> For different types of JDKs or installations, you will have different
> paths
> 
> You can check the paths of the versions installed using `/usr/libexec/java_home -V`, see https://stackoverflow.com/questions/14292698/how-do-i-check-if-the-java-jdk-is-installed-on-mac
> 
> On Mac OS X Mavericks, I found as following:
> 
> 1) Built-in JRE default: `/Library/Internet\
> Plug-Ins/JavaAppletPlugin.plugin/Contents/Home`
> 
> 2) JDKs downloaded from Apple: `/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home/`
> 
> 3) JDKs downloaded from Oracle: `/Library/Java/JavaVirtualMachines/jdk1.8.0_11.jdk/Contents/Home`


----------

### Resources

 - https://stackoverflow.com/questions/19039752/removing-java-8-jdk-from-mac
 - http://hanxue-it.blogspot.ch/2014/05/installing-java-8-managing-multiple.html
 - http://sourabhbajaj.com/mac-setup/index.html
 - http://brew.sh
 - https://github.com/Homebrew/homebrew/tree/master/share/doc/homebrew#readme
 - http://sourabhbajaj.com/mac-setup/Homebrew/README.html
 - "brew tap” explained https://github.com/Homebrew/homebrew/blob/master/share/doc/homebrew/brew-tap.md
 - “brew versions” explained https://stackoverflow.com/questions/3987683/homebrew-install-specific-version-of-formula and also https://github.com/Homebrew/homebrew-versions
 - https://github.com/caskroom/homebrew-cask
 - “cask versions”, similar to “brew versions”, see https://github.com/caskroom/homebrew-versions and also https://github.com/caskroom/homebrew-cask/issues/9447
 - http://www.jenv.be
 - https://github.com/gcuisinier/jenv

2
===

Uninstall jdk8, install jdk7, then reinstall jdk8.

My approach to switching between them (in .profile) :

    export JAVA_7_HOME=$(/usr/libexec/java_home -v1.7)
    export JAVA_8_HOME=$(/usr/libexec/java_home -v1.8)
    export JAVA_9_HOME=$(/usr/libexec/java_home -v9)
    
    alias java7='export JAVA_HOME=$JAVA_7_HOME'
    alias java8='export JAVA_HOME=$JAVA_8_HOME'
    alias java9='export JAVA_HOME=$JAVA_9_HOME'
    
    #default java8
    export JAVA_HOME=$JAVA_8_HOME

Then you can simply type <code>java7</code> or <code>java8</code> in a terminal to switch versions.

(edit: updated to add Dylans improvement for Java 9)

3
===

In the same spirit than @Vegard (lightweight):

- Install the wanted JDKs with Homebrew
- Put this `jdk` bash function and a default in your `.profile`

        jdk() {
            version=$1
            export JAVA_HOME=$(/usr/libexec/java_home -v"$version");
            java -version
         }

        export JAVA_HOME=$(/usr/libexec/java_home -v11); # Your default version


- and then, to switch your jdk, you can do 

         jdk 9
         jdk 11
         jdk 13

Based on https://github.com/AdoptOpenJDK/homebrew-openjdk.

4
===

To install more recent versions of OpenJDK, I use this. Example for OpenJDK 14:

```shell
brew info adoptopenjdk
brew tap adoptopenjdk/openjdk
brew cask install adoptopenjdk14
```

See https://github.com/AdoptOpenJDK/homebrew-openjdk for current info.

5
===

## For macOS Sierra 420
This guide was cobbled together from various sources (replies above as well as other posts), and works perfect.

### 0. If you haven't already, install homebrew. 
See https://brew.sh/

### 1. Install jenv
	brew install jenv

### 2. Add jenv to the bash profile
	if which jenv > /dev/null; then eval "$(jenv init -)"; fi

### 3. Add jenv to your path
	export PATH="$HOME/.jenv/shims:$PATH"

### 4. Tap "caskroom/versions"
FYI: "Tap" extends brew's list of available repos it can install, above and beyond brew's default list of available repos.
 
	brew tap caskroom/versions

### 5. Install the latest version of java
	brew cask install java

### 6. Install java 6 (or 7 or 8 whatever you need)
	brew cask install java6
	#brew cask install java7
	#brew cask install java8

? Maybe close and restart Terminal so it sees any new ENV vars that got setup.

### 7. Review Installations
All Java version get installed here: `/Library/Java/JavaVirtualMachines` lets take a look.

	ls -la /Library/Java/JavaVirtualMachines

### 8. Add each path to jenv one-at-a-time.
We need to add "/Contents/Home" to the version folder.
WARNING: Use the actual paths on your machine... these are just ___EXAMPLE___'s

	jenv add /Library/Java/JavaVirtualMachines/1.6.0___EXAMPLE___/Contents/Home
	jenv add /Library/Java/JavaVirtualMachines/jdk-9.0.1.jdk___EXAMPLE___/Contents/Home

### 9. Check if jenv registered OK
	jenv versions

### 10. Set java version to use (globably)
Where XX matches one of the items in the versions list above.
	
	jenv global XX

### Check java version
	java -version

### Check jenv versions
Should also indicate the current version being used with an asterisk.
	
	jenv versions


### DONE

------------------------------------------------

## Quick future reference

To change java versions 

... See the list of available java versions

	jenv versions

... then, where XX matches an item in the list above

	jenv global XX

---
