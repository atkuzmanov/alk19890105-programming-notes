# bash command line arguments flags options - stackoverflow

||| bash command line arguments
||| bash flags
||| bash options

> References
>
> <https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash>

Method #1: Using bash without getopt[s]
=======================================

Two common ways to pass key-value-pair arguments are:

Bash Space-Separated (e.g., `--option argument`) (without getopt[s])
--------------------------------------------------------------------

Usage `demo-space-separated.sh -e conf -s /etc -l /usr/lib /etc/hosts`

<!-- language-all: lang-bash -->
```bash
cat >/tmp/demo-space-separated.sh <<'EOF'
#!/bin/bash

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -e|--extension)
    EXTENSION="$2"
    shift # past argument
    shift # past value
    ;;
    -s|--searchpath)
    SEARCHPATH="$2"
    shift # past argument
    shift # past value
    ;;
    -l|--lib)
    LIBPATH="$2"
    shift # past argument
    shift # past value
    ;;
    --default)
    DEFAULT=YES
    shift # past argument
    ;;
    *)    # unknown option
    POSITIONAL+=("$1") # save it in an array for later
    shift # past argument
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

echo "FILE EXTENSION  = ${EXTENSION}"
echo "SEARCH PATH     = ${SEARCHPATH}"
echo "LIBRARY PATH    = ${LIBPATH}"
echo "DEFAULT         = ${DEFAULT}"
echo "Number files in SEARCH PATH with EXTENSION:" $(ls -1 "${SEARCHPATH}"/*."${EXTENSION}" | wc -l)
if [[ -n $1 ]]; then
    echo "Last line of file specified as non-opt/last argument:"
    tail -1 "$1"
fi
EOF

chmod +x /tmp/demo-space-separated.sh

/tmp/demo-space-separated.sh -e conf -s /etc -l /usr/lib /etc/hosts
```

output from copy-pasting the block above:

<!-- language: lang-bash -->
```bash
FILE EXTENSION  = conf
SEARCH PATH     = /etc
LIBRARY PATH    = /usr/lib
DEFAULT         =
Number files in SEARCH PATH with EXTENSION: 14
Last line of file specified as non-opt/last argument:
#93.184.216.34    example.com
```

Bash Equals-Separated (e.g., `--option=argument`) (without getopt[s])
---------------------------------------------------------------------

Usage `demo-equals-separated.sh -e=conf -s=/etc -l=/usr/lib /etc/hosts`

```bash
cat >/tmp/demo-equals-separated.sh <<'EOF'
#!/bin/bash

for i in "$@"
do
case $i in
    -e=*|--extension=*)
    EXTENSION="${i#*=}"
    shift # past argument=value
    ;;
    -s=*|--searchpath=*)
    SEARCHPATH="${i#*=}"
    shift # past argument=value
    ;;
    -l=*|--lib=*)
    LIBPATH="${i#*=}"
    shift # past argument=value
    ;;
    --default)
    DEFAULT=YES
    shift # past argument with no value
    ;;
    *)
          # unknown option
    ;;
esac
done
echo "FILE EXTENSION  = ${EXTENSION}"
echo "SEARCH PATH     = ${SEARCHPATH}"
echo "LIBRARY PATH    = ${LIBPATH}"
echo "DEFAULT         = ${DEFAULT}"
echo "Number files in SEARCH PATH with EXTENSION:" $(ls -1 "${SEARCHPATH}"/*."${EXTENSION}" | wc -l)
if [[ -n $1 ]]; then
    echo "Last line of file specified as non-opt/last argument:"
    tail -1 $1
fi
EOF

chmod +x /tmp/demo-equals-separated.sh

/tmp/demo-equals-separated.sh -e=conf -s=/etc -l=/usr/lib /etc/hosts
```

output from copy-pasting the block above:

<!-- language: lang-bash -->
```bash
FILE EXTENSION  = conf
SEARCH PATH     = /etc
LIBRARY PATH    = /usr/lib
DEFAULT         =
Number files in SEARCH PATH with EXTENSION: 14
Last line of file specified as non-opt/last argument:
#93.184.216.34    example.com
```

To better understand `${i#*=}` search for "Substring Removal" in [this guide][3]. It is functionally equivalent to `` `sed 's/[^=]*=//' <<< "$i"` `` which calls a needless subprocess or `` `echo "$i" | sed 's/[^=]*=//'` `` which calls *two* needless subprocesses. 

Method #2: Using bash with getopt[s]
====================================

from: http://mywiki.wooledge.org/BashFAQ/035#getopts

**getopt(1) limitations** (older, relatively-recent `getopt` versions): 

 - can't handle arguments that are empty strings
 - can't handle arguments with embedded whitespace

