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
