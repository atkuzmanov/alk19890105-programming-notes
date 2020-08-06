# bash notes

How to extract domain name from url?

```bash
$ URI="http://user:pw@example.com:80/"
$ echo $URI | sed -e 's/[^/]*\/\/\([^@]*@\)\?\([^:/]*\).*/\2/'
example.com
see http://en.wikipedia.org/wiki/URI_scheme

---

share  edit  follow  flag
edited Jul 2 at 13:21

Flimm
84.1k2828 gold badges181181 silver badges189189 bronze badges
answered Mar 24 '10 at 9:52

user300653
34722 silver badges3

This works with or without port, deep paths and is still using bash. although it doesn't work on mac. – chovy Dec 29 '15 at 3:34

7 years later, this is still my go-to answer. – mwoodman Oct 19 '17 at 17:14
1

I use your suggestion with a little extra to strip out any subdomains that might be in the url ->> echo http://www.mail.example.com:3030/index.php | sed -e "s/[^/]*\/\/\([^@]*@\)\?\([^:/]*\).*/\2/" | awk -F. '{print $(NF-1) "."  $NF}' so I basically cut your output at the dot and take the last & second to last column and patch them back with the dot. – sakumatto Nov 1 '17 at 14:33

This is the best answer! I used this for a ping command that allows full URLs: unix.stackexchange.com/a/428990/20661 stripping only the www. subdomain – rubo77 Mar 8 '18 at 10:52

For those who want to get the port: sed -e "s/[^/]*\/\/\([^@]*@\)\?\([^:/]*\)\(:\([0-9]\{1,5\}\)\)\?.*/\4/" – wheeler Apr 26 '18 at 23:38
```

===

```bash
You can use simple AWK way to extract the domain name as follows:

echo http://example.com/index.php | awk -F[/:] '{print $4}'
OUTPUT: example.com

:-)

share  edit  follow  flag
edited Jul 5 '18 at 12:58

sorin
126k131131 gold badges434434 silver badges663663 bronze badges
answered Jul 8 '12 at 18:50

Soj
79755 silver badges2

Nicee, this is so much better then the answers provided in stackoverflow.com/questions/6174220/parse-url-in-shell-script ! – bk138 Dec 6 '14 at 1:19
6

echo http://example.com:3030/index.php | awk -F/ '{print $3}' example.com:3030 :-( – Ben Burns Mar 24 '15 at 9:16

you could split on : again to get it, but its not flexible enough to accept both with and without port. – chovy Dec 29 '15 at 3:30
2

I got it by using this - echo http://www.example.com/somedir/someotherdir/index.html | cut -d'/' -f1,2,3 gives http://www.example.com – 3AK Jun 16 '16 at 5:44
3

To handle urls with and without ports: awk -F[/:] '{print $4}' – Michael Oct 6 '17
```

===

```bash
sed -E -e 's_.*://([^/@]*@)?([^/:]+).*_\2_'
e.g.

$ sed -E -e 's_.*://([^/@]*@)?([^/:]+).*_\2_' <<< 'http://example.com'
example.com

$ sed -E -e 's_.*://([^/@]*@)?([^/:]+).*_\2_' <<< 'https://example.com'
example.com

$ sed -E -e 's_.*://([^/@]*@)?([^/:]+).*_\2_' <<< 'http://example.com:1234/some/path'
example.com

$ sed -E -e 's_.*://([^/@]*@)?([^/:]+).*_\2_' <<< 'http://user:pass@example.com:1234/some/path'
example.com

$ sed -E -e 's_.*://([^/@]*@)?([^/:]+).*_\2_' <<< 'http://user:pass@example.com:1234/some/path#fragment'
example.com

$ sed -E -e 's_.*://([^/@]*@)?([^/:]+).*_\2_' <<< 'http://user:pass@example.com:1234/some/path#fragment?params=true'
example.com
share  edit  follow  flag
answered May 24 '17 at 8:23

Armand
19.9k1616 gold badges7979 silver badges110110 bronze badges

Boom! HOST=$(sed -E -e 's_.*://([^/@]*@)?([^/:]+).*_\2_' <<< "$MYURL") is fine in Bash – azatar May 26 '17 at 17:58

I would like to crop www from domain. In this case, how should I change the command properly? – Ceylan B. Apr 25 '19 at 8:22
```

> References
>
> <https://stackoverflow.com/questions/2497215/how-to-extract-domain-name-from-url>

