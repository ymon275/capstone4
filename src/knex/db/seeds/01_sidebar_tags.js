/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("sidebar_tags").del();
  await knex("sidebar_tags").insert([
    {
      main_tag: "T-Shirts 👕",
      sub_tags: ["Sports", "Animals", "Bleached", "Tye-Dye", "Funsies!"],
    },
  ]);
};
