/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import type { Status } from "../interfaces/status.js";
import type { APIApplicationCommandOptionChoice } from "discord.js";

export const statusChoices: Array<APIApplicationCommandOptionChoice<Status>>
  = [
    { name: "TODO", value: "todo" },
    { name: "In Progress", value: "in-progress" },
    { name: "In Review", value: "in-review" },
    { name: "Complete", value: "complete" },
  ];
