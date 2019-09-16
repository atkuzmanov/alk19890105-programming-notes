# Git Guide

Table of content

- [Git Guide](#git-guide)
  - [Working with Git](#working-with-git)
    - [Name a Feature/Topic branch](#name-a-featuretopic-branch)
    - [Create a feature branch](#create-a-feature-branch)
    - [Catch up with the remote master](#catch-up-with-the-remote-master)
    - [Merge into master](#merge-into-master)
    - [Remove a feature branch](#remove-a-feature-branch)
    - [Commit messages](#commit-messages)
    - [Useful git aliases](#useful-git-aliases)
  - [See also](#see-also)

## Working with Git

### Name a Feature/Topic branch

All fixes, features and improvements must be done in a separate branch which
has to be branched from the **master** branch.

```text
  * 93a6175 - (topic-branch) Your second commit
  * a135597 - Your first commit
 /
* 82405b6 - The point you branch out
* cdf18eb - An earlier commit
```

The name of your development branch should be in a format that was agreed upon
by all team members:

- Keyword. In order to make the purpose of the branch as clear as
  possible the branch name should be prefixed with one of the following
  keywords:

  - *major*. If you are introducing a new feature that breaks backward.
    compatibility
  - *feature*. If you are introducing a new feature in a backward compatible way.
  - *fix*. If the changes are not introducing a new feature e.g. bug fix or
    refactoring.

- Another useful thing to include in the branch name is the JIRA task number
  e.g. UPPSF-123. There is integration between JIRA and Github that will show
  the branch in the JIRA task under the Development tab. For more information
  see Jira's article about "[Referencing issues in your development work][referencing-issues-in-your-development-work]"

Use the pattern: `<type-of-change>/<Jira-ticket-id>-<meaningful_name>`. An
example name following the rules above will be:
*feature/UPPSF-123-my-cool-implementation*

[referencing-issues-in-your-development-work]: https://confluence.atlassian.com/jirasoftwarecloud/referencing-issues-in-your-development-work-777002789.html

### Create a feature branch

```bash
# Ensure you are in the master branch
git checkout master
# Get the latest changes from the remote master branch
git pull --rebase
# Should say you are up to date with origin/master and clean
git status
# Create a new local branch
git checkout -b <branch-name>
# Push local branch to remote origin
git push –u origin <branch-name>
```

*[Example]*: Create a feature branch for Jira ticket UPPSF-123:

```bash
git checkout master
git pull --rebase
git checkout -b feature/UPPSF-123-my-cool-implementation
git push -u origin feature/UPPSF-123-my-cool-implementation
```

### Catch up with the remote master

```bash
# Pull latest master
git checkout master
git pull --rebase

# Rebase changes from master that was just updated with remote master to ensure
# feature branch is up to date. If this is done the right way there shoudn't be
# any merge conflicts.
git checkout <branch>
git rebase master

# Push the changes to the remote feature branch.
# --force-with-lease will prevent you wiping someone else's changes
git push --force-with-lease
```

Catch up with Master branch example:

```bash
git checkout master
git pull --rebase
git checkout feature/UPPSF-123-my-cool-implementation
git rebase master
git push –-force-with-lease
```

### Merge into master

Merge the feature branch with the following strategy - rebase and merge into
master with --no-ff:

Rebase before merging, because this provides a clean, linear history that's
easier to understand. Merge with --no-ff, because it creates a merge commit
that:

- makes it easier to see which commits belong to which branch.
- can be easily reverted.

For example you branched off master and made two commits. While you're working,
somebody pushed a commit to the upstream master. Currently the repo looks like
this.

```text
* dfb434e - (HEAD -> master, origin/master) Upstream commit made after you branched out
| * 93a6175 - (topic-branch) Your second commit
| * a135597 - Your first commit
|/
* 82405b6 - The point you branch out
```

You should do the below:

```bash
git checkout master
git pull
git checkout <branch>
git rebase master
git push --force-with-lease
git checkout master
git merge --no-ff <branch>
```

When finally merged, your history should look like this:

```text
*   1dde652 - (HEAD -> master, origin/master) Merge branch 'topic-branch'
|\
| * fdb8a7e - (topic-branch) Your second commit
| * f28ae50 - Your first commit
|/
* dfb434e - Upstream commit made after you branched out
* 82405b6 - The point you branch out
* cdf18eb - An earlier commit
```

### Remove a feature branch

Once you are done with the work in the feature branch you should remove it both
locally and from the remote.

```bash
# Remove the local branch
git branch -d <feature-branch>
# Remove the branch from the remote
git push origin --delete <feature-branch>
# (optional) Prunes tracking branches not on the remote.
git remote prune origin
```

Remove feature branch example:

```bash
git branch -d feature/UPPSF-123-my-cool-implementation
git push origin --delete feature/UPPSF-123-my-cool-implementation
```

### Commit messages

Commit messages are a way you communicate with your team members and your
future self about code. Good commits are crucial to maintenance. It might not
seem so when you're writing them, but commits tend to be very useful when
investigating the code.

Here are good reads about the importance of good commit messages:

- [A Note About Git Commit Messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
- [The importance of commit messages](https://wildbit.com/blog/2008/11/11/the-importance-of-commit-messages)
- [5 Useful Tips For A Better Commit Message](https://thoughtbot.com/blog/5-useful-tips-for-a-better-commit-message)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
- [Better Commit Messages with a .gitmessage Template](https://thoughtbot.com/blog/better-commit-messages-with-a-gitmessage-template)

### Useful git aliases

Rebase with the *--preserve-merges* option passed to git rebase so that locally
created merge commits will not be flattened.

```text
pl = git pull --rebase=preserve
```

Outputs branches history in a beautiful/readable state.

```text
l = log --all --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset %Cblue%an%Creset' --abbrev-commit --date=relative
```

Will protect all remote refs that are going to be updated by requiring their
current value to be the same as the remote-tracking branch we have for them.

```text
pfl = git push –-force-with-lease
```

## See also

- [The Pull Requests Guide](../pr-guide/README.md)

Good reads:

- [A tidy, linear Git history](https://www.bitsnbites.eu/a-tidy-linear-git-history/)
- [Oh shit, git!](https://ohshitgit.com/)
- [Understanding git’s –force-with-lease](https://blog.developer.atlassian.com/force-with-lease/)
