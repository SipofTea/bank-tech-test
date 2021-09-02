describe('Bank', () => {
  let bank
  const testTime1 = new Date(2012, 0, 10)
  const testTime2 = new Date(2012, 0, 13)
  const testTime3 = new Date(2012, 0, 14)

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  beforeEach(() => {
    jasmine.clock().install()
    jasmine.clock().mockDate(testTime1)
    bank = new BankAccount()
  })

  it('shows statement with balance 0 when no payments have been made', () => {
    spyOn(console, 'log')
    bank.printStatement()
    expect(console.log).toHaveBeenCalledWith(
      'date || credit || debit || balance'
    )
    expect(console.log).toHaveBeenCalledWith('10/01/2012 || || || 0')
  })

  it("when withdrawing without balance shows 'cannot withdraw' message", () => {
    spyOn(console, 'log')
    bank.withdraw(1000)
    expect(console.log).toHaveBeenCalledWith(
      'Sorry, you do not have enough funds in your account.'
    )
  })

  describe('with a deposit of 1000', () => {
    beforeEach(() => {
      bank.deposit(1000)
    })

    it('shows statement with date, deposit, and balance', () => {
      spyOn(console, 'log')
      bank.printStatement()
      expect(console.log).toHaveBeenCalledWith(
        'date || credit || debit || balance'
      )
      expect(console.log).toHaveBeenCalledWith('10/01/2012 || 1000 || || 1000')
    })

    it('shows correct statement after deposit and withdrawal', () => {
      const spy = spyOn(console, 'log')
      jasmine.clock().mockDate(testTime2)
      bank.deposit(2000)
      jasmine.clock().mockDate(testTime3)
      bank.withdraw(500)
      bank.printStatement()
      expect(spy.calls.first().args).toEqual([
        'date || credit || debit || balance'
      ])
      expect(spy.calls.argsFor(1)).toEqual(['14/01/2012 || || 500 || 2500'])
      expect(spy.calls.argsFor(2)).toEqual(['13/01/2012 || 2000 || || 3000'])
      expect(spy.calls.mostRecent().args).toEqual([
        '10/01/2012 || 1000 || || 1000'
      ])
    })
  })
})
