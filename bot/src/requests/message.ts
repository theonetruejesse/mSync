import axios from "axios";

// todo, migrate to trpc
interface User {
  id: number;
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  discordId?: string;
  channelId: string;
  roleId: number;
}
interface Role {
  id: number;
  name: string;
}

export const getUser = async (discordId: string): Promise<User> => {
  const options = {
    method: "GET",
    url: `${process.env.BACKEND_URL}/message/users?discordId=${discordId}`,
  };
  const response = await axios.request(options);
  return response.data[0];
};

export const getRole = async (roleId: string | number): Promise<Role> => {
  const options = {
    method: "GET",
    url: `${process.env.BACKEND_URL}/message/roles/${roleId}`,
  };
  const response = await axios.request(options);
  return response.data;
};

export const getChannel = async (channelId: string): Promise<User[]> => {
  const options = {
    method: "GET",
    url: `${process.env.BACKEND_URL}/message/channels/${channelId}`,
  };
  const response = await axios.request(options);
  return response.data as User[];
};

export const sendMessage = async (phoneNumber: string, message: string) => {
  const options = {
    method: "POST",
    url: `${process.env.BACKEND_URL}/message/send/`,
    data: { phoneNumber, message },
  };
  const response = await axios.request(options);
  return response.data;
};
