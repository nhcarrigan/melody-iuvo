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
 * Updates the description of a task.
 * @param interaction -- The interaction payload from Discord.
 */
export const retitle = async(
  interaction: ChatInputCommandInteraction,
): Promise<void> => {
  try {
    await interaction.deferReply({ flags: [ MessageFlags.Ephemeral ] });
    const sub = await isSubscribed(interaction);
    if (!sub) {
      return;
    }

    const number = interaction.options.getInteger("number", true);
    const title = interaction.options.getString("title", true);

    const task = await database.tasks.findUnique({
      where: {
        // eslint-disable-next-line @typescript-eslint/naming-convention -- Index mapping.
        userId_number: {
          number: number,
          userId: interaction.user.id,
        },
      },
    });

    if (task === null) {
      await interaction.editReply({ content: `You do not have a task with the number ${number.toString()}.` });
      return;
    }

    const updated = await database.tasks.update({
      data: {
        title,
      },
      where: {
        // eslint-disable-next-line @typescript-eslint/naming-convention -- Index mapping.
        userId_number: {
          number: number,
          userId: interaction.user.id,
        },
      },
    });

    await interaction.editReply({
      content: `Retitled task #${updated.number.toString()}:`,
      embeds:  [ generateTaskEmbed(updated) ],
    });
  } catch (error) {
    await replyToError(interaction);
    if (error instanceof Error) {
      await logger.error("retitle command", error);
    }
  }
};
