// add middlewares here related to actions
const Actions = require("./actions-model")

  const validateActionId = async (req, res, next) =>{
     const {id} = req.params
    try {
      const action = await Actions.get(id)
      if(!action){
        res.status(404).json({ message: "action not found" })
      }
      else{
        req.action = action
        next();
      }
    }
    catch(error){
      res.status(500).json({message: "Internal server error"})
    }
    
  }

  function validateAction(req, res, next) {
      console.log(req.body)
    if(!req.body.project_id || !req.body.notes || !req.body.description){
        res.status(400).json({ message: "missing required project_id, name and/or description field" })
    }
    else{
        next()
    }
  }
  

  module.exports ={
      validateActionId,
      validateAction
  }