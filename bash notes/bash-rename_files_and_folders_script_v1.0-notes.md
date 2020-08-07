# rename script notes

> References
>
> <https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion>
>
> <https://stackoverflow.com/questions/15012631/rename-files-and-directories-recursively-under-ubuntu-bash>
>
> <https://superuser.com/questions/213134/recursively-rename-files-change-extension-in-linux>
>
> <https://stackoverflow.com/questions/6509650/extract-directory-from-path>
>
> <https://stackoverflow.com/questions/6121091/get-file-directory-path-from-file-path/6121114>
>
> <https://stackoverflow.com/questions/13210880/replace-one-substring-for-another-string-in-shell-script>
>
> <https://tldp.org/LDP/abs/html/string-manipulation.html>
>
> <https://stackoverflow.com/questions/16623835/remove-a-fixed-prefix-suffix-from-a-string-in-bash>
>
> <https://unix.stackexchange.com/questions/311758/remove-specific-word-in-variable>
>
> <https://unix.stackexchange.com/questions/56810/adding-text-to-filename-before-extension>
>
> <https://stackoverflow.com/questions/45799657/bash-adding-a-string-to-file-name>
>
> <https://linuxize.com/post/bash-functions/>
>
> <https://bash.cyberciti.biz/guide/Pass_arguments_into_a_function>
>
> <https://stackoverflow.com/questions/6212219/passing-parameters-to-a-bash-function>
>
> <https://linuxacademy.com/blog/linux/conditions-in-bash-scripting-if-statements/>

---
---
---

> References
> <https://stackoverflow.com/questions/15012631/rename-files-and-directories-recursively-under-ubuntu-bash>

Rename files and directories recursively under ubuntu /bash

A solution using `find`:

To rename *files only*:

    find /your/target/path/ -type f -exec rename 's/special/regular/' '{}' \;

To rename *directories only*:

    find /your/target/path/ -type d -execdir rename 's/special/regular/' '{}' \+

To rename both *files and directories*:

    find /your/target/path/ -execdir rename 's/special/regular/' '{}' \+

---
---
---

> References
> <https://superuser.com/questions/213134/recursively-rename-files-change-extension-in-linux>

Recursively rename files (change extension) in Linux

Something like:

    find . -name '*.andnav' -exec sh -c 'mv "$0" "${0%.andnav}.tile"' {} \;


### Explanation

The above starts walking the directory tree starting at the current working directory (`.`). Every time a file name matches the pattern `*.andnav` (e.g., `foo.andnav`) the following command is executed:

    sh -c 'mv "$0" "${0%.andnav}.tile"' foo.andnav

Where `$0` is `foo.andnav` and `${0%.andnav}.tile` replaces the `.andnav` suffix with `.tile` so basically:

    mv foo.andnav foo.tile

===

Figured it out

    find . -name "*.andnav" -exec rename -v 's/\.andnav$/\.tile/i' {} \;
    ./0/0.png.andnav renamed as ./0/0.png.tile
    ./0/1.png.andnav renamed as ./0/1.png.tile
    ./1/0.png.andnav renamed as ./1/0.png.tile
    ./1/1.png.andnav renamed as ./1/1.png.tile

of course remove the -v when actually doing it, or it will waste time displaying all the files

---
---
---

> References
> <https://stackoverflow.com/questions/6509650/extract-directory-from-path>

