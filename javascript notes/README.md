# javascript notes

|||javascript notes

---

|||javascript pass by value |||pass-by-value
|||is javascript pass by value

Understanding JavaScript Pass By Value

> References
> <https://www.javascripttutorial.net/javascript-pass-by-value/>

```text
Summary: this tutorial explains how JavaScript pass by value works and gives you some examples of passing primitive and reference variables to a function.

Before going forward with this tutorial, you should have good knowledge of the primitive and reference values, and the differences between them.

JavaScript pass by value or pass by reference
In JavaScript, all function arguments are always passed by value. It means that JavaScript copies the values of the passing variables into arguments inside of the function.

Any changes that you make to the arguments inside the function does not affect the passing variables outside of the function. In other words, the changes made to the arguments are not reflected outside of the function.

If function arguments are passed by reference, the changes of variables that you pass into the function will be reflected outside the function. This is not possible in JavaScript.

Passing by value of primitives values
Let’s take a look at the following example.

function square(x) {
    x = x * x;
    return x;
}
var y = 10;
var result = square(y);
console.log(y); // 10 -- no change
console.log(result); // 100 
How the script works.

First, define a square() function that accepts an argument x . The function changes the value of the x argument.

Next, declare the variable y and initialize its value to 10:

JavaScript Pass By Value - declare variable
Then, pass the y variable into the square() function. When passing the variable y to the square() function, JavaScript copies the value of y to the x variable.

JavaScript Pass By Value - passing primitive argument
After that, the square() function changes the x variable. However, it does not impact the value of the y variable. This is because x and y are totally different variables. They have no link.

JavaScript Pass By Value - changing primitive value
Finally, the value of the y variable does not change after the square() function completes.

JavaScript Pass By Value - primitive type
If JavaScript uses passing by reference, the value of the variable y would change to 100.

Passing by value of object
It’s obvious to see that primitive variables are passed by values. However, it is not the case for objects. Take this for example:

function turnOn(machine) {
    machine.isOn = true;
}

var computer = {
    isOn: false
};

turnOn(computer);
console.log(computer.isOn); // true;
How the script works:

First, define the turnOn() function that accepts an object machine. The function sets the isOn property of the object to true.

Next, declare a variable computer and assign it an object whose isOn property is set to false.

Internally, the computer is a variable that references the actual object:

JavaScript Pass By Value - Object Declaration
Then, pass the computer variable into the turnOn() function.

JavaScript copies the value of the computer variable to machine variable. As a result, both computer and machine variables are referencing the same object in the memory:

JavaScript Pass By Value -Passing argument
After that, inside the turnOn() function, the isOn property of the object is set to true via the machine variable.

JavaScript Pass By Value - changes
Finally, accessing the isOn property of the computer variable returns true.

JavaScript Pass By Value - accessing outside function
It seems that JavaScript passes an object by reference because the changes to the object are reflected outside of the function. However, this is not the case.

In fact, when you pass an object to a function, you are passing the reference of that object, not the actual object (computer). Therefore, the function can modify the properties of the object via its reference.

In addition, when you pass an object into a function, the function cannot change the reference variable to reference another object.

Let’s prove it through the following example:

function turnOn(machine) {
    machine = {
        isOn: true
    };
}

var computer = {
    isOn: false
};

turnOn(computer);

console.log(computer.isOn); // false;
This time, the turnOn() function changes the machine argument so that it references another object.

Before passing the computer object to the turnOn() function, the isOn property of the computer object is false.

If the computer variable was passed by reference, the computer variable would be changed and referenced the new object whose isOn property is true.

However, when we access the isOn property outside of the function, the values is false. It indicates that the original reference did not change even though the argument was changed inside of the function.

Summary
JavaScript passes all arguments to a function by value.
```

===

[Javascript] Pass By Value And Pass By Reference In JavaScript

> References
> <https://medium.com/nodesimplified/javascript-pass-by-value-and-pass-by-reference-in-javascript-fcf10305aa9c>

---
