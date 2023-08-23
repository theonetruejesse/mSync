import {
  CommandBooleanOptionBuilder,
  CommandBuilder,
  CommandNumberOptionBuilder,
  CommandStringOptionBuilder
} from "../core/command-builder";
import { Interaction } from "../core/interaction";
import { log } from "../utils/log";

export default new CommandBuilder()
  .setName("test")
  .setDescription("Testing slash commands for twilio")
  .addBooleanOption(
    new CommandBooleanOptionBuilder()
      .setCustomId("booleanA")
      .setLongName("booleanA")
      .setShortName("a")
      .setDescription("Boolean option test")
  )
  .addBooleanOption(
    new CommandBooleanOptionBuilder()
      .setCustomId("booleanB")
      .setLongName("booleanB")
      .setShortName("b")
      .setDescription("Boolean option test")
  )
  .addBooleanOption(
    new CommandBooleanOptionBuilder()
      .setCustomId("booleanC")
      .setLongName("booleanC")
      .setShortName("c")
      .setDescription("Boolean option test")
  )
  .addNumberOption(
    new CommandNumberOptionBuilder()
      .setCustomId("number")
      .setLongName("number")
      .setShortName("n")
      .setDescription("Number option test")
      .setRequired(true)
  )
  .addStringOption(
    new CommandStringOptionBuilder()
      .setCustomId("string")
      .setLongName("string")
      .setShortName("s")
      .setDescription("String option test")
      .setRequired(true)
  )
  .setHandler(async (interaction: Interaction) => {
    const booleanA = interaction.options.getBoolean("booleanA", false);
    const booleanB = interaction.options.getBoolean("booleanB", false);
    const booleanC = interaction.options.getBoolean("booleanC", false);
    const number = interaction.options.getNumber("number", true);
    const string = interaction.options.getString("string", true);

    log(booleanA);
    log(booleanB);
    log(booleanC);
    log(number);
    log(string);

    interaction.reply(
      `booleanA=${booleanA}\nbooleanB=${booleanB}\nbooleanC=${booleanC}\nnumber=${number}\nstring=${string}`
    );
  });
