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

export function createUser(data: {
  firstName: string,
  lastName: string
}) {
  return axios.request({
    method: "POST",
    url: `${process.env.BACKEND_URL}/message/user`,
    data,
  }).then(i => i.data)
}

export function createParticipant(data: {
  channelId: string,
  messagingId: string,
  platformId: number,
  roleId: number,
  userId: number
}) {
  return axios.request({
    method: "POST",
    url: `${process.env.BACKEND_URL}/message/participant`,
    data,
  }).then(i => i.data)
};
