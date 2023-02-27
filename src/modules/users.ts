import { Collection, GuildMember } from "discord.js";


export const getUsersName = async (users: Collection<string, GuildMember>) => {
  const usersName: string[] = [];
  users.forEach((user) => {
    usersName.push(user.user.username);
  });
  return usersName;
}