Using `${file%/*}` like suggested by Urvin/LuFFy is technically better since you won't rely on an external command. To get the basename in the same way you could do `${file##*/}`. It's unnecessary to use an external command unless you need to.

    file="/stuff/backup/file.zip"
    filename=${1##*/}     # file.zip
    directory=${1%/*}     # /stuff/backup

It would also be fully POSIX compliant this way. Hope it helps! :-)

...

There is one case where dirname has an advantage over the (more efficient) built-in approach, and that's if you aren't certain that your path is fully-qualified to start with. If you have file=file.zip, dirname "$file" will return ., whereas ${file%/*} will return file.zip. – Charles Duffy Sep 21 '18 at 16:40

...of course, you can branch: case $file in */*) dir=${file%/*};; *) dir=.;; esac is still POSIX-y and addresses the issue. – Charles Duffy Sep 21 '18 at 16:42

===

    dirname $file

is what you are looking for

---
---
---

> References
> <https://stackoverflow.com/questions/6121091/get-file-directory-path-from-file-path/6121114>

Get file directory path from file path

`dirname` and `basename` are the tools you're looking for for extracting path components:

    $ export VAR='/home/pax/file.c'
    $ echo "$(dirname "${VAR}")" ; echo "$(basename "${VAR}")"
    /home/pax
    file.c

They're not internal Bash commands but they're part of the POSIX standard -  see [`dirname`][1] and [`basename`][2]. Hence, they're probably available on, or can be obtained for, most platforms that are capable of running `bash`.

  [1]: http://pubs.opengroup.org/onlinepubs/9699919799/utilities/dirname.html
  [2]: http://pubs.opengroup.org/onlinepubs/9699919799/utilities/basename.html

---
---
---

> References
> <https://stackoverflow.com/questions/13210880/replace-one-substring-for-another-string-in-shell-script>

Replace one substring for another string in shell script

To replace the *first* occurrence of a pattern with a given string, use <code>${*parameter*/*pattern*/*string*}</code>:

    #!/bin/bash
    firstString="I love Suzi and Marry"
    secondString="Sara"
    echo "${firstString/Suzi/$secondString}"    
    # prints 'I love Sara and Marry'

To replace *all* occurrences, use <code>${*parameter*//*pattern*/*string*}</code>:

    message='The secret code is 12345'
    echo "${message//[0-9]/X}"           
    # prints 'The secret code is XXXXX'

(This is documented in [the *Bash Reference Manual*, &sect;3.5.3 "Shell Parameter Expansion"](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion).)

Note that this feature is not specified by POSIX &mdash; it's a Bash extension &mdash; so not all Unix shells implement it. For the relevant POSIX documentation, see [*The Open Group Technical Standard Base Specifications, Issue 7*, the *Shell & Utilities* volume, &sect;2.6.2 "Parameter Expansion"](http://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html#tag_18_06_02).

...

@ruakh how do I write this statement with a or condition. Just if I want to replace Suzi or Marry with new string. – Priyatham51 Jan 8 '14 at 22:41

@Priyatham51: There's no built-in feature for that. Just replace one, then the other. – ruakh Jan 9 '14 at 0:05

@Bu: No, because \n in that context would represent itself, not a newline. I don't have Bash handy right now to test, but you should be able to write something like, $STRING="${STRING/$'\n'/<br />}". (Though you probably want STRING// -- replace-all -- instead of just STRING/.) – ruakh Jul 23 '15 at 5:08

To be clear, since this confused me for a bit, the first part has to be a variable reference. You can't do echo ${my string foo/foo/bar}. You'd need input="my string foo"; echo ${input/foo/bar} – Henrik N Sep 15 '16 at 7:42

@mgutt: This answer links to the relevant documentation. The documentation is not perfect -- for example, instead of mentioning // directly, it mentions what happens "If pattern begins with ‘/’" (which isn't even accurate, since the rest of that sentence assumes that the extra / is not actually part of the pattern) -- but I don't know of any better source. – ruakh Nov 28 '19 at 20:09

===

For Dash all previous posts aren't working

The POSIX `sh` compatible solution is:

    result=$(echo "$firstString" | sed "s/Suzi/$secondString/")

This will replace the first occurrence on each line of input. Add a `/g` flag to replace all occurrences:

    result=$(echo "$firstString" | sed "s/Suzi/$secondString/g")

...

I got this: $ echo $(echo $firstString | sed 's/Suzi/$secondString/g') I love $secondString and Marry – Qstnr_La May 9 '17 at 18:43

@Qstnr_La use double quotes for variable substitution: result=$(echo $firstString | sed "s/Suzi/$secondString/g") – emc Jun 8 '17 at 6:31

Plus 1 for showing how to output to a variable as well. Thanks! – Chef Pharaoh Nov 1 '17 at 14:28

I fixed the single quotes and also added the missing quotes around the echo argument. It deceptively works without quoting with simple strings, but easily breaks on any nontrivial input string (irregular spacing, shell metacharacters, etc). – tripleee Jul 17 '18 at 16:54

In sh (AWS Codebuild / Ubuntu sh) I found that I need a single slash at the end, not a double. I'm going to edit the comment as the comments above also show a single slash. – Tim Apr 11 '19 at 1:01

@Tim My bad; thanks for fixing it. – tripleee Jul 27 at 4:50

---
---
---

10.1. Manipulating Strings

> References
> <https://tldp.org/LDP/abs/html/string-manipulation.html>

---
---
---

Remove a fixed prefix/suffix from a string in Bash

> References
> <https://stackoverflow.com/questions/16623835/remove-a-fixed-prefix-suffix-from-a-string-in-bash>

    $ foo=${string#"$prefix"}
    $ foo=${foo%"$suffix"}
    $ echo "${foo}"
    o-wor

...

There are also ## and %% , which remove as much as possible if $prefix or $suffix contain wildcards. – pts May 18 '13 at 11:48

Is there a way to combine the two in one line? I tried ${${string#prefix}%suffix} but it doesn't work. – static_rtti Mar 5 '14 at 8:18

@static_rtti No, unfortunately you cannot nest parameter substitution like this. I know, it's a shame. – Adrian Frühwirth Mar 5 '14 at 8:34

@AdrianFrühwirth : the whole language is a shame, but it's so useful :) – static_rtti Mar 5 '14 at 9:24

Nvm, "bash substitution" in Google found what I wanted. – Tyler Nov 4 '14 at 0:59

===

Using sed:

    $ echo "$string" | sed -e "s/^$prefix//" -e "s/$suffix$//"
    o-wor

Within the sed command, the `^` character matches text beginning with `$prefix`, and the trailing `$` matches text ending with `$suffix`.

Adrian Frühwirth makes some good points in the comments below, but `sed` for this purpose can be very useful. The fact that the contents of $prefix and $suffix are interpreted by sed can be either good OR bad- as long as you pay attention, you should be fine. The beauty is, you can do something like this:

    $ prefix='^.*ll'
    $ suffix='ld$'
    $ echo "$string" | sed -e "s/^$prefix//" -e "s/$suffix$//"
    o-wor

which may be what you want, and is both fancier and more powerful than bash variable substitution. If you remember that with great power comes great responsibility (as Spiderman says), you should be fine.

A quick introduction to sed can be found at <http://evc-cit.info/cit052/sed_tutorial.html>

A note regarding the shell and its use of strings:

For the particular example given, the following would work as well:

    $ echo $string | sed -e s/^$prefix// -e s/$suffix$//

...but only because:

 1. echo doesn't care how many strings are in its argument list, and
 2. There are no spaces in $prefix and $suffix

It's generally good practice to quote a string on the command line because even if it contains spaces it will be presented to the command as a single argument. We quote $prefix and $suffix for the same reason: each edit command to sed will be passed as one string. We use double quotes because they allow for variable interpolation; had we used single quotes the sed command would have gotten a literal `$prefix` and `$suffix` which is certainly not what we wanted.

Notice, too, my use of single quotes when setting the variables `prefix` and `suffix`. We certainly don't want anything in the strings to be interpreted, so we single quote them so no interpolation takes place. Again, it may not be necessary in this example but it's a very good habit to get into.

...

Unfortunately, this is bad advice for several reasons: 1) Unquoted, $string is subject to word splitting and globbing. 2) $prefix and $suffix can contain expressions that sed will interpret, e.g. regular expressions or the character used as delimiter which will break the whole command. 3) Calling sed two times is not necessary (you can -e 's///' -e '///' instead) and the pipe could also be avoided. For example, consider string='./ *' and/or prefix='./' and see it break horribly due to 1) and 2). – Adrian Frühwirth May 19 '14 at 6:59

