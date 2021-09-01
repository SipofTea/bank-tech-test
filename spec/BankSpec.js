describe("Bank", () => {
  let bank;
  const testTime = new Date(2012, 11, 12);

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
      "date || credit || debit || balance"
    );
    expect(console.log).toHaveBeenCalledWith("12/12/2012 || || || 0");
  });

  describe("with a deposit of 1000", () => {
    beforeEach(() => {
      bank.deposit(1000);
    });

    it("shows statement with date, deposit, and balance", () => {
      spyOn(console, "log");
      bank.statement();
      expect(console.log).toHaveBeenCalledWith(
        "date || credit || debit || balance"
      );
      expect(console.log).toHaveBeenCalledWith("12/12/2012 || 1000 || || 1000");
    });

    it("shows correct statement after withdrawal", () => {
      const spy = spyOn(console, "log");
      bank.withdraw(500);
      bank.statement();
      expect(spy.calls.first().args).toEqual([
        "date || credit || debit || balance",
      ]);
      expect(spy.calls.argsFor(1)).toEqual(["12/12/2012 || || 500 || 500"]);
      expect(spy.calls.mostRecent().args).toEqual([
        "12/12/2012 || 1000 || || 1000",
      ]);
    });
  });

  describe("when withdrawing without balance", () => {
    it("shows 'cannot withdraw message", () => {
      spyOn(console, "log");
      bank.withdraw(1000);
      expect(console.log).toHaveBeenCalledWith(
        "Sorry, you do not have enough funds in your account."
      );
    });
  });
});
