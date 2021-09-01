describe("Bank", () => {
  var Bank = require('../src/Bank');
  var bank;
  var testTime = new Date(2012, 11, 12);
  var testTimeMilli = 1355270400000;

  beforeEach( () => {
    bank = new Bank();
  });

  it("shows empty statement when no payments have been made", () => {
    spyOn(console, 'log');
      bank.statement();
      expect(console.log).toHaveBeenCalledWith("date       || credit || debit || balance");
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

    it("records deposit amount as credit entry with today's timestamp (in milliseconds)", () => {
      expect(bank.paymentHistory).toEqual(jasmine.arrayContaining([{date: testTimeMilli, amount: 1000, type: "credit", balance: 1000}]))
    })

    it("shows statement with date, deposit, and balance", () => {
      spyOn(console, 'log');
      bank.statement();
      expect(console.log).toHaveBeenCalledWith("date       || credit || debit || balance");
      expect(console.log).toHaveBeenCalledWith("12/12/2012 || 1000 || || 1000");
    })

    it("shows correct statement after withdrawal", () => {
      spyOn(console, 'log');
      bank.withdraw(500);
      bank.statement();
      expect(console.log).toHaveBeenCalledWith("date       || credit || debit || balance");
      expect(console.log).toHaveBeenCalledWith("12/12/2012 || 1000 || || 1000");
      expect(console.log).toHaveBeenCalledWith("12/12/2012 || || 500 || 500");
    })
  })

  describe("with a withdrawal of 1000", () => {
    afterEach( () => {
      jasmine.clock().uninstall()
    })

    beforeEach( () => {
      jasmine.clock().install()
      jasmine.clock().mockDate(testTime);
      bank.withdraw(1000);
    });

    it("can withdraw from account", () => {
      expect(bank.balance).toBe(-1000);
    })
    it("with balance will display current balance", () => {
      spyOn(console, 'log');
      bank.statement();
      expect(console.log).toHaveBeenCalledWith("date       || credit || debit || balance");
      expect(console.log).toHaveBeenCalledWith("12/12/2012 || || 1000 || -1000");
    })
    it("records withdrawal as debit entry", () => {
      expect(bank.paymentHistory).toEqual(jasmine.arrayContaining([{date: testTimeMilli, amount: 1000, type: "debit", balance: -1000}]));
    })
  })
})
