class Transaction {
  constructor (date, amount, type, balance) {
    this.date = date
    this.amount = amount
    this.type = type
    this.balance = balance
  }

  print () {
    const date = new Date(this.date).toLocaleDateString()
    switch (this.type) {
      case 'credit':
        return `${date} || ${this.amount} || || ${this.balance}`
      case 'debit':
        return `${date} || || ${this.amount} || ${this.balance}`
    }
  }
}
