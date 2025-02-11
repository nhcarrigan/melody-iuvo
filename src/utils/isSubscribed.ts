/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type ChatInputCommandInteraction,
} from "discord.js";

/**
 * Checks if a user has an active entitlement (subscription) for the bot.
 * If they do not, it responds to the interaction with a button to subscribe.
 * @param interaction -- The interaction payload from Discord.
 * @returns A boolean indicating whether the user is subscribed.
 */
export const isSubscribed = async(
  interaction: ChatInputCommandInteraction,
): Promise<boolean> => {
  const isEntitled = interaction.entitlements.find((entitlement) => {
    return entitlement.userId === interaction.user.id && entitlement.isActive();
  });

  if (!isEntitled && interaction.user.id !== "465650873650118659") {
    const subscribeButton = new ButtonBuilder().
      setStyle(ButtonStyle.Premium).
      setSKUId("1338755540397985873");
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      subscribeButton,
    );
    await interaction.editReply({
      components: [ row ],
      content:    "You must be subscribed to use this feature.",
    });
    return false;
  }
  return true;
};
