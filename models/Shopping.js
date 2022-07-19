const Purchase = require("./Purchase");
const { products } = require("../config/config");
const { getArrayTotal } = require("../helpers/appHelpers");

//Compras del sistema
class Shopping {
  //Lista de todas las compras
  shoppingList;

  constructor() {
    this.shoppingList = [];
  }

  //-- Métodos

  // Guardar compra en historial
  savePurchase(product, payment, changeInfo) {
    const { change, operations } = changeInfo;
    const purchase = new Purchase(product, payment, change, operations);
    this.shoppingList.push(purchase);
  }

  // Obtener datos del producto seleccionado
  getProductInfo(product) {
    const information = products.find((item) => item.name === product);
    return information;
  }

  // Algoritmo para obtener el cambio
  getChange(price, paymentTotal) {
    let change = 0,
      acumulator = 0;
    //prettier-ignore
    let tenCoins = 0, fiftyCoins = 0, hundredCoins = 0;
    //prettier-ignore
    let splitTenCoin = [], splitFiftyCoin = [], splitHundredCoin = [];

    // Algoritmo para obtener el cambio
    change = acumulator = paymentTotal - price;
    hundredCoins = (acumulator - (acumulator % 100)) / 100;
    acumulator = acumulator % 100;
    fiftyCoins = (acumulator - (acumulator % 50)) / 50;
    acumulator = acumulator % 50;
    tenCoins = (acumulator - (acumulator % 10)) / 10;

    // Separación del cambio 1 por 1
    splitHundredCoin = this.getSpecificChange(hundredCoins, 100);
    splitFiftyCoin = this.getSpecificChange(fiftyCoins, 50);
    splitTenCoin = this.getSpecificChange(tenCoins, 10);

    return {
      change: [...splitHundredCoin, ...splitFiftyCoin, ...splitTenCoin],
      operations: tenCoins + fiftyCoins + hundredCoins,
    };
  }

  // Crear arreglo de monedas individuales para el cambio
  getSpecificChange(number, coin) {
    return Array(number).fill(coin);
  }

  //Impresión del ticket de cada compra
  printPurchase(purchase, index) {
    //prettier-ignore
    const {product:{name,price}, payment, change, operations} = purchase;
    console.log("------------------------");
    console.log(`Orden #${index}`);
    console.log(`Producto: ${name}`);
    console.log(`Precio: $${price}`);
    console.log(`Total pagado: $${getArrayTotal(payment)}`);
    console.log(`Total cambio: $${getArrayTotal(change)}`);
    console.log(`Operaciones para el cálculo: ${operations}`);
    console.log("------------------------\n");
  }
}

module.exports = Shopping;
