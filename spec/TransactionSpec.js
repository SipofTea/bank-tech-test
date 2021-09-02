describe('Transaction', () => {
  let transaction
  const testTime1 = new Date(2012, 0, 10)

  it('has date, amount, type, and balance', () => {
    transaction = new Transaction(testTime1, 500, 'debit', 500)
    expect(transaction.date).toBe(testTime1)
    expect(transaction.amount).toBe(500)
    expect(transaction.type).toBe('debit')
    expect(transaction.balance).toBe(500)
  })

  it('prints itself', () => {
    transaction = new Transaction(testTime1, 500, 'debit', 500)
    expect(transaction.print()).toBe('10/01/2012 || || 500 || 500')
  })
})
