const repository = require("../repository/orderRepository");
const { mapRequestToOrder } = require("../utils/mapper");
const AppError = require("../errors/appError")

class OrderService{
    validaOrder(order){
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

    }

     async create(data) {

    const order = mapRequestToOrder(data);
    this.validaOrder(order);

    const orderEntity = await repository.findById(order.orderId);
    if(orderEntity){
      throw new AppError("Já existe order com esse id informado",400);
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

  findById(id){
    if(id == null){
      throw new AppError("identificador não informado",400)
    }

    const order = repository.findById(id);
    if(!order) throw new AppError("Pedido não encontrado",404)

    return order;
  }

  update(id,data){
    if(id == null){
      throw new AppError("identificador não pode ser nulo",400)
    }
    this.findById(id);
     
    this.validaOrder(data);
     return repository.update(id, data);
  }

  findAll(){
    return repository.findAll();
  }
  

  
}

module.exports = new OrderService();