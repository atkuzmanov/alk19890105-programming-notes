# c++ c plus plus notes

c++ matrix

```c++
#include <fstream> //include, koito pozvolqva obrabotvaneto na failove (4etene i pisane)
#include <iostream>
using namespace std;

	//Globalni konstanti
	//Deklaraciq i inicializaciq
	const int HEIGHT = 3;	
	const int WIDTH = 3;	

	//Globalni promenlivi
	//Deklaraciq
	ifstream inFile; //deklarirame stream za 4etene na fail
	ofstream outFile; //deklarirame stream za pisane vav fail

/* Funkciq za printirane na matricata na ekrana
 * priema parametar dvumeren masiv (matricata)	
 */
void printMatrix(int arrParam[][WIDTH]){
	//for cikul, koito obhojda redovete na matricata
	for(int i = 0; i < HEIGHT; i++)
	{
		//vutre6en for cikul, koito obhojda kolonite na matricata
		for(int j = 0; j < WIDTH; j++)
		{
			cout << arrParam[i][j] << " "; //printira sega6niq element + razstoqnie
			outFile << arrParam[i][j] << " "; //printira sega6niq element + razstoqnie v faila za rezultati
		}
		cout << "\n"; //printira nov red
		outFile << "\n"; //printira nov red vav faila za rezultati
	}
}

/* 
 * Zada4a 4.8
 * Funckciq, koqto namira sumata ot minimumite po redove v matricata.
 * priema parametar dvumeren masiv (matricata)	
 * vra6ta sumata kato rezultat ot tip int
 */
int sumMinRows(int arrParam[][WIDTH]){
	int mySum = 0; //promenliva za sumata - krainiq rezultat, koito vunkciqta 6te varne
	
	//for cikul, koito obhojda redovete na matricata
	for(int i = 0; i < HEIGHT; i++)
	{
		//promenliva koqto da durji nastoq6tiq minimum
		//promenlivata se deklarira i inicializira sas parviq element ot vseki red
		int myMin = arrParam[i][0];
		//vutre6en for cikul, koito obhojda kolonite na matricata
		for(int j = 0; j < WIDTH; j++)
		{
			if(arrParam[i][j] < myMin) //Proverqvam ako nastoq6tiq element e po malak ot nastoq6tiq minimalen element
			{
				//Ako nastoq6tiq element ot matricata e po-malak ot nastoq6tiq minimalen element
				//prezapisvam v/u myMin stoinosta na nastoq6tiq element, tai kato toi e noviqt nai-malak element ot reda
				myMin = arrParam[i][j];
			}
		}
		//Sled kato minimuma za nastoq6tiq red "myMin" e nameren
		//go sabiram sas sbora na ostanalite minimumi ot predi6nite redove
		//i go zapisvam v sumata "mySum"
		mySum += myMin;
	}
	return mySum; //vra6tam sumata
}

/* 
 * Zada4a 4.8
 * Funckciq, koqto namira proizvedenieto ot maximumite po kolonite v matricata.
 * priema parametar dvumeren masiv (matricata)	
 * vra6ta proizvedenieto kato rezultat ot tip int
 */
int multMaxColumns(int arrParam[][WIDTH]){
	//promenliva za proizvedenieto
	//inicializirana e na 1, za6toto kogato se umnojava ako e inicializirana kato nula (0)
	//rezultata 6te e vinagi nula, tai kato nula * ne6to e nula (0*3=0)
	int myMult = 1;

	//cikul, koito obhojda kolonite na matricata
	for(int j = 0; j < WIDTH; j++)
	{
		//promenliva koqto da durji nastoq6tiq maximum
		//promenlivata se deklarira i inicializira sas parviq element ot vsqka kolona
		int myMax = arrParam[0][j];
		//vatre6en for cikul, koito obhojda redovete na matricata
		for(int i = 0; i < HEIGHT; i++)
		{
			if(arrParam[i][j] > myMax) //Proverqvam ako nastoq6tiq element e po golqm ot nastoq6tiq maximalen element
			{
				//Ako nastoq6tiq element ot matricata e po-golqm ot nastoq6tiq maximalen element
				//prezapisvam v/u myMax stoinosta na nastoq6tiq element, tai kato toi e noviqt nai-golqm element ot kolonata
				myMax = arrParam[i][j];	
			}
		}
		//Sled kato maximuma za nastoq6tata kolona "myMax" e nameren
		//go umnojavam s proizvedenieto na ostanalite maximumi ot predi6nite koloni (ako ima takiva, ako ne go umnojavam s 1 za parviq pat)
		//i go zapisvam v sumata "myMult"
		myMult *= myMax;
	}
	return myMult; //vra6tam rezultata
}

/* 
 * Zada4a 4.7
 * Funckciq, koqto opredelq poziciqta na reda, koito sadurja nai-mnogo polojitelni elementi
 * priema parametar dvumeren masiv (matricata)	
 * vra6ta poziciqta na reda
 */
int rowMaxPos(int arrParam[][WIDTH]){
	int maxCount = 0; //promenliva za borq elementi ot reda s nqi-mnogo (+) elementi ot cqlata matrica
	int count = 0; //promenliva za broi polojitelni elementi za teku6tiq red
	int position = 0; // promenliva za posiciqta na reda, koito ima nai-mnog + elementi

	for(int i = 0; i < HEIGHT; i++) //obhojda redove
	{
		for(int j = 0; j < WIDTH; j++) //obhojda koloni
		{
			if(arrParam[i][j] > 0) //proverqvam ako teku6tiq element e polojitelen
			{
				//ako teku6tiq element e polojitelen uveli4avam s 1 broq na polojitelnite elementi za teku6tiq red
				// "count++;" e su6toto kato "count = count + 1;"
				count++;
			}
		}

		//Proverqvam dali broq + elementi ot teku6tiq red e po-golqm ot broq na + elementi ot dosega6niq red s nai-mn + elementi
		if(count > maxCount)
		{
			//Ako e vqrno
			//zapisvam noviq broi na nai mnogo + elementi ot red ot matricata
			maxCount = count;
			//zapisvam novata poziciqna teku6tiq red, koito durji nai-golqm broi + elementi
			position = i;
		}
		count = 0; //nuliram broq4a, za da po4ne broeneto na elementi za noviq red ot nula (0)
	}
	return position; //vra6tam poziciqta na reda s nai-mnogo polojitelni elementi ot matricata
}

/* 
 * Zada4a 4.7
 * Funckciq, koqto opredelq poziciqta na stulb(kolona), koito sadurja nai-mnogo otricatelni elementi
 * priema parametar dvumeren masiv (matricata)	
 * vra6ta poziciqta na stalba(kolonata)
 */
int columnMaxNeg(int arrParam[][WIDTH]){
	int maxCount = 0; //promenliva za borq elementi ot reda s nqi-mnogo (-) elementi ot cqlata matrica
	int count = 0; //promenliva za broi polojitelni elementi za teku6tiq stulb
	int position = 0; // promenliva za posiciqta na stulba, koito ima nai-mnog (-) elementi
	

	for(int j = 0; j < WIDTH; j++) //obhojda koloni
	{
		for(int i = 0; i < HEIGHT; i++)	//obhojda redove
		{
			if(arrParam[i][j] < 0) //proverqvam ako teku6tiq element e otricatelen
			{
				//ako teku6tiq element e otricatelen uveli4avam s 1 broq na otricatelnite elementi za teku6tiq stulb
				count++;
			}
		}

		//Proverqvam dali broq - elementi ot teku6tiq stulb e po-golqm ot broq na - elementi ot dosega6niq stulb s nai-mn (-) elementi
		if(count > maxCount)
		{
			//Ako e vqrno
			//zapisvam noviq broi na nai mnogo - elementi ot stulb ot matricata
			maxCount = count;
			//zapisvam novata poziciqna teku6tiq stulb, koito sudurja nai-golqm broi - elementi
			position = j;
		}
		count = 0; //nuliram broq4a, za da po4ne broeneto na elementi za noviq stulb ot nula (0)
	}
	return position; //vra6tam poziciqta na stulba s nai-mnogo - elementi ot matricata
}

/* 
 * Zada4a 4.7
 * Funckciq, koqto smenq stulb s opredelena poziciq, sas purviq (nuleviq) stalb v matricata
 * priema parametar dvumeren masiv (matricata)	i poziciqta na stulbat, koito trqbva da si smeni mqstoto sas parviq(nuleviq) stalb
 * void funkciq, sledovatelno ne vra6ta ni6to
 */
void swapCol(int a[][WIDTH], int pos)
{
	int t; //promenliva, koqto da durji vremenno teku6tiq element
	//cikul, koito obhojda matricata po redove, i za vseki red razmenq mestata na element ot parviq(nuleviq) stalb
	//i stalba sas zadadena poziciq "pos"
	for(int i = 0; i < HEIGHT ; i++)
	{
		t = a[i][0]; //zapisvame vremenno teku6tiq element ot purviq (nuleviq) stalb
		a[i][0] = a[i][pos]; //prezapisvame elementa ot parviq(nuleviq) stalb sas suotvetniq element ot zadadeniq stalb s poziciq "pos"
		a[i][pos] = t; //prezapisvame stoinostta ot purviq (nuleviq) stalb na mqstoto na suotvetniq element v stalba s poziciq "pos"
	}
}

/* 
 * Zada4a 4.7
 * Funckciq, koqto smenq red s opredelena poziciq, sas purviq (nuleviq) red v matricata
 * priema parametar dvumeren masiv (matricata)	i poziciqta na redut, koito trqbva da si smeni mqstoto sas parviq(nuleviq) red
 */
void swapRow(int a[][WIDTH], int pos)
{
	int t; //promenliva, koqto da durji vremenno teku6tiq element
	//cikul, koito obhojda matricata po Stulbove, i za vseki stulb razmenq mestata na element ot parviq(nuleviq) red
	//i reda sas zadadena poziciq "pos"
	for(int j = 0; j < WIDTH ; j++)
	{
		t = a[0][j]; //zapisvame vremenno teku6tiq element ot purviq (nuleviq) red
		a[0][j] = a[pos][j]; //prezapisvame elementa ot parviq(nuleviq) red sas suotvetniq element ot zadadeniq red s poziciq "pos"
		a[pos][j] = t;  //prezapisvame stoinostta ot purviq (nuleviq) red na mqstoto na suotvetniq element v reda s poziciq "pos"
	}
}

/* Glavna funkciq main() */
int main()
{
	//deklarirane na matricata sus suotvetnite razmeri opredeleni ot globalnite konstanti
	int matrix[HEIGHT][WIDTH];
	
	//izvikvame funkciq "open" ot stream-a za 4etene na fail, kato i podavame kato parametar, kade se namira faila
	// ".." ozna4avat varni se edna direktoriq nagore i tam tarsi faila
	// izpolzvate se dve '\' za6toto tova e specialen znak i ako e samo edno nqma da bude razbrano
	inFile.open("input1.txt");

	//izvikvame funkciq "open" ot stream-a za pisane vav fail, kato i podavame kato parametar, kade se namira faila
	//ako faila ne su6testvuva, funkciqta 6te go suzdade avtomati4no
	outFile.open("output.txt");

	//Proverqvam dali faila e uspe6no nameren, i ako ne e izpisvam gre6ka i izlizam ot programata
	if (!inFile.is_open())
	{
		cout << "Error! Could not open input file!\nExiting...\n";
		cout << "Please press enter to exit.\n";
		getchar();
		return 1;
	}

	//Pulnq matricata s elementite ot textoviq fail s operatora ">>"
	//Obhojdam textoviq fail s dvata for cikula i za vseki element ot textoviq fail go slagam v matricata
	for(int i = 0; i < HEIGHT; i++)
	{
		for(int j = 0; j < WIDTH; j++)
		{
		   inFile>>matrix[i][j];
		}
	}
		
	cout << "Displaying the original matrix: " << "\n"; //printiram suob6tenie v consolata
	outFile << "Displaying the original matrix: " << "\n"; //printiram(pi6a) suob6tenie vav faila za rezultati

	printMatrix(matrix); //printiram matricata na consolata i vav faila za rezultati

	//printiram (v conzola i faila) rezultata ot
	//Zada4a 4.8
	//Funckciq, koqto namira sumata ot minimumite po redove v matricata.
	//funkciq sumMinRows() katoi podavam parametar matricata - matrix, koqto ve4e e napulnena s elementite ot input faila
	cout << "The sum of the minimums of the rows in matrix is: " << sumMinRows(matrix) << "\n";
	outFile << "The sum of the minimums of the rows in matrix is: " << sumMinRows(matrix) << "\n";

	//printiram (v conzola i faila) rezultata ot
	//Zada4a 4.8
	//Funckciq, koqto namira proizvedenieto ot maximumite po kolonite v matricata.
	//funkciq multMaxColumns() katoi podavam parametar matricata - matrix, koqto ve4e e napulnena s elementite ot input faila
	cout << "The multiplication of the maximums of the columns in matrix is: " << multMaxColumns(matrix) << "\n";
	outFile << "The multiplication of the maximums of the columns in matrix is: " << multMaxColumns(matrix) << "\n";

	//debug info
	cout << "The row with the most positive elements is: " << rowMaxPos(matrix) <<"\n";
	outFile << "The row with the most positive elements is: " << rowMaxPos(matrix) <<"\n";

	//debug info
	cout << "The column with the most negative elements is: " << columnMaxNeg(matrix) <<"\n";
	outFile << "The column with the most negative elements is: " << columnMaxNeg(matrix) <<"\n";

	//vikam funkciqta swapRow(), kato i podavam za parametri matricata i
	//rezultata () na funkciqta rowMaxPos(), koqto su6to ima za parametar matricata, no tq vra6ta poziciqta na
	// reda, reda koito sadurja nai-mnogo polojitelni elementi, koito trqbva da bude smenen sas parviq red v matricata 
	int positionA = rowMaxPos(matrix);
	swapRow(matrix, positionA);
	cout << "The matrix with swapped rows: \n";
	outFile << "The matrix with swapped rows: \n";
	printMatrix(matrix);

	//vikam funkciqta swapRow(), kato i podavam za parametri matricata i
	//rezultata () na funkciqta rowMaxPos(), koqto su6to ima za parametar matricata, no tq vra6ta poziciqta na

 	//stulb, koito sadurja nai-mnogo otricatelni elementi), koito trqbva da bude smenen sas parviq stulb v matricata (stulb(kolona)
	int positionB = columnMaxNeg(matrix);
	swapCol(matrix, positionB);
	cout << "The matrix with swapped columns: \n";
	outFile << "The matrix with swapped columns: \n";
	printMatrix(matrix);

	inFile.close(); //zatvarqme stream-a za 4etene na fail ina4e 6te se polu4i izti4ane na pamet
	outFile.close(); //zatvarqme stream-a za pisane na fail ina4e 6te se polu4i izti4ane na pamet

	cout << "Please press the Enter key to exit the program." << "\n";
	getchar(); //4aka natiskaneto na "enter" butona

	return 0; //uspe6no izlizane ot programata
}
```

example c++ matrix input:

```text
-1 -2 3
 4  5 6
 7 -8 9
```

---
