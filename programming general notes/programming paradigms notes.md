# programming paradigm notes

What is the difference between procedural programming and functional programming? [closed]

> References
> <https://stackoverflow.com/questions/23277/what-is-the-difference-between-procedural-programming-and-functional-programming>

I've never seen this definition given elsewhere, but I think this sums up the differences given here fairly well:

**Functional** programming focuses on **expressions**

**Procedural** programming focuses on **statements**

Expressions have values. A functional program is an expression who's value is a sequence of instructions for the computer to carry out.

Statements don't have values and instead modify the state of some conceptual machine.

In a purely functional language there would be no statements, in the sense that there's no way to manipulate state (they might still have a syntactic construct named "statement", but unless it manipulates state I wouldn't call it a statement in this sense). In a purely procedural language there would be no expressions, everything would be an instruction which manipulates the state of the machine.

Haskell would be an example of a purely functional language because there is no way to manipulate state. Machine code would be an example of a purely procedural language because everything in a program is a statement which manipulates the state of the registers and memory of the machine.

The confusing part is that the vast majority of programming languages contain **both** expressions and statements, allowing you to mix paradigms. Languages can be classified as more functional or more procedural based on how much they encourage the use of statements vs expressions.

For example, C would be more functional than COBOL because a function call is an expression, whereas calling a sub program in COBOL is a statement (that manipulates the state of shared variables and doesn't return a value). Python would be more functional than C because it allows you to express conditional logic as an expression using short circuit evaluation (test && path1 || path2 as opposed to if statements). Scheme would be more functional than Python because everything in scheme is an expression.

You can still write in a functional style in a language which encourages the procedural paradigm and vice versa. It's just harder and/or more awkward to write in a paradigm which isn't encouraged by the language.

---

Functions In Functional Programming Vs Procedural Programming

> References
> <https://www.c-sharpcorner.com/article/functions-in-functional-programming-vs-procedural-programming/>

```text
In software, everything is a statement, unless it is a function. 

Anyway, getting back to the main theme of the post - what a function is, and how are we using it in our software engineering concepts while defining most important plans and designs of our applications. 
Mathematical definition of a function

Now, that we have a computer in our reach, we have forgotten how things actually worked, and how these models that we call "computer" actually work or are expected to work. Most of the low-level details, or the algorithms, or concepts of the "computers" have been left behind and more concepts and designs have been thrown down the stream, which students have to focus on, instead of the low-level details. Before, I start to lecture you on Mathematics, I must admit I am a very poor student in Mathematics, got 33 in my BSc, and got a D grade in my Masters. But nonetheless, I try to understand as much of Mathematical concepts as I should, to better understand how to program a machine, whose sole existence depends on Mathematics and models.
The simplest of the definitions of a function, define it as a function has,

A set of inputs, which is known as argument (or argument list).
A value that is returned from the function.
Moreover, the function is typically defined to have a domain, and a codomain, in which it operates and doesn't break. Without going any deeper in the Mathematical details of these, I would like to give you an overview of what these two terms mean, then I will also show a code sample to clarify the meaning... Because, all of us have been tuned to understand the code more than anything else. 
For a function, f(x, y) → y ÷ x, 

The domain of the function would be the set of all the possible values of x and y, where the function doesn't break—I will talk about this part in the code below. 
The codomain part of this function, is the set of possible values that the expression "y ÷ x" would return.
Keeping the above example in mind, we can define a function in C# program as following, 
double Function(int x, int y) {  
    return y / x;  
}  
I left a vital piece out on purpose. Just have a look at this "function". It would accept some values, and return a value. But, would the function be continuous on all inputs? Definitely no, keeping the Mathematical understanding in mind, we can easily update the "function" to be able to work in all possible inputs, 
double Function(int x, int y) {  
    if (x != 0) {  
        return y / x;  
    } else {  
        // Properly propagate the value  
        return Double.PositiveInfinity;  
    }  
}  
For instance, please excuse the "defensive programming", and try to understand the mapping being done here, for the function we used as example. Now that you have understood what a function is, I should better of start to explain why I was quoting the function each time I used it for the C# program function. 
When is a Function, a Function

Now that we have understood the basic definition, we can easily define and understand what a function is more likely to be. Since the days of C, C++ and other similar procedural languages, the terminology has been intertwined enough to cause a confusion in the students. They are taught, 

An object has a state and performs some functionality.

Fine, then what is the functionality when it could be much better explained as a behavior? Wouldn't it be easy to understand? But still most of the course outlines, materials do not focus on these ambiguities that, for a moment do seem to help the reader, but can be a long-term pain for the readers as they would sometime stumble upon the real usage of world and then, cringe. So, how do we then define a function? 
int SomeName(int param1, int param2) {  
    // Processing  
    // More Processing  
    return something;  
}  
However, a more suitable definition of a function should be, that a function,
Is stateless — whereas in the object-oriented programming languages, we have seen that a function can be stateful. 
Should have no side effects, I am unsure whether you would consider output stream writing a side-effect or not, so I would leave this.
Lazy evaluation, and other features that are typically applied to functional programming may or may not be included and involved. 
Thus, we can understand what functions typically are in these contexts.

Stateless

First of all, you should understand what a state is. A state (I won't talk about the object-oriented concepts, so stick with me) is any external value that might cause a change in the output value of the function. For a function to be stateless, it must return the value by processing the inputs only, and not any other state or value should alter the output value. For example,
Sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);  
If the above function gets executed, 10 times, 100 times, it must always return the same result. In other words, there must be no internal value altering the results; such as any discount on a sale item. 

No side effects

Side effects are, opposite to states, as in the case of a state an external value was altering the result, in the side effects case an external value is altered by the input. For example take the following code as the example,
// void set intentionally  
void someFunction(int a, int b, int c) {  
    // Stateless  
    int d = Sum(a, b, c);  
      
    // Checking a condition  
    if(d > 100) {  
        // Side effect!  
        salesMet = true;  
    }  
}  
Thus, a typical "function" must not have these kind of codes in it as well. As I have already mentioned, the side effects are debatable, some consider all streams to be a part of this, however some don't consider them as a part of the side-effect concept, and since this is debatable I should leave it as well. 

Lazy evaluation

This part, is all left for the programmers, the only thing is, that a function should be evaluated only when needed. You should read more on this yourself, sorry.

So, what is a Function in Imperative (Procedural) languages?

Now comes the final part, what is the function that we have defined in object-oriented programming languages? I remember, my teacher, Sir Zeeshan, while teaching us Visual Programming last semester, asked the students to not call the functions, "functions", but instead use the name "methods". Despite all the problems that there were in the class, I personally loved that statement made by him because he was trying to teach the students something "real" and not what they would more likely find in the books. 
Another way to look at the functions in imperative languages, or in computer science is, that we typically are based on the sequential codes. Everything about a computer, gets boiled down to 0-1 in the binary. Thus, the computer has to follow the sequence of codes, more friendly languages such as C, C++ or Java and C# are providing a good "experience" for the developers, to write the software code. "Functions" in these languages, is much like a structure to wrap a code with. Thus, being a simple area or buffer of code statements, that gets called by the runtime — or whatever calls it, you get the point, right? In such cases, a function would typically only be a labelled area of code statements — and now would be a good time for you to go back and see the initial quote that I started, right away — and, if there is a response, it gets pushed on stack, otherwise the control returns. 

For example, the following function,
void Function(int x, int y) {  
    int c = y / x;  
}  
Generates the following IL code,
Function:  
IL_0000:  nop           
IL_0001:  ldarg.2       
IL_0002:  ldarg.1       
IL_0003:  div           
IL_0004:  stloc.0     // c  
IL_0005:  ret    
As mentioned, the "Function" area gets expanded to a sequence of statements, which get executed and then the control returns. The same is the case of C++, or other languages, where all of the functions get expanded to (nothing, but just plain) statements. Thus, this raises another question, "How can a function be void?"
The answer is pretty much simple, and straight-forward, since the functions in these languages are nothing but just wrappers around a block of code statements, that is why they are not required to return anything at all. If they, however, do return something, it gets pushed to the stack and the caller statement has to load that from stack. And that is exactly, why they are called "methods" and not the functions. Calling the behavior of the objects, a function would be confusing and misguiding, however the concept and title of "methods" is much simpler and less confusing once a person starts to dig deeper in Mathematics of this as well. 

Now, we can also count the number of non-functional features that these methods have,
A full support and allowance of return-or-not-return, take-parameter-or-not-take-parameter behavior. 
Stateful, as needed.
Side effects, if medicines can have them, why can't the methods have side effects too?
However, they still might have a domain and a codomain on which they operate and definitely would break in curtain conditions and situations. 
So, this was the overview of the imperative functions. Now let us have a look at the functional languages part.

Functional language functions (and difference)

Functional languages, are typically the languages that support recursion, and thus require functions to be there. Haskell for example, is an example of pure functional programming language, it does not contain impurities such as object-oriented concepts. Pulling some help from this thread on Stack Overflow, the functions in Haskell, cannot return void. They must return something, and must always take a parameter. Obviously the syntax of the functions is really evaluated to be short and precise, but underground concept is all same. Also, to note that functional programming language, Haskell, does support some simple actions, where the structure does not take a parameter and returns nothing 
Note

Why can't it? It is written on top of C though. 

For a bit more explanation, please read the reference thread that I have associated here. :-)

Finally: Lambdas, and their story

Lambdas, lambdas, lambdas, C++, C# and almost every functional programming language has these features at its core. Lambda functions are just so much useful, interesting to learn, easier to code and beautiful in C# that you just cannot skip them and talk about functions, just no.
The story of lambdas started with Alonzo Church, who created them for his own work in the field of "Mathematics". Notice how important the lambdas are in the computer science, and they were created for Mathematics, and not for other stuff. The core concept of lambdas is that the functions, whatever they do, are actually anonymous mappers, that map an input to an output. What lambdas bring to computer science is nothing but a syntax, that makes the functions cleaner, and a bit of overhead removal from the function itself. 

The lambdas, in reality, are used for various reasons, and since their usages and structure, and benefits all depend on the language or context they are being used in, it won't be necessary or helpful to talk deeply about them. But to wrap things up let me tell a few properties of lambdas,
They are stateless, they operate directly on the operands, or the input values. 
They are not meant to have any side effects. Although in the cases of, say C#, when you create delegates and event handlers, there are side effects in the lambdas, anonymous function. But that is discourage. 
They directly operate on the operands, thus generating the same result everytime that they are called.  
There are many other things to note about lambda calculus, that you should consider reading as well from the Wikipedia article that I have referenced, above. So, please go through that as well. 
And finally, I hope this article might have provided you with some useful insights, and tips and understanding of what a function is what the naming conventions are. Typically nowadays, it doesn't matter what you call what, the only thing that matters is, does your code compile? 

Do try to spread the word.  

```

---

Comparison of programming paradigms

> References
> <https://en.wikipedia.org/wiki/Comparison_of_programming_paradigms>

---

Differences between Procedural and Object Oriented Programming

> References
> <https://www.geeksforgeeks.org/differences-between-procedural-and-object-oriented-programming/>

![pp vs. opp](resources/procedural%20vs%20oop%201.png)

---