More recent `getopt` versions don't have these limitations.

Additionally, the POSIX shell (and others) offer `getopts` which doesn't have these limitations. I've included a simplistic `getopts` example.

Usage `demo-getopts.sh -vf /etc/hosts foo bar`

```bash
cat >/tmp/demo-getopts.sh <<'EOF'
#!/bin/sh

# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

# Initialize our own variables:
output_file=""
verbose=0

while getopts "h?vf:" opt; do
    case "$opt" in
    h|\?)
        show_help
        exit 0
        ;;
    v)  verbose=1
        ;;
    f)  output_file=$OPTARG
        ;;
    esac
done

shift $((OPTIND-1))

[ "${1:-}" = "--" ] && shift

echo "verbose=$verbose, output_file='$output_file', Leftovers: $@"
EOF

chmod +x /tmp/demo-getopts.sh

/tmp/demo-getopts.sh -vf /etc/hosts foo bar
```

output from copy-pasting the block above:

<!-- language: lang-none -->
```bash
verbose=1, output_file='/etc/hosts', Leftovers: foo bar
```

The advantages of `getopts` are:

 1. It's more portable, and will work in other shells like `dash`.  
 1. It can handle multiple single options like `-vf filename` in the typical Unix way, automatically.

The disadvantage of `getopts` is that it can only handle short options (`-h`, not `--help`) without additional code.

There is a [getopts tutorial][1] which explains what all of the syntax and variables mean.  In bash, there is also `help getopts`, which might be informative.

  [1]: http://wiki.bash-hackers.org/howto/getopts_tutorial
  [2]: http://www.digitalpeer.com/id/parsing
  [3]: http://tldp.org/LDP/abs/html/string-manipulation.html

---
---
---

> References
>
> <https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash>

**No answer mentions *enhanced getopt*. And the [top-voted answer][topanswer] is misleading:** It either ignores `-⁠vfd` style short options (requested by the OP) or options after positional arguments (also requested by the OP); and it ignores parsing-errors. Instead:

* **Use enhanced `getopt` from util-linux or formerly GNU glibc**.<sup><sub>1</sub></sup>
* It works with `getopt_long()` the C function of GNU glibc.
* Has _all_ useful distinguishing features (the others don’t have them):
  * handles spaces, quoting characters and even binary in arguments<sup><sub>2</sub></sup> (non-enhanced `getopt` can’t do this)
  * it can handle options at the end: `script.sh -o outFile file1 file2 -v` (`getopts` doesn’t do this)
  * allows `=`-style long options: `script.sh --outfile=fileOut --infile fileIn` (allowing both is lengthy if self parsing)
  * allows combined short options, e.g. `-vfd` (real work if self parsing)
  * allows touching option-arguments, e.g. `-oOutfile` or `-vfdoOutfile`
* Is so old already<sup><sub>3</sub></sup> that no GNU system is missing this (e.g. any Linux has it).
* You can test for its existence with: `getopt --test` → return value 4.
* Other `getopt` or shell-builtin `getopts` are of limited use.

The following calls

    myscript -vfd ./foo/bar/someFile -o /fizz/someOtherFile
    myscript -v -f -d -o/fizz/someOtherFile -- ./foo/bar/someFile
    myscript --verbose --force --debug ./foo/bar/someFile -o/fizz/someOtherFile
    myscript --output=/fizz/someOtherFile ./foo/bar/someFile -vfd
    myscript ./foo/bar/someFile -df -v --output /fizz/someOtherFile

all return

    verbose: y, force: y, debug: y, in: ./foo/bar/someFile, out: /fizz/someOtherFile

