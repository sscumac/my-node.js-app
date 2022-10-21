const pgtools = require("pgtools");
const config = {
    user: "postgres",
    host: "localhost",
    password: "password",
    port: 5432
};

pgtools.createdb(config, "products_db", function(error, response) {
    if (error) {
        console.error(error);
        process.exit(-1);
    }
    console.log(response);
});