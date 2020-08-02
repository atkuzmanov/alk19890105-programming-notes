# wget notes

|||wget multiple webpages

```bash
wget ‐‐page-requisites ‐‐span-hosts ‐‐convert-links ‐‐adjust-extension http://example.com/dir/file
```

```bash
wget \
	--page-requisites \
	--span-hosts \
	--convert-links \
	--adjust-extension \
	--no-parent \
	--execute robots=off \
	--wait=30 \
	--random-wait \
	--user-agent=Mozilla \
	--continue \
	--no-clobber \
	https://chortle.ccsu.edu/java5/Notes/chap49C/ch49C_3.html
```

```bash
wget \
	--page-requisites \
	--span-hosts \
	--convert-links \
	--adjust-extension \
	--no-parent \
	--execute robots=off \
	--wait=2 \
	--random-wait \
	--user-agent=Mozilla \
	--continue \
	--no-clobber \
	-- directory-prefix=folder/subfolder example.com
	--domains ${WEBSITE-DOMAIN} \
		https://www.journaldev.com/747/two-dimensional-array-java
```

```bash
wget \
	--mirror \
	--page-requisites \
	--span-hosts \
	--convert-links \
	--adjust-extension \
	--no-parent \
	--execute robots=off \
	--wait=1 \
	--random-wait \
	--user-agent=Mozilla \
	--continue \
	--no-clobber \
	--timestamping \
	--directory-prefix=/Users/alkuzmanov/Downloads/untitled\ folder\ 3/ \
	--domains journaldev.com \
		https://www.journaldev.com/747/two-dimensional-array-java
```

```bash
wget \
	--mirror \
	--recursive \
	--page-requisites \
	--span-hosts \
	--convert-links \
	--adjust-extension \
	--no-parent \
	--execute robots=off \
	--wait=1 \
	--random-wait \
	--user-agent=Mozilla \
	--continue \
	--no-clobber \
	--timestamping \
	--directory-prefix=/Users/alkuzmanov/Downloads/untitled\ folder\ 4/ \
	--domains journaldev.com \
		https://www.journaldev.com/747/two-dimensional-array-java		
```

---