with the following `myscript`

    #!/bin/bash
    # saner programming env: these switches turn some bugs into errors
    set -o errexit -o pipefail -o noclobber -o nounset
    
    # -allow a command to fail with !’s side effect on errexit
    # -use return value from ${PIPESTATUS[0]}, because ! hosed $?
    ! getopt --test > /dev/null 
    if [[ ${PIPESTATUS[0]} -ne 4 ]]; then
        echo 'I’m sorry, `getopt --test` failed in this environment.'
        exit 1
    fi
    
    OPTIONS=dfo:v
    LONGOPTS=debug,force,output:,verbose
    
    # -regarding ! and PIPESTATUS see above
    # -temporarily store output to be able to check for errors
    # -activate quoting/enhanced mode (e.g. by writing out “--options”)
    # -pass arguments only via   -- "$@"   to separate them correctly
    ! PARSED=$(getopt --options=$OPTIONS --longoptions=$LONGOPTS --name "$0" -- "$@")
    if [[ ${PIPESTATUS[0]} -ne 0 ]]; then
        # e.g. return value is 1
        #  then getopt has complained about wrong arguments to stdout
        exit 2
    fi
    # read getopt’s output this way to handle the quoting right:
    eval set -- "$PARSED"
    
    d=n f=n v=n outFile=-
    # now enjoy the options in order and nicely split until we see --
    while true; do
        case "$1" in
            -d|--debug)
                d=y
                shift
                ;;
            -f|--force)
                f=y
                shift
                ;;
            -v|--verbose)
                v=y
                shift
                ;;
            -o|--output)
                outFile="$2"
                shift 2
                ;;
            --)
                shift
                break
                ;;
            *)
                echo "Programming error"
                exit 3
                ;;
        esac
    done
    
    # handle non-option arguments
    if [[ $# -ne 1 ]]; then
        echo "$0: A single input file is required."
        exit 4
    fi
    
    echo "verbose: $v, force: $f, debug: $d, in: $1, out: $outFile"

---
<sup><sub>1</sub></sup> enhanced getopt is available on most “bash-systems”, including Cygwin; on OS X try [brew install gnu-getopt] or `sudo port install getopt`<br>
<sup><sub>2</sub></sup> the POSIX `exec()` conventions have no reliable way to pass binary NULL in command line arguments; those bytes prematurely end the argument<br>
<sup><sub>3</sub></sup> first version released in 1997 or before (I only tracked it back to 1997)

[topanswer]:https://stackoverflow.com/a/14203146/825924
[brew install gnu-getopt]:https://stackoverflow.com/a/37485578/825924

---
---
---

> References
>
> <https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash>

My answer is largely based on [the answer by Bruno Bronosky](https://stackoverflow.com/a/14203146/1478580), but I sort of mashed his two pure bash implementations into one that I use pretty frequently.

    # As long as there is at least one more argument, keep looping
    while [[ $# -gt 0 ]]; do
        key="$1"
        case "$key" in
            # This is a flag type option. Will catch either -f or --foo
            -f|--foo)
            FOO=1
            ;;
            # Also a flag type option. Will catch either -b or --bar
            -b|--bar)
            BAR=1
            ;;
            # This is an arg value type option. Will catch -o value or --output-file value
            -o|--output-file)
            shift # past the key and to the value
            OUTPUTFILE="$1"
            ;;
            # This is an arg=value type option. Will catch -o=value or --output-file=value
            -o=*|--output-file=*)
            # No need to shift here since the value is part of the same string
            OUTPUTFILE="${key#*=}"
            ;;
            *)
            # Do whatever you want with extra options
            echo "Unknown option '$key'"
            ;;
        esac
        # Shift after checking all the cases to get the next option
        shift
    done

This allows you to have both space separated options/values, as well as equal defined values.

So you could run your script using:

    ./myscript --foo -b -o /fizz/file.txt

as well as:

    ./myscript -f --bar -o=/fizz/file.txt

and both should have the same end result.

PROS:

- Allows for both -arg=value and -arg value

- Works with any arg name that you can use in bash

  - Meaning -a or -arg or --arg or -a-r-g or whatever

- Pure bash. No need to learn/use getopt or getopts

CONS:

- Can't combine args

  - Meaning no -abc. You must do -a -b -c

These are the only pros/cons I can think of off the top of my head

---
---
---

> References
>
> <https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash>

# Another solution without getopt[s], POSIX, old Unix style #

