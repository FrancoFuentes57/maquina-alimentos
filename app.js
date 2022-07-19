require("colors");
// Console Functions
const { setMenu, pause, readInput } = require("./helpers/consoleFunctions");
// Clase de Compras
const Shopping = require("./models/Shopping");

//Función principal
const main = async () => {
  let option = "";
  let name = "";
  const shopping = new Shopping();

  do {
    name = await readInput("¿Cuál es tu nombre?");
  } while (!name);

  do {
    option = await setMenu(name);

    switch (option) {
      case "1":
        // Variables
        let paymentAcumulator = [];
        let paymentTotal = 0;

        // Selección de producto
        const input = await readInput("Elija el producto: ", "Product");
        const product = shopping.getProductInfo(input);

        // Pago del producto
        do {
          const coin = await readInput("Ingrese moneda: ", "Coin");
          paymentAcumulator.push(Number(coin));
          paymentTotal += Number(coin);
        } while (paymentTotal < product["price"]);

        //Generación de cambio
        const { change, operations } = shopping.getChange(
          product["price"],
          paymentTotal
        );

        if (shopping.getArrayTotal(change) > 0) {
          console.log("\nSu cambio es: \n");
          change.forEach((coin) => {
            console.log(`\t${coin}`);
          });
          console.log("------------------");
          console.log(`\n TOTAL: ${shopping.getArrayTotal(change)}`);
        }

        //Salvar compra en el historial
        shopping.savePurchase(product, paymentAcumulator, {
          change,
          operations,
        });

        break;
      case "2":
        if (shopping["shoppingList"].length > 0) {
          shopping["shoppingList"].forEach((purchase, index) =>
            shopping.printPurchase(purchase, index + 1)
          );
        } else {
          console.log("\n¡Aún no hay órdenes en tu historial!");
        }

        break;
      case "3":
        if (shopping["shoppingList"].length > 0) {
          console.log("\n\tRESUMEN DE TUS ÓRDENES\n");

          shopping["shoppingList"].forEach((purchase, index) =>
            shopping.printPurchase(purchase, index + 1)
          );
        }
        console.log("\n¡HASTA LUEGO!");

        break;
    }

    await pause();
  } while (option !== "3");
};

main();
