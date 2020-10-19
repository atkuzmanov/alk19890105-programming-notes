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

Java Bitwise Operators

> References
> <https://www.baeldung.com/java-bitwise-operators>

---

Java Operator Precedence Table

> References
> <http://www.cs.bilkent.edu.tr/~guvenir/courses/CS101/op_precedence.html>

<h2><font color="navy">Java Operator Precedence Table</font></h2>
<table border="1" cellspacing="1" cellpadding="2">
<tbody><tr><th>Precedence</th><th>Operator</th><th>Type</th><th>Associativity</th></tr>
<tr>
  <td align="center">15</td>
  <td align="center">()<br>[]<br>·</td>
  <td>Parentheses<br>Array subscript<br>Member selection<br></td>
  <td align="center">Left to Right<p></p></td>
</tr>
<tr>
  <td align="center">14</td>
  <td align="center">++<br>--</td>
  <td>Unary post-increment<br>Unary post-decrement</td>
  <td align="center">Right to left</td>
</tr>
 <tr>
  <td align="center">13</td>
  <td align="center">++<br>--<br>+<br>-<br>!<br>~<br>( <i>type</i> )</td>
  <td>Unary pre-increment<br>Unary pre-decrement<br>Unary plus<br>Unary minus<br>Unary logical negation<br>Unary bitwise complement<br>Unary type cast</td>
  <td align="center">Right to left</td>
</tr>
<tr>
  <td align="center">12</td>
  <td align="center"> * <br> / <br> % </td>
  <td>Multiplication<br>Division<br>Modulus</td>
  <td align="center">Left to right</td>
</tr>
<tr>
  <td align="center">11</td>
  <td align="center">+<br>-<o:p></o:p></td>
  <td>Addition<br>Subtraction</td>
  <td align="center">Left to right</td>
</tr>
<tr>
  <td align="center">10</td>
  <td align="center">&lt;&lt;<br>&gt;&gt;<br>&gt;&gt;&gt;</td>
  <td>Bitwise left shift<br>Bitwise right shift with sign extension<br>Bitwise right shift with zero extension</td>
  <td align="center">Left to right</td>
</tr>
<tr>
  <td align="center">9</td>
  <td align="center">&lt;<br>&lt;=<br>&gt;<br>&gt;=<br>instanceof</td>
  <td>Relational less than<br>Relational less than or equal<br>Relational greater than<br>Relational greater than or equal<br>Type comparison (objects only)</td>
  <td align="center">Left to right</td>
</tr>
<tr>
  <td align="center">8</td>
  <td align="center">==<br>!=</td>
  <td>Relational is equal to<br>Relational is not equal to</td>
  <td align="center">Left to right</td>
</tr>
 <tr>
  <td align="center">7</td>
  <td align="center">&amp;</td>
  <td>Bitwise AND</td>
  <td align="center">Left to right</td>
</tr>
 <tr>
  <td align="center">6</td>
  <td align="center">^</td>
  <td>Bitwise exclusive OR</td>
  <td align="center">Left to right</td>
</tr>
<tr>
  <td align="center">5</td>
  <td align="center">|</td>
  <td>Bitwise inclusive OR</td>
  <td align="center">Left to right</td>
</tr>
<tr>
  <td align="center">4</td>
  <td align="center">&amp;&amp;</td>
  <td>Logical AND<p></p>
  </td>
  <td align="center">Left to right</td>
</tr>
 <tr>
  <td align="center">3</td>
  <td align="center">||</td>
  <td>Logical OR</td>
  <td align="center">Left to right</td>
</tr>
<tr>
  <td align="center">2</td>
  <td align="center">? :</td>
  <td>Ternary conditional</td>
  <td align="center">Right to left</td>
</tr>
<tr>
  <td align="center">1</td>
  <td align="center">=<br>+=<br>-=<br>*=<br>/=<br>%=</td>
  <td>Assignment<br>Addition assignment<br>Subtraction assignment<br>Multiplication assignment<br>Division assignment<br>Modulus assignment</td>
  <td align="center">Right to left</td>
</tr>
</tbody></table>
<p><i>Larger number means higher precedence</i>.</p>

---
