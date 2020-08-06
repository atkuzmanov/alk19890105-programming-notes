# bash files folders and directories notes

Extract filename and extension in Bash

> References
> <https://stackoverflow.com/questions/965053/extract-filename-and-extension-in-bash>

First, get file name without the path:

    filename=$(basename -- "$fullfile")
    extension="${filename##*.}"
    filename="${filename%.*}"

Alternatively, you can focus on the last '/' of the path instead of the '.' which should work even if you have unpredictable file extensions:

    filename="${fullfile##*/}"

You may want to check the documentation :

  - On the web at section "[3.5.3 Shell Parameter Expansion](http://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)"
  - In the bash manpage at section called "Parameter Expansion"

...

Check out gnu.org/software/bash/manual/html_node/… for the full feature set. – D.Shawley Jun 8 '09 at 14:08

Add some quotes to "$fullfile", or you'll risk breaking the filename. – lhunath Jun 8 '09 at 14:34

Heck, you could even write filename="${fullfile##*/}" and avoid calling an extra basename – ephemient Jun 9 '09 at 17:52

This "solution" does not work if the file does not have an extension -- instead, the whole file name is output, which is quite bad considering that files without extensions are omnipresent. – nccc Jul 1 '12 at 3:42 

Fix for dealing with file names without extension: extension=$([[ "$filename" = *.* ]] && echo ".${filename##*.}" || echo ''). Note that if an extension is present, it will be returned including the initial ., e.g., .txt. – mklement0 Sep 7 '12 at 14:41

---
---
---
