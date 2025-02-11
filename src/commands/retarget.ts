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
  setName("retarget").
  setDescription("Update the due date for a task.").
  addIntegerOption((option) => {
    return option.
      setName("number").
      setDescription("The number of the task you wish to update.").
      setRequired(true).
      setMinValue(1);
  }).
  addStringOption((option) => {
    return option.
      setName("due-date").
      setDescription("The date this task is due in YYYY/MM/DD format").
      setRequired(false).
      setMinLength(10).
      setMaxLength(10);
  });

// eslint-disable-next-line no-console -- We don't need our logger here as this never runs in production.
console.log(JSON.stringify(command.toJSON()));
