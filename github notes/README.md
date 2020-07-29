# github notes

[work guide 1](work-guide-1.md)

> References
> <https://github.com/Financial-Times/upp-docs/blob/master/guides/git-guide/README.md>

---

[gitconfig example 1](gitconfig-1.md)

---

[.gitignore example 1](gitignore-1.md)

---

||| Why is my git repository so big?

||| How to remove unused objects from a git repository?

||| Reduce git repository size

||| How to shrink the .git folder

||| Keep your git directory clean with `git clean` and `git trash`

> References
> <https://stackoverflow.com/questions/5277467/how-can-i-clean-my-git-folder-cleaned-up-my-project-directory-but-git-is-sti>

```bash
If you added the files and then removed them, the blobs still exist but are dangling. git fsck will list unreachable blobs, and git prune will delete them.

If you added the files, committed them, and then rolled back with git reset --hard HEAD^, they’re stuck a little deeper. git fsck will not list any dangling commits or blobs, because your branch’s reflog is holding onto them. Here’s one way to ensure that only objects which are in your history proper will remain:

git reflog expire --expire=now --all
git repack -ad  # Remove dangling objects from packfiles
git prune       # Remove dangling loose objects

Another way is also to clone the repository, as that will only carry the objects which are reachable. However, if the dangling objects got packed (and if you performed many operations, git may well have packed automatically), then a local clone will carry the entire packfile:

git clone foo bar                 # bad
git clone --no-hardlinks foo bar  # also bad

You must specify a protocol to force git to compute a new pack:

git clone file://foo bar  # good
```

> References
> <https://stackoverflow.com/questions/5613345/how-to-shrink-the-git-folder>

```bash
you should not delete all changes older than 30 days (i think it's somehow possible exploiting git, but really not recommended).

you can call

git gc --aggressive --prune

, which will perform garbage collection in your repository and prune old objects. do you have a lot of binary files (archives, images, executables) which change often? those usually lead to huge .git folders (remember, git stores snapshots for each revision and binary files compress badly)

--

Actually, git gc --aggressive is considered to be bad practice. It's better to use git repack -a -d --depth=250 --window=250.

```

> References
> <https://stackoverflow.com/questions/2116778/reduce-git-repository-size>

```bash
git gc --aggressive is one way to force the prune process to take place (to be sure: git gc --aggressive --prune=now). You have other commands to clean the repo too. Don't forget though, sometimes git gc alone can increase the size of the repo!

It can be also used after a filter-branch, to mark some directories to be removed from the history (with a further gain of space); see here. But that means nobody is pulling from your public repo. filter-branch can keep backup refs in .git/refs/original, so that directory can be cleaned too.

Finally, as mentioned in this comment and this question; cleaning the reflog can help:

git reflog expire --all --expire=now
git gc --prune=now --aggressive

An even more complete, and possibly dangerous, solution is [to remove unused objects from a git repository](https://stackoverflow.com/questions/3797907/how-to-remove-unused-objects-from-a-git-repository/14729486#14729486)

--

In my case, I pushed several big (> 100Mb) files and then proceeded to remove them. But they were still in the history of my repo, so I had to remove them from it as well.

What did the trick was:

bfg -b 100M  # To remove all blobs from history, whose size is superior to 100Mb
git reflog expire --expire=now --all
git gc --prune=now --aggressive
Then, you need to push force on your branch:

git push origin <your_branch_name> --force
Note: bfg is a tool that can be installed on Linux and macOS using brew:

brew install bfg
```

> References
> <https://stackoverflow.com/questions/3797907/how-to-remove-unused-objects-from-a-git-repository/14729486#14729486>

```bash
I answered this elsewhere, and will copy here since I'm proud of it!

... and without further ado, may I present to you this useful script, git-gc-all, guaranteed to remove all your git garbage until they might come up with extra config variables:

git -c gc.reflogExpire=0 -c gc.reflogExpireUnreachable=0 \
  -c gc.rerereresolved=0 -c gc.rerereunresolved=0 \
  -c gc.pruneExpire=now gc "$@"
The --aggressive option might be helpful.

NOTE: this will remove ALL unreferenced thingies, so don't come crying to me if you decide later that you wanted to keep some of them!

You might also need to run something like these first, oh dear, git is complicated!!

git remote rm origin
rm -rf .git/refs/original/ .git/refs/remotes/ .git/*_HEAD .git/logs/
git for-each-ref --format="%(refname)" refs/original/ |
  xargs -n1 --no-run-if-empty git update-ref -d
I put all this in a script, here:

http://sam.nipl.net/b/git-gc-all-ferocious
```

> References
> <https://stackoverflow.com/questions/1029969/why-is-my-git-repository-so-big>

```bash

I recently pulled the wrong remote repository into the local one (git remote add ... and git remote update). After deleting the unwanted remote ref, branches and tags I still had 1.4GB (!) of wasted space in my repository. I was only able to get rid of this by cloning it with git clone file:///path/to/repository. Note that the file:// makes a world of difference when cloning a local repository - only the referenced objects are copied across, not the whole directory structure.

Edit: Here's Ian's one liner for recreating all branches in the new repo:

d1=#original repo
d2=#new repo (must already exist)
cd $d1
for b in $(git branch | cut -c 3-)
do
    git checkout $b
    x=$(git rev-parse HEAD)
    cd $d2
    git checkout -b $b $x
    cd $d1
done
```

> References
> <https://coderwall.com/p/g16jpq/keep-your-git-directory-clean-with-git-clean-and-git-trash>

---

## git aliases

|||git aliases

```bash
  l = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit -n 10
  ll = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit -n 20
  lll = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
  la = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all
```

## git autosquash

```bash
$ cat /Users/[user]/bin/git_autosquash_branch_fixups.sh
#!/bin/bash

export current_branch=$(git rev-parse --abbrev-ref HEAD)
export number_of_commits=$(git log master..$current_branch --pretty=oneline | wc -l | sed 's/ //g')

git rebase -i HEAD~$number_of_commits --autosquash
new messages
`  fcommit = commit --fixup
```

---
