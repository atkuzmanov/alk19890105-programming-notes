# java array arrays notes

|||java array |||java arrays

---

Java.util.Arrays.equals() in Java with Examples

> References
> <https://www.geeksforgeeks.org/java-util-arrays-equals-java-examples/#:~:text=Two%20arrays%20are%20considered%20equal,equal%20if%20both%20are%20null>

```java
// Java program to demonstrate working of Arrays.equals() 
  
import java.util.Arrays; 
  
public class ArrayEqualDemo  
{ 
    public static void main(String[] args)  
    { 
        // Let us create different integers arrays 
        int[] arr1 = new int [] {1, 2, 3, 4}; 
        int[] arr2 = new int [] {1, 2, 3, 4}; 
        int[] arr3 = new int [] {1, 2, 4, 3}; 
          
        System.out.println("is arr1 equals to arr2 : " + 
                                Arrays.equals(arr1, arr2)); 
        System.out.println("is arr1 equals to arr3 : " + 
                                Arrays.equals(arr1, arr3)); 
    } 
} 

/*
Output:

is arr1 equals to arr2 : true
is arr1 equals to arr3 : false
*/
```

---

How to compare two arrays in Java?

> References
> <https://www.geeksforgeeks.org/compare-two-arrays-java/>

```java
class Test 
{ 
    public static void main (String[] args)  
    { 
        int arr1[] = {1, 2, 3}; 
        int arr2[] = {1, 2, 3}; 
        if (arr1 == arr2) // Same as arr1.equals(arr2) 
            System.out.println("Same"); 
        else
            System.out.println("Not same"); 
    } 
}

/*
Output:

Not Same
*/
```

---
