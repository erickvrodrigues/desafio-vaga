const Order = require("../models/Order");
const Item = require("../models/Item");

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