Fun note: sed can take almost anything as a delimiter. In my case, since I was parsing prefix-directories out of paths, I couldn't use /, so I used sed "s#^$prefix##, instead. (Fragility: filenames can't contain #. Since I control the files, we're safe, there.) – Olie Oct 21 '14 at 21:24

@Olie Filenames can contain any character except the slash and null character so unless you're in control you cannot assume a filename not to contain certain characters. – Adrian Frühwirth Feb 22 '15 at 23:53

Yeah, don't know what I was thinking there. iOS maybe? Dunno. Filenames can certainly contain "#". No idea why I said that. :) – Olie Feb 23 '15 at 3:11

@Olie: As I understood your original comment, you were saying that the limitation of your choice to use # as sed's delimiter meant that you couldn't handle files containing that character. – P Daddy Mar 4 '15 at 17:03

---
---
---

> References
> <https://unix.stackexchange.com/questions/311758/remove-specific-word-in-variable>

Remove specific word in variable

Using `bash` substring replacement:
```
FOO=${FOO//$WORDTOREMOVE/}
```
The `//` replaces all occurences of the substring (`$WORDTOREMOVE`) with the content between `/` and `}`.  In this case nothing.

For information on this and other ways to work with strings in bash, see the section [10.1. Manipulating Strings](http://tldp.org/LDP/abs/html/string-manipulation.html) of the [Advanced Bash-Scripting Guide](http://tldp.org/LDP/abs/html/).

---
---
---

> References
> <https://unix.stackexchange.com/questions/56810/adding-text-to-filename-before-extension>

adding text to filename before extension

As the question is for `bash` there is no need for external utilities, since you can use [bash regexps][1]:

<!-- language: lang-bash -->

    for i in *.shp
    do
        mv -v "${i}" "${i%.*}_MYSUFFIX.${i##*.}"
    done

  [1]: https://www.tldp.org/LDP/abs/html/x17129.html

---
---
---

> References
> <https://stackoverflow.com/questions/45799657/bash-adding-a-string-to-file-name>

Bash adding a string to file name

With bash this can be done simplier like:

    for f in *;do
    echo "$f" "${f%.*}hallo.${f##*.}"
    done

example:

    $ ls -all
    -rw-r--r-- 1 29847 29847    0 Aug 21 14:33 file1.txt
    -rw-r--r-- 1 29847 29847    0 Aug 21 14:33 file2.txt
    -rw-r--r-- 1 29847 29847    0 Aug 21 14:33 file3.txt
    -rw-r--r-- 1 29847 29847    0 Aug 21 14:33 file4.txt
    -rw-r--r-- 1 29847 29847    0 Aug 21 14:33 file5.txt 
    
    $ for f in *;do mv -v "$f" "${f%.*}hallo.${f##*.}";done
    'file1.txt' -> 'file1hallo.txt'
    'file2.txt' -> 'file2hallo.txt'
    'file3.txt' -> 'file3hallo.txt'
    
    $ ls -all
    -rw-r--r-- 1 29847 29847    0 Aug 21 14:33 file1hallo.txt
    -rw-r--r-- 1 29847 29847    0 Aug 21 14:33 file2hallo.txt
    -rw-r--r-- 1 29847 29847    0 Aug 21 14:33 file3hallo.txt

This works because `${f%.*}` returns filename without extension - deletes everything (*) from the end (backwards) up to first/shortest found dot.

On the other hand this one `${f##*.}` deletes everything from the beginning up to the longest found dot, returning only the extension.

To overcome the extensionless files problem as pointed out in comments you can do something like this:

    $ for f in *;do [[ "${f%.*}" != "${f}" ]] && echo "$f" "${f%.*}hallo.${f##*.}" || echo "$f" "${f%.*}hallo"; done
    file1.txt file1hallo.txt
    file2.txt file2hallo.txt
    file3.txt file3hallo.txt
    file4 file4hallo
    file5 file5hallo

If the file has not an extension then this will yeld true `"${f%.*}" == "${f}"`

---
---
---

> References
> <https://linuxize.com/post/bash-functions/>

Bash Functions

```text
Updated May 30, 2020

5 min read

A Bash function is essentially a set of commands that can be called numerous times. The purpose of a function is to help you make your bash scripts more readable and to avoid writing the same code repeatedly. Compared to most programming languages, Bash functions are somewhat limited.

In this tutorial, we will cover the basics of Bash functions and show you how to use them in your shell scripts.

Defining Bash Functions
The syntax for declaring a bash function is straightforward. Functions may be declared in two different formats:

The first format starts with the function name, followed by parentheses. This is the preferred and more used format.

function_name () {
  commands
}
Copy
Single line version:

function_name () { commands; }
Copy
The second format starts with the reserved word function, followed by the function name.

function function_name {
  commands
}
Copy
Single line version:

function function_name { commands; }
Copy
Few points to be noted:

The commands between the curly braces ({}) are called the body of the function. The curly braces must be separated from the body by spaces or newlines.
Defining a function doesn’t execute it. To invoke a bash function, simply use the function name. Commands between the curly braces are executed whenever the function is called in the shell script.
The function definition must be placed before any calls to the function.
When using single line “compacted” functions, a semicolon ; must follow the last command in the function.
Always try to keep your function names descriptive.
To understand this better, take a look at the following example:
~/hello_world.sh
#!/bin/bash

hello_world () {
   echo 'hello, world'
}

hello_world
Copy
Let’s analyze the code line by line:

In line 3, we are defining the function by giving it a name. The curly brace { marks the start of the function’s body.
Line 4 is the function body. The function body can contain multiple commands, statements and variable declarations.
Line 5, the closing curly bracket }, defines the end of the hello_world function.
In line 7 we are executing the function. You can execute the function as many times as you need.
If you run the script, it will print hello, world.
Variables Scope
Global variables are variables that can be accessed from anywhere in the script regardless of the scope. In Bash, all variables by default are defined as global, even if declared inside the function.

Local variables can be declared within the function body with the local keyword and can be used only inside that function. You can have local variables with the same name in different functions.

To better illustrate how variables scope works in Bash, let’s consider this example:

~/variables_scope.sh
#!/bin/bash

var1='A'
var2='B'

my_function () {
  local var1='C'
  var2='D'
  echo "Inside function: var1: $var1, var2: $var2"
}

echo "Before executing function: var1: $var1, var2: $var2"

my_function

echo "After executing function: var1: $var1, var2: $var2"
Copy
The script starts by defining two global variables var1 and var2. Then there is an function that sets a local variable var1 and modifies the global variable var2.

If you run the script, you should see the following output:
Before executing function: var1: A, var2: B
Inside function: var1: C, var2: D
After executing function: var1: A, var2: D
From the output above, we can conclude that:

When a local variable is set inside the function body with the same name as an existing global variable, it will have precedence over the global variable.
Global variables can be changed from within the function.
Return Values
Unlike functions in “real” programming languages, Bash functions don’t allow you to return a value when called. When a bash function completes, its return value is the status of the last statement executed in the function, 0 for success and non-zero decimal number in the 1 - 255 range for failure.

The return status can be specified by using the return keyword, and it is assigned to the variable $?. The return statement terminates the function. You can think of it as the function’s exit status .

~/return_values.sh
#!/bin/bash

my_function () {
  echo "some result"
  return 55
}

my_function
echo $?
Copy
some result
55
To actually return an arbitrary value from a function, we need to use other methods. The simplest option is to assign the result of the function to a global variable:
~/return_values.sh
#!/bin/bash

my_function () {
  func_result="some result"
}

my_function
echo $func_result
Copy
some result
Another, better option to return a value from a function is to send the value to stdout using echo or printf like shown below:

~/return_values.sh
#!/bin/bash

my_function () {
  local func_result="some result"
  echo "$func_result"
}

func_result="$(my_function)"
echo $func_result
Copy
some result
Instead of simply executing the function which will print the message to stdout, we are assigning the function output to the func_result variable using the $() command substitution. The variable can later be used as needed.

Passing Arguments to Bash Functions
To pass any number of arguments to the bash function simply put them right after the function’s name, separated by a space. It is a good practice to double-quote the arguments to avoid the misparsing of an argument with spaces in it.

The passed parameters are $1, $2, $3 … $n, corresponding to the position of the parameter after the function’s name.
The $0 variable is reserved for the function’s name.
The $# variable holds the number of positional parameters/arguments passed to the function.
The $* and $@ variables hold all positional parameters/arguments passed to the function.
When double-quoted, "$*" expands to a single string separated by space (the first character of IFS) - "$1 $2 $n".
When double-quoted, "$@" expands to separate strings - "$1" "$2" "$n".
When not double-quoted, $* and $@ are the same.
Here is an example:

~/passing_arguments.sh
#!/bin/bash

greeting () {
  echo "Hello $1"
}

greeting "Joe"
Copy
Hello Joe
Conclusion
A Bash function is a block of reusable code designed to perform a particular operation. Once defined, the function can be called multiple times within a script.
You may also want to read about how to use a Bash function to create a memorable shortcut command for a longer command.
If you have any questions or feedback, feel free to leave a comment.
```

---
---
---

Pass arguments into a function

> References
> <https://bash.cyberciti.biz/guide/Pass_arguments_into_a_function>

---
---
---

Passing parameters to a Bash function

> References
> <https://stackoverflow.com/questions/6212219/passing-parameters-to-a-bash-function>

There are two typical ways of declaring a function. I prefer the second approach.

    function function_name {
       command...
    } 

or 

    function_name () {
       command...
    } 

To call a function with arguments:

    function_name "$arg1" "$arg2"

The function refers to passed arguments by their position (not by name), that is $1, $2, and so forth. **$0** is the name of the script itself.

Example:

    function_name () {
       echo "Parameter #1 is $1"
    }

Also, you need to call your function **after** it is declared. 

    #!/usr/bin/env sh
    
    foo 1  # this will fail because foo has not been declared yet.
    
    foo() {
        echo "Parameter #1 is $1"
    }
    
    foo 2 # this will work.

**Output:**

<!-- language: lang-none -->

    ./myScript.sh: line 2: foo: command not found
    Parameter #1 is 2


[Reference: Advanced Bash-Scripting Guide][1].

[1]: http://tldp.org/LDP/abs/html/complexfunct.html

...

You have forgotten the spaces, try function name() {}. Maybe with a 'enter' before {} – lalo Nov 11 '13 at 14:09

Good answer. My 2 cents: in shell constructs that reside in a file that is sourced (dotted) when needed, I prefer to use the function keyword and the (). My goal (in a file, not command line) is to increase clarity, not reduce the number of characters typed, viz, function myBackupFunction() compound-statement. – Terry Gardner Nov 27 '13 at 17:25

@CMCDragonkai, the function keyword version is an extension; the other form works in all POSIX-compliant shells. – Charles Duffy May 4 '15 at 17:02

@TerryGardner, consider that your attempts to increase clarity are reducing compatibility. – Charles Duffy May 4 '15 at 17:02

@RonBurk, perhaps -- but even if we consider only clarity, the function keyword had guarantees in the old ksh-family shells that introduced it that modern bash don't honor (in such shells, function made variables local-by-default; in bash, it does not). As such, its use decreases clarity to anyone who knows, and might expect, the ksh behavior. See wiki.bash-hackers.org/scripting/obsolete – Charles Duffy Feb 28 '18 at 21:31

---
---
---

> References
> <https://linuxacademy.com/blog/linux/conditions-in-bash-scripting-if-statements/>

---
---
---
