# bash read files notes

Read a file line by line assigning the value to a variable

> References
> <https://stackoverflow.com/questions/10929453/read-a-file-line-by-line-assigning-the-value-to-a-variable>

The following reads a file passed as an argument line by line:

    while IFS= read -r line; do
        echo "Text read from file: $line"
    done < my_filename.txt

This is the [standard form](http://mywiki.wooledge.org/BashFAQ/001) for reading lines from a file in a loop. Explanation:

- `IFS=` (or `IFS=''`) prevents leading/trailing whitespace from being trimmed.
- `-r` prevents backslash escapes from being interpreted.


Or you can put it in a bash file helper script, example contents:

    #!/bin/bash
    while IFS= read -r line; do
        echo "Text read from file: $line"
    done < "$1"

If the above is saved to a script with filename `readfile`, it can be run as follows:

    chmod +x readfile
    ./readfile filename.txt

If the file isn’t a [standard POSIX text file](https://stackoverflow.com/a/729795/1968) (= not terminated by a newline character), the loop can be modified to handle trailing partial lines:

    while IFS= read -r line || [[ -n "$line" ]]; do
        echo "Text read from file: $line"
    done < "$1"

Here, `|| [[ -n $line ]]` prevents the last line from being ignored if it doesn't end with a `\n` (since `read` returns a non-zero exit code when it encounters EOF).

If the commands inside the loop also read from standard input, the file descriptor used by `read` can be chanced to something else (avoid the [standard file descriptors](https://en.wikipedia.org/wiki/File_descriptor)), e.g.:

    while IFS= read -r -u3 line; do
        echo "Text read from file: $line"
    done 3< "$1"

(Non-Bash shells might not know `read -u3`; use `read <&3` instead.)

---

Linux/UNIX: Bash Read a File Line By Line

> References
> <https://www.cyberciti.biz/faq/unix-howto-read-line-by-line-from-file/>

---
