describe("Bank", () => {
  var Bank = require('../src/Bank');
  var bank;
  var testTime = new Date(2012, 12, 12);
  var testTimeMilli = 1357948800000;

  beforeEach( () => {
    bank = new Bank();
  });

  it("can display balance", () => {
    expect(bank.statement()).toBe(0);
  })

  describe("with a deposit of 1000", () => {
    afterEach( () => {
      jasmine.clock().uninstall()
    })

    beforeEach( () => {
      jasmine.clock().install()
      jasmine.clock().mockDate(testTime);
      bank.deposit(1000);
    });

    it("can deposit into account", () => {
      expect(bank.balance).toBe(1000);
    })
  
    it("with balance will display current balance", () => {
      expect(bank.statement()).toBe(1000);
    })

    it("records deposit amount as credit entry", () => {
      expect(bank.credits).toEqual(jasmine.arrayContaining([{date: testTimeMilli, amount: 1000}]))
    })

    it("records credit entry with today's timestamp (in milliseconds)", () => {
      expect(bank.credits).toEqual(jasmine.arrayContaining([{date: testTimeMilli, amount: 1000}]))
    })
  })
})
