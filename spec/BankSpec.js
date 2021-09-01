describe("Bank", () => {
  var Bank = require("../src/Bank");
  var bank;
  var testTime = new Date(2012, 11, 12);
  var testTimeMilli = 1355270400000;

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(testTime);
    bank = new Bank();
  });

  it("shows statement with balance 0 when no payments have been made", () => {
    spyOn(console, "log");
    bank.statement();
    expect(console.log).toHaveBeenCalledWith(
      "date       || credit || debit || balance"
    );
    expect(console.log).toHaveBeenCalledWith("12/12/2012 || || || 0");
  });

  describe("with a deposit of 1000", () => {
    beforeEach(() => {
      bank.deposit(1000);
    });

    it("deposit updates balance", () => {
      expect(bank.balance).toBe(1000);
    });

    it("records deposit amount as credit entry with today's timestamp (in milliseconds)", () => {
      expect(bank.paymentHistory).toEqual(
        jasmine.arrayContaining([
          { date: testTimeMilli, amount: 1000, type: "credit", balance: 1000 },
        ])
      );
    });

    it("shows statement with date, deposit, and balance", () => {
      spyOn(console, "log");
      bank.statement();
      expect(console.log).toHaveBeenCalledWith(
        "date       || credit || debit || balance"
      );
      expect(console.log).toHaveBeenCalledWith("12/12/2012 || 1000 || || 1000");
    });

    it("shows correct statement after withdrawal", () => {
      const spy = spyOn(console, "log");
      bank.withdraw(500);
      bank.statement();
      expect(spy.calls.first().args).toEqual(["date       || credit || debit || balance"]);
      expect(spy.calls.argsFor(1)).toEqual(["12/12/2012 || || 500 || 500"]);
      expect(spy.calls.mostRecent().args).toEqual(["12/12/2012 || 1000 || || 1000"]);
    });
  });

  describe("with a withdrawal of 1000", () => {
    it("cannot withdraw from account to below 0", () => {
      bank.withdraw(1000);
      expect(bank.balance).toBe(0);
    });

    it("shows 'cannot withdraw message", () => {
      spyOn(console, "log");
      bank.withdraw(1000);
      expect(console.log).toHaveBeenCalledWith(
        "Sorry, you do not have enough funds in your account."
      );
    });
  });
});
