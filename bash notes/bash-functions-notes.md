# bash functions notes

Returning Values from Bash Functions

> References
> <https://www.linuxjournal.com/content/return-values-bash-functions>

```text
Bash functions, unlike functions in most programming languages do not allow you to return a value to the caller. When a bash function ends its return value is its status: zero for success, non-zero for failure. To return values, you can set a global variable with the result, or use command substitution, or you can pass in the name of a variable to use as the result variable. The examples below describe these different mechanisms.

Although bash has a return statement, the only thing you can specify with it is the function's status, which is a numeric value like the value specified in an exit statement. The status value is stored in the $? variable. If a function does not contain a return statement, its status is set based on the status of the last statement executed in the function. To actually return arbitrary values to the caller you must use other mechanisms.

The simplest way to return a value from a bash function is to just set a global variable to the result. Since all variables in bash are global by default this is easy:

function myfunc()
{
    myresult='some value'
}

myfunc
echo $myresult
The code above sets the global variable myresult to the function result. Reasonably simple, but as we all know, using global variables, particularly in large programs, can lead to difficult to find bugs.

A better approach is to use local variables in your functions. The problem then becomes how do you get the result to the caller. One mechanism is to use command substitution:

function myfunc()
{
    local  myresult='some value'
    echo "$myresult"
}

result=$(myfunc)   # or result=`myfunc`
echo $result
Here the result is output to the stdout and the caller uses command substitution to capture the value in a variable. The variable can then be used as needed.

The other way to return a value is to write your function so that it accepts a variable name as part of its command line and then set that variable to the result of the function:

function myfunc()
{
    local  __resultvar=$1
    local  myresult='some value'
    eval $__resultvar="'$myresult'"
}

myfunc result
echo $result
Since we have the name of the variable to set stored in a variable, we can't set the variable directly, we have to use eval to actually do the setting. The eval statement basically tells bash to interpret the line twice, the first interpretation above results in the string result='some value' which is then interpreted once more and ends up setting the caller's variable.

When you store the name of the variable passed on the command line, make sure you store it in a local variable with a name that won't be (unlikely to be) used by the caller (which is why I used __resultvar rather than just resultvar). If you don't, and the caller happens to choose the same name for their result variable as you use for storing the name, the result variable will not get set. For example, the following does not work:

function myfunc()
{
    local  result=$1
    local  myresult='some value'
    eval $result="'$myresult'"
}

myfunc result
echo $result
The reason it doesn't work is because when eval does the second interpretation and evaluates result='some value', result is now a local variable in the function, and so it gets set rather than setting the caller's result variable.

For more flexibility, you may want to write your functions so that they combine both result variables and command substitution:

function myfunc()
{
    local  __resultvar=$1
    local  myresult='some value'
    if [[ "$__resultvar" ]]; then
        eval $__resultvar="'$myresult'"
    else
        echo "$myresult"
    fi
}

myfunc result
echo $result
result2=$(myfunc)
echo $result2
Here, if no variable name is passed to the function, the value is output to the standard output.
```

---
