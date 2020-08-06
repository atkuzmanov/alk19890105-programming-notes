# bash array notes

> References
> <https://opensource.com/article/18/5/you-dont-know-bash-intro-bash-arrays>

```text
You don't know Bash: An introduction to Bash arrays
Enter the weird, wondrous world of Bash arrays.
31 May 2018 Robert Aboukhalil Feed 240up 11 comments
Hands programming
Image by : 
WOCinTech Chat. Modified by Opensource.com. CC BY-SA 4.0
x
Subscribe now
Get the highlights in your inbox every week.



Although software engineers regularly use the command line for many aspects of development, arrays are likely one of the more obscure features of the command line (although not as obscure as the regex operator =~). But obscurity and questionable syntax aside, Bash arrays can be very powerful.

Wait, but why?
Writing about Bash is challenging because it's remarkably easy for an article to devolve into a manual that focuses on syntax oddities. Rest assured, however, the intent of this article is to avoid having you RTFM.

A real (actually useful) example
To that end, let's consider a real-world scenario and how Bash can help: You are leading a new effort at your company to evaluate and optimize the runtime of your internal data pipeline. As a first step, you want to do a parameter sweep to evaluate how well the pipeline makes use of threads. For the sake of simplicity, we'll treat the pipeline as a compiled C++ black box where the only parameter we can tweak is the number of threads reserved for data processing: ./pipeline --threads 4.

The basics
Programming and development
Red Hat Developers Blog
Programming cheat sheets
Try for free: Red Hat Learning Subscription
New Python content
Our latest JavaScript articles
The first thing we'll do is define an array containing the values of the --threads parameter that we want to test:
allThreads=(1 2 4 8 16 32 64 128)
In this example, all the elements are numbers, but it need not be the case—arrays in Bash can contain both numbers and strings, e.g., myArray=(1 2 "three" 4 "five") is a valid expression. And just as with any other Bash variable, make sure to leave no spaces around the equal sign. Otherwise, Bash will treat the variable name as a program to execute, and the = as its first parameter!

Now that we've initialized the array, let's retrieve a few of its elements. You'll notice that simply doing echo $allThreads will output only the first element.

To understand why that is, let's take a step back and revisit how we usually output variables in Bash. Consider the following scenario:

type="article"
echo "Found 42 $type"
Say the variable $type is given to us as a singular noun and we want to add an s at the end of our sentence. We can't simply add an s to $type since that would turn it into a different variable, $types. And although we could utilize code contortions such as echo "Found 42 "$type"s", the best way to solve this problem is to use curly braces: echo "Found 42 ${type}s", which allows us to tell Bash where the name of a variable starts and ends (interestingly, this is the same syntax used in JavaScript/ES6 to inject variables and expressions in template literals).

So as it turns out, although Bash variables don't generally require curly brackets, they are required for arrays. In turn, this allows us to specify the index to access, e.g., echo ${allThreads[1]} returns the second element of the array. Not including brackets, e.g.,echo $allThreads[1], leads Bash to treat [1] as a string and output it as such.

Yes, Bash arrays have odd syntax, but at least they are zero-indexed, unlike some other languages (I'm looking at you, R).

Looping through arrays
Although in the examples above we used integer indices in our arrays, let's consider two occasions when that won't be the case: First, if we wanted the $i-th element of the array, where $i is a variable containing the index of interest, we can retrieve that element using: echo ${allThreads[$i]}. Second, to output all the elements of an array, we replace the numeric index with the @ symbol (you can think of @ as standing for all): echo ${allThreads[@]}.

Looping through array elements
With that in mind, let's loop through $allThreads and launch the pipeline for each value of --threads:

for t in ${allThreads[@]}; do
  ./pipeline --threads $t
done
Looping through array indices
Next, let's consider a slightly different approach. Rather than looping over array elements, we can loop over array indices:

for i in ${!allThreads[@]}; do
  ./pipeline --threads ${allThreads[$i]}
done
Let's break that down: As we saw above, ${allThreads[@]} represents all the elements in our array. Adding an exclamation mark to make it ${!allThreads[@]} will return the list of all array indices (in our case 0 to 7). In other words, the for loop is looping through all indices $i and reading the $i-th element from $allThreads to set the value of the --threads parameter.

This is much harsher on the eyes, so you may be wondering why I bother introducing it in the first place. That's because there are times where you need to know both the index and the value within a loop, e.g., if you want to ignore the first element of an array, using indices saves you from creating an additional variable that you then increment inside the loop.

Populating arrays
So far, we've been able to launch the pipeline for each --threads of interest. Now, let's assume the output to our pipeline is the runtime in seconds. We would like to capture that output at each iteration and save it in another array so we can do various manipulations with it at the end.

Some useful syntax
But before diving into the code, we need to introduce some more syntax. First, we need to be able to retrieve the output of a Bash command. To do so, use the following syntax: output=$( ./my_script.sh ), which will store the output of our commands into the variable $output.

The second bit of syntax we need is how to append the value we just retrieved to an array. The syntax to do that will look familiar:

myArray+=( "newElement1" "newElement2" )
The parameter sweep
Putting everything together, here is our script for launching our parameter sweep:

allThreads=(1 2 4 8 16 32 64 128)
allRuntimes=()
for t in ${allThreads[@]}; do
  runtime=$(./pipeline --threads $t)
  allRuntimes+=( $runtime )
done
And voilà!

What else you got?
In this article, we covered the scenario of using arrays for parameter sweeps. But I promise there are more reasons to use Bash arrays—here are two more examples.

Log alerting
In this scenario, your app is divided into modules, each with its own log file. We can write a cron job script to email the right person when there are signs of trouble in certain modules:

# List of logs and who should be notified of issues
logPaths=("api.log" "auth.log" "jenkins.log" "data.log")
logEmails=("jay@email" "emma@email" "jon@email" "sophia@email")

# Look for signs of trouble in each log
for i in ${!logPaths[@]};
do
  log=${logPaths[$i]}
  stakeholder=${logEmails[$i]}
  numErrors=$( tail -n 100 "$log" | grep "ERROR" | wc -l )

  # Warn stakeholders if recently saw > 5 errors
  if [[ "$numErrors" -gt 5 ]];
  then
    emailRecipient="$stakeholder"
    emailSubject="WARNING: ${log} showing unusual levels of errors"
    emailBody="${numErrors} errors found in log ${log}"
    echo "$emailBody" | mailx -s "$emailSubject" "$emailRecipient"
  fi
done
API queries
Say you want to generate some analytics about which users comment the most on your Medium posts. Since we don't have direct database access, SQL is out of the question, but we can use APIs!

To avoid getting into a long discussion about API authentication and tokens, we'll instead use JSONPlaceholder, a public-facing API testing service, as our endpoint. Once we query each post and retrieve the emails of everyone who commented, we can append those emails to our results array:

endpoint="https://jsonplaceholder.typicode.com/comments"
allEmails=()

# Query first 10 posts
for postId in {1..10};
do
  # Make API call to fetch emails of this posts's commenters
  response=$(curl "${endpoint}?postId=${postId}")

  # Use jq to parse the JSON response into an array
  allEmails+=( $( jq '.[].email' <<< "$response" ) )
done
Note here that I'm using the jq tool to parse JSON from the command line. The syntax of jq is beyond the scope of this article, but I highly recommend you look into it.

As you might imagine, there are countless other scenarios in which using Bash arrays can help, and I hope the examples outlined in this article have given you some food for thought. If you have other examples to share from your own work, please leave a comment below.

But wait, there's more!
Since we covered quite a bit of array syntax in this article, here's a summary of what we covered, along with some more advanced tricks we did not cover:

Syntax	Result
arr=()	Create an empty array
arr=(1 2 3)	Initialize array
${arr[2]}	Retrieve third element
${arr[@]}	Retrieve all elements
${!arr[@]}	Retrieve array indices
${#arr[@]}	Calculate array size
arr[0]=3	Overwrite 1st element
arr+=(4)	Append value(s)
str=$(ls)	Save ls output as a string
arr=( $(ls) )	Save ls output as an array of files
${arr[@]:s:n}	Retrieve n elements starting at index s
One last thought
As we've discovered, Bash arrays sure have strange syntax, but I hope this article convinced you that they are extremely powerful. Once you get the hang of the syntax, you'll find yourself using Bash arrays quite often.

Bash or Python?
Which begs the question: When should you use Bash arrays instead of other scripting languages such as Python?

To me, it all boils down to dependencies—if you can solve the problem at hand using only calls to command-line tools, you might as well use Bash. But for times when your script is part of a larger Python project, you might as well use Python.

For example, we could have turned to Python to implement the parameter sweep, but we would have ended up just writing a wrapper around Bash:

import subprocess

all_threads = [1, 2, 4, 8, 16, 32, 64, 128]
all_runtimes = []

# Launch pipeline on each number of threads
for t in all_threads:
  cmd = './pipeline --threads {}'.format(t)

  # Use the subprocess module to fetch the return output
  p = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
  output = p.communicate()[0]
  all_runtimes.append(output)
Since there's no getting around the command line in this example, using Bash directly is preferable.

Time for a shameless plug
If you enjoyed this article, there's more where that came from! Register here to attend OSCON, where I'll be presenting the live-coding workshop You Don't Know Bash on July 17, 2018. No slides, no clickers—just you and me typing away at the command line, exploring the wondrous world of Bash.

This article originally appeared on Medium and is republished with permission.


About the authorRobert Aboukhalil - Robert is a Bioinformatics Software Engineer at Invitae, which means that he spends his time... engineering software for bioinformatics purposes. Specifically, he develops cloud applications to enable the interactive analysis and exploration of genomics data. Robert has a Ph.D. in Bioinformatics from CSHL and a Bachelor in Computer Engineering from McGill.
More about me
```

