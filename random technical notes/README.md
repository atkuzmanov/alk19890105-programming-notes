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
