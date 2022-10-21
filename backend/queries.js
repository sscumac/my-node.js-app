const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "products_db",
  password: "password",
  port: 5432,
});

const getProducts = async (request, response) => {
  await pool.query("SELECT * FROM products", (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results);
    response.status(200).json(results.rows);
  });
};

const getProductById = async (request, response) => {
  const id = parseInt(request.params.id);

  await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      response.status(200).json(results.rows);
    }
  );
};

const updateProduct = async (request, response) => {
  const id = parseInt(request.params.id);
  const { name, quantity, description, price, rating } = request.body;

  await pool.query(
    `UPDATE products
         SET name        = COALESCE($1, name),
             quantity    = COALESCE($2, quantity),
             description = COALESCE($3, description),
             price       = COALESCE($4, price),
             rating      = COALESCE($5, rating)
         WHERE id = $6
           AND name IS DISTINCT
             FROM $1
           AND quantity IS DISTINCT
             FROM $2
           AND description IS DISTINCT
             FROM $3
           AND price IS DISTINCT
             FROM $4
           AND rating IS DISTINCT
             FROM $5
        `,
    [name, quantity, description, price, rating, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      response.status(200).send(`Product modified with ID: ${id}`);
    }
  );
};

module.exports = {
  getProducts,
  getProductById,
  updateProduct,
};