Similar to [the solution Bruno Bronosky posted](https://stackoverflow.com/a/14203146/2261442) this here is one without the usage of `getopt(s)`.

Main differentiating feature of my solution is that it allows to have options concatenated together just like `tar -xzf foo.tar.gz` is equal to `tar -x -z -f foo.tar.gz`. And just like in `tar`, `ps` etc. the leading hyphen is optional for a block of short options (but this can be changed easily). Long options are supported as well (but when a block starts with one then two leading hyphens are required).

## Code with example options ##
<!-- language-all: lang-sh -->

    #!/bin/sh

    echo
    echo "POSIX-compliant getopt(s)-free old-style-supporting option parser from phk@[se.unix]"
    echo

    print_usage() {
      echo "Usage:

      $0 {a|b|c} [ARG...]

    Options:

      --aaa-0-args
      -a
        Option without arguments.

      --bbb-1-args ARG
      -b ARG
        Option with one argument.

      --ccc-2-args ARG1 ARG2
      -c ARG1 ARG2
        Option with two arguments.

    " >&2
    }

    if [ $# -le 0 ]; then
      print_usage
      exit 1
    fi

    opt=
    while :; do

      if [ $# -le 0 ]; then

        # no parameters remaining -> end option parsing
        break

      elif [ ! "$opt" ]; then

        # we are at the beginning of a fresh block
        # remove optional leading hyphen and strip trailing whitespaces
        opt=$(echo "$1" | sed 's/^-\?\([a-zA-Z0-9\?-]*\)/\1/')

      fi

      # get the first character -> check whether long option
      first_chr=$(echo "$opt" | awk '{print substr($1, 1, 1)}')
      [ "$first_chr" = - ] && long_option=T || long_option=F

      # note to write the options here with a leading hyphen less
      # also do not forget to end short options with a star
      case $opt in

        -)

          # end of options
          shift
          break
          ;;

        a*|-aaa-0-args)

          echo "Option AAA activated!"
          ;;

        b*|-bbb-1-args)

          if [ "$2" ]; then
            echo "Option BBB with argument '$2' activated!"
            shift
          else
            echo "BBB parameters incomplete!" >&2
            print_usage
            exit 1
          fi
          ;;

        c*|-ccc-2-args)

          if [ "$2" ] && [ "$3" ]; then
            echo "Option CCC with arguments '$2' and '$3' activated!"
            shift 2
          else
            echo "CCC parameters incomplete!" >&2
            print_usage
            exit 1
          fi
          ;;

        h*|\?*|-help)

          print_usage
          exit 0
          ;;

        *)
        
          if [ "$long_option" = T ]; then
            opt=$(echo "$opt" | awk '{print substr($1, 2)}')
          else
            opt=$first_chr
          fi
          printf 'Error: Unknown option: "%s"\n' "$opt" >&2
          print_usage
          exit 1
          ;;

      esac

      if [ "$long_option" = T ]; then

        # if we had a long option then we are going to get a new block next
        shift
        opt=

      else

        # if we had a short option then just move to the next character
        opt=$(echo "$opt" | awk '{print substr($1, 2)}')

        # if block is now empty then shift to the next one
        [ "$opt" ] || shift

      fi

    done

    echo "Doing something..."

    exit 0

For the example usage please see the examples further below.

## Position of options with arguments ##
For what its worth there the options with arguments don't be the last (only long options need to be). So while e.g. in `tar` (at least in some implementations) the `f` options needs to be last because the file name follows (`tar xzf bar.tar.gz` works but `tar xfz bar.tar.gz` does not) this is not the case here (see the later examples).
 

## Multiple options with arguments ##

As another bonus the option parameters are consumed in the order of the options by the parameters with required options. Just look at the output of my script here with the command line `abc X Y Z` (or `-abc X Y Z`):

<!-- language: lang-none -->

    Option AAA activated!
    Option BBB with argument 'X' activated!
    Option CCC with arguments 'Y' and 'Z' activated!

## Long options concatenated as well ##

Also you can also have long options in option block given that they occur last in the block. So the following command lines are all equivalent (including the order in which the options and its arguments are being processed):

* `-cba Z Y X`
* `cba Z Y X`
* `-cb-aaa-0-args Z Y X`
* `-c-bbb-1-args Z Y X -a`
* `--ccc-2-args Z Y -ba X`
* `c Z Y b X a`
* `-c Z Y -b X -a`
* `--ccc-2-args Z Y --bbb-1-args X --aaa-0-args`

All of these lead to:

<!-- language: lang-none -->

    Option CCC with arguments 'Z' and 'Y' activated!
    Option BBB with argument 'X' activated!
    Option AAA activated!
    Doing something...

## Not in this solution ##

### Optional arguments ###

Options with optional arguments should be possible with a bit of work, e.g. by looking forward whether there is a block without a hyphen; the user would then need to put a hyphen in front of every block following a block with a parameter having an optional parameter. Maybe this is too complicated to communicate to the user so better just require a leading hyphen altogether in this case.

Things get even more complicated with multiple possible parameters. I would advise against making the options trying to be smart by determining whether the an argument might be for it or not (e.g. with an option just takes a number as an optional argument) because this might break in the future.

I personally favor additional options instead of optional arguments.

### Option arguments introduced with an equal sign ###

Just like with optional arguments I am not a fan of this (BTW, is there a thread for discussing the pros/cons of different parameter styles?) but if you want this you could probably implement it yourself just like done at <http://mywiki.wooledge.org/BashFAQ/035#Manual_loop> with a `--long-with-arg=?*` case statement and then stripping the equal sign (this is BTW the site that says that making parameter concatenation is possible with some effort but "left [it] as an exercise for the reader" which made me take them at their word but I started from scratch).

## Other notes ##

POSIX-compliant, works even on ancient Busybox setups I had to deal with (with e.g. `cut`, `head` and `getopts` missing).

---
---
---
