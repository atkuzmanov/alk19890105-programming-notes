# bash for loop

How to write a loop in Bash

> References
>
> <https://opensource.com/article/19/6/how-write-loop-bash>

```text
A common reason people want to learn the Unix shell is to unlock the power of batch processing. If you want to perform some set of actions on many files, one of the ways to do that is by constructing a command that iterates over those files. In programming terminology, this is called execution control, and one of the most common examples of it is the for loop.

A for loop is a recipe detailing what actions you want your computer to take for each data object (such as a file) you specify.

The classic for loop
The Linux Terminal
Top 7 terminal emulators for Linux
10 command-line tools for data analysis in Linux
Download Now: SSH cheat sheet
Advanced Linux commands cheat sheet
Linux command line tutorials
An easy loop to try is one that analyzes a collection of files. This probably isn't a useful loop on its own, but it's a safe way to prove to yourself that you have the ability to handle each file in a directory individually. First, create a simple test environment by creating a directory and placing some copies of some files into it. Any file will do initially, but later examples require graphic files (such as JPEG, PNG, or similar). You can create the folder and copy files into it using a file manager or in the terminal:
$ mkdir example
        $ cp ~/Pictures/vacation/*.{png,jpg} example
Change directory to your new folder, then list the files in it to confirm that your test environment is what you expect:

$ cd example
$ ls -1
cat.jpg
design_maori.png
otago.jpg
waterfall.png
The syntax to loop through each file individually in a loop is: create a variable (f for file, for example). Then define the data set you want the variable to cycle through. In this case, cycle through all files in the current directory using the * wildcard character (the * wildcard matches everything). Then terminate this introductory clause with a semicolon (;).

$ for f in * ;
Depending on your preference, you can choose to press Return here. The shell won't try to execute the loop until it is syntactically complete.

Next, define what you want to happen with each iteration of the loop. For simplicity, use the file command to get a little bit of data about each file, represented by the f variable (but prepended with a $ to tell the shell to swap out the value of the variable for whatever the variable currently contains):

do file $f ;
Terminate the clause with another semi-colon and close the loop:

done
Press Return to start the shell cycling through everything in the current directory. The for loop assigns each file, one by one, to the variable f and runs your command:

$ for f in * ; do
        > file $f ;
        > done
        cat.jpg: JPEG image data, EXIF standard 2.2
        design_maori.png: PNG image data, 4608 x 2592, 8-bit/color RGB, non-interlaced
        otago.jpg: JPEG image data, EXIF standard 2.2
        waterfall.png: PNG image data, 4608 x 2592, 8-bit/color RGB, non-interlaced
You can also write it this way:

$ for f in *; do file $f; done
        cat.jpg: JPEG image data, EXIF standard 2.2
        design_maori.png: PNG image data, 4608 x 2592, 8-bit/color RGB, non-interlaced
        otago.jpg: JPEG image data, EXIF standard 2.2
        waterfall.png: PNG image data, 4608 x 2592, 8-bit/color RGB, non-interlaced
Both the multi-line and single-line formats are the same to your shell and produce the exact same results.

A practical example
Here's a practical example of how a loop can be useful for everyday computing. Assume you have a collection of vacation photos you want to send to friends. Your photo files are huge, making them too large to email and inconvenient to upload to your photo-sharing service. You want to create smaller web-versions of your photos, but you have 100 photos and don't want to spend the time reducing each photo, one by one.

First, install the ImageMagick command using your package manager on Linux, BSD, or Mac. For instance, on Fedora and RHEL:

$ sudo dnf install ImageMagick
On Ubuntu or Debian:

$ sudo apt install ImageMagick
On BSD, use ports or pkgsrc. On Mac, use Homebrew or MacPorts.

Once you install ImageMagick, you have a set of new commands to operate on photos.

Create a destination directory for the files you're about to create:

$ mkdir tmp
To reduce each photo to 33% of its original size, try this loop:

$ for f in * ; do convert $f -scale 33% tmp/$f ; done
Then look in the tmp folder to see your scaled photos.

You can use any number of commands within a loop, so if you need to perform complex actions on a batch of files, you can place your whole workflow between the do and done statements of a for loop. For example, suppose you want to copy each processed photo straight to a shared photo directory on your web host and remove the photo file from your local system:

$ for f in * ; do
    convert $f -scale 33% tmp/$f
    scp -i seth_web tmp/$f seth@example.com:~/public_html
    trash tmp/$f ;
  done
For each file processed by the for loop, your computer automatically runs three commands. This means if you process just 10 photos this way, you save yourself 30 commands and probably at least as many minutes.

Limiting your loop
A loop doesn't always have to look at every file. You might want to process only the JPEG files in your example directory:

$ for f in *.jpg ; do convert $f -scale 33% tmp/$f ; done
$ ls -m tmp
cat.jpg, otago.jpg
Or, instead of processing files, you may need to repeat an action a specific number of times. A for loop's variable is defined by whatever data you provide it, so you can create a loop that iterates over numbers instead of files:

$ for n in {0..4}; do echo $n ; done
0
1
2
3
4
More looping
You now know enough to create your own loops. Until you're comfortable with looping, use them on copies of the files you want to process and, as often as possible, use commands with built-in safeguards to prevent you from clobbering your data and making irreparable mistakes, like accidentally renaming an entire directory of files to the same name, each overwriting the other.

For advanced for loop topics, read on.

Not all shells are Bash
The for keyword is built into the Bash shell. Many similar shells use the same keyword and syntax, but some shells, like tcsh, use a different keyword, like foreach, instead.

In tcsh, the syntax is similar in spirit but more strict than Bash. In the following code sample, do not type the string foreach? in lines 2 and 3. It is a secondary prompt alerting you that you are still in the process of building your loop.

$ foreach f (*)
foreach? file $f
foreach? end
cat.jpg: JPEG image data, EXIF standard 2.2
design_maori.png: PNG image data, 4608 x 2592, 8-bit/color RGB, non-interlaced
otago.jpg: JPEG image data, EXIF standard 2.2
waterfall.png: PNG image data, 4608 x 2592, 8-bit/color RGB, non-interlaced
In tcsh, both foreach and end must appear alone on separate lines, so you cannot create a for loop on one line as you can with Bash and similar shells.

For loops with the find command
In theory, you could find a shell that doesn't provide a for loop function, or you may just prefer to use a different command with added features.

The find command is another way to implement the functionality of a for loop, as it offers several ways to define the scope of which files to include in your loop as well as options for Parallel processing.

The find command is meant to help you find files on your hard drives. Its syntax is simple: you provide the path of the location you want to search, and find finds all files and directories:

$ find .
.
./cat.jpg
./design_maori.png
./otago.jpg
./waterfall.png
You can filter the search results by adding some portion of the name:

$ find . -name "*jpg"
./cat.jpg
./otago.jpg
The great thing about find is that each file it finds can be fed into a loop using the -exec flag. For instance, to scale down only the PNG photos in your example directory:

$ find . -name "*png" -exec convert {} -scale 33% tmp/{} \;
$ ls -m tmp
design_maori.png, waterfall.png
In the -exec clause, the bracket characters {} stand in for whatever item find is processing (in other words, any file ending in PNG that has been located, one at a time). The -exec clause must be terminated with a semicolon, but Bash usually tries to use the semicolon for itself. You "escape" the semicolon with a backslash (\;) so that find knows to treat that semicolon as its terminating character.

The find command is very good at what it does, and it can be too good sometimes. For instance, if you reuse it to find PNG files for another photo process, you will get a few errors:

$ find . -name "*png" -exec convert {} -flip -flop tmp/{} \;   
convert: unable to open image `tmp/./tmp/design_maori.png':
No such file or directory @ error/blob.c/OpenBlob/2643.
...
It seems that find has located all the PNG files—not only the ones in your current directory (.) but also those that you processed before and placed in your tmp subdirectory. In some cases, you may want find to search the current directory plus all other directories within it (and all directories in those). It can be a powerful recursive processing tool, especially in complex file structures (like directories of music artists containing directories of albums filled with music files), but you can limit this with the -maxdepth option.

