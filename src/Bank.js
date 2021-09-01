class Bank {
  #balance = 0;
  #paymentHistory = []; 

  statement() {
    console.log("date || credit || debit || balance");

    if (this.#paymentHistory.length === 0) {
      this.#printEmptyHistory();
      return;
    }

    this.#paymentHistory.reverse().forEach((entry) => {
      this.#printHistoryEntry(entry);
    });
  }

  #printEmptyHistory() {
    const time = this.#returnTime();
    const date = new Date(time).toLocaleDateString();
    console.log(`${date} || || || 0`);
  }

  #printHistoryEntry(entry) {
    const date = new Date(entry.date).toLocaleDateString();
    switch (entry.type) {
      case "credit":
        console.log(`${date} || ${entry.amount} || || ${entry.balance}`);
        break;
      case "debit":
        console.log(`${date} || || ${entry.amount} || ${entry.balance}`);
    }
  }

  #returnTime() {
    return new Date().getTime();
  }

  deposit(amount) {
    this.#balance += amount;
    this.#paymentHistory.push({
      date: this.#returnTime(),
      amount: amount,
      type: "credit",
      balance: this.#balance,
    });
  }

  withdraw(amount) {
    if (this.#balance - amount < 0) {
      console.log(`Sorry, you do not have enough funds in your account.`);
      return;
    }
    this.#balance -= amount
    this.#paymentHistory.push({
      date: this.#returnTime(),
      amount: amount,
      type: "debit",
      balance: this.#balance,
    });
  }
}