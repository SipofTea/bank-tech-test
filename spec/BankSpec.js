describe("Bank", () => {
  var Bank = require('../src/Bank');
  var bank;
  
  beforeEach( () => {
    bank = new Bank();
  });
  it("with balance will display current balance", () => {
    bank.deposit(1000);
    expect(bank.statement()).toBe(1000);
  })

  it("can display balance", () => {
    expect(bank.statement()).toBe(0);
  })

  it("can deposit into account", () => {
    bank.deposit(1000);
    expect(bank.balance).toBe(1000);
  })

  it("records deposit amount as credit entry", () => {
    amount = 1000
    bank.deposit(amount);
    expect(bank.credits).toEqual(jasmine.arrayContaining([{amount: amount}]))
  })

})