// add middlewares here related to projects
const Projects = require("./projects-model")

  const validateProjectId = async (req, res, next) =>{
     const {id} = req.params
    try {
      const project = await Projects.get(id)
      if(!project){
        res.status(404).json({ message: "project not found" })
      }
      else{
        req.project = project
        next();
      }
    }
    catch(error){
      res.status(500).json({message: "Internal server error"})
    }
    
  }

  function validateProject(req, res, next) {
      console.log(req.body)
    if(!req.body.name){
        res.status(400).json({ message: "missing required name field" })
    }
    else if(!req.body.description){
        res.status(400).json({ message: "missing required description field" })
    }
    else{
        next()
    }
  }
  

  module.exports ={
      validateProjectId,
      validateProject
  }