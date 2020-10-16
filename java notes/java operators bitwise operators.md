# java operators

|||java operators |||java bitwise operators |||operators

---

What does “|=” mean? (pipe equal operator)

> References
> <https://stackoverflow.com/questions/14295469/what-does-mean-pipe-equal-operator#:~:text=%3E%3E%3E%20is%20bitwise%20operator%20in,Additionally%2C%20!>

You have already got sufficient answer for your question. But may be my answer help you more about `|=` kind of binary operators.    
 
I am writing table for [bitwise operators][1]:  
Following are valid:  

    ----------------------------------------------------------------------------------------
    Operator   Description	                                 Example
    ----------------------------------------------------------------------------------------
    |=	      bitwise inclusive OR and assignment operator   C |= 2 is same as C = C | 2
    ^=	      bitwise exclusive OR and assignment operator   C ^= 2 is same as C = C ^ 2
    &=	      Bitwise AND assignment operator	             C &= 2 is same as C = C & 2
    <<=	      Left shift AND assignment operator	         C <<= 2 is same as C = C << 2
    >>=	      Right shift AND assignment operator	         C >>= 2 is same as C = C >> 2  
    ----------------------------------------------------------------------------------------

note all operators are binary operators.    

Also **Note:** <sub>*(for below points I wanted to add my answer)*</sub>  

*  `>>>` is bitwise operator in Java that is called **Unsigned shift**   
    <del>but  `>>>=` not an operator in Java.</del> [>>>= operator][2]  
   
*   `~` is bitwise complement bits, ` 0 to 1 and 1 to 0` (Unary operator) but `~=` not an operator.  

*   Additionally,  `!` Called Logical NOT Operator, but `!=` Checks if the value of two operands are equal or not, if values are not equal then condition becomes true. e.g. `(A != B) is true`. where as `A=!B` means if `B` is `true` then `A` become `false` (and if `B` is `false` then `A` become `true`).  


<sub>side note: *`|` is not called pipe, instead its called OR, pipe is shell terminology transfer one process out to next..*</sub> 


  [1]: http://www.tutorialspoint.com/java/java_basic_operators.htm
  [2]: http://bmanolov.free.fr/javaoperators.php

---

Java - Basic Operators

> References
> <https://www.tutorialspoint.com/java/java_basic_operators.htm>

---

Java Operators

> References
> <https://www.w3schools.com/java/java_operators.asp>

---
