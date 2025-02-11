/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */
import { Client, Events, type ChatInputCommandInteraction } from "discord.js";
import { database } from "./db/database.js";
import { about } from "./modules/about.js";
import { create } from "./modules/create.js";
import { list } from "./modules/list.js";
import { recategorise } from "./modules/recategorise.js";
import { redescribe } from "./modules/redescribe.js";
import { restate } from "./modules/restate.js";
import { retarget } from "./modules/retarget.js";
import { retitle } from "./modules/retitle.js";
import { view } from "./modules/view.js";
import { instantiateServer } from "./server/serve.js";
import { logger } from "./utils/logger.js";

const commands: Record<
  string,
  (interaction: ChatInputCommandInteraction)=> Promise<void>
> = {
  about,
  create,
  list,
  recategorise,
  redescribe,
  restate,
  retarget,
  retitle,
  view,
};

process.on("unhandledRejection", (error) => {
  if (error instanceof Error) {
    void logger.error("Unhandled Rejection", error);
    return;
  }
  void logger.error("unhandled rejection", new Error(String(error)));
});

process.on("uncaughtException", (error) => {
  if (error instanceof Error) {
    void logger.error("Uncaught Exception", error);
    return;
  }
  void logger.error("uncaught exception", new Error(String(error)));
});

const client = new Client({
  intents: [],
});

client.on(Events.InteractionCreate, (interaction) => {
  if (interaction.isChatInputCommand()) {
    const handler = commands[interaction.commandName];
    if (handler) {
      void handler(interaction);
    }
  }
});

client.on(Events.EntitlementCreate, (entitlement) => {
  void logger.log("info", `User ${entitlement.userId} has subscribed!`);
});

client.on(Events.EntitlementDelete, (entitlement) => {
  void logger.log("info", `User ${entitlement.userId} has unsubscribed... :c`);
});

client.on(Events.ClientReady, () => {
  void logger.log("debug", "Bot is ready.");
});

instantiateServer();
await client.login(process.env.DISCORD_TOKEN);
await database.$connect();
