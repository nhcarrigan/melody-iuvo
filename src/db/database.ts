/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { PrismaClient } from "@prisma/client";

export const database = new PrismaClient();
