# sql notes

|||sql
|||oracle sql

|||sql select
|||select

```sql
SELECT * FROM example_table_name WHERE id = 1234567890;

SELECT * FROM example_table_name WHERE name = 'John';

SELECT DISTINCT example_id FROM example_table_name WHERE id = 1234567890;

SELECT * FROM example_table_name
WHERE id = 1234567890
AND example_object_id = 12153493
AND example_timestamp > SYSTIMESTAMP-1
ORDER BY example_timestamp DESC;


SELECT COUNT(*) FROM example_table_name;
```

|||sql like

```sql
select *
from example_table_name
where id = 15
  and name like '%Peter%'
```

---

|||sql where timestamp
|||sql timestamp examples

```sql
WHERE example_timestamp > systimestamp - 1/24
WHERE example_timestamp > systimestamp - 360
WHERE example_timestamp > systimestamp - 1
```

---

|||sql update

```sql
UPDATE example_object exampleobj
   SET last_updated_timestamp = systimestamp
WHERE example_type_code in ('EXAMPLE_TYPE_1','EXAMPLE_TYPE_2','EXAMPLE_TYPE_3')
   AND exampleobj.last_updated_timestamp > trunc(systimestamp)-60
   and rownum < 100;


UPDATE example_table_name SET example_id = null WHERE example_obj_id = 123;
```

---

|||sql insert

```sql
INSERT INTO example_table_name
      (name, age)
VALUES('Examplefirstname Examplefamilyname', 28);

COMMIT;
```

---

|||sql delete

```sql
delete from example_table_name;

COMMIT;
```

---

|||sql execute
|||sql exec
|||pl sql
|||PL/SQL Dynamic SQL

<https://docs.oracle.com/en/database/>

```sql
EXECUTE
Syntax

EXEC[UTE] statement
```

where statement represents a PL/SQL statement.

Executes a single PL/SQL statement. The EXECUTE command is often useful when you want to execute a PL/SQL statement that references a stored procedure. For more information on PL/SQL, see your Oracle Database PL/SQL User's Guide and Reference (<https://docs.oracle.com/cd/B19306_01/appdev.102/b14261/toc.htm>).

---

<https://ss64.com/ora/exec.html>

```sql
EXEC[UTE] (SQL*Plus command)

Execute a PL/SQL function or procedure.
```

Syntax:

```sql
   EXEC statement

   EXEC [:bind_variable :=] package.procedure;

   EXEC [:bind_variable :=] package.function(parameters);
```

The length of the EXEC command cannot exceed the length defined by SET LINESIZE.

If the EXEC command is too long to fit on one line, use the SQL*Plus continuation character (a hyphen) -

Example

```sql
SQL> EXEC :answer := EMP_PAY.BONUS('SMITH')
```

Executing directly from the shell (in this case Windows):

`C:\> echo execute demoProc|sqlplus demo/password`

---

|||sql alias

<https://www.w3schools.com/sql/sql_alias.asp>

<https://www.techonthenet.com/oracle/alias.php>

Syntax

The syntax to ALIAS A COLUMN in Oracle/PLSQL is:

column_name AS alias_name
OR

The syntax to ALIAS A TABLE in Oracle/PLSQL is:

table_name alias_name

---

<https://stackoverflow.com/questions/8451195/is-the-as-keyword-required-in-oracle-to-define-an-alias>

AS without double quotations is good.

```sql
SELECT employee_id,department_id AS department
FROM employees
order by department
--ok--

SELECT employee_id,department_id AS "department"
FROM employees
order by department
--error on oracle--
```

---

|||sql lower
|||sql lcase

<https://www.w3schools.com/sql/sql_func_lcase.asp>

```sql
The LCASE() function converts the value of a field to lowercase.

SQL LCASE() Syntax
SELECT LCASE(column_name) FROM table_name;
Syntax for SQL Server
SELECT LOWER(column_name) FROM table_name;
```

---

|||sql substr

<https://docs.oracle.com/cd/B28359_01/olap.111/b28126/dml_functions_2101.htm#OLADM679>

/**
SUBSTR calculates lengths using characters as defined by the input character set.

Arguments

string
A text expression that is the base string from which the substring is created.

position
The position at which the first character of the returned string begins.

When position is 0 (zero), then it is treated as 1.

When position is positive, then the function counts from the beginning of string to find the first character.

When position is negative, then the function counts backward from the end of string.

substring_length
The length of the returned string. SUBSTR calculates lengths using characters as defined by the input character set. SUBSTRB uses bytes instead of characters. SUBSTRC uses Unicode complete characters. SUBSTR2 uses UCS2 code points. SUBSTR4 uses UCS4 code points.

When you do not specify a value for this argument, then the function returns all characters to the end of string. When you specify a value that is less than 1, the function returns NA.
**/

Examples:

```sql
SHOW SUBSTR('abcdefg',3,4)
cdef

SHOW SUBSTR('abcdefg',-5,4)
cdef
```

---

|||sql desc
|||sql describe

`desc example_table_name;`

---

|||sql alter user

<https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_4003.htm>

/**
Use the ALTER USER statement:

To change the authentication or database resource characteristics of a database user
**/

/*
Changing User Identification: Example
The following statement changes the password of the user sidney (created in "Creating a Database User: Example") second_2nd_pwd and default tablespace to the tablespace example:
*/

```sql
ALTER USER sidney
    IDENTIFIED BY second_2nd_pwd
    DEFAULT TABLESPACE example;
```

---
