/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import type { Priority } from "../interfaces/priority.js";

export const priorityNames: Record<Priority, string> = {
  critical: "Critical",
  high:     "High",
  low:      "Low",
  medium:   "Medium",
  none:     "None",
};
