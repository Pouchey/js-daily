import { Collection, GuildMember } from "discord.js";
import { UserType } from "../types/player";


export const getUsers = async (users: Collection<string, GuildMember>) => {
  const usersName: UserType[] = [];

  console.log(users);
  users.forEach((user) => {
    return usersName.push(
      {
        id: user.id,
        name: user.displayName,
      });
  });
  return usersName;
}