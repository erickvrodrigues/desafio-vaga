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
  async findbyid(req,res,next){
    try{
      const result = await service.findById(req.params.id);
      res.status(200).json(result);
    }catch(error){
      next(error)
    }     
  }
  async update(req,res,next){
    try {
      await service.update(req.params.id, req.body);
      res.status(200).json({ message: "Pedido atualizado" });
    } catch (error) {
      next(error)
    }
  }
  async findAll(req,res,next){
    try {
     const order =  await service.findAll(req.params.id, req.body);
      res.status(200).json(order);
    } catch (error) {
      next(error)
    }
  }

}
module.exports = new OrderController();