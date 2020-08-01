# github notes 2

|||github

```bash
git clone git@github.com:example/prepo.git

git pull
git push
git add
git commit
git status
git clone
git diff

git init
git reset
git rm
git checkout
git log

git pull origin master
git pull origin [name_of_your_new_branch]
git remote add origin git@github.com:example/repoTwo.git
git commit -m "deleted tmp1, no longer needed"
git rm tmp1.java
git checkout -- tmp1.java
git reset HEAD tmp1.java
git add tmp1.java
git clone git@github.com:example/repo1.git
git push --help
git commit project/plugins.sbt
git diff project/
git reset HEAD project/plugins.sbt


git branch [BRANCH-NAME]
git checkout [BRANCH-NAME]

git commit -am "message" // add + message


git push origin master

git push origin [BRANCH-NAME] --force
```

```bash
~/.gitconfig

[http]
	proxy = http://www-example.proxy.com:80
[user]
	name = ExampleFirstName ExampleFamilyName
	email = exampleEmail@exampleMail.com
```

```bash
ssh-keygen

open -a TextWrangler ~/.ssh/config

Host *github.com
  IdentityFile ~/.ssh/id_rsa
  ProxyCommand nc -x socks-gw.example.socks.proxy.com:1085 -X 5 %h %p
```

```bash
git update-index --chmod=+x [FILE-NAME]
```

---

|||How to merge remote master to local branch?

```bash
git checkout master
git pull origin master
git checkout exampleFeatureBranch
git pull origin exampleFeatureBranch

### Assuming you're currently on branch exampleFeatureBranch
git fetch
git rebase origin/master
```

We can also add the original parent repository as an upstream remote when we need to pull changes from there:

`git remote add upstream git@github.com:example/example.git`

---

<http://stackoverflow.com/questions/4089430/how-can-i-determine-the-url-that-a-local-git-repo-was-originally-cloned-from>

If referential integrity has been broken:

```bash
git config --get remote.origin.url
If referential integrity is intact:

git remote show origin
```

---

<https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches>

```bash
git checkout -b [name_of_your_new_branch]

git checkout master

git pull

git checkout [name_of_your_new_branch]

git rebase master

git rebase --continue

git rebase --abort

git rebase --skip

git push origin [name_of_your_new_branch]
```

---

|||git adding a remote
|||github adding a remote

<https://help.github.com/articles/adding-a-remote/>

```bash
git remote add origin https://github.com/user/repo.git

git remote add origin git@github.com:user/repo.git
git push -u origin master
```

---

|||git
|||git merge branch
|||git merge two branches

<https://stackoverflow.com/questions/3404294/merging-2-branches-together-in-git>

merge is used to bring two (or more) branches together.

a little example:

```bash
# on branch A:
# create new branch B
$ git checkout -b B
# hack hack
$ git commit -am "commit on branch B"

# create new branch C from A
$ git checkout -b C A
# hack hack
$ git commit -am "commit on branch C"

# go back to branch A
$ git checkout A
# hack hack
$ git commit -am "commit on branch A"
so now there are three separate branches (namely A B and C) with different heads

to get the changes from B and C back to A, checkout A (already done in this example) and then use the merge command:

# create an octopus merge
$ git merge B C
your history will then look something like this:

…-o-o-x-------A
      |\     /|
      | B---/ |
       \     /
        C---/
if you want to merge across repository/computer borders, have a look at git pull command, e.g. from the pc with branch A (this example will create two new commits):

# pull branch B
$ git pull ssh://host/… B
# pull branch C
$ git pull ssh://host/… C
shareeditflag
answered Aug 4 '10 at 9:58
knittl
```

<https://stackoverflow.com/questions/25053697/git-merge-two-local-branches>

```text
I have branch Master, branch A and branch B. Now I'm working in the branch A and I need to merge branch A with branch B and proceed my work in the branch A. All files are comitted in the branch A and B.

What's the fast way to implement it?

git merge
shareeditflag
asked Jul 31 '14 at 8:02
user3127896


If I understood your question, you want merge branch B into branch A. If so, checkout branch A, and execute below command

git checkout branchA
git merge branchB
shareeditflag
answered Jul 31 '14 at 8:04
Abimaran Kugathasan
```

---

|||git
|||git merge branch with conficts
|||github

- make pull request
- make sure local master is up to date
- git checkout master
- git pull origin master
- git fetch origin
- git checkout -b [BRANCH-NAME] origin/[BRANCH-NAME]
- git merge master
- resolve conflicts manually
- push to branch [BRANCH-NAME]: 
  - git add .
  - git commit -am"[COMMIT-MESSAGE]"
  - git push origin [BRANCH-NAME]
