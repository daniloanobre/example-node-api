// Author - Danilo Assis Nobre | danilo@assistatecnologia.com.br

/*
 * TASKS ROUTES
*/

// Required libs
const express = require('express');

const router = express.Router();

// Required controllers
const tasksController = require('../controllers/tasks');

/*
 * Routes
 */

router

  /* GET Users for list all users. */
  .get('/', tasksController.index)

  /* GET User by ID for show the user. */
  .get('/:task_id', tasksController.show)

  /* POST User for create a user. */
  .post('/', tasksController.create)

  /* PUT User by ID for update the user. */
  .put('/:task_id', tasksController.update)

  /* DELETE User by ID for remove the user. */
  .delete('/:task_id', tasksController.remove)

module.exports = router;
