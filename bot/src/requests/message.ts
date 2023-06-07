import axios from "axios";
import { Platform, User, Role } from "../types/requests";
import { getPlatformQuery } from "../utils/getPlatformQuery";

// requests to the msync backend endpoints

// todo, migrate to trpc
export const getUser = async (
  platformId: string, // discordId, phoneNumber
  platform: Platform
): Promise<User> => {
  const queryType = getPlatformQuery(platform);

  const options = {
    method: "GET",
    url: `${process.env.BACKEND_URL}/message/users${queryType}${platformId}`,
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
