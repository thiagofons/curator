module.exports = {
  prompt: ({ inquirer }) => {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Qual é o nome do microsserviço? (ex: identity, billing, ...)",
      },
    ]);
  },
};
