// Write your "actions" router here!
const express = require('express');

const Actions = require("./actions-model");

const router = express.Router();


const { validateProjectId } = require("../projects/projects-middleware")

router.get("/actions", validateProjectId, (req, res) =>{
    const { id } = req.params
    Actions.get(id)
        .then(actions =>{
        res.status(200).json(actions)
    })
        .catch(error => {
        res.status(500).json({message: "error while getting actions"})
    })
})

module.exports = router