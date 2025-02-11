/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */
import { MessageFlags, type ChatInputCommandInteraction } from "discord.js";
import { database } from "../db/database.js";
import { generateTaskEmbed } from "../utils/generateTaskEmbed.js";
import { isSubscribed } from "../utils/isSubscribed.js";
import { logger } from "../utils/logger.js";
import { replyToError } from "../utils/replyToError.js";

/**
 * Fetches all non-complete tasks for the user and sends them in a list.
 * @param interaction -- The interaction payload from Discord.
 */
export const list = async(
  interaction: ChatInputCommandInteraction,
): Promise<void> => {
  try {
    await interaction.deferReply({ flags: [ MessageFlags.Ephemeral ] });
    const sub = await isSubscribed(interaction);
    if (!sub) {
      return;
    }

    const tasks = await database.tasks.findMany({
      where: {
        status: {
          not: "complete",
        },
        userId: interaction.user.id,
      },
    });
    if (tasks.length === 0) {
      await interaction.editReply({
        content: "You have no upcoming tasks. Great work!",
      });
      return;
    }
    tasks.sort((a, b) => {
      return a.dueAt.getTime() - b.dueAt.getTime();
    });

    const firstTen = tasks.slice(0, 10);

    await interaction.editReply({
      content: "Here are your top upcoming tasks:",
      embeds:  firstTen.map((task) => {
        return generateTaskEmbed(task);
      }),
    });
  } catch (error) {
    await replyToError(interaction);
    if (error instanceof Error) {
      await logger.error("list command", error);
    }
  }
};
