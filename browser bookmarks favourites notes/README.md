# browser bookmarks favourites notes

How to convert bookmarks.html to simple list of websites formated http://www.site.ext

> References
> <https://support.mozilla.org/en-US/questions/1132893>

```javascript
jscher2000
Top 10 Contributor
7/30/16, 11:05 PM
more options
Chosen Solution

This is sort of "quick and dirty" but you could give it a try:

(1) Open your bookmark.html file in a tab

(2) Open the web console in the lower part of the tab. Either:

Ctrl+Shift+k
"3-bar" menu button > Developer > Web Console
(3) Paste the following script in the bottom line of the console (to the right of the >> symbol) and press Enter to run it:

var aels=document.querySelectorAll("a[href]");
for (var i=0; i<aels.length; i++) aels[i].parentNode.outerHTML = "<p>"+aels[i].href+"</p>";
var dds=document.querySelectorAll("dd");
for (var i=0; i<dds.length; i++) dds[i].outerHTML="";

The links in the page should be replaced with plain URLs.

(4) Copy / paste the modified contents of the page to a text file or a Word document.
```

---

Extract bookmarks (from html file) from the browser

> References
> <https://gist.github.com/jayrambhia/1690395>

```python
"""
@author: jay
"""
 
from BeautifulSoup import BeautifulSoup
import gdbm
import pickle
import time
 
def main():
    f = open('bookmarks.html','r')
    soup = BeautifulSoup(f.read())
    f.close()
     
    dt=[]
    for d in soup.findAll('dt'):
        dt.append(d)
    f = gdbm.open('bookmark','c')    
    for i in range(len(dt)):
        if dt[i].contents[0].has_key('href') and dt[i].contents[0].has_key('add_date'):
            uri =  dt[i].contents[0]['href']
            title = dt[i].contents[0].contents[0]
            add_date = time.ctime(int(dt[i].contents[0]['add_date']))
            last_modified = time.ctime(int(dt[i].contents[0]['last_modified']))
            f[uri] = pickle.dumps((str(title), add_date, last_modified))
    f.close()        
if __name__ == '__main__':
    main()
```

===

```text
jayrambhia commented on 27 Jan 2012
Go to Bookmarks in your browser. Open Show All Bookmarks. Import and Backup > Export Bookmark to HTML > Save the file and feed it to the script.
```

---
