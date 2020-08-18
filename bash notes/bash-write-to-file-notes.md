# bash write to file notes

> References
> <https://stackoverflow.com/questions/11162406/open-and-write-data-to-text-file-using-bash>

Open and write data to text file using Bash?

I thought there were a few perfectly fine answers, but no concise summary of all possibilities; thus:

The core principal behind most answers here is [redirection](https://www.gnu.org/software/bash/manual/html_node/Redirections.html). Two are important redirection operators for writing to files:

## Redirecting Output:
`echo 'text to completely overwrite contents of myfile' > myfile`

## Appending Redirected Output
`echo 'text to add to end of myfile' >> myfile`

## Here Documents
Others mentioned, rather than from a fixed input source like `echo 'text'`, you could also interactively write to files via a "Here Document", which are also detailed in the link to the bash manual above. Those answers, e.g. 

`cat > FILE.txt <<EOF` or `cat >> FILE.txt <<EOF`

make use of the same redirection operators, but add another layer via "Here Documents". In the above syntax, you write to the FILE.txt via the output of `cat`. The writing only takes place after the interactive input is given some specific string, in this case 'EOF', but this could be any string, e.g.:

`cat > FILE.txt <<'StopEverything'` or `cat >> FILE.txt <<'StopEverything'`

would work just as well. Here Documents also look for various delimiters and other interesting parsing characters, so have a look at the docs for further info on that.

## Here Strings
A bit convoluted, and more of an exercise in understanding both redirection and Here Documents syntax, but you could combine Here Document style syntax with standard redirect operators to become a Here String:

#### Redirecting Output of cat Input

`cat > myfile <<<'text to completely overwrite contents of myfile'`

#### Appending Redirected Output of cat Input

`cat >> myfile <<<'text to completely overwrite contents of myfile'`

---
