import { Collection, GuildMember } from "discord.js";
import { UserType } from "../types/player";


export const getUsers = async (users?: Collection<string, GuildMember>) => {
  if (!users) return [];

  const usersName: UserType[] = [];

  users.forEach((user) => {
    return usersName.push(
      {
        id: user.id,
        name: user.user.username,
      });
  });
  return usersName;
}