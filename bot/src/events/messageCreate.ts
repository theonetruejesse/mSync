import { constructMessage } from "../utils/constructMessage";
import { getChannel, getRole, getUser, sendMessage } from "../requests/message";
import { Event } from "../structures/Event";

// todo, error handling for users not in the db
export default new Event("messageCreate", async (message) => {
  const channelId = message.channelId;
  const senderId = message.author.id;

  const sender = await getUser(senderId);
  const role = await getRole(sender.roleId);

  const newMessage = constructMessage({
    firstName: sender.firstName,
    message: message.content,
    roleName: role.name,
  });

  const chatMembers = await getChannel(channelId);
  chatMembers.forEach(async (reciever) => {
    if (reciever.phoneNumber && reciever.phoneNumber != sender.phoneNumber) {
      await sendMessage(reciever.phoneNumber, newMessage);
    }
  });
});
