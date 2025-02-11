/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import type { Priority } from "../interfaces/priority.js";
import type { APIApplicationCommandOptionChoice } from "discord.js";

export const priorityChoices: Array<APIApplicationCommandOptionChoice<Priority>>
  = [
    { name: "None", value: "none" },
    { name: "Low", value: "low" },
    { name: "Medium", value: "medium" },
    { name: "High", value: "high" },
    { name: "Critical", value: "critical" },
  ];
