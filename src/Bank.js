class Bank {
  constructor() {
    this.balance = 0;
    this.credits = [];
  };

  statement() {
    return this.balance;
  };

  returnTime() {
    return new Date().getTime()
  };

  deposit(amount) {
    this.balance += amount
    this.credits.push({date: this.returnTime(), amount: amount});
  };
};

if (typeof module !== 'undefined') module.exports = Bank;
