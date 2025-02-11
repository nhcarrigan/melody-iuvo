/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  ApplicationIntegrationType,
  SlashCommandBuilder,
  InteractionContextType,
} from "discord.js";

const command = new SlashCommandBuilder().
  setContexts(
    InteractionContextType.BotDM,
    InteractionContextType.Guild,
    InteractionContextType.PrivateChannel,
  ).
  setIntegrationTypes(ApplicationIntegrationType.UserInstall).
  setName("redescribe").
  setDescription("Update the description for a task.").
  addIntegerOption((option) => {
    return option.
      setName("number").
      setDescription("The number of the task you wish to update.").
      setRequired(true).
      setMinValue(1);
  }).
  addStringOption((option) => {
    return option.
      setName("description").
      setDescription("The new description for your task").
      setMaxLength(2048).
      setRequired(true);
  });

// eslint-disable-next-line no-console -- We don't need our logger here as this never runs in production.
console.log(JSON.stringify(command.toJSON()));
