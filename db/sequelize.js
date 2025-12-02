import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "postgres",
    username: "db_contacts_8w44_user",
    password: "FY0yh0FEMgCcWcNoxnk75Ahiem9ktMS0",
    host: "dpg-d4lseichg0os73bfec2g-a.oregon-postgres.render.com",
    database: "db_contacts_8w44",
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

export default sequelize;