To find only PNG files in the current directory (excluding subdirectories):

$ find . -maxdepth 1 -name "*png"
To find and process files in the current directory plus an additional level of subdirectories, increment the maximum depth by 1:

$ find . -maxdepth 2 -name "*png"
Its default is to descend into all subdirectories.

Looping for fun and profit
The more you use loops, the more time and effort you save, and the bigger the tasks you can tackle. You're just one user, but with a well-thought-out loop, you can make your computer do the hard work.

You can and should treat looping like any other command, keeping it close at hand for when you need to repeat a single action or two on several files. However, it's also a legitimate gateway to serious programming, so if you have to accomplish a complex task on any number of files, take a moment out of your day to plan out your workflow. If you can achieve your goal on one file, then wrapping that repeatable process in a for loop is relatively simple, and the only "programming" required is an understanding of how variables work and enough organization to separate unprocessed from processed files. With a little practice, you can move from a Linux user to a Linux user who knows how to write a loop, so get out there and make your computer work for you!
```

---
---
---

How to loop over files in directory and change path and add suffix to filename

> References
>
> <https://stackoverflow.com/questions/20796200/how-to-loop-over-files-in-directory-and-change-path-and-add-suffix-to-filename>

A couple of notes first: when you use `Data/data1.txt` as an argument, should it really be `/Data/data1.txt` (with a leading slash)? Also, should the outer loop scan only for .txt files, or all files in /Data? Here's an answer, assuming `/Data/data1.txt` and .txt files only:

    #!/bin/bash
    for filename in /Data/*.txt; do
        for ((i=0; i<=3; i++)); do
            ./MyProgram.exe "$filename" "Logs/$(basename "$filename" .txt)_Log$i.txt"
        done
    done

Notes:

 - `/Data/*.txt` expands to the paths of the text files in /Data (*including* the /Data/ part)
 - `$( ... )` runs a shell command and inserts its output at that point in the command line
 - `basename somepath .txt` outputs the base part of somepath, with .txt removed from the end (e.g. `/Data/file.txt` -> `file`)

If you needed to run MyProgram with `Data/file.txt` instead of `/Data/file.txt`, use `"${filename#/}"` to remove the leading slash. On the other hand, if it's really `Data` not `/Data` you want to scan, just use `for filename in Data/*.txt`.

---
---
---

How to loop through a directory recursively to delete files with certain extensions

> References
>
> <https://stackoverflow.com/questions/4638874/how-to-loop-through-a-directory-recursively-to-delete-files-with-certain-extensi>

`find` is just made for that.

    find /tmp -name '*.pdf' -or -name '*.doc' | xargs rm

---
---
---

Recursively iterate through files in a directory

> References
>
> <https://unix.stackexchange.com/questions/139363/recursively-iterate-through-files-in-a-directory>

Yet another use for [safe `find`][1]:

    while IFS= read -r -d '' -u 9
    do
        [Do something with "$REPLY"]
    done 9< <( find . -type f -exec printf '%s\0' {} + )

(This works with any POSIX `find`, but the shell part requires bash. With *BSD and GNU find, you can use `-print0` instead of `-exec printf '%s\0' {} +`, it will be slightly faster.)

This makes it possible to use standard input within the loop, and it works with *any* path.

  [1]: https://github.com/l0b0/tilde/blob/master/examples/safe-find.sh

Because I had to look it up: "read ... If no names are supplied, the line read is assigned to the variable REPLY." So do echo "Filename is '$REPLY'"  – Andrew Oct 7 '19 at 17:45

===

It's a bit difficult to do your read loop portably, but for bash in particular you can try something like this.

Relevant portion:

while IFS= read -d $'\0' -r file ; do
        printf 'File found: %s\n' "$file"
done < <(find . -iname 'foo*' -print0)
That instructs find to print its output delimited by NUL characters (0x00), and read to fetch NUL-delimited lines (-d $'\0') without handling backslashes as escapes for other characters (-r) and not do any word splitting on the lines (IFS=). Since 0x00 is a byte that can't occur in filenames or paths in Unix, this should handle all of your weird filename problems.

---
---
---

Recursive bash script to collect information about each file in a directory structure

> References
>
> <https://askubuntu.com/questions/968887/recursive-bash-script-to-collect-information-about-each-file-in-a-directory-stru>

While `find` solutions are simple and powerful, I decided to create a more complicated solution, that is based on [this interesting function][1], which I saw few days ago. 

- *More explanations and two other scripts, based on the current are provided [here][2].*

**1.** Create executable script file, called `walk`, that is located in `/usr/local/bin` to be accessible as shell command:

    sudo touch /usr/local/bin/walk
    sudo chmod +x /usr/local/bin/walk
    sudo nano /usr/local/bin/walk

- Copy the below script content and use in `nano`: <kbd>Shift</kbd>+<kbd>Insert</kbd> for paste; <kbd>Ctrl</kbd>+<kbd>O</kbd> and <kbd>Enter</kbd> for save; <kbd>Ctrl</kbd>+<kbd>X</kbd> for exit.

**2.** The content of the script `walk` is:

<!-- language-all: bash -->

	#!/bin/bash

	# Colourise the output
	RED='\033[0;31m'        # Red
	GRE='\033[0;32m'        # Green
	YEL='\033[1;33m'        # Yellow
	NCL='\033[0m'           # No Color

	file_specification() {
			FILE_NAME="$(basename "${entry}")"
			DIR="$(dirname "${entry}")"
			NAME="${FILE_NAME%.*}"
			EXT="${FILE_NAME##*.}"
			SIZE="$(du -sh "${entry}" | cut -f1)"

			printf "%*s${GRE}%s${NCL}\n"                    $((indent+4)) '' "${entry}"
			printf "%*s\tFile name:\t${YEL}%s${NCL}\n"      $((indent+4)) '' "$FILE_NAME"
			printf "%*s\tDirectory:\t${YEL}%s${NCL}\n"      $((indent+4)) '' "$DIR"
			printf "%*s\tName only:\t${YEL}%s${NCL}\n"      $((indent+4)) '' "$NAME"
			printf "%*s\tExtension:\t${YEL}%s${NCL}\n"      $((indent+4)) '' "$EXT"
			printf "%*s\tFile size:\t${YEL}%s${NCL}\n"      $((indent+4)) '' "$SIZE"
	}

	walk() {
			local indent="${2:-0}"
			printf "\n%*s${RED}%s${NCL}\n\n" "$indent" '' "$1"
			# If the entry is a file do some operations
			for entry in "$1"/*; do [[ -f "$entry" ]] && file_specification; done
			# If the entry is a directory call walk() == create recursion
			for entry in "$1"/*; do [[ -d "$entry" ]] && walk "$entry" $((indent+4)); done
	}

	# If the path is empty use the current, otherwise convert relative to absolute; Exec walk()
	[[ -z "${1}" ]] && ABS_PATH="${PWD}" || cd "${1}" && ABS_PATH="${PWD}"
	walk "${ABS_PATH}"      
	echo                    


**3.** Explanation:

- The main mechanism of the `walk()` function is pretty well described by Zanna in her [answer][3]. So I will describe only the new part.

- Within the `walk()` function I've added this loop:

        for entry in "$1"/*; do [[ -f "$entry" ]] && file_specification; done

 That means for each `$entry` that is a file will be executed the function `file_specification()`.

- The function `file_specification()` has two parts. The first part gets data related to the file - name, path, size, etc. The second part output the data in well formatted form. To format the data is used the command `printf`. And if you want to tweak the script you should read about this command - for example [this article][4].

- The function `file_specification()` is good place where you can put *the specific command that should be execute for each file*. Use this format:

     <pre><i>command</i> "${entry}"</pre>

 Or you can save the output of the command as variable, and then `printf` this variable, etc.:

    <pre>MY_VAR="$(<i>command</i> "${entry}")"
    printf "%*s\tFile size:\t${YEL}%s${NCL}\n" $((indent+4)) '' "$MY_VAR"</pre>   

 Or directly `printf` the output of the command:

     <pre>printf "%*s\tFile size:\t${YEL}%s${NCL}\n" $((indent+4)) '' "$(<i>command</i> "${entry}")"</pre>   

- The section to the begging, called `Colourise the output`, initialise few variables that are used within the `printf` command to colourise the output. More about this you could find [here][5].

- To the bottom of the scrip is added additional condition that deals with absolute and relative paths.

**4.** Examples of usage:

- To run `walk` for the current directory:

        walk      # You shouldn't use any argument, 
        walk ./   # but you can use also this format

- To run `walk` for any child directory:

        walk <directory name>
        walk ./<directory name>
        walk <directory name>/<sub directory>

- To run `walk` for any other directory:

        walk /full/path/to/<directory name>

- To create a text file, based on the `walk` output:

        walk > output.file

- To create output file without colour codes ([source][6]):

        walk | sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g" > output.file


**5.** Demonstration of usage:

[![enter image description here][7]][7]


  [1]: https://askubuntu.com/questions/962170/explaining-a-shell-script-to-recursively-print-full-directory-tree
  [2]: https://askubuntu.com/a/969937/566421
  [3]: https://askubuntu.com/a/962185/566421
  [4]: http://wiki.bash-hackers.org/commands/builtin/printf
  [5]: https://stackoverflow.com/a/5947802/6543935
  [6]: https://stackoverflow.com/a/18000433/6543935
  [7]: https://i.stack.imgur.com/UXAcI.gif

That's whole lot of work, but does look good. Good job ! – Sergiy Kolodyazhnyy Oct 25 '17 at 9:45

What process are you using to make those gifs @pa4080 ? – pbhj Nov 9 '17 at 21:43

@pbhj, under Ubuntu I'm using Peek it is simple and nice, but sometimes crashes and doesn't have editing abilities. The most of my GIFs are created under Windows, where I'm recording the the window of the VNC connection. I have a separate desktop machine that mainly I'm using for MS Office and GIF creation :) The tool that I'm using there is ScreenToGif. It is opensource, free, and has powerful editor and processing mechanisum. Unfortunately I can't find tool like ScreenToGif for Ubuntu. – pa4080 Nov 9 '17 at 22:08

---
---
---

Bash function to process all dotfiles in a directory excluding directories

> References
<https://stackoverflow.com/questions/31497323/bash-function-to-process-all-dotfiles-in-a-directory-excluding-directories>

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

The OP mentioned only needing the file name, not the full path. You could achieve that by using -printf '%f\0' instead of -print0. – cyfur01 Jul 19 '15 at 2:27

I tried your -printf solution and looks like find command doesn't know -printf: find: -printf: unknown primary or operator – Jeanmichel Cote Jul 19 '15 at 2:33

@JeanmichelCote OK. What OS are you using? – John1024 Jul 19 '15 at 2:34

@JeanmichelCote Answer updated with something that should be OSX (BSD) compatible. Also, ignore the part about -regextype as the OSX find does not support it. – John1024 Jul 19 '15 at 2:43

@John1024 Works fine! – Jeanmichel Cote Jul 19 '15 at 2:58

---
---
---

How to exclude/ignore hidden files and directories in a wildcard-embedded “find” search?

> References <https://askubuntu.com/questions/266179/how-to-exclude-ignore-hidden-files-and-directories-in-a-wildcard-embedded-find>

This prints all files that are descendants of your directory, skipping hidden files and directories:

    find . -not -path '*/\.*'

