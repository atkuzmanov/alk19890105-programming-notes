# bash string manipulation 1

Replace character X with character Y in a string with bash

> References
>
> <https://unix.stackexchange.com/questions/272596/replace-character-x-with-character-y-in-a-string-with-bash>

```bash
So many ways, here are a few:

    $ string="a,b,c,d,e"
    
    $ echo "${string//,/$'\n'}"  ## Shell parameter expansion
    a
    b
    c
    d
    e

    $ tr ',' '\n' <<<"$string"  ## With "tr"
    a
    b
    c
    d
    e
    
    $ sed 's/,/\n/g' <<<"$string"  ## With "sed"
    a
    b
    c
    d
    e
    
    $ xargs -d, -n1 <<<"$string"  ## With "xargs"
    a
    b
    c
    d
    e
    
```

---

Replacing some characters in a string with another character

> References
>
> <https://stackoverflow.com/questions/2871181/replacing-some-characters-in-a-string-with-another-character>

```bash
    echo "$string" | tr xyz _
would replace each occurrence of `x`, `y`, or `z` with `_`, giving `A__BC___DEF__LMN` in your example.

    echo "$string" | sed -r 's/[xyz]+/_/g'
would replace repeating occurrences of `x`, `y`, or `z` with a single `_`, giving `A_BC_DEF_LMN` in your example.
```

===

```bash
Using [Bash Parameter Expansion][1]:

    orig="AxxBCyyyDEFzzLMN"
    mod=${orig//[xyz]/_}


  [1]: https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html
```

===

```bash
You might find this link helpful:

http://tldp.org/LDP/abs/html/string-manipulation.html

In general,

To replace the first match of $substring with $replacement:

    ${string/substring/replacement}

To replace all matches of $substring with $replacement:

    ${string//substring/replacement}

EDIT: 
Note that this applies to a variable named $string.
```

---

Remove a character from the end of a variable

> References
>
> <https://stackoverflow.com/questions/1848415/remove-a-character-from-the-end-of-a-variable>

```bash
Be careful, bash3 added perl-similar regex to bash. The guide mentioned covers this as well as the  [official guide at GNU][1] , but not all references do.


  [1]: http://www.gnu.org/software/bash/manual/bashref.html

### What did I do?

Substitute `2.19/*` to be `2.19`.

### Solution

    VER="2.19/foo-bar"
    NEWVER=${VER%/*}
```

---

What is the simplest way to remove a trailing slash from each parameter?

> References
>
> <https://stackoverflow.com/questions/9018723/what-is-the-simplest-way-to-remove-a-trailing-slash-from-each-parameter>

```bash
The accepted answer will trim ONE trailing slash.

One way to trim multiple trailing slashes is like this:

    VALUE=/looks/like/a/path///

    TRIMMED=$(echo $VALUE | sed 's:/*$::')

    echo $VALUE $TRIMMED

Which outputs:

    /looks/like/a/path/// /looks/like/a/path
```

===

```bash
You can use the `${parameter%word}` expansion that is detailed [here][1].  Here is a simple test script that demonstrates the behavior:

    #!/bin/bash
    
    # Call this as:
    #   ./test.sh one/ two/ three/ 
    #
    # Output:
    #  one two three
    
    echo ${@%/}


  [1]: http://www.gnu.org/software/bash/manual/bashref.html#Shell-Parameter-Expansion

===

34
+1: To be highly pedantic, that will remove a single slash, not all trailing slashes. To remove any number of trailing slashes: shopt -s extglob; echo "${@%%+(/)}" – glenn jackman Jan 26 '12 at 17:19 
24

Warning: you may not want to remove trailing slashes in all cases. If "/" is supplied as an argument, removing the trailing slash will have ...unfortunate consequences. – Gordon Davisson Jan 26 '12 at 19:17
13

PROTIP: Combine tr -s / with variable regex to remove repeated slashes then remove trailing slash. e.g. DIR=$(echo //some///badly/written///dir////// | tr -s /); DIR=${DIR%/} – Dave Nov 14 '14 at 14:36 
1

Really? At a bash prompt, run set -- one///// two// three four/; shopt -s extglob; echo "${@%%+(/)}" and tell me what you see – glenn jackman Jan 22 '15 at 16:46 
1

@twalberg I appreciate "protips" that aren't just alternative answers to OP's question in comment threads. – Kyle Strand Feb 20 '15 at 20:12

```

---

Removing first forward slash from string

> References
>
> <https://unix.stackexchange.com/questions/480846/removing-first-forward-slash-from-string>

```bash
Something like will do the work:

    A="file:///path/to/file"
    B=$(echo $A|sed 's@/@@')
without `g` at the end in `sed` the program will change only first occurrence
```

---
