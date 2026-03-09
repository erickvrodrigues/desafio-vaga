const repository = require("../repository/orderRepository");
const { mapRequestToOrder } = require("../utils/mapper");
const AppError = require("../errors/appError")

class OrderService{
     async create(data) {
    const order = mapRequestToOrder(data);

    if(order.items == null){
      throw new AppError("E preciso conter items no pedido", 400);
    }

   for (const item of order.items) {
    if(item.productId == null){
        throw new AppError("E preciso conter id do item", 400);
    }
      if(item.quantity == null || item.quantity == 0){
          throw new AppError("E preciso conter quantidade nos itens do pedido", 400);
      }
      if(item.price == null || item.price == 0){
          throw new AppError("E preciso conter preço nos itens do pedido", 400);
      }
   }
   console.log("ok")

    let valorTotal = order.items.reduce(
      (valor, item) => valor + (item.price * item.quantity),
      0
    )
    order.value = valorTotal;
    console.log(valorTotal)

    console.log("ok2")
   
    return repository.create(order);
  }
}

module.exports = new OrderService();