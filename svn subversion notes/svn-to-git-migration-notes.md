# svn to git migration notes

|||svn to git migration
|||svn migration
|||git migration
|||svn to github
|||github migration

<https://help.github.com/articles/source-code-migration-tools/>

<https://help.github.com/articles/importing-a-repository-with-github-importer/>

<https://help.github.com/articles/importing-a-git-repository-using-the-command-line/>

Tools for converting Subversion repositories to Git:

`git-svn`

<https://git-scm.com/docs/git-svn>

<https://github.com/nirvdrum/svn2git>

<https://git-scm.com/book/en/v2/Git-and-Other-Systems-Migrating-to-Git>

```bash
git svn clone
git svn fetch
git svn fetch --fetch-all
git svn rebase
git svn dcommit
```

External tools for svn to git:

`svn2git`

<https://github.com/nirvdrum/svn2git>

If you need a jump start on figuring out what users made changes in your svn repositories the following command sequence might help. It grabs all the logs from the svn repository, pulls out all the names from the commits, sorts them, and then reduces the list to only unique names. So, in the end it outputs a list of usernames of the people that made commits to the svn repository which name on its own line. This would allow you to easily redirect the output of this command sequence to ~/.svn2git/authors and have a very good starting point for your mapping.

```bash
$ svn log --quiet | grep -E "r[0-9]+ \| .+ \|" | cut -d'|' -f2 | sed 's/ //g' | sort | uniq
Or, for a remote URL:

$ svn log --quiet http://path/to/root/of/project | grep -E "r[0-9]+ \| .+ \|" | cut -d'|' -f2 | sed 's/ //g' | sort | uniq
```

|||svn to git migration references and other links:

<https://github.com/Bioconductor/BiocGithubHelp/wiki/Managing-your-Bioc-code-on-hedgehog-and-github>

<https://github.com/Bioconductor/BiocGithubHelp/wiki/Preserve-git-committer-in-dcommit>

<http://eikke.com/importing-a-git-tree-into-a-subversion-repository/>

<https://www.atlassian.com/git/tutorials/migrating-convert>

<http://john.albin.net/git/convert-subversion-to-git>

<https://ajmg.wordpress.com/2014/02/11/migrating-from-subversion-to-git-a-git-of-a-migration-with-a-really-big-repo/>

<https://stackoverflow.com/questions/79165/how-to-migrate-svn-repository-with-history-to-a-new-git-repository>

<https://randomallsorts.blogspot.co.uk/2011/10/using-git-svn-with-large-repository.html>

<https://answers.atlassian.com/questions/143650/git-svn-clone-fails-with-secure-connection-truncated-error>

<https://stackoverflow.com/questions/3239759/checkout-remote-branch-using-git-svn>

<https://ao2.it/wiki/How_to_migrate_an_SVN_repository_to_Git>

<https://gist.github.com/magnetikonline/5061085>

<https://git.wiki.kernel.org/index.php/Git-svn>

<https://stackoverflow.com/questions/3919962/speeding-up-the-initial-git-svn-fetch>

<https://stackoverflow.com/questions/747075/how-to-git-svn-clone-the-last-n-revisions-from-a-subversion-repository>

"Unable to determine upstream SVN information from working tree history" error:
<https://stackoverflow.com/questions/1269566/unable-to-determine-upstream-svn-information-from-head-history>

<https://stackoverflow.com/questions/9805980/unable-to-determine-upstream-svn-information-from-working-tree-history>

<https://stackoverflow.com/questions/392332/retroactively-correct-authors-with-git-svn>

<https://stackoverflow.com/questions/677753/mapping-between-git-committers-and-svn-users>

<https://stackoverflow.com/questions/16687094/git-svn-clone-with-author-name-like-cn-myname>

<https://stackoverflow.com/questions/2494984/how-to-get-a-list-of-all-subversion-commit-author-usernames>

<https://stackoverflow.com/questions/10298291/cannot-push-to-github-keeps-saying-need-merge>

<https://github.com/k88hudson/git-flight-rules>

<https://stackoverflow.com/questions/4073956/how-do-i-resolve-a-git-svn-index-mismatch>
<http://blog.alieniloquent.com/2010/11/01/git-svn-fetch-dies-with-fatal-bad-object.html>

<https://stackoverflow.com/questions/677753/mapping-between-git-committers-and-svn-users>

<https://stackoverflow.com/questions/16687094/git-svn-clone-with-author-name-like-cn-myname>

<https://github.com/haarg/convert-git-dbic/blob/master/author-generate>

