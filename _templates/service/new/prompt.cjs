module.exports = {
  prompt: ({ inquirer }) => {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message:
          "What is the microservice PACKAGE name? (ex: identity, billing, ...)",
        validate: (str) => str.length > 0,
      },
      {
        type: "input",
        name: "formalName",
        message:
          "What is the microservice FORMAL name? (ex: Identity, Billing, ...)",
        validate: (str) => str.length > 0,
      },
      {
        type: "input",
        name: "description",
        message:
          "Can you provide a DESCRIPTION for the microsservice (optional)?",
      },
      {
        type: "select",
        name: "database",
        message: "What DATABASE it will be using?",
        choices: ["PostgreSQL", "MongoDB"],
        validate: (str) => str.length > 0,
      },
      {
        type: "input",
        name: "port",
        message: "Which PORT it will be running?",
        validate: (str) => str.length > 0,
      },
    ]);
  },
};
