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
import { priorityChoices } from "../config/priorityChoices.js";

const command = new SlashCommandBuilder().
  setContexts(
    InteractionContextType.BotDM,
    InteractionContextType.Guild,
    InteractionContextType.PrivateChannel,
  ).
  setIntegrationTypes(ApplicationIntegrationType.UserInstall).
  setName("reprioritise").
  setDescription("Update the priority for a task.").
  addIntegerOption((option) => {
    return option.
      setName("number").
      setDescription("The number of the task you wish to update.").
      setRequired(true).
      setMinValue(1);
  }).
  addStringOption((option) => {
    return option.
      setName("priority").
      setDescription("The priority for your task").
      setChoices(priorityChoices).
      setRequired(true);
  });

// eslint-disable-next-line no-console -- We don't need our logger here as this never runs in production.
console.log(JSON.stringify(command.toJSON()));
