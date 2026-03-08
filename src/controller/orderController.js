const service = require("../services/OrderService");
class OrderController{
    async create(req, res) {
    try {
      const result = await service.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}