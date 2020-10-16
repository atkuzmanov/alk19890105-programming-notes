# java substracting comparing doubles

|||java double |||java substracting doubles |||java comparing doubles

---

RodneyShag/HackerRank_solutions

> References
> <https://github.com/RodneyShag/HackerRank_solutions/blob/master/Java/Data%20Structures/Java%20Sort/Solution.java>

```java
// github.com/RodneyShag

import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

class Student {
    private int    id;
    private String fname;
    private double cgpa;
    public Student(int id, String fname, double cgpa) {
        super();
        this.id    = id;
        this.fname = fname;
        this.cgpa  = cgpa;
    }
    public int getId() {
        return id;
    }
    public String getFname() {
        return fname;
    }
    public double getCgpa() {
        return cgpa;
    }
}

public class Solution {
    public static void main(String[] args) {
        Scanner scan  = new Scanner(System.in);
        int testCases = Integer.parseInt(scan.nextLine());

        List<Student> studentList = new ArrayList<Student>();
        while (testCases-- > 0) {
            int id       = scan.nextInt();
            String fname = scan.next();
            double cgpa  = scan.nextDouble();
            Student st   = new Student(id, fname, cgpa);
            studentList.add(st);
        }
        scan.close();

        Collections.sort(studentList, new StudentComparator());
        for (Student st: studentList) {
            System.out.println(st.getFname());
        }
    }
}

class StudentComparator implements Comparator<Student> {
    double epsilon = 0.001; // since we shouldn't use "==" with doubles
    @Override
    public int compare(Student s1, Student s2) {
        if (Math.abs(s1.getCgpa() - s2.getCgpa()) > epsilon) {
            return s1.getCgpa() < s2.getCgpa() ? 1 : -1; // descending order
        } else if (!s1.getFname().equals(s2.getFname())) {
            return s1.getFname().compareTo(s2.getFname());
        } else {
            return s1.getId() - s2.getId();
        }
    }
}
```

---

How to compare two double values in Java?

> References
> <https://stackoverflow.com/questions/8081827/how-to-compare-two-double-values-in-java>

Basically you shouldn't do exact comparisons, you should do something like this:

    double a = 1.000001;
    double b = 0.000001;
    double c = a-b;
    if (Math.abs(c-1.0) <= 0.000001) {...}

===

You can use Double.compare; It compares the two specified double values.

===

Instead of using doubles for decimal arithemetic, please use java.math.BigDecimal. It would produce the expected results.

For reference take a look at this stackoverflow question <https://stackoverflow.com/questions/179427/how-to-resolve-a-java-rounding-double-issue>

```java
To control the precision of floating point arithmetic, you should use [java.math.BigDecimal][1]. Read [The need for BigDecimal][2] by John Zukowski for more information.

Given your example, the last line would be as following using BigDecimal.

    import java.math.BigDecimal;
    
    BigDecimal premium = BigDecimal.valueOf("1586.6");
    BigDecimal netToCompany = BigDecimal.valueOf("708.75");
    BigDecimal commission = premium.subtract(netToCompany);
    System.out.println(commission + " = " + premium + " - " + netToCompany);

This results in the following output.

    877.85 = 1586.6 - 708.75

  [1]: http://java.sun.com/javase/6/docs/api/java/math/BigDecimal.html
  [2]: https://blogs.oracle.com/CoreJavaTechTips/entry/the_need_for_bigdecimal
```

...

```java
As the previous answers stated, this is a consequence of doing floating point arithmetic.

As a previous poster suggested, When you are doing numeric calculations, use `java.math.BigDecimal`.

However, there is a gotcha to using `BigDecimal`. When you are converting from the double value to a `BigDecimal`, you have a choice of using a new `BigDecimal(double)` constructor or the `BigDecimal.valueOf(double)` static factory method. Use the static factory method.

The double constructor converts the entire precision of the `double` to a `BigDecimal` while the static factory effectively converts it to a `String`, then converts that to a `BigDecimal`.

This becomes relevant when you are running into those subtle rounding errors. A number might display as .585, but internally its value is '0.58499999999999996447286321199499070644378662109375'. If you used the `BigDecimal` constructor, you would get the number that is NOT equal to 0.585, while the static method would give you a value equal to 0.585.

<pre>
double value = 0.585;
System.out.println(new BigDecimal(value));
System.out.println(BigDecimal.valueOf(value));
</pre>

on my system gives
<pre>
0.58499999999999996447286321199499070644378662109375
0.585
</pre>

```

---

Adding and subtracting doubles are giving strange results [duplicate]

> References
> <https://stackoverflow.com/questions/15625556/adding-and-subtracting-doubles-are-giving-strange-results>

In Java, `double` values are [IEEE floating point numbers][1].  Unless they are a power of 2 (or sums of powers of 2, e.g. 1/8 + 1/4 = 3/8), they cannot be represented exactly, even if they have high precision.  Some floating point operations will compound the round-off error present in these floating point numbers.  In cases you've described above, the floating-point errors have become significant enough to show up in the output.

It doesn't matter what the source of the number is, whether it's parsing a string from a `JTextField` or specifying a `double` literal -- the problem is inherit in floating-point representation.

Workarounds:

 - If you know you'll only have so many decimal points, then use integer
   arithmetic, then convert to a decimal:

        (double) (51 + 1) / 10
        (double) (48 - 4) / 10

 - Use [BigDecimal](http://docs.oracle.com/javase/7/docs/api/java/math/BigDecimal.html)

 - If you must use `double`, you can cut down on floating-point errors
   with the [Kahan Summation Algorithm][2].

[1]: http://en.wikipedia.org/wiki/IEEE_floating_point
[2]: http://en.wikipedia.org/wiki/Kahan_summation_algorithm

---

Epsilon

> References
> <https://en.wikipedia.org/wiki/Epsilon>

---

Approximation error

> References
> <https://en.wikipedia.org/wiki/Approximation_error>

---

Machine epsilon

> References
> <https://en.wikipedia.org/wiki/Machine_epsilon>

---
