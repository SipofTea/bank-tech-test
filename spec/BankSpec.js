describe("Bank", () => {
  var Bank = require('../src/Bank');
  var bank;
  
  beforeEach( () => {
    bank = new Bank();
  });

  it("can display balance", function() {
    expect(bank.balance()).toBe(1000);
  })
})