<https://gist.github.com/darconeous/935424>

<https://orville.thebennettproject.com/articles/git-troubleshooting/>

---

|||Subversion (SVN) to GITHUB migration notes
|||svn to git migration how to tutorial notes
|||git svn
|||git svn clone
|||git svn fetch
|||git svn rebase
|||git svn dcommit

```bash
########## Intro
```

From my experience so far there is no sliver bullet for migrating from SVN to GITHUB.
Most of the documentation online is for best-case scenarios where the codebases are either relatively small or have a tidy history.
For example if there are some sort of corrupted revisions in svn (someone added a branch "trunk" in branches, but later deleted it) that could confuse git-svn.
Codebases with large files, large commits, repos with lots of revisions push the tools to their limits and crash either due to network timeouts or memory.

In our case, our codebases are a bit more mature (exmapleCodebaseName has ~2 million revisions) and require aspecific SVN to GITHUB migration recipe.

```bash
########## Step1 git svn authors
```

`git svn authors`

```bash
### Step 1: Get SVN authors & convert to GITHUB committers

### You will need the auhtors for the initial git svn fetch/clone which will migrate the SVN codebase and it's history to GITHUB
```

```bash
svn log --quiet http://path/to/root/of/project/in/svn/repo | grep -E "r[0-9]+ \| .+ \|" | cut -d'|' -f2 | sed 's/ //g' | sort | uniq

svn log --quiet http://path/to/root/of/project/in/svn/repo | grep -E "r[0-9]+ \| .+ \|" | cut -d'|' -f2 | sed 's/ //g' | sort | uniq > svn-to-git-authors.txt
```

```text
########## Step2 git svn clone
```

This will migrate the SVN codebase and it's history to GITHUB, creating a new github repo named after whatever you specify instead of "my_project_name" below.
When the "–stdlayout" parameter is specified, it's assumed the SVN repo has the standard layout - branches, tags, and trunk.

```bash
git svn clone <http://my-project.example.com/svn/> --username=<your_username> --stdlayout <my_project_name>
```

```bash
### The option --stdlayout is a shorthand way of setting trunk,tags,branches as the relative paths, which is the Subversion default
```

If the SVN layout is different, for example has naming different than the standard - branches, tags, trunk, you will need to describe this with the relevant parameters: `--trunk=<trunk_subdir> --tags=<tags_subdir> --branches=<branches_subdir>`
For more information, please see: <https://git-scm.com/docs/git-svn>

```bash
### The initial clone operation often crashes because of connection timeouts or memory problems of the migration tools, due to huge repositories with lots of revisions, lots of commits or big files
```

You should not re-start the clone operation each time from the beginning as with a big repository it will probably never finish successfully.
To resume a clone operation simply use: git svn fetch
Note: after some time "git svn fetch" will fail for the same reasons.

```bash
### When doing the clone process, if you have specified --username, --authors-file and --authors-prog parameters, you need to specify them again for the git svn fetch command, otherwise you will likely get "Index mismatch" errors
```

```bash
git svn fetch --username=<your_username>
```

If git svn encounters an SVN committer name that does not exist in the authors-file, git svn will abort operation.

Workaround:
Specify `--authors-prog=<script.sh>` perameter to git svn clone, which will take care of any author names that do not exist:
Reference: <https://stackoverflow.com/questions/16687094/git-svn-clone-with-author-name-like-cn-myname>
This can be set using
`git config svn.authors-prog <authorScript>`

```bash
# !/usr/bin/perl

$svnAuthor = $ARGV[0];
if ($svnAuthor =~ /^.*?emailAddress=(.*?)\/CN=(.*?)\/.*$/) {
    print "$2 <$1>";
} else {
     print $svnAuthor;
}
```

Example:

```bash
git svn clone <http://my-project.example.com/svn/> --authors-file=<filename> --authors-prog=<scriptAuthorsConvert.pl> --stdlayout  my_project_name

git svn clone <http://my-project.example.com/svn/> --authors-file=users.txt --stdlayout my_project_name

git svn clone <http://my-project.example.com/svn/> --authors-file=users.txt --no-metadata --stdlayout my_project_name
```

