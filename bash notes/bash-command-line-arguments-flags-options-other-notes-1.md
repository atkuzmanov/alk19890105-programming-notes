# bash command line arguments flags options other 1

||| bash command line arguments
||| bash flags
||| bash options

> References
>
> <https://www.devdungeon.com/content/taking-command-line-arguments-bash>

```bash
Pass arguments through to another program
Bash scripts are often used as wrappers to launch another application. A common task is to pass the command line arguments from the script to the program being loaded. Here is an example of passing all the arguments provided as-is.

#!/bin/bash
# print_args.sh
echo "You provided the arguments:" "$@"

# You could pass all arguments to another program like this
# myProgram "$@"
Ensure the script has the executable permission, and run it with a few arguments passed.

chmod +x print_args.sh
./print_args.sh 1 2 3
Get the number of arguments passed
The number of arguments passed is stored in the $# variable.

#!/bin/bash
echo "You provided $# arguments"
Accessing a specific argument by index
You can access a specific argument by its index like this:

#!/bin/bash
echo "Arg 0: $0"
echo "Arg 1: $1"
echo "Arg 2: $2"
Argument 0 is the name of the script being invoked itself.

Iterating through each argument
This example shows how to iterate through each argument one-by-one, and print out the value.

#!/bin/bash
for arg in "$@"
do
    echo "$arg"
done
Check arguments for specific value
If you wanted to iterate through each argument and check if one equals a specific value, you can do that with the following:

#!/bin/bash
for arg in "$@"
do
    if [ "$arg" == "--help" ] || [ "$arg" == "-h" ]
    then
        echo "Help argument detected."
    fi
done
Then try running that while passing it a -h or --help flag.

Conclusion
Did you notice a trend in the variables? All of the command line argument variables started with a dollar sign $.

# All arguments
$@

# Number of arguments
$#

# Specific arguments
$0
$1
$2
With this knowledge, you should be able to work with the command line arguments provided to a bash script.
```

===

||| bash command line arguments
||| bash flags
||| bash options

> References
>
> <https://www.lifewire.com/pass-arguments-to-bash-script-2200571>

```bash
Example of Passing Arguments in a Bash Script
If you developed a script called stats.sh that counts the words in a file, it's best to pass the file name as an argument so that the same script can be used for all the files that will be processed. For example, if the name of the file to be processed is songlist.txt, enter the following at the command line:

sh stats.sh songlist.txt


Arguments are accessed inside a script using the variables $1, $2, $3, and so on. The variable $1 refers to the first argument, $2 to the second argument, and $3 to the third argument. For example, in the script:

FILE1=$1
wc $FILE1


Assign a variable with a descriptive name to the value of the first argument ($1), and then call the word count utility (WC) on the variable $FILE1.

If you require a variable number of arguments, use the $@ variable, which is an array of all the input parameters. This procedure uses a for loop to iteratively process each one, as illustrated in the following example:

for FILE1 in "$@"
do
wc $FILE1
done


Here's an example of how to call this script with arguments from the command line:

sh stats.sh songlist1 songlist2 songlist3


If an argument includes spaces, enclose it with single quotes. For example:

sh stats.sh 'songlist 1' 'songlist 2' 'songlist 3'


Flags Method
Frequently a script is written so that arguments can be passed in any order using flags. With the flags method, some of the arguments can be made optional.

For example, write a script that retrieves information from a database based on specified parameters, such as username, date, and product, and generates a report in a specified format. The script needs to be written in such a way so that these parameters are passed when the script is called. It might look like this:

makereport -u jsmith -p notebooks -d 10-20-2011 -f pdf


Bash enables this functionality with the getopts function. For the above example, use getopts as follows:

while getopts u:d:p:f: option
do
case "${option}"
in
u) USER=${OPTARG};;
d) DATE=${OPTARG};;
p) PRODUCT=${OPTARG};;
f) FORMAT=${OPTARG};;
esac
done


This is a while loop that uses the getopts function and a so-called optstring—in this case u:d:p:f:—to iterate through the arguments. The while loop walks through the optstring, which contains the flags that are used to pass arguments, and assigns the argument value provided for that flag to the variable option. The case statement then assigns the value of the variable option to a global variable that is used after all the arguments have been read.

Meanings for Colons
The colons in the optstring mean that values are required for the corresponding flags. In the above example of u:d:p:f:, all flags are followed by a colon. This means all flags need a value. If, for example, the d and f flags were not expected to have a value, u:dp:f would be the optstring.

A colon at the beginning of the optstring (for example, :u:d:p:f:) has a completely different meaning. It handles flags that are not represented in the optstring. In that case, the value of the option variable is set to ? and the value of OPTARG is set to the unexpected flag. This behavior displays a suitable error message informing you of the mistake.

Arguments that are not preceded by a flag are ignored by getopts. If flags specified in the optstring are not provided when the script is called then nothing happens, unless you specially handle this case in your code. Any arguments not handled by getops can still be captured with the regular $1, $2, and $3 variables.
```

===

||| bash command line arguments
||| bash flags
||| bash options

> References
>
> <https://www.baeldung.com/linux/use-command-line-arguments-in-bash-script>

