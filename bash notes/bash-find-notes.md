# bash find notes

Find both regular files and directories

> References
> <https://unix.stackexchange.com/questions/53734/find-both-regular-files-and-directories>

Here is the command you can use:

    find -type f -or -type d

...

Or find -type f -o -type d for POSIX compliant alternative. – manatwork Nov 3 '12 at 14:54

Hey I ran into a little trouble with this when I run $find . -type d -or -type f -and -iname "vision" it does not do exactly what I expect, am I missing something else! – James Nov 3 '12 at 15:56

-a has precedence over -o, use parenthesis (but escape them for the shell). No need to use the non-standard -or or -and. – Stéphane Chazelas Nov 3 '12 at 16:52

if I try ` find . -type d or -type f -name 'abc'. I get an error.. find: paths must precede expression:`.. Any idea why? – alpha_989 Jul 1 '18 at 21:38

@alpha_989 missing - before or? – Mateusz Piotrowski Jul 1 '18 at 21:41

---
---
---

*nix find -type flag: can it accept multiple types?

> References
> <https://superuser.com/questions/701805/nix-find-type-flag-can-it-accept-multiple-types>

    # Apply to only link or file type directory entries: 
    $ find . \( -type l -o -type f \) -name node-dev -exec ls -lah {} \;

    # Apply to anything but a directory - add more with -o in between "\(" & "\)" meta-characters:
    $ find . ! \( -type d \) -name node-dev -exec ls -lah {} \;

Note that on the find command, there is a -ls switch which could replaces the -exec call, keeping in mind that find can be slow to begin with, but having to create a new process for each found file does use system resources better utilized elsewhere.

...

Ah, the edit to the 2nd one makes a lot more sense - I thought I was doing it wrong. What is that parenthesis grouping called so I can find out more about it? – Patrick M Jan 15 '14 at 15:42

The paren's are meaningful to the shell, hence, escape them so that the shell doesn't strip them out. man find - the operator with first and highest precedence is the parenthesized expression; search on OPERATORS. The theory behind find is like most C and UNIX evaluation; a Boolean expression, evaluated from left to right, with 'short-circuiting' i.e. once a truth expression is determined (like "if (TRUE or anything else")). – Billy McCloskey Jan 15 '14 at 15:56

---
---
---