===

```bash
A fast solution to get the domain part without "http://" would be by setting browser.urlbar.trimURLs to false in Firefox's about:config, so you can more easily copy only the domain part of a URL.

But you can add a function pingd like this to your ~/.bashrc:

function pingd {
      ping $(echo "$1" | sed -e "s/[^/]*\/\/\([^@]*@\)\?\([^:/]*\).*/\2/" | sed "s/^www\.//")
}
works with:

pingd "http://user:pw@www.example.com:80/some/path/url?data&and#hash"
PING example.com
...

If the url doesn't contain & nor ! it also works without quotes
```

> References
>
> <https://unix.stackexchange.com/questions/428989/allow-full-urls-starting-with-http-https-or-www-in-ping/428990#428990>

---

Extract domain name from URL using bash shell parameter substitution

> References
>
> <https://www.cyberciti.biz/faq/get-extract-domain-name-from-url-in-linux-unix-bash/>

Another option is to use bash shell parameter substitution:

```bash
# My shell variable 
f="https://www.cyberciti.biz/faq/copy-command/"
 
## Remove protocol part of url  ##
f="${f#http://}"
f="${f#https://}"
f="${f#ftp://}"
f="${f#scp://}"
f="${f#scp://}"
f="${f#sftp://}"
 
## Remove username and/or username:password part of URL  ##
f="${f#*:*@}"
f="${f#*@}"
 
## Remove rest of urls ##
f=${f%%/*}
 
## Show domain name only ##
echo "$f"
```

---
---
---

Is it safe to place symlinks in /bin directory ?

> References
>
> <https://askubuntu.com/questions/406250/is-it-safe-to-place-symlinks-in-bin-directory>

It isn't recommended to mess with `/bin` and with `/usr/bin` even though this will work it is somewhat unsafe. Also, you don't *need* to place your symlinks there. 

I've had the same problem like you mentioned. It's cumbersome to navigate to your scripts and call them like `./myscript` each and every time. Here is what I did.

<h1>Define your own bin-directory</h1>
You can create your own bin-directory and put your scripts there. Create it with

    mkdir ~/bin

Now you will need to tamper with the PATH environment variable. This is a sensitive area. If you mess up the PATH variable you won't be able to execute commands with relative paths anymore. If that happens `ls` might not work any more `/bin/ls` will still do.

What I'm going to show right now will only affect the current running terminal session. So if anything goes wrong you simply log out with <kbd>Ctrl</kbd>+<kbd>D</kbd> and everything is like it was before.

    echo $PATH
    /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games
    export PATH=$PATH:~/bin
    echo $PATH
    /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/games:/usr/games:/home/madmike/bin

The `echo`-command shows what's in $PATH before and after. `export` allows you to change the environment variable. Your additional bin-directory is appended to the end of the variable. This means your commands have the *least* priority should there be more than one command with the same name. This is good, since you don't want to override essential system commands.

To make the changes permanent, edit your ~/.bashrc file.

    nano ~/.bashrc

add `export PATH=$PATH:~/bin` to the end of that file.

Now every new terminal-session will have the $PATH variable expanded with your directory.

---
---
---

Get path of current script when executed through a symlink

> References
>
> <https://unix.stackexchange.com/questions/17499/get-path-of-current-script-when-executed-through-a-symlink>

Try this as a general purpose solution:

<!-- language: lang-none -->

    DIR="$(cd "$(dirname "$0")" && pwd)"

In the specific case of following symlinks, you could also do this:

<!-- language: lang-none -->

    DIR="$(dirname "$(readlink -f "$0")")"

---
---
---

Command to list all files except . (dot) and .. (dot dot)

> References
>
> <https://stackoverflow.com/questions/22407480/command-to-list-all-files-except-dot-and-dot-dot>

I have a situation where I want to remove a series of dot-directories. In my servers we mark directories for removal adding a dot and certain other text patterns (timestamp) for automated removal. Sometimes I need to do that manually.

