describe("Bank", () => {
  var Bank = require('../src/Bank');
  var bank;
  
  beforeEach( () => {
    bank = new Bank();
    jasmine.clock().uninstall()
    jasmine.clock().install()
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
    var baseTime = new Date(2012, 12, 12);
    jasmine.clock().mockDate(baseTime);
    amount = 1000
    bank.deposit(amount);
    expect(bank.credits).toEqual(jasmine.arrayContaining([{date: baseTime.getTime(), amount: amount}]))
  })

  it("records credit entry with today's timestamp (in milliseconds)", () => {
    var baseTime = new Date(2012, 12, 12);
    jasmine.clock().mockDate(baseTime);
    const time = bank.time;
    bank.deposit(1000);
    expect(bank.credits).toEqual(jasmine.arrayContaining([{date: baseTime.getTime(), amount: 1000}]))
  })
})
