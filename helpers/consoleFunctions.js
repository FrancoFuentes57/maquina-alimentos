const inquirer = require("inquirer");
require("colors");

const menuOptions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué deseas hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Realizar compra`,
      },
      {
        value: "2",
        name: `${"2.".green} Ver resumen de compras`,
      },
      {
        value: "3",
        name: `${"3.".green} Salir`,
      },
    ],
  },
];

const setMenu = async (name) => {
  console.clear();
  console.log("==========================".green);
  console.log(`¡Bienvenido, ${name}!`.white);
  console.log("==========================\n".green);

  const { opcion } = await inquirer.prompt(menuOptions);

  return opcion;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"enter".green} para continuar`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);
};

const readInput = async (message, type) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        // Validar valor vacio
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        // Validar productos existentes
        if (type === "Product" && !["A", "B", "C"].includes(value)) {
          return "Productos disponibles: 'A', 'B' y 'C'";
        }
        // Validar monedas disponibles
        if (type === "Coin" && ![10, 50, 100].includes(+value)) {
          return "Monedas disponibles: $10, $50 y $100";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

module.exports = {
  setMenu,
  pause,
  readInput,
};