So if you're looking for a file with `some text` in its name, and you want to skip hidden files and directories, run:

    find . -not -path '*/\.*' -type f -name '*some text*'

## Explanation:

The `-path` option runs checks a pattern against the entire path string. `*` is a wildcard, `/` is a directory separator, `\.` is a dot (it has to be escaped to avoid special meaning), and `*` is another wildcard. `-not` means don't select files that match this test.

I don't think that `find` is smart enough to avoid recursively searching hidden directories in the previous command, so if you need speed, use `-prune` instead, like this:

     find . -type d -path '*/\.*' -prune -o -not -name '.*' -type f -name '*some text*' -print

...

Note with the last one that you need that -print at the end! Also, not sure if -name '\.*' would be more efficient instead of -path` (because the path is searching subpaths, but these will be pruned out) – artfulrobot Apr 29 '14 at 11:18

What's the special meaning of . in this context? – frostschutz Jan 15 '15 at 15:40

@frostschutz The dot after find means the current directory: find will look at all files and directories under the current directory. The argument after path is a regular expression, where a dot would normally means "any character", to make it mean a literal dot we have to escape it with a backslash. The argument after -name isn't a regular expression, but it expands wildcards like ? and * like a shell does. – Flimm Jan 15 '15 at 17:23

@frostschutz Actually, come to think of it, I may be wrong about . having special meaning. – Flimm Aug 5 '16 at 13:00

@Flimm yup, no need to escape .. As far as I'm aware, only these need to be escaped: *, ?, and []. – thdoan Feb 15 '17 at 9:16

===

This is one of the few means of excludes dot-files that also works correctly on BSD, Mac and Linux:

    find "$PWD" -name ".*" -prune -o -print

 - `$PWD` print the full path to the current directory so that the path does not start with `./`
 - `-name ".*" -prune` matches any files or directories that start with a dot and then don't descend
 - `-o -print` means print the file name if the previous expression did not match anything. Using `-print` or `-print0` causes all other expressions to not print by default.

...

Please explain / elaborate on "alarmingly complicated"; the answers already given and your answer seem to give evidence to the contrary...? – nutty about natty Mar 24 '16 at 22:13

"alarmingly complicated" is probably excessive. I reworded the answer to get to the point. I think the answer I posted is difficult to understand and is hard to see without a very careful reading of the man page. If you are only using GNU find then there are more possible solutions. – eradman Mar 28 '16 at 14:50

-o ... -print is helpful. For my use, I now have find ... '!' -name . -name '.*' -prune -o ... -print, which was more convenient than including $PWD. – Roger Pate Aug 24 '16 at 19:28

===

<sup> The **answer** I originally posted as an "edit" to my original question above: </sup>

`find . \( ! -regex '.*/\..*' \) -type f -name "whatever"`, works. The regex looks for "anything, then a slash, then a dot, then anything" (i.e. all hidden files and folders including their subfolders), and the "!" negates the regex.

...

<https://superuser.com/questions/152958/exclude-hidden-files-when-searching-with-unix-linux-find>

---
---
---
