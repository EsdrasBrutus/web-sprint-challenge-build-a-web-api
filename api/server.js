const express = require('express');
const server = express();
const dotenv = require("dotenv").config()
const projectRouter = require("../api/projects/projects-router")
const actionRouter = require("../api/actions/actions-router")
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] METHOD: ${req.method} URL: ${req.url}`
    );
    next();
  }

  server.use(express.json())
server.use('/api', logger, projectRouter, actionRouter)

server.get('/api', (req, res) => {
    res.send(`<h2>Unit 4 Sprint 1!</h2>`);
  });

module.exports = server;
