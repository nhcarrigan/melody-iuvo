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
import { statusChoices } from "../config/statusChoices.js";

const command = new SlashCommandBuilder().
  setContexts(
    InteractionContextType.BotDM,
    InteractionContextType.Guild,
    InteractionContextType.PrivateChannel,
  ).
  setIntegrationTypes(ApplicationIntegrationType.UserInstall).
  setName("create").
  setDescription("Create a new task").
  addStringOption((option) => {
    return option.
      setName("title").
      setDescription("The title for your task").
      setMaxLength(256).
      setRequired(true);
  }).
  addStringOption((option) => {
    return option.
      setName("description").
      setDescription("The description for your task").
      setMaxLength(2048).
      setRequired(true);
  }).
  addStringOption((option) => {
    return option.
      setName("status").
      setDescription("The status for your task").
      setChoices(statusChoices).
      setRequired(true);
  }).
  addStringOption((option) => {
    return option.
      setName("priority").
      setDescription("The priority for your task").
      setChoices(priorityChoices).
      setRequired(true);
  }).
  addStringOption((option) => {
    return option.
      setName("category").
      setDescription("The category for your task").
      setRequired(true).
      setMaxLength(1024);
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
