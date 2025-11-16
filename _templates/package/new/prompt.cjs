module.exports = {
  prompt: ({ inquirer }) => {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Qual é o nome do pacote? (ex: eslint-config, lib, ...)",
      },
    ]);
  },
};
