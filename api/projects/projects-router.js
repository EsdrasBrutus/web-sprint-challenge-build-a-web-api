// Write your "projects" router here!
const express = require('express');
const Projects = require("./projects-model");
const { validateProjectId, validateProject, validateProjectPUT } = require("./projects-middleware");
const router = express.Router();


router.get('/projects', (req, res)=>{
    const { id } = req.params
    Projects.get(id)
        .then(projects =>{
        res.status(200).json(projects)
    })
        .catch(error => {
        res.status(500).json({message: ""})
    })
})

router.get("/projects/:id", validateProjectId, (req, res, next)=>{
    res.status(200).json(req.project)
})

router.post('/projects', validateProject, (req, res)=>{
    const newProject = req.body
    Projects.insert(newProject)
        .then(project => {
            res.status(201).json(project)
    })
        .catch(err =>{
            res.status(500).json({message: "error while creating project"})
    })
})

router.put("/projects/:id", validateProjectId, /*validateProjectPUT,*/ (req, res, next)=>{
    /*README says a check for "completed" is not required, but one of the tests asks for one. Then adding a check passes the previously failed test, but then in turn fails 2 more tests. Regardless of if it has a check or not, the endpoint works perfectly in postman. */
        Projects.update(req.params.id, req.body)
        .then(project =>{
            res.status(200).json(project)
        })
        .catch(error =>{
            next(error)
        }) 
}) 

router.delete('/projects/:id', validateProjectId, (req, res) =>{
    Projects.remove(req.params.id)
        .then(()=>{
            res.status(200).json({message:"deleted"})
        })
        .catch(error =>{
            res.status(500).json({message: "Error removing project"})
        });
})

router.get('/projects/:id/actions', validateProjectId, (req, res) =>{
    Projects.getProjectActions(req.params.id)
        .then(actions =>{
            res.status(200).json(actions)
        })
        .catch(error =>{
            res.status(500).json({message: "error getting actions"})
        })
})

module.exports = router