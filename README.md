# Bank
This app aims to show banking behaviour where someone can deposit and withdraw money, and see their bank statement. It is written in JavaScript and uses Karma with Jasmine for testing. The project was written test first, with tests based on user behaviours. Karma was implemented to see test coverage. All methods the user shouldn't access have been made private. The program has been structured as a single class, which stores an array of all past payments. A single class approach was chosen to keep implementation simple. It can display the payments in the form of a statement.

![Working App](/images/app_working.png)

## Instructions
First run ```npm install``` in the terminal to obtain the correct packages.

To use the app execute ```open index.html``` in the console and open the browser console. The following commands can be executed:
```
///in browser console
bank = new Bank;
bank.deposit(amount);
bank.withdraw(amount);
bank.statement();
```

To run tests execute ```karma start``` in the terminal. In the browser window that opens, click 'debug'. This will show the test results. The local terminal will output the test coverage.

## Specification
### Requirements
* You should be able to interact with your code via a REPL like IRB or the JavaScript console. (You don't need to implement a command line interface that takes input from STDIN.)
* Deposits, withdrawal.
* Account statement (date, amount, balance) printing.
* Data can be kept in memory (it doesn't need to be stored to a database or anything).
### Acceptance criteria
* Given a client makes a deposit of 1000 on 10-01-2012
* And a deposit of 2000 on 13-01-2012
* And a withdrawal of 500 on 14-01-2012
* When she prints her bank statement
* Then she would see:
```
date || credit || debit || balance
14/01/2012 || || 500.00 || 2500.00
13/01/2012 || 2000.00 || || 3000.00
10/01/2012 || 1000.00 || || 1000.00
```