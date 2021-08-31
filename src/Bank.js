class Bank {
  constructor() {
    this.balance = 0;
  };

  statement() {
    return this.balance;
  };

  deposit(amount) {
    this.balance += amount
  };
};

if (typeof module !== 'undefined') module.exports = Bank;
