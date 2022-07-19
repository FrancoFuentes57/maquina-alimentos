//Compra Individual
class Purchase {
  constructor(product, payment, change, operations) {
    this.product = product;
    this.payment = payment;
    this.change = change;
    this.operations = operations;
  }
}

module.exports = Purchase;