- pull request for [BRANC-NAME] should be able to merge without conflicts

`git reset --hard HEAD`

```bash
# Because you want all your branches and tags to go up, you can now run this:
git push origin --all
git push origin --tags
```

---

|||git delete branch
|||git branch delete

```bash
# delete
git branch -d [BRANCH-NAME]
# force delete
git branch -D [BRANCH-NAME]
# delete from github upstream
git push origin --delete [BRANCH-NAME]
```

|||git history

```bash
# show commit logs
git log

# git show last 10 commit logs
git log -10 --all --date-order

# https://stackoverflow.com/questions/9678890/how-to-find-the-latest-commits-in-one-git-repository
git log --graph --all --format=format:'%h - (%ai) %s — %cn %d' --abbrev-commit --date=relative -10

# summarize git log output
git shortlog
# -s --summary Suppress commit description and provide a commit count summary only.
git shortlog -s


# git ---track???
git branch --track localBranchName remotes/origin/remoteBranchName
git branch --track 1.1.11 remotes/origin/remoteBranchName localBranchName
```

|||How can I determine the URL that a local Git repository was originally cloned from?

<https://stackoverflow.com/questions/4089430/how-can-i-determine-the-url-that-a-local-git-repository-was-originally-cloned-fr>

```bash
git remote show origin
git config --get remote.origin.url
git remote -v
```

---

|||git fork
|||git pull from fork

We can also add the original parent repository as an upstream remote when we need to pull changes from there:

```bash
git remote add upstream git@github.com:some/github-repo-usptream-remote-master.git

git pull upstream master
```

---

|||.gitignore
|||gitignore
|||github

.gitignore

```bash
.idea
*.iml
target
dump.rdb
```

===

```bash
*.class
*.log
*.iml
.DS_Store
.history

target

# ide things
.idea
.ensime_cache/
.ensime
.scala_dependencies
.worksheet

# sbt things
.cache
.history
.lib/
dist/*
target/
lib_managed/
src_managed/
project/boot/
project/plugins/project/

# Emacs ensime
.ensime
.ensime_cache/
```

---

|||github deploy keys

<https://developer.github.com/guides/managing-deploy-keys/>

---

|||github
|||git pre commit bash script
|||github pre commit bash script
|||pre commit bash script
|||pre commit script
|||pre-commit bash script

> References
>
> Git pre commit bash script
> Skip to end of metadata
> Created by Pete Tanton

The following bash script can be used to search any files you commit for AWS keys or secrets.

Save with the file name: `<your repo>/.git/hooks/pre-commit`
Or see <http://stackoverflow.com/questions/2293498/git-commit-hooks-global-settings> to set it globaly.
This is based on a few examples on GitHub.

```bash
#!/usr/bin/env bash
if git rev-parse --verify HEAD >/dev/null 2>&1
then
    against=HEAD
else
    # Initial commit: diff against an empty tree object
    EMPTY_TREE=$(git hash-object -t tree /dev/null)
    against=$EMPTY_TREE
fi
# Redirect output to stderr.
exec 1>&2

# Check changed files for an AWS keys
FILES=$(git diff --cached --name-only $against)
if [ -n "$FILES" ]; then
    KEY_ID=$(grep -E --line-number '[^A-Z0-9][A-Z0-9]{20}[^A-Z0-9]' $FILES)
    KEY=$(grep -E --line-number '[^A-Za-z0-9/+=][A-Za-z0-9/+=]{40}[^A-Za-z0-9/+=]' $FILES)
    if [ -n "$KEY_ID" ] || [ -n "$KEY" ]; then
        exec < /dev/tty # Capture input
        echo "=========== Possible AWS Access Key IDs ==========="
        echo "${KEY_ID}"
        echo ""
        echo "=========== Possible AWS Secret Access Keys ==========="
        echo "${KEY}"
        echo ""
        while true; do
            read -p "[AWS Key Check] Possible AWS keys found. Commit files anyway? (y/N) " yn
            if [ "$yn" = "" ]; then
                yn='N'
            fi
            case $yn in
                [Yy] ) exit 0;;
                [Nn] ) exit 1;;
                * ) echo "Please answer y or n for yes or no.";;
            esac
        done
        exec <&- # Release input
    fi
fi
# Normal exit
exit 0
```

<http://stackoverflow.com/questions/2293498/git-commit-hooks-global-settings>

---
