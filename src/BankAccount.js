class BankAccount {
  #balance = 0;
  #paymentHistory = [];

  printStatement() {
    console.log("date || credit || debit || balance");
    let currentHistory = this.#paymentHistory.slice();
    if (currentHistory.length === 0) {
      this.#printEmptyHistory();
    } else {
      currentHistory.reverse().forEach((entry) => {
        console.log(entry.print());
      });
    }
  }

  #printEmptyHistory() {
    const time = this.#returnTime();
    const date = new Date(time).toLocaleDateString();
    console.log(`${date} || || || 0`);
  }

  #returnTime() {
    return new Date().getTime();
  }

  deposit(amount) {
    this.#balance += amount;
    let transaction = new Transaction(
      this.#returnTime(),
      amount,
      "credit",
      this.#balance
    );
    this.#paymentHistory.push(transaction);
  }

  withdraw(amount) {
    if (this.#balance - amount < 0) {
      console.log(`Sorry, you do not have enough funds in your account.`);
      return;
    }
    this.#balance -= amount;
    let transaction = new Transaction(
      this.#returnTime(),
      amount,
      "debit",
      this.#balance
    );
    this.#paymentHistory.push(transaction);
  }
}
