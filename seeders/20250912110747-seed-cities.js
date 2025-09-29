export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("Cities", [
    {
      city: "Delhi",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      city: "Maharashtra",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      city: "Karnataka",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      city: "West Bengal",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      city: "Tamil Nadu",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("cities", null, {});
}
