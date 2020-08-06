# bash array 2 notes

Loop through an array of strings in Bash?

> References
> <https://stackoverflow.com/questions/8880603/loop-through-an-array-of-strings-in-bash>

You can use it like this:

    ## declare an array variable
    declare -a arr=("element1" "element2" "element3")

    ## now loop through the above array
    for i in "${arr[@]}"
    do
       echo "$i"
       # or do whatever with individual element of the array
    done

    # You can access them using echo "${arr[0]}", "${arr[1]}" also

Also works for multi-line array declaration

    declare -a arr=("element1" 
                    "element2" "element3"
                    "element4"
                    )

...

Note that the double quotes around "${arr[@]}" are really important. Without them, the for loop will break up the array by substrings separated by any spaces within the strings instead of by whole string elements within the array. ie: if you had declare -a arr=("element 1" "element 2" "element 3"), then for i in ${arr[@]} would mistakenly iterate 6 times since each string becomes 2 substrings separated by the space in the string, whereas for i in "${arr[@]}" would iterate 3 times, correctly, as desired, maintaining each string as a single unit despite having a space in it. – Gabriel Staples Jun 14 at 20:13 

---
---
---
