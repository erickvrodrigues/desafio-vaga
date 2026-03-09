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
  async update(){
    try {
      await service.update(req.params.id, req.body);
      res.json({ message: "Pedido atualizado" });
    } catch (error) {
      next(error)
    }
  }

}
module.exports = new OrderController();