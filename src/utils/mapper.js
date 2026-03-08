const Order = require("../model/order");
const Item = require("../model/item");

function mapRequestToOrder(data) {
  const items = data.items.map(i => {
    return new Item(
      i.idItem,
      i.quantidadeItem,
      i.valorItem
    );
  });

  return new Order(
    data.numeroPedido,
    data.valorTotal,
    data.dataCriacao,
    items
  );
}

module.exports = { mapRequestToOrder };