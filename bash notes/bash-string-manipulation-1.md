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
---
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
---
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
---
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
---
---

remove particular characters from a variable using bash

> References
>
> <https://unix.stackexchange.com/questions/104881/remove-particular-characters-from-a-variable-using-bash>

By chronological order:

### tr/sed

    echo "$VERSION" | tr -d .
    echo "$VERSION" | sed 's/\.//g'

### csh/tcsh

    echo $VERSION:as/.//

### POSIX shells:

    set -f
    IFS=.
    set -- $VERSION
    IFS=
    echo "$*"

### ksh93/zsh/mksh/bash/yash (and busybox `ash` when built with `ASH_BASH_COMPAT`)

    echo "${VERSION//.}"

### zsh

    echo $VERSION:gs/./

===

There is no need to execute an external program. `bash`'s [string manipulation][1] can handle it (also available in `ksh93` (where it comes from), `zsh` and recent versions of `mksh`, `yash` and busybox `sh` (at least)):

    $ VERSION='2.3.3'
    $ echo "${VERSION//.}"
    233

(In those shells' manuals you can generally find this in the *parameter expansion* section.)

  [1]: http://tldp.org/LDP/abs/html/string-manipulation.html

---
---
---

Bash printf Command

> References
>
> <https://linuxize.com/post/bash-printf-command/>

```bash
Typically, when writing bash scripts, we use echo to print to the standard output. echo is a simple command but is limited in its capabilities.
To have more control over the formatting of the output, use the printf command.

The printf command formats and prints its arguments, similar to the C printf() function.

printf Command
printf is a shell builtin in Bash and in other popular shells like Zsh and Ksh. There is also a standalone /usr/bin/printf binary, but the shell built-in version takes precedence. We will cover the Bash builtin version of printf.

The syntax for the printf command is as follows:

printf [-v var] format [arguments]
Copy
The -v option tells printf not to print the output but to assign it to the variable.
The format is a string which may contain three different types of objects:

Normal characters that are simply printed to the output as-is.
Backslash-escaped characters which are interpreted and then printed.
Conversion specifications that describe the format and are replaced by the values of respective arguments that follow the format string.
The command accepts any number of arguments. If more arguments than format specifiers are provided, the format string is reused to consume all of the arguments. If fewer arguments than format specifiers are supplied, the extra numeric-format specifiers are set to zero value while string-format specifiers are set to null string.
Below are a few points to consider when passing arguments the printf command:

The shell will substitute all variables, wildcard matching, and special characters before passing the arguments to the printf command.
When using single quotes '' the literal value of each character enclosed within the quotes will be preserved. Variables and commands will not be expanded.
A typical example of using printf looks like:

printf "Open issues: %s\nClosed issues: %s\n" "34" "65"
Open issues: 34
Closed issues: 65
The string Open issues: %s\nClosed issues: %s\n is the format while “34” and “65” are arguments. The format string contains two newline characters (\n) and two format specifiers (%s) that are replaced with the arguments.

The printf command doesn’t add a newline character (\n) at the end of the line.

Backslash-escaped Characters
The backslash-escaped characters are interpreted when used in the format string or in an argument corresponding to a %b conversion specifier. Here is a list of the most common escape characters:
\\ - Displays a backslash character.
\b - Displays a backspace character.
\n - Displays a new line.
\r - Displays a carriage return.
\t - Displays a horizontal tab.
\v - Displays a vertical tab.
Conversion specifications
A conversion specification takes the following form:

%[flags][width][.precision]specifier
Copy
Each conversion specification stars with the percent sign (%), includes optional modifiers and ends with one of the following letters that represent the data type (specifier) of the corresponding argument: aAbcdeEfgGioqsuxX.

Type conversion specifier
The type conversion specifier is a character that specifies how to interpret the corresponding argument. This character is required, and it is placed after the optional fields.

Below is a list showing all type conversions and what they do:
%b - Print the argument while expanding backslash escape sequences.
%q - Print the argument shell-quoted, reusable as input.
%d, %i - Print the argument as a signed decimal integer.
%u - Print the argument as an unsigned decimal integer.
%o - Print the argument as an unsigned octal integer.
%x, %X - Print the argument as an unsigned hexadecimal integer. %x prints lower-case letters and %X prints upper-case.
%e, %E - Print the argument as a floating-point number in exponential notation. %e prints lower-case letters and %E prints upper-case.
%a, %A - Print the argument as a floating-point number in hexadecimal fractional notation. %a prints lower-case letters and %A prints upper-case.
%g, %G - Print the argument as a floating-point number in normal or exponential notation, whichever is more appropriate for the given value and precision. %g prints lower-case letters and %G prints upper-case.
%c - Print the argument as a single character.
%f - Print the argument as a floating-point number.
%s - Print the argument as a string.
%% - Print a literal % symbol.
An unsigned number represents zero and positive numbers, while a signed number represents negative, zero, and positive numbers.

The following command prints the number 100 in three different number systems:

printf "Decimal: %d\nHex: %x\nOctal: %o\n" 100 100 100
Decimal: 100
Hex: 64
Octal: 144
Flags directive
Flags are the first optional modifiers and are used to set the justification, leading zeros, prefixes, etc.

Here are the most common ones:

- - Left align the printed text within the field. By default, the text is right-aligned.
+ - Prefix the numbers with a + or - signs. By default, only negative numbers are prefixed with a negative sign.
0 - Pads numbers with leading zeros rather than space.
blank - Prefix the positive numbers with a blank space and negative numbers with a minus (-).
# - An alternative format for numbers.
Width directive
The width directive filed is placed after any flag characters and specifies the minimum number of characters the conversion should result in.
If the outputted text width is less than the specified width, it’s padded with spaces. The width can be specified as a non-negative decimal integer or an asterisk (*).
Here is an example:

printf "%20s %d\n" Mark 305
%20s means set the field at least 20 characters long. Blanks are added before the text because, by default, the output is right-justified. To align the text to left, use the - flag (%-20s).

      Mark 305
When an asterisk (*) is used as a width directive, then the width of the conversion field is set by a width argument that precede the argument that’s being formatted.

In the example below we’re setting the width to 10:
printf "%0*d" 10 5
0 is a flag that pads the number with leading zeros instead of blanks. The output text will have at least 10 characters:

0000000005
Precision directive
The .precision modifier consists of a dot (.) followed by a positive integer or asterisk (*) that depending on the specifier type, sets the number of string or digit characters or the number of decimal places to be printed.

The precision has the following effect:

If the conversion type is an integer, the precision specifies the minimum number of digits to be printed. If the number of digits in the argument is less than precision, leading zeros are printed.
If the conversion type is a floating-point, the precision specifies the number of digits that follow the decimal-point character. The default precision is 6.
If the conversion type is a string, the precision specifies the maximum number of characters to be printed. If the number of characters in the argument is greater than precision, the excess characters are truncated.
Here is an example showing how to round a floating-point number to 3 decimals:

printf "%.3f" 1.61803398
1.618
When precision is set to an asterisk (*), its value is set by the precision argument that precede the argument that’s being formatted.
printf "%.*f" 3 1.61803398
1.618
Conclusion
The printf command takes a format and arguments and prints a formatted text.

If you have any questions or feedback, feel free to leave a comment.
```

---
---
---

String Format Specifiers

> References
>
> <https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Strings/Articles/formatSpecifiers.html>

---
---
---

Format Specifier Syntax

> References
>
> <https://zone.ni.com/reference/en-XX/help/371361R-01/lvconcepts/format_specifier_syntax/>

---
---
---

How to check if a string contains a substring in Bash

> References
>
> <https://stackoverflow.com/questions/229551/how-to-check-if-a-string-contains-a-substring-in-bash>

You can use <a href="https://stackoverflow.com/a/229585/3755692">Marcus's answer (* wildcards)</a> outside a case statement, too, if you use double brackets:

    string='My long string'
    if [[ $string == *"My long"* ]]; then
      echo "It's there!"
    fi

Note that spaces in the needle string need to be placed between double quotes, and the `*` wildcards should be outside. Also note that a simple comparison operator is used (i.e. `==`), not the regex operator `=~`.

===

```sh
case $string in (*foo*)
  # Do stuff
esac
```

This is the same answer as https://stackoverflow.com/a/229585/11267590. But simple style and also POSIX Compliant.

===

Extension of the question answered here *https://stackoverflow.com/questions/2829613/how-do-you-tell-if-a-string-contains-another-string-in-posix-sh/8811800#8811800*:

This solution works with special characters:

    # contains(string, substring)
    #
    # Returns 0 if the specified string contains the specified substring,
    # otherwise returns 1.
    contains() {
        string="$1"
        substring="$2"
    
        if echo "$string" | $(type -p ggrep grep | head -1) -F -- "$substring" >/dev/null; then
            return 0    # $substring is in $string
        else
            return 1    # $substring is not in $string
        fi
    }
    
    contains "abcd" "e" || echo "abcd does not contain e"
    contains "abcd" "ab" && echo "abcd contains ab"
    contains "abcd" "bc" && echo "abcd contains bc"
    contains "abcd" "cd" && echo "abcd contains cd"
    contains "abcd" "abcd" && echo "abcd contains abcd"
    contains "" "" && echo "empty string contains empty string"
    contains "a" "" && echo "a contains empty string"
    contains "" "a" || echo "empty string does not contain a"
    contains "abcd efgh" "cd ef" && echo "abcd efgh contains cd ef"
    contains "abcd efgh" " " && echo "abcd efgh contains a space"
    
    contains "abcd [efg] hij" "[efg]" && echo "abcd [efg] hij contains [efg]"
    contains "abcd [efg] hij" "[effg]" || echo "abcd [efg] hij does not contain [effg]"
    
    contains "abcd *efg* hij" "*efg*" && echo "abcd *efg* hij contains *efg*"
    contains "abcd *efg* hij" "d *efg* h" && echo "abcd *efg* hij contains d *efg* h"
    contains "abcd *efg* hij" "*effg*" || echo "abcd *efg* hij does not contain *effg*"

The test contains "-n" "n" doesn't work here, because echo -n will swallow the -n as an option! A popular fix for that is to use printf "%s\n" "$string" instead. – joeytwiddle Dec 12 '19 at 10:34

---
---
---
