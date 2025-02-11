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
 * Accepts the necessary properties to create a new task for the
 * user in the database.
 * @param interaction -- The interaction payload from Discord.
 */
export const create = async(
  interaction: ChatInputCommandInteraction,
): Promise<void> => {
  try {
    await interaction.deferReply({ flags: [ MessageFlags.Ephemeral ] });
    const sub = await isSubscribed(interaction);
    if (!sub) {
      return;
    }

    const title = interaction.options.getString("title", true);
    const description = interaction.options.getString("description", true);
    const dueDate = interaction.options.getString("due-date", false);
    const dueAt = new Date(dueDate ?? Date.now());
    const status = interaction.options.getString("status", true);
    const category = interaction.options.getString("category", true);
    const priority = interaction.options.getString("priority", true);

    const currentNumber = await database.tasks.count({
      where: { userId: interaction.user.id },
    });
    const number = currentNumber + 1;
    const userId = interaction.user.id;

    const task = await database.tasks.create({
      data: {
        category,
        description,
        dueAt,
        number,
        priority,
        status,
        title,
        userId,
      },
    });
    await interaction.editReply({
      content: `Task #${task.number.toString()} created: ${task.title}`,
      embeds:  [ generateTaskEmbed(task) ],
    });
  } catch (error) {
    await replyToError(interaction);
    if (error instanceof Error) {
      await logger.error("create command", error);
    }
  }
};
