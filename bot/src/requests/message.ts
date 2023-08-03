import axios from "axios";

// requests to the msync /message endpoints

const DISCORD_PLATFORM = 2; // see mSync/server/src/types/platform
export const sendMessage = async (data: any) => { // todo: specify data input type (see below)
  const options = {
    method: "POST",
    url: `${process.env.BACKEND_URL}/message/send/${DISCORD_PLATFORM}`,
    data,
  };
  const response = await axios.request(options);
  return response.data;
};

export async function createUser(data: {
  firstName: string,
  lastName: string
}) {
  const res = await axios.request({
    method: "POST",
    url: `${process.env.BACKEND_URL}/message/user`,
    data,
  });
  return res.data;
}

export async function createParticipant(data: {
  channelId: string,
  messagingId: string,
  platformId: number,
  roleId: number,
  userId: number
}) {
  const res = await axios.request({
    method: "POST",
    url: `${process.env.BACKEND_URL}/message/participant`,
    data,
  });
  return res.data;
};
