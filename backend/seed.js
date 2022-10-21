const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "products_db",
    password: "password",
    port: 5432,
});

const table = `
    CREATE TABLE IF NOT EXISTS "products" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        description VARCHAR(30),
        rating SMALLINT NOT NULL,
        quantity INTEGER NOT NULL,
        price NUMERIC(5,2) 
)`;

const insertData = `INSERT INTO products(name, quantity, price, rating, description)
                    VALUES ('Apple Tree', 99, 29.90, 3, 'Grows Apples'),
                           ('Palmtree', 2, 39.90, 5, 'Looks nice'),
                           ('Redwood', 1, 999.90, 5, 'Is very tall'),
                           ('Bonsai', 28, 39.90, 4, 'Extravaganza'),
                           ('Maple', 23, 499.90, 3, 'Provides Syrup'),
                           ('Pear Tree', 109, 19.90, 2, 'Grows Pears'),
                           ('Mango Tree', 50, 99.90, 5, 'Grows Mangos'),
                           ('Cherry Tree', 29, 149.90, 4, 'Awesome Blossoms'),
                           ('Coconut Tree', 2, 39.90, 3, 'Grows coconuts'),
                           ('Christmastree', 165, 19.90, 5, 'Brings Presents')
`;

// const dropData = "DELETE FROM products";

pool.query(table, (error, results) => {
    if (error) {
        throw error;
    }
    console.log("table created");
    console.log(results);
});

// pool.query(dropData, (error, results) => {
//     if (error) {
//         throw error;
//     }
//     console.log("data dropped");
//     console.log(results);
// });

pool.query(insertData, (error, results) => {
    if (error) {
        throw error;
    }
    console.log("data seeded:");
    console.log(results);
    pool.end();
});
