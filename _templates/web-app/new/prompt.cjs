module.exports = {
  prompt: ({ inquirer }) => {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message:
          "What is the web app PACKAGE name? (ex: my-web-app)",
        validate: (str) => str.length > 0,
      },
      {
        type: "input",
        name: "formalName",
        message:
          "What is the web app FORMAL name? (ex: My Web App)",
        validate: (str) => str.length > 0,
      },
      {
        type: "input",
        name: "description",
        message:
          "Can you provide a DESCRIPTION for the web app (optional)?",
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
