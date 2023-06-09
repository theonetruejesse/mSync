import axios from "axios";

interface SendDiscordMessage {
  channelId: string;
  message: string;
}

export const sendDiscord = async (m: SendDiscordMessage) => {
  const options = {
    method: "POST",
    url: `${process.env.DISCORD_API_URL}/channels/${m.channelId}/messages`,
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    },
    data: { content: m.message },
  };
  const response = await axios.request(options);
  return response.data;
};
