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
