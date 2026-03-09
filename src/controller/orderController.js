const service = require("../service/orderService");
class OrderController{
    async create(req, res,next) {
    try{
      const result = await service.create(req.body);
      res.status(201).json(result);

    }catch(error){
        next(error)
    }
      
    
  }

}
module.exports = new OrderController();