/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { execSync } from "node:child_process";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageFlags,
  type ChatInputCommandInteraction,
} from "discord.js";
import { logger } from "../utils/logger.js";
import { replyToError } from "../utils/replyToError.js";

/**
 * Responds with information about the bot.
 * @param interaction -- The interaction payload from Discord.
 */
// eslint-disable-next-line max-lines-per-function -- Refactor at a later time.
export const about = async(
  interaction: ChatInputCommandInteraction,
): Promise<void> => {
  try {
    await interaction.deferReply({ flags: [ MessageFlags.Ephemeral ] });

    const version = process.env.npm_package_version ?? "Unknown";
    const commit = execSync("git rev-parse --short HEAD").toString().
      trim();

    const embed = new EmbedBuilder();
    embed.setTitle("About Melody Iuvo");
    embed.setDescription(
    // eslint-disable-next-line stylistic/max-len -- It's a long string.
      "Melody Iuvo is a Discord bot that allows you to track your tasks, deadlines, plans, and other goals. To use the bot, type `/` and select one of her commands!",
    );
    embed.addFields(
      {
        name:  "Running Version",
        value: version,
      },
      {
        name:  "Current Commit",
        value: commit,
      },
    );

    const supportButton = new ButtonBuilder().
      setLabel("Need help?").
      setStyle(ButtonStyle.Link).
      setURL("https://chat.nhcarrigan.com");
    const sourceButton = new ButtonBuilder().
      setLabel("Source Code").
      setStyle(ButtonStyle.Link).
      setURL("https://git.nhcarrigan.com/nhcarrigan/melody-iuvo");
    const subscribeButton = new ButtonBuilder().
      setStyle(ButtonStyle.Premium).
      setSKUId("1338755540397985873");
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      supportButton,
      sourceButton,
      subscribeButton,
    );

    await interaction.editReply({
      components: [ row ],
      embeds:     [ embed ],
    });
  } catch (error) {
    await replyToError(interaction);
    if (error instanceof Error) {
      await logger.error("about command", error);
    }
  }
};
