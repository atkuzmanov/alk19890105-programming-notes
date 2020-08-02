# spreadsheet excel libreoffice openoffice notes

How to sum numbers with text appended in the same cell [Excel]?

<https://stackoverflow.com/questions/44605540/how-to-sum-numbers-with-text-appended-in-the-same-cell-excel>

`=SUMPRODUCT(--SUBSTITUTE(C4:C18," GBP",""))`

<https://help.libreoffice.org/Calc/Text_Functions#SUBSTITUTE>

`=SUM(SUBSTITUTE(C4:C18," GBP",""))`

`=SUM(C4:C18(SUBSTITUTE($1," GBP","")))`

<https://ask.libreoffice.org/en/question/148569/how-to-do-a-column-sum-when-the-cells-are-not-numeric-formatted/>

<https://ask.libreoffice.org/en/question/94215/how-to-find-exact-number-in-cell-with-lots-of-text-and-numbers/>

<https://ask.libreoffice.org/en/question/59501/how-to-split-data-in-a-cell-to-numbers-and-text/>

<https://stackoverflow.com/questions/13303515/extract-number-from-cell-in-openoffice-calc>

`=LEFT(C4,FIND(" ",C4,1))`

`=SUMPRODUCT(ISNUMBER(SEARCH(D4:D19)))`

<https://ask.libreoffice.org/en/question/59886/decimal-place-precision-in-calc/>

---