As I commented to [Basile Starynkevitch's][1] reply, when you use a globbing pattern like the one below the -A switch loses its function and works just as -a: 

   

     runlevel0@ubuntu:~/scripts$ ls -1dA .*
    .
    ..
    .comparepp.sh.swp

It would most certainly give an error if I try to remove files as a user, but I just don't want to think what could happen as root (!)

My approach in this case is: 

    for dir in $(ls -1ad .* | tail -n +3) ; do rm -rfv $dir  ; done

I tail out the 2 first line containing the dots as you can see. To tailor the answer to the question asked this would do the job: 

    ls -d1A .* | tail -n +3

  [1]: https://stackoverflow.com/users/841108/basile-starynkevitch

---
---
---

for loop in bash lists dot and double dot folders [duplicate]

> References
>
> <https://unix.stackexchange.com/questions/215424/for-loop-in-bash-lists-dot-and-double-dot-folders>

Here is a method using bash's `extglob`:

    shopt -s extglob
    for f in .!(|.); do
      echo "$f"
    done

With `extglob` the pattern `!(pattern-list)` matches anything except for the given pattern. The pattern in the example says match everything that starts with `.` and is not followed by nothing or another single `.`.

===

Using `find`

    find ~/common -type f -name ".*" -print0 | \
        while read -d $'\0' file; do \
            echo $file; \
        done

or with `find` and `IFS`

    find ~/common -type f -name ".*" -print0 | \
        while IFS= read -rd '' file; \
            do echo $file; \
        done

===

Did you mean:

    ls -A

also you can use
    
    ls -Al

This wont list the . and .. (its the capital A that does that). a will list all, and A will list almost all, almost all cause . and .. arent listed.

EDIT: The above is aimed at his second question, where he states he has the same issue with ls -a

===

How can I make bash not match `.` and `..` with `.*`

> References
>
> <https://unix.stackexchange.com/questions/40697/how-can-i-make-bash-not-match-and-with>

You can use the `GLOBIGNORE` bash variable.

<pre>
       GLOBIGNORE
              A colon-separated list of patterns defining the set of filenames
              to be ignored by pathname expansion.  If a filename matched by a
              pathname  expansion  pattern also matches one of the patterns in
              GLOBIGNORE, it is removed from the list of matches.
</pre>

and

<pre>
       .......................-.  The file names ``.''  and ``..''  are always
       ignored  when GLOBIGNORE is set and not null.  
</pre>

So if you set

    GLOBIGNORE='*/.:*/..'

then `path/.*` will not match `.` and `..`, as you ask.

Wouldn't `GLOBIGNORE=.:..` more succinctly accomplish the same thing? Or is there a subtle difference I'm missing? – iconoclast Jun 18 '12 at 14:50

===

---
---
---

For files in directory, only echo filename (no path)

> References
>
> <>

If you want a native `bash` solution

    for file in /home/user/*; do
      echo "${file##*/}"
    done

The above uses **Parameter Expansion** which is native to the shell and does not require a call to an external binary such as `basename`

However, might I suggest just using `find`

    find /home/user -type f -printf "%f\n"

===

Just use `basename`:

    echo `basename "$filename"`

The quotes are needed in case $filename contains e.g. spaces.

Btw, `` is deprecated. Better to use $() like Oli did – SiegeX Jan 25 '12 at 22:25

===

Use `basename`:

    echo $(basename /foo/bar/stuff)

---
---
---

Bash function to process all dotfiles in a directory excluding directories

> References
>
> <https://stackoverflow.com/questions/31497323/bash-function-to-process-all-dotfiles-in-a-directory-excluding-directories>

If you want only dot-files:

    find . -maxdepth 1 -type f -name '.*' -printf '%f\0'

The test `-name '.*'` selects dot files.  Since `-name` accepts globs, `.` means a literal period and `*` means any number of any character.

The action `-printf '%f\0'` will print NUL-separated filenames without the path.

If your name selection criteria becomes more complex, find also offers `-regex` which selects files based on regular expressions.  GNU find understands several different dialects of regular expression.  These can be selected with `-regextype`.  Supported dialects include `emacs` (default), `posix-awk`, `posix-basic`, `posix-egrep`, and `posix-extended`.

### Mac OSX or other BSD System

BSD `find` does not offer `-printf`.  In its place, try this:

    find . -maxdepth 1 -type f -name '.*' -exec basename {} \;

Note that this will be safe all file names, even those containing difficult characters such as blanks, tabs or newlines.

### Putting the dot files into a bash array

If you want to get all dot files and directories into an array, it is simple:

    all=(.*).

That is safe for all file names.

If you want to get only regular files, not directories, then use bash:

    a=(); while IFS= read -r -d ''; do a+=("$(basename "$REPLY")"); done < <( find $HOME -maxdepth 1 -type f -name '.*' -print0 )

This is also safe for all file names.

---
---
---