===

> References
> <https://medium.com/@robaboukhalil/the-weird-wondrous-world-of-bash-arrays-a86e5adf2c69>

```text
The weird, wondrous world of Bash arrays
We all know arrays are useful, but how are they useful on the command line?
Robert Aboukhalil
Robert Aboukhalil
Follow
May 9, 2018 · 8 min read



Although software engineers regularly use the command line for many aspects of development, arrays are likely one of the more obscure features of the command line (although not as obscure as the regex operator =~). But obscurity and questionable syntax aside, Bash arrays can be very powerful.
Wait, but why?
Writing about Bash is challenging because it’s remarkably easy for an article to devolve into a manual that focuses on syntax oddities. Rest assured, however: the intent of this article is to avoid having you RTFM.
A real (and actually useful) example
To that end, let’s consider a real-world scenario and how Bash can help: You take on a new project at your company to evaluate and optimize the runtime of your internal data pipeline. As a first step, you want to do a parameter sweep to evaluate how well the pipeline makes use of threads. For the sake of simplicity, we’ll treat the pipeline as a compiled C++ black box where the only parameter we can tweak is the number of threads reserved for data processing: ./pipeline --threads 4.
The Basics
Initializing an array
The first thing we’ll do is define an array containing the values of the --threads parameter that we want to test:
allThreads=(1 2 4 8 16 32 64 128)
In this example, all the elements are numbers, but it need not be the case — arrays in Bash can contain both numbers and strings, e.g. myArray=(1 2 "three" 4 "five") is a valid expression. And just as with any other Bash variable, make sure to leave no spaces around the equal sign. Otherwise, Bash will treat the variable name as a program to execute, and the = as it’s first parameter!
Accessing array elements
Now that we’ve initialized the array, let’s retrieve a few of its elements. You’ll notice that simply doing echo $allThreads will only output the first element.
To understand why that is, let’s take a step back and revisit how we usually output variables in Bash. Consider the following scenario:
type="article"
echo "Found 42 $type"
Say the variable $type is given to us as a singular noun and we want to add an s at the end of our sentence. We can’t simply add an s to $type since that would turn it into a different variable $types. Although we could use code contortions such as echo "Found 42" $type "s", the best way to solve this problem is to use curly braces: echo "Found 42 ${type}s", which allows us to tell Bash where the name of a variable starts and ends (interestingly, this is the same syntax used in JavaScript (ES6) to inject variables and expressions in template literals).
So as it turns out, although Bash variables don’t generally require curly brackets, they are required for arrays. In turn, this allows us to specify the index to access, e.g. echo ${allThreads[1]} returns the second element of the array. Not including brackets, e.g. echo $allThreads[1], leads Bash to treat [1] as a string and output it as such.
Yes, Bash arrays have odd syntax, but at least they are zero-indexed, unlike some other languages (I’m looking at you, R).
Image for post
It’s not a real Medium post without a large, unrelated image — Photo by Goran Ivos on Unsplash.
Looping through arrays
Although in the examples above, we used integer indices in our arrays, let’s consider two occasions in which that won’t be the case: First, if we wanted the $i-th element of the array, where $i is a variable containing the index of interest, we can retrieve that element using echo ${allThreads[$i]}. Second, to output all the elements of an array separated by spaces, we replace the numeric index with the @ symbol (you can think of the @ as standing for all): echo ${allThreads[@]}.
Looping through array elements
With that in mind, let’s loop through $allThreads and launch the pipeline for each value of --threads:
for t in ${allThreads[@]}; do
 ./pipeline --threads $t
done
Looping through array indices
Next, let’s consider a slightly different approach. Rather than looping over array elements, we can loop over array indices:
for i in ${!allThreads[@]}; do
  ./pipeline --threads ${allThreads[$i]}
done
Let’s break that down: As we saw above, ${allThreads[@]} represents all the elements in our array. Adding an exclamation mark to make it ${!allThreads[@]} will return the list of all array indices (in our case 0 to 7). In other words, the for loop is looping through all indices $i and reading the $i-th element from $allThreads to set the value of the --threads parameter.
This is much harsher on the eyes so you may be wondering why I bother introducing it in the first place. That’s because there are times where you need to know both the index and the value within a loop, e.g. if you want to ignore the first element of an array, using indices saves you from creating an additional variable that you then increment inside the loop.
Populating Arrays
So far, we’ve been able to launch the pipeline for each --threads of interest. Now, let’s assume the output to our pipeline is the runtime in seconds. We would like to capture that output at each iteration and save it in another array so we can do various manipulations with it at the end.
Some useful syntax
But before diving into the code, we need to introduce some more syntax. First, we need to be able to retrieve the output of a Bash command. To do so, use the following syntax: output=$( ./my_script.sh ), which will store the output of my_script.sh into the variable $output.
The second bit of syntax we need is how to append the value we just retrieved to an array. The syntax to do that will look familiar: myArray+=( "myVal" ).
The parameter sweep
Putting everything together, here is our script for launching our parameter sweep:
allThreads=(1 2 4 8 16 32 64 128)
allRuntimes=()
for t in ${allThreads[@]}; do
  runtime=$(./pipeline --threads $t)
  allRuntimes+=( $runtime )
done
echo ${allRuntimes[@]}
And voilà!
Time for a shameless plug
Image for post
Check out my book for more on the wondrous world of Bash
If you enjoyed this article so far, there’s more where that came from. Check out my book Adventures in Data Science with Bash, an introduction to the world of data science through Bash, where you learn how to use command line tools to answer questions like “How much does a NYC cab driver make in tips?”, and “Do Chipotle customers prefer chicken or steak burritos?” (life-changing data analysis, I know).
What else you got?
In this article, we covered the scenario of using arrays for parameter sweeps. But I promise there are more reasons to use Bash arrays — here are two more examples.
Log alerting
In this scenario, your app is divided into modules, each with its own server logs. We can write a cron job script to email the right person when there are signs of trouble in certain modules:
# List of logs and who should be notified of issues
logPaths=("api.log" "auth.log" "jenkins.log" "data.log")
logEmails=("jay@email" "emma@email" "jon@email" "sophia@email")
# Loop through each log
for i in ${!logPaths[@]};
do
  log=${logPaths[$i]}
  stakeholder=${logEmails[$i]}
  # Look for signs of trouble in this log
  numErrors=$( tail -n 100 "$log" | grep "ERROR" | wc -l )
  # Warn stakeholders if recently saw > 5 errors
  if [[ "$numErrors" -gt 5 ]];
  then
    emailRecipient="$stakeholder"
    emailSubject="WARNING: ${log} showing unusual levels of errors"
    emailBody="${numErrors} errors found in log ${log}"
    echo "$emailBody" | mailx -s "$emailSubject" "$emailRecipient"
  fi
done
API queries
Say you want to generate some analytics about which users comment the most on your Medium posts. Since we don’t have direct database access, SQL is out of question, but we can still use APIs!
To avoid getting into a long discussion about API authentication and tokens, we’ll use JSONPlaceholder instead, a public-facing API testing service as our endpoint. Once we query each post and retrieve the emails of everyone who commented, we can append those emails to our results array:
endpoint="https://jsonplaceholder.typicode.com/comments"
allEmails=()
# Query first 10 posts
for postId in {1..10};
do
  # Make API call to fetch info about this post
  response=$(curl "${endpoint}?postId=${postId}")
  # Use jq to parse the emails and append them to an array
  allEmails+=( $( jq '.[].email' <<< "$response" ) )
done
Note here that I’m using the jq tool to parse JSON from the command line. The syntax of jq is beyond the scope of this article but I highly recommend you look into it.
As you might imagine, there are countless other scenarios in which using Bash arrays can help, and I hope the examples outlined in this article have given you some food for thought. If you have other examples to share from your own work, do leave a comment below.
But wait, there’s more!
A cheat sheet
Since we covered quite a bit of array syntax, here’s a summary of what we discussed, along with some more advanced tricks we did not cover:
╔═════════════════╦════════════════════════════════════════╗
║ Syntax          ║ Result                                 ║
╠═════════════════╬════════════════════════════════════════╣
║ arr=()          ║ Create empty array                     ║
║ arr=(1 2 3)     ║ Initialize array                       ║
║ ${arr[2]}       ║ Retrieve third element                 ║
║ ${arr[@]}       ║ Retrieve all elements                  ║
║ ${!arr[@]}      ║ Retrieve array indices                 ║
║ ${#arr[@]}      ║ Calculate array size                   ║
║ arr[0]=3        ║ Overwrite 1st element                  ║
║ arr+=(4)        ║ Append value(s)                        ║
║ str=$(ls)       ║ Save ls output as string               ║
║ arr=( $(ls) )   ║ Save ls output as array of files       ║
║ ${arr[@]:s:n}   ║ Elements at indices n to s+n           ║
║ ${str//ab/c}    ║ For a given string, replace ab with c  ║
║ ${arr[@]//ab/c} ║ For each array item, replace ab with c ║
╚═════════════════╩════════════════════════════════════════╝
Where can I learn more?
Another interesting topic that wasn’t covered in this article is that of associative arrays (where indices can be strings, not just integers). Believe it or not, you can in fact do that on the command line. There are generally two approaches:
Bash v4 and higher support associative arrays, which are also very useful. However, despite the fact that v4 was released almost a decade ago, there are still computers that don’t have the latest version of Bash. For example, most Mac OS X installations (even recent ones) generally come pre-installed with Bash 3.2. To see which version of Bash you have, type bash --versionin your terminal.
Another command-line tool that supports associative arrays is awk. If you haven’t used awk before, I highly recommend you give it a try. It’s both a great tool for one-liners, and a full-fledged programming language (did you know, for example, that you can read and write files using awk?).
One last thought
As we’ve discovered, Bash arrays sure have strange syntax, but I hope this article convinced you that they are extremely powerful. Once you get the hang of it, you’ll find yourself using Bash arrays quite often.
Bash or Python?
Which begs the question: when should you use Bash arrays instead of other scripting languages such as Python?
To me, it all boils down to dependencies — if you can solve the problem at hand using only calls to command-line tools, you might as well use Bash. But for times when your script is part of a larger Python project, you might as well use Python.
For example, we could have turned to Python to implement the parameter sweep, but we would have ended up just writing a wrapper around Bash:
import subprocess
all_threads = [1, 2, 4, 8, 16, 32, 64, 128]
all_runtimes = []
# Launch pipeline on each number of threads
for t in all_threads:
  cmd = './pipeline --threads {}'.format(t)
  # Use the subprocess module to fetch the return output
  p = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
  output = p.communicate()[0]  # wat
  all_runtimes.append(output)
Since there’s no getting around the command line in this example, using Bash directly is preferable.


WRITTEN BY

Robert Aboukhalil
Follow
Bioinformatics Software Engineer at Invitae, Author of “Level up with WebAssembly”.
```

---
---
---
