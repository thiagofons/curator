import axios from "axios";

type Data = {
  name: string;
  email: string;
  interest: string;
};

export async function sendForm(data: Data): Promise<void> {
  const content = `New lead! \n\nName: ${data.name}\nEmail: ${data.email}\nInterest: ${data.interest}`;

  const response = await axios.post(process.env.DISCORD_WEBHOOK_URL as string, {
    content,
  });

  if (response.status !== 204) {
    throw new Error("Failed to send form data to Discord webhook");
  }
}
