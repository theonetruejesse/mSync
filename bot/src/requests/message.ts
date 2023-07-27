import axios from "axios";

// requests to the msync /message endpoints

const DISCORD_PLATFORM = 2; // see mSync/server/src/types/platform
export const sendMessage = async (data: any) => {
  const options = {
    method: "POST",
    url: `${process.env.BACKEND_URL}/message/send/${DISCORD_PLATFORM}`,
    data,
  };
  const response = await axios.request(options);
  return response.data;
};
