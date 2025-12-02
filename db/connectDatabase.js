import sequelize from "./sequelize.js";

const connectDatabase = async () => {
    try {
        sequelize.authenticate();
        console.log("Database connection successful")
    } catch(err) {
        console.log(`Database connection failed: ${err.message}.`);
        process.exit(1)
    }
}

export default connectDatabase;