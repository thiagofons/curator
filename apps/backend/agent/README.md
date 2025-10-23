# OpenAI Assistant Template

This repository contains a template for creating an OpenAI Assistant in TypeScript. It provides a basic structure and guidelines to help you set up and customize your own assistant using OpenAI's API.

## Features

- Basic setup for an OpenAI Assistant
- Customizable prompts and responses
- Example code for integrating with OpenAI's API
- Instructions for running the assistant

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/thiagofons/openai-assistant-template.git
```

2. Install the required dependencies:

```bash
cd openai-assistant-template
npm install
```

3. Set up your OpenAI API key:

- Create a `.env` file in the root directory
- Add your API key to the `.env` file:

  ```
  OPENAI_API_KEY=your_api_key_here
  ```

4. Run the assistant:

```bash
npm run start
```

## Usage

Customize the prompt in the `index.ts` file to suit your needs. 

You can also build your own tools in the `tools` folder. You just need to import it in `tools` record that is being exported in `allTools.ts` file.

Refer to the OpenAI API documentation for more details on how to use the API effectively.

## Contributing

Feel free to submit issues and pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.

## Acknowledgements

Special thanks to [Jarrod Watts](https://github.com/jarrodwatts) for his contributions and support.

For more information, check out this [video](https://youtu.be/xjRqmy6p1-c).
