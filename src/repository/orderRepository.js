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

}
module.exports = new OrderRepository();