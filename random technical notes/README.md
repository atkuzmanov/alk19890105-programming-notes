# random technical notes

|||generating uuid javascript java
|||generating guid javascript java
|||hashids library

<http://hashids.org/>

---

|||nop
|||noop
|||no operation

<https://en.wikipedia.org/wiki/NOP>

---

|||ssi
|||server side include
|||regex
|||regular expression
|||ssi regex

<http://regexlib.com/RETester.aspx?regexp_id=1603>

```bash
<!--\s*\#\s*include\s+(file|virtual)\s*=\s*(["'])([^"'<>\|\b]+/)*([^"'<>/\|\b]+)\2\s*-->
<http://www.regexplanet.com/advanced/java/index.html> As a Java string -
"<!--\\s*\\#\\s*include\\s+(file|virtual)\\s*=\\s*([\"'])([^\"'<>\\|\\b]+/)*([^\"'<>/\\|\\b]+)\\2\\s*-->"
```

The simple solution: `<!--.*?-->`

```bash
0. <!--\s*#include\s+file="(.+)".*--> <!--#include file="([^"]*)"\s*-->

1. <!--\s*\#\s*include\s+(file|virtual)\s*=\s*(["'])([^\"'<>\|\\b]+/)*([^"'<>/\|\\b]+)\2\s*-->

"<!--\\s*\\#\\s*include\\s+(file|virtual)\\s*=\\s*([\"'])([^\\\"'<>\\|\\\\b]+/)*([^\"'<>/\\|\\\\b]+)\\2\\s*-->
"

2. Regular Expression
 <!--\\s*\\#\\s*include\\s+(file|virtual)\\s*=\\s*([\"'])([^\"'<>\\|\\b]+/)*([^\"'<>/\\|\\b]+)\\2\\s*--> as

a Java string
 "<!--\\\\s*\\\\#\\\\s*include\\\\s+(file|virtual)\\\\s*=\\\\s*([\\\"'])([^\\\"'<>\\\\|\\\\b]+/)*([^\\\"'<>
/\\\\|\\\\b]+)\\\\2\\\\s*-->"

3. Regular Expression
 <!--\s*\#\s*include\s+(file|virtual)\s*=\s*(["'])([^"'<>\|\\b]+/)*([^"'<>/\|\\b]+)\2\s*--> as a Java

string
 "<!--\\s*\\#\\s*include\\s+(file|virtual)\\s*=\\s*([\"'])([^\"'<>\\|\\\\b]+/)*([^\"'<>/\\|\\\\b]+)\\2\\s*-
->"

private static String htmlCommentToStrip = "<!\\-\\-[^#<]*\\-\\->"; strip html comments:
&lt;!--((?!--&gt;).)*--&gt;
```

---

|||xchat
|||irc

```bash
xchat timestamp:
[%Y-%b-%d--%H:%M:%S]
[%y-%b-%d-%H:%M:%S]
[%d-%b-%y-%H:%M:%S]
```

xchat Deleting chat history and scrollback and logs

```bash
rm -rf ~/Library/Containers/org.3rddev.xchatazure/Data/Library/Application\ Support/XChat\ Azure/xchatlogs/*.log
ls -la ~/Library/Containers/org.3rddev.xchatazure/Data/Library/Application\ Support/XChat\ Azure/xchatlogs/

rm -rf ~/Library/Containers/org.3rddev.xchatazure/Data/Library/Application\ Support/XChat\ Azure/scrollback/forge/*.txt
ls -la ~/Library/Containers/org.3rddev.xchatazure/Data/Library/Application\ Support/XChat\ Azure/scrollback/forge/
```

Double click to open dialog command:

`query %s`

---

|||groovy
|||grails

`grails run-app`

---

|||m2crypto.ssl.sslerror
|||M2Crypto.SSL.SSLError

`M2Crypto.SSL.SSLError`

```bash
$ rm /etc/ca/ca.pem
$ ln -s /etc/ca.pem /etc/ca/ca.pem
$ yum clean all -y
$ yum update --disablerepo=* --enablerepo=base,updates
$ sed -i.tmp \
      -e 's?sslcacert = /etc/ca/ca.pem?sslcacert = /etc/pki/tls/cert.pem?g' \
     /etc/yum.repos.d/*.repo \
  && rm -f /etc/yum.repos.d/*.tmp
```

---

|||nle
|||natural language engineering
|||wordsmith

wordsmith - nle

---

|||statsd
|||graphite
|||graphana
|||stats

<http://docs.grafana.org/>

<https://graphite.readthedocs.io/en/latest/>

<https://graphiteapp.org/>

<https://github.com/etsy/statsd>

|||delete data from graphite
|||graphite delete metrics data

<http://geek.michaelgrace.org/2011/09/delete-data-from-graphite/>

`/data/carbon/whisper/`

---

|||generating ids
|||ids
|||minting ids
|||ids specifications |||id specifications

Requirements:

- the id must start with 'blah' and end with 'blah'
- must be human readable (as short as possible, preferably case insensitive)
- must be unique cross env
- must be unique cross product
- must be regexable
- an algorithm rather than a service that generates ids
Would be nice to have, if possible:
- length max 64 including domain, so as short as possible
- case insensitive
- difficult to accidentally make rude words (PIPs drops vowels to ensure this)
- can grow in length to accommodate future expansion without breaking the regex
- someone in the know can identify the minting tool (if you don't have this OR a central service, you'll end up having to check every service to see if the ID belongs to it)

---

|||mozilla thunderbird |||thunderbird google calendar prompt discard my changes and reload

"Every time I sync my calendar on Lightning, I get a message to "accept changes and update anyway" repeatedly even though the event is deleted from the server"

<https://support.mozilla.org/en-US/questions/1095088>

<https://support.mozilla.org/en-US/questions/1094700>

<http://kb.mozillazine.org/Profile_folder_-_Thunderbird>

<https://groups.google.com/forum/#!topic/provider-for-google-calendar/gMTvveaOGLA>

"Steve Phelps

22/09/2015

Resolved: deleting the 'calendar-data/' directory in my profile and unsubscribing and then resubscribing to the offending google calendar fixed the problem.

- show quoted text -"

---
