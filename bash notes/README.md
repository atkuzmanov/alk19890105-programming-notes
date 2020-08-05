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

---
