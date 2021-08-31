class Bank {
  constructor() {
    this.balance = 0;
    this.credits = [];
  };

  statement() {
    return this.balance;
  };

  deposit(amount) {
    this.balance += amount
    this.credits.push({amount: amount});
  };
};

if (typeof module !== 'undefined') module.exports = Bank;