```bash
### Alternative if perl script does not work

### <https://stackoverflow.com/questions/677753/mapping-between-git-committers-and-svn-users>

### --authors-prog=$(tmpMapFile="$TMPDIR/mapSvnUsersAutomatically.$$.sh" && echo -e '#!/bin/sh\necho $1" <"$1"@example.com>"' > $tmpMapFile && chmod +x $tmpMapFile && echo $tmpMapFile)

git svn clone <https://some.example.repo.com/repo/> --username=<USERNAME> --authors-file=/PATH/TO/authors.txt --authors-prog=$(tmpMapFile="$TMPDIR/mapSvnUsersAutomatically.$$.sh" && echo -e '#!/bin/sh\necho $1" <"$1"@example.com>"' > $tmpMapFile && chmod +x $tmpMapFile && echo $tmpMapFile) --stdlayout <NAME-OF-NEW-PROJECT-FOLDER>
```

If you get an error similar to:

RA layer request failed: Unable to connect to a repository at URL 'https://some.svn.repo.com/someProjectName': OPTIONS of 'https://some.svn.repo.com/someProjectName': Server certificate verification failed: issuer is not trusted (<https://some.svn.repo.com>) at /usr/local/Cellar/git/2.5.0/lib/perl5/site_perl/Git/SVN.pm line 305.

Try specifying the --username parameter or a combination of the --username and --password parameters to the operation

```bash
git svn clone <http://my-project.example.com/svn/> --username=<username> --authors-file=users.txt --authors-prog=<convertNEAuthors.pl> --stdlayout my_project_name
```

```bash
### The initial clone operation often crashes because of connection timeouts or memory problems of the migration tools, due to huge repositories with lots of revisions, lots of commits or big files
```

You should not re-start the clone operation each time from the beginning as with a big repository it will probably never finish successfully.
To resume a clone operation simply use: git svn fetch
Note: after some time "git svn fetch" will fail for the same reasons.

`git svn fetch`

```bash
### When doing the clone process, if you have specified --authors-file and --authors-prog parameters, you need to specify them again for the git svn fetch command, otherwise you will likely get "Index mismatch" errors
```

```bash
git svn fetch --username=<USERNAME> --authors-file=</PATH/TO/authors.txt> --authors-prog=$(tmpMapFile="$TMPDIR/mapSvnUsersAutomatically.$$.sh" && echo -e '#!/bin/sh\necho $1" <"$1"@example.com>"' > $tmpMapFile && chmod +x $tmpMapFile && echo $tmpMapFile)
```

This can be solved by scripting the git svn fetch to do it in batches of revisions.
I have baselined it to ~ 100 000 successful ones per run, but that varies depending on revision or file sizes, so perhaps ~ 50 000 will be a safe bet.

The initial fetch/cone process is scripted so it can be done in batches of revisions, so it will not push the tools to their limits and crash either due to network timeouts or memory, because of codebases with large files, large commits, repos with lots of revisions. This way the script can, perhaps, be ran in parallel for more than one codebase.

|||git svn clone
|||git svn fetch revisions in batches bash script
|||bash
|||bashscript
|||bash script

```bash
# !/bin/sh

### Bash script to fetch svn revisions for github in batches using git-svn

### Executes git svn fetch -r1:11 etc

### Example use: ./git-svn-revision-batches-2.sh --revisions_start 0 --revisions_end 100 --batch_size 10

### Clear the console

clear
```

```bash
### bash script error message bundling

die () {
    echo >&2 "$@"
    exit 1
}
echo ".> Start"
```

```bash
### Reference for keyed arguments, space separated: <https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash>

while [[ $# -gt 1 ]]
do
parameter_key="$1"

case $parameter_key in
    -rs|--revisions_start)
    REVISIONS_START="$2"
    shift # past argument
    ;;
    -re|--revisions_end)
    REVISIONS_END="$2"
    shift # past argument
    ;;
    -bs|--batch_size)
    BATCH_SIZE="$2"
    shift # past argument
    ;;
    --default)
    DEFAULT=1
    ;;
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done

revisions_start="${REVISIONS_START}"
revisions_end="${REVISIONS_END}"
batch_size="${BATCH_SIZE}"

### Getting arguments without parameters

## revisions_start="$1"

## revisions_end="$2"

## batch_size="$3"

echo "git svn fetching revisions from $revisions_start to $revisions_end in bathes of $batch_size."

# let batch_size=batch_size-1

while [ $revisions_start -lt $revisions_end ];
do
 ### Executes git svn fetch -r1:11 etc.
    
    revisions_current_batch=revisions_start+batch_size;

    echo "Fetching revisions -r $revisions_start:$((revisions_current_batch))"
    ### echo git svn fetch -r$revisions_start:$((revisions_current_batch)) 

 ### Possible candidate for main command to run:
 ### git svn fetch -r$revisions_start:$((revisions_current_batch)) --username=<USERNAME> --authors-file=/PATH/TO/authors.txt --authors-prog=$(tmpMapFile="$TMPDIR/mapSvnUsersAutomatically.$$.sh" && echo -e '#!/bin/sh\necho $1" <"$1"@example.com>"' > $tmpMapFile && chmod +x $tmpMapFile && echo $tmpMapFile)

    git svn fetch -r$revisions_start:$((revisions_current_batch)) 

    let revisions_start=revisions_current_batch;
done

echo ".> End"

exit 0
```

```bash
########## Step3 Verify clone / fetch
```

```bash
### Run the following commands, to make sure all is ok

git svn fetch

git svn rebase
```

```bash
########## Step4 Connect to GitHub
```

```bash
### Create a repository in GitHub

### Add the remote repo as origin for branch master, using the following command

git remote add origin git@github.com:repo_namespace/some_repo_name.git
```

```bash
||| ########## Step5 git svn show-ignore
```

```bash
### Convert svn ignore to .gitignore

### Alternative, maybe better: git svn show-ignore -i trunk > .gitignore

git svn show-ignore > .gitignore
git add .gitignore
git commit -m 'Converting svn:ignore properties to .gitignore.'
git push -u origin master

### Note: If you want to push all the remote local branches, use this: git push -u origin master --all
```

```bash
||| ########## Step6 bidirectional sync
```

Bidirectional sync between GIT & SVN

Commit to GIT and sync with SVN:

- GIT codebase:

```bash
### make some changes to the codebase

git commit -m "Adding a some changes to codebase."

git push origin master

git svn dcommit

git svn fetch

git svn rebase

git rebase

git status
```

Output should be something like this:

```bash
exampleProjectName$ git svn dcommit
Committing to <https://some.example.repo.com/exampleProjectName/trunk> ...
 A .gitignore
Committed r1801248
 A .gitignore
r1801248 = 6bfd7124c247e2d632b385c8a774264581b04694 (refs/remotes/origin/trunk)
No changes between 128c23d445e4dd7b9838385d2292e3afa7e015b6 and refs/remotes/origin/trunk
Resetting to the latest refs/remotes/origin/trunk
exampleProjectName$
```

- SVN codebase:

`svn up`

Committing to SVN and syncing to GIT:

- SVN codebase:

```bash
# make some changes to codebase

svn commit -m "Edit .gitignore file."
```

- GIT codebase:

`git svn fetch`

```bash
### Output should be something like this

contentapi$ git svn fetch
M .gitignore
r1801251 = 634861178851262e5587c7e4408a86929cd32578 (refs/remotes/origin/trunk)
contentapi$
```

```bash
### If you get - "Updates were rejected because the tip of your current branch is behind", see

### <https://stackoverflow.com/questions/10298291/cannot-push-to-github-keeps-saying-need-merge>

### <https://github.com/k88hudson/git-flight-rules>

git branch --set-upstream-to=origin/master master

git pull origin master

git fetch

git svn fetch

git svn rebase

git add .

git commit -am "Svn to git sync 2017-01-30 (1)."

### A force push, so take care when using this operation

git push -f origin master
```

```bash
### Output for "git svn rebase" should be something like this

$ git svn rebase
First, rewinding head to replay your work on top of it...
Fast-forwarded master to refs/remotes/origin/trunk.
```

```bash
### Output for "git push -f origin master" should be something like this

$ git push -f origin master
Counting objects: 61, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (51/51), done.
Writing objects: 100% (61/61), 6.22 KiB | 0 bytes/s, done.
Total 61 (delta 38), reused 3 (delta 2)
remote: Resolving deltas: 100% (38/38), completed with 15 local objects.
To git@github.com:some/repo.git

+ 6ac9184...84e812a master -> master (forced update)
```

```bash
### Compare GITHUB master commits to latest SVN commits

svn log --limit 10
```

```bash
########## Step7 git svn branches
```

Example bash script if branch migration is necessary, although in a Continious Integration world I would imagine we don't need them:

```bash
git for-each-ref --format='%(refname)' refs/remotes/origin/ | while read branch_ref; do

    # Remove remote reference to get just the branch name.
    branch=${branch_ref#refs/remotes/origin/}
     
    # Remove "refs/" so you can target the remote branch.
    remote_branch=${branch_ref#refs/}
 
    # echo "branch: $branch"
    # echo "branch_ref: $branch_ref"
    # echo "remote_branch: $remote_branch"
 
    ########## Step 1
    # Checkout remote SVN branch
    # At this point you are in 'detached HEAD' state. You can look around, make experimental changes and commit them, and you can discard any commits you make in this state without impacting any branches by performing another checkout.
    #checkout -f --force When switching branches, proceed even if the index or the working tree differs from HEAD. This is used to throw away local changes. When checking out paths from the index, do not fail upon unmerged entries; instead, unmerged entries are ignored.
     
    git checkout -f $remote_branch
 
    ########## Step 2
    # To retain changes you want to create a new local GITHUB branch.
 
    git checkout -b $branch

    ########## Step 1 & 2 can be optimised in one command, please verify before using: git checkout $branch $remote_branch
 
    ########## Step 3
    # Make sure it's up to date with the remote SVN branch.
 
    git rebase $remote_branch
 
    ########## Step 4
    # Push it to GITHUB.
 
    git push origin $branch

done

echo ".> End"
```

|||github
|||jenkins
|||github jenkins
|||jenkins github

```bash
########## Github setup
```

```bash
### Grant access to the team
```

Make sure to give access to the repo, to everyone in the team Github account:

- Go to the repo in Github
- Go to "Settings"
- Go to "Collaborators & teams"
- Add "Example team" team
- Grant "Example team" team "Admin" rights

```bash
### Set up the Jenkins(GitHub plugin)
```

- Go to the repo in Github
- Go to "Settings"
- Go to "Integrations & services"
- Select "Add service"
- Choose "Jenkins (GitHub plugin)"
- Use the following as the webhook url: <https://example.jenkins.com/github-webhook/>

```bash
### Set up the deploy keys !!! Deploy key has to be unique and you can use only one per repo
```

Set up the public deploy key so that Jenkins is authenticated to communicate with the Github repo.

- Obtain a public key from the Jenkins Agents
- Go to the repo in Github
- Go to "Settings"
- Go to "Deploy keys"
- Select "Add deploy key"
- Give it some title, for example "example title of public key"
- Do not tick "Allow write access"
- Select "Add key"

```bash
### Jenkins was getting permission errors when trying to access the git repo
```

Can be solved by setting up a "Machine user" and adding it to the team in Github.
The "Machine user" will hold the public key from the jenkins agents and by being in the Github team, will have the same access permissions as the other team members, and therefore be able to access more then one repo, or all the repos that the team has access to.
<https://developer.github.com/guides/managing-deploy-keys/#machine-users>

```bash
########## Notes
```

<https://spectlog.com/content/Index_mismatch_error_git-svn>

```bash
## Problem
Running git svn fetch fails with the following output:
Index mismatch: fcfb430091b4d2f96ab7fa3679e047429aaa408e != 3d31a05d515fee423ea8c8678f53d75e7e7b2722
rereading 801b613f138d7e40910001115002dd98ee269fc1
        M       test/control/tests/test_util.py
...
        M       nel/mgt/defects_report/map.py
W: -empty_dir: C755A-ALL_47/branches/activities/C755A_32/C755A-1581/salt/salt/nel/orchestrate/stage_flag_files/dummy.sls
W: -empty_dir: C755A-ALL_47/branches/activities/C755A_32/C755A-1581/test/control/conf/jobs/init.conf
Complex regular subexpression recursion limit (32766) exceeded at /usr/share/perl5/vendor_perl/YAML/Loader.pm line 517, <$IN> line 1.
YAML Error: Can't parse double quoted string
   Code: YAML_PARSE_ERR_BAD_DOUBLE
   Line: 205
   Document: 1
 at /usr/share/perl5/vendor_perl/YAML/Loader.pm line 523.

Could not unmemoize function `check_cherry_pick', because it was not memoized to begin with at /usr/share/perl5/vendor_perl/Git/SVN.pm line 1639.
END failed--call queue aborted at /usr/libexec/git-core/git-svn line 49.

## Solution

Check latest revision from current branch:
 git log --all
For example, this commit log shows 7084 as last revision:

* commit 9f399f2a5a31b9bca636a00c8d8301e7f85e64d7 (refs/remotes/some_branch, refs/heads/some_branch)
| Author: email@example.com <email@1eb5e14e-113a-4dc5-8b51-65d29ca85466>
| Date:   Fri May 30 09:43:56 2014 +0000
|
|     Update initial revision in some script
|
|     git-svn-id: <http://example.com/svn/repo/branches/some_branch@7084> 1eb5e14e-113a-4dc5-8b51-65d29ca85466
Run this:
git svn reset -r 7084
git svn fetch
```

---
