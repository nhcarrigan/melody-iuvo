/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */
import { EmbedBuilder, type ColorResolvable } from "discord.js";
import { priorityNames } from "../config/priorityNames.js";
import { statusNames } from "../config/statusNames.js";
import type { Priority } from "../interfaces/priority.js";
import type { Status } from "../interfaces/status.js";
import type { Tasks } from "@prisma/client";

const colours: Record<Status, ColorResolvable> = {
  "complete":    0x00_FF_00,
  // eslint-disable-next-line @typescript-eslint/naming-convention -- matching the status names.
  "in-progress": 0xFF_77_00,
  // eslint-disable-next-line @typescript-eslint/naming-convention -- matching the status names.
  "in-review":   0xFF_FF_00,
  "todo":        0xFF_00_00,
};

/**
 * Generates a Discord embed for a task.
 * @param task -- The task record from the database.
 * @returns An EmbedBuilder.
 */
export const generateTaskEmbed = (task: Tasks): EmbedBuilder => {
  const embed = new EmbedBuilder();
  embed.setTitle(task.title);
  embed.setDescription(task.description);
  embed.addFields(
    {
      inline: true,
      name:   "Category",
      value:  task.category,
    },
    {
      inline: true,
      name:   "Status",
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Totally being lazy here.
      value:  statusNames[task.status as Status],
    },
    {
      inline: true,
      name:   "Priority",
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Totally being lazy here.
      value:  priorityNames[task.priority as Priority],
    },
    {
      inline: true,
      name:   "Due Date",
      value:  task.dueAt.toLocaleDateString("en-GB"),
    },
    {
      inline: true,
      name:   "Created At",
      value:  task.createdAt.toLocaleDateString("en-GB"),
    },
    {
      inline: true,
      name:   "Updated At",
      value:  task.updatedAt.toLocaleDateString("en-GB"),
    },
  );
  embed.setFooter({
    text: `Task #${task.number.toString()}`,
  });
  embed.setColor(task.status in colours
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- We narrowed it smh.
    ? colours[task.status as Status]
    : 0x00_00_00);
  return embed;
};
