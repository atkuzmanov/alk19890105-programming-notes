# bash random number generator notes

Random number generator in bash

> References
> <https://coderwall.com/p/s2ttyg/random-number-generator-in-bash>

```text
My preferred random number generator is built right into my shell.

$ echo $RANDOM
$RANDOM is a bash function (not a constant) that returns a random signed 16 bit integer (from 0 through 32767).

You can use modulo to put some bounds on it. This line will output a random int between 0 - 9:

$ echo $(( $RANDOM % 10 ))
If you want to generate a random int between 1 - 10:

$ echo $(( $RANDOM % 10 + 1 ))
If you need something more, check out /dev/random or /dev/unrandom. From the manpage (man 4 random):

The random device produces uniformly distributed random byte values of potentially high quality.
To obtain random bytes, open /dev/random for reading and read from it.

/dev/urandom is a bunch of binary data, so you need to read it with od.

$ od -An -N4 -i < /dev/urandom
This outputs at max 4 bytes (the -N4 flag) signed decimal ints (-i) at no address (-An).

Written by Mark Wunsch
```

---

How to generate random number in Bash?

> References
> <https://stackoverflow.com/questions/1194882/how-to-generate-random-number-in-bash>

Use [`$RANDOM`](http://tldp.org/LDP/abs/html/randomvar.html). It's often useful in combination with simple shell arithmetic. For instance, to generate a random number between 1 and 10 (inclusive):

    $ echo $((1 + RANDOM % 10))
    3

The actual generator is in `variables.c`, the function `brand()`. <a href="https://www.codeblog.org/viewsrc/bash-3.1/variables.c">Older versions</a> were a simple linear generator. Version 4.0 of `bash` uses a <a href="http://www.bashcookbook.com/bashinfo/source/bash-4.0/variables.c">generator with a citation</a> to a 1985 paper, which presumably means it's a decent source of pseudorandom numbers. I wouldn't use it for a simulation (and certainly not for crypto), but it's probably adequate for basic scripting tasks.

If you're doing something that requires serious random numbers you can  use `/dev/random` or `/dev/urandom` if they're available:

    $ dd if=/dev/urandom count=4 bs=1 | od -t d

===

```text
Be careful here. While this is fine in a pinch, doing arithmetic on random numbers can dramatically affect the randomness of your result. in the case of $RANDOM % 10, 8 and 9 are measurably (though marginally) less probable than 0-7, even if $RANDOM is a robust source of random data. – dimo414 Feb 22 '14 at 22:51

@dimo414 I'm curious to "marginally", do you have a source where I can find out more about this? – PascalVKooten May 26 '14 at 6:27 

By moduloing your random input, you are "pigeon-holing" the results. Since $RANDOM's range is 0-32767 the numbers 0-7 map to 3277 different possible inputs, but 8 and 9 can only be produced 3276 different ways (because 32768 and 32769 aren't possible). This is a minor issue for quick hacks, but means the result is not uniformly random. Random libraries, like Java's Random, offer functions to properly return a uniform random number in the given range, rather than simply mod-ing a non-divisible number. – dimo414 May 26 '14 at 16:07

@J.F.Sebastian very true - the problem with modulo is it can break the uniformity of any RNG, not just bad PRNGs, but thanks for calling this out. – dimo414 Sep 24 '14 at 13:41

Just for context, the basic pigeonholing for % 10 means 8 and 9 are about .03% less likely to occur than 0–7. If your shell script requires more accurate uniform random numbers than that, then by all means use a more complex and proper mechanism. – Nelson Sep 24 '14 at 23:48
```

---
