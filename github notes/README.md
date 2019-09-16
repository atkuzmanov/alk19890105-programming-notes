# github notes

----

[work guide 1](work-guide-1.md)
## Reference
<https://github.com/Financial-Times/upp-docs/blob/master/guides/git-guide/README.md>

----
|||git aliases

```
  l = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit -n 10
  ll = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit -n 20
  lll = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
  la = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --all
```

```
└▪ cat /Users/[user]/bin/git_autosquash_branch_fixups.sh
#!/bin/bash

export current_branch=$(git rev-parse --abbrev-ref HEAD)
export number_of_commits=$(git log master..$current_branch --pretty=oneline | wc -l | sed 's/ //g')

git rebase -i HEAD~$number_of_commits --autosquash
new messages
`  fcommit = commit --fixup
```

----
