# wget notes

|||wget download entire webpages websites

```bash
wget \
 --page-requisites \
 --span-hosts \
 --convert-links \
 --adjust-extension \
 --no-parent \
 --execute robots=off \
 --random-wait \
 --user-agent=Mozilla \
 --continue \
 --no-clobber \
 --directory-prefix="folder/subfolder example.com path" \
 --domains example.com \
 https://www.example.com/path/

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
 https://www.example.com/path/
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
 --directory-prefix=folder/subfolder example.com path \
 --domains ${WEBSITE-DOMAIN} \
  https://www.example.com/path/
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
 --directory-prefix=~/Downloads/untitled\ folder\ 3/ \
 --domains example.com \
  https://www.example.com/path/
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
 --directory-prefix=~/Downloads/untitled\ folder\ 4/ \
 --domains example.com \
  https://www.example.com/path/
```

> References
>
> <https://superuser.com/questions/14403/how-can-i-download-an-entire-website>
>
> <https://www.linuxjournal.com/content/downloading-entire-web-site-wget>
>
> <https://www.gnu.org/software/wget/manual/wget.html#Spanning-Hosts>
>
> <https://linux.die.net/man/1/wget>
>
> <https://stackoverflow.com/questions/1078524/how-to-specify-the-location-with-wget>

---
