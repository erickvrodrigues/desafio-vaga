const repository = require("../repository/orderRepository");
const { mapRequestToOrder } = require("../utils/mapper");

class OrderService{
     async create(data) {
    const order = mapRequestToOrder(data);
    return repository.create(order);
  }
}

module.exports = new OrderService();