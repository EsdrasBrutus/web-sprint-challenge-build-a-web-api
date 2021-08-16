// Write your "actions" router here!
const express = require('express');

const Actions = require("./actions-model");

const router = express.Router();


const { validateAction, validateActionId } = require("./actions-middlware")

router.get("/actions", (req, res) =>{
    const { id } = req.params
    Actions.get(id)
        .then(actions =>{
        res.status(200).json(actions)
    })
        .catch(error => {
        res.status(500).json({message: "error while getting actions"})
    })
})

router.get("/actions/:id", validateActionId, (req, res) =>{
    res.status(200).json(req.action)
})

router.post('/actions', validateAction, (req, res)=>{
    const newAction = req.body
    Actions.insert(newAction)
        .then(action => {
            res.status(201).json(action)
    })
        .catch(err =>{
            res.status(500).json({message: "error while creating action"})
    })
})

router.put("/actions/:id", validateActionId, validateAction, (req, res, next)=>{
    Actions.update(req.params.id, req.body)
        .then(action =>{
            res.status(200).json(action)
        })
        .catch(error =>{
            next(error)
        })
})

router.delete('/actions/:id', validateActionId, (req, res) =>{
    Actions.remove(req.params.id)
        .then(()=>{
            res.status(200).json({message:"deleted"})
        })
        .catch(error =>{
            res.status(500).json({message: "Error removing action"})
        });
})

module.exports = router