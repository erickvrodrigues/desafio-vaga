const pool = require("../config/db");

class OrderRepository{
    async create(order) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      await client.query(
        `INSERT INTO "Order"(orderId, value, creationDate)
         VALUES ($1,$2,$3)`,
        [order.orderId, order.value, order.creationDate]
      );

      for (const item of order.items) {
        await client.query(
          `INSERT INTO Items(orderId, productId, quantity, price)
           VALUES ($1,$2,$3,$4)`,
          [order.orderId, item.productId, item.quantity, item.price]
        );
      }

      await client.query("COMMIT");
      return order;

    } catch (error) {
      await client.query("ROLLBACK");
      if (error.isOperational) throw error;

      
      console.error("DB Error:", error.message);
      throw new AppError("Erro ao salvar pedido no banco", 500);
    } finally {
      client.release();
    }
  }
  async findById(orderId) {
    const order = await pool.query(
      `SELECT * FROM "Order" WHERE orderId=$1`,
      [orderId]
    );

    const items = await pool.query(
      `SELECT * FROM Items WHERE orderId=$1`,
      [orderId]
    );

    return {
      ...order.rows[0],
      items: items.rows
    };
  }

  async update(orderId, order) {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

   
    await client.query(
      `UPDATE "Order"
       SET value=$1, creationDate=$2
       WHERE orderId=$3`,
      [order.value, order.creationDate, orderId]
    );

   
    await client.query(
      `DELETE FROM Items WHERE orderId=$1`,
      [orderId]
    );

    
    for (const item of order.items) {

      await client.query(
        `INSERT INTO Items(orderId, productId, quantity, price)
         VALUES ($1,$2,$3,$4)`,
        [
          orderId,
          item.productId,
          item.quantity,
          item.price
        ]
      );

    }

    await client.query("COMMIT");

  } catch (error) {

    await client.query("ROLLBACK");
    throw error;

  } finally {

    client.release();

  }

}
async findAll() {
    const result = await pool.query(`SELECT * FROM "Order"`);
    return result.rows;
  }
 async delete(orderId) {
    await pool.query(`DELETE FROM Items WHERE orderId=$1`, [orderId]);
    await pool.query(`DELETE FROM "Order" WHERE orderId=$1`, [orderId]);
  }

}
module.exports = new OrderRepository();