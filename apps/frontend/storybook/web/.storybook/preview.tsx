import "@repo/ui-web/globals.css";
import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="font-sans antialiased">
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');
          :root {
            --font-primary: 'Lexend', sans-serif;
          }
        `}{" "}
        </style>
        <Story />
      </div>
    ),
  ],
};

export default preview;