```bash
2.1. Positional Parameters
Arguments passed to a script are processed in the same order in which they’re sent. The indexing of the arguments starts at one, and the first argument can be accessed inside the script using $1. Similarly, the second argument can be accessed using $2, and so on. The positional parameter refers to this representation of the arguments using their position.

Let’s take an example of the following script, userReg-positional-parameter.sh, which prints username, age, and full name, in that order:

echo "Username: $1";
echo "Age: $2";
echo "Full Name: $3";
Now, let’s run this script with the three input parameters:

sh userReg-positional-parameter.sh john 25 'John Smith'
The output will be:

Username : john
Age: 25
Full Name: John Smith
2.2. Flags
Using flags is a common way of passing input to a script. When passing input to the script, there’s a flag (usually a single letter) starting with a hyphen (-) before each argument.

Let’s take a look at the userReg-flags.sh script, which takes three arguments: username (-u), age (-a), and full name (-f).

We’ll modify the earlier script to use flags instead of relying on positional parameters. The getopts function reads the flags in the input, and OPTARG refers to the corresponding values:

while getopts u:a:f: flag
do
    case "${flag}" in
        u) username=${OPTARG};;
        a) age=${OPTARG};;
        f) fullname=${OPTARG};;
    esac
done
echo "Username: $username";
echo "Age: $age";
echo "Full Name: $fullname";
Let’s run this script with the same input as before, only this time, we’ll add flags to the input:

sh userReg-flags.sh -f 'John Smith' -a 25 -u john
The output is the same as before, though we have shifted the positions of the username and full name arguments:

Username : john
Age: 25
Full Name: John Smith
Here, we’re using the getopts function to parse the flags provided as input and the case block to assign the value specified to the corresponding variable.

2.3. Loop Construct
Positional parameters, while convenient in many cases, can’t be used when the input size is unknown. The use of a loop construct comes in handy in these situations.

The variable $@ is the array of all the input parameters. Using this variable within a for loop, we can iterate over the input and process all the arguments passed.

Let’s take an example of the script users-loop.sh, which prints all the usernames that have been passed as input:

i=1;
for user in "$@" 
do
    echo "Username - $i: $user";
    i=$((i + 1));
done
Now, let’s run the script:

sh users-loop.sh john matt bill 'joe wicks' carol
And we’ll see our output:

Username - 1: john
Username - 2: matt
Username - 3: bill
Username - 4: joe wicks
Username - 5: carol
In the above example, we’re iterating the user variable over the entire array of input parameters. This iteration starts at the first input argument, john, and runs until the last argument, carol, though the size of the input is unknown.

2.4. Shift Operator
Shift operator in bash (syntactically shift n, where n is the number of positions to move) shifts the position of the command line arguments. The default value for n is one if not specified.

The shift operator causes the indexing of the input to start from the shifted position. In other words, when this operator is used on an array input, the positional parameter $1 changes to the argument reached by shifting n positions to the right from the current argument bound to positional parameter $1.

Consider an example script that determines whether the input is odd or even:

sh parityCheck.sh 13 18 27 35 44 52 61 79 93
From the above discussion on the positional parameter, we now know that $1  refers to the first argument, which is 13. Using the shift operator with input 1 (shift 1) causes the indexing to start from the second argument. That is, $1 now refers to the second argument (18). Similarly, calling shift 2 will then cause the indexing to start from the fourth argument (35).

Let’s again take a look at the example of users script discussed above. Instead of using the $@ variable and iterating over it, we’ll now use the shift operator. The $# variable returns the input size:

i=1;
j=$#;
while [ $i -le $j ] 
do
    echo "Username - $i: $1";
    i=$((i + 1));
    shift 1;
done
Let’s run the script with the same input as above:

sh users-shift-operator.sh john matt bill 'joe wicks' carol
The output will be the same as before:

Username - 1: john
Username - 2: matt
Username - 3: bill
Username - 4: joe wicks
Username - 5: carol
In this example, we’re shifting the positional parameter in each iteration by one until we reach the end of the input. Therefore, $1 refers to the next element in the input each time.
```

===

||| bash command line arguments
||| bash flags
||| bash options

> References
>
> <http://linuxcommand.org/lc3_wss0120.php>

```bash
Adding Interactive Mode
The interactive mode is implemented with the following code:

if [ "$interactive" = "1" ]; then

    response=

    echo -n "Enter name of output file [$filename] > "
    read response
    if [ -n "$response" ]; then
        filename=$response
    fi

    if [ -f $filename ]; then
        echo -n "Output file exists. Overwrite? (y/n) > "
        read response
        if [ "$response" != "y" ]; then
            echo "Exiting program."
            exit 1
        fi
    fi
fi

First, we check if the interactive mode is on, otherwise we don't have anything to do. Next, we ask the user for the file name. Notice the way the prompt is worded:

echo -n "Enter name of output file [$filename] > "

We display the current value of filename since, the way this routine is coded, if the user just presses the enter key, the default value of filename will be used. This is accomplished in the next two lines where the value of response is checked. If response is not empty, then filename is assigned the value of response. Otherwise, filename is left unchanged, preserving its default value.

After we have the name of the output file, we check if it already exists. If it does, we prompt the user. If the user response is not "y," we give up and exit, otherwise we can proceed.
```

---
