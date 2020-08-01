# svn subversion notes

|||svn
|||subversion

```bash
svn status
svn st

svn update
svn up

svn commit

svn checkout

### Show last 10 commits
svn log --limit 10
```

---

|||svn
|||subversion

```bash
# Listing size of remote repo, that is not checked out:
svn list -vR https://repo.dev.example.com/misc/sandbox/ '{if ($3 !="") sum+=$3; i++} END {print "\ntotal size= " sum/1024000" MB" "\nnumber of files= " i/1000 " K"}'
```

```bash
# Renaming a remote repo
svn move svn://svnmachine/repository/release svn://svnmachine/repository/tags
FYI: mv, rename, move, and ren are all the same command
```

--- 

```bash
### Add to the end of the ~/.subversion/servers file:

[groups]
# group1 = *.collab.net
# othergroup = repository.blarggitywhoomph.com
# thirdgroup = *.example.com
name-of-example-repo = repo.example.com

[name-of-example-repo]
ssl-client-cert-file=/example/path/example-cert.p12
ssl-authority-files=/example/path/example-cert.pem
ssl-client-cert-password=example-password
http-proxy-host = www-example.proxt.com
http-proxy-port = 80
https_host=www-example.proxt.com
https_port=80
```

---
