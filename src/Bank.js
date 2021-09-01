class Bank {
  constructor() {
    this.balance = 0;
    this.paymentHistory = [];
  };

  statement() {
    console.log("date       || credit || debit || balance");
    
    if (this.paymentHistory.length === 0) {
      const time = this.returnTime();
      const date = new Date(time).toLocaleDateString();
      console.log(`${date} || || || 0`);
      return;
    }
    
    this.paymentHistory.forEach( entry => {
      const date = new Date(entry.date).toLocaleDateString();
      if (entry.type == "credit") {
        console.log(`${date} || ${entry.amount} || || ${entry.balance}`);
      } else {
        console.log(`${date} || || ${entry.amount} || ${entry.balance}`);
      }
    })
  };

  returnTime() {
    return new Date().getTime()
  };

  deposit(amount) {
    this.balance += amount
    this.paymentHistory.push({date: this.returnTime(), amount: amount, type: "credit", balance: this.balance});
  };

  withdraw(amount) {
    this.balance -= amount;
    this.paymentHistory.push({date: this.returnTime(), amount: amount, type: "debit", balance: this.balance});
  };
};

if (typeof module !== 'undefined') module.exports = Bank;
