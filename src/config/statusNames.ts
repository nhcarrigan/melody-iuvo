/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

/* eslint-disable @typescript-eslint/naming-convention -- These need to follow the requirements for Discord choices. */
import type { Status } from "../interfaces/status.js";

export const statusNames: Record<Status, string> = {
  "complete":    "Complete",
  "in-progress": "In Progress",
  "in-review":   "In Review",
  "todo":        "To Do",
};
