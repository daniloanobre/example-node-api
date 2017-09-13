// Author - Danilo Assis Nobre | danilo@assistatecnologia.com.br

/*
 * TASKS CONTROLLER
*/

// Required models
const Task = require('../models/tasks');

// GET Tasks resource action
exports.index = (req, res, next) =>
  // Find all tasks on MongoDB
  Task.find()
    // When promise is ready
    .then(tasks => res.json(tasks))
    // Catch all errors and call the error handler
    .catch(err => next(errorsHelper.dbError(err)))
;

// POST Task create resource action
exports.create = (req, res, next) => {
  // Receive body task
  const task = new Task(req.body);

  return task.create()
    // When promise is ready
    .then(newTask => res.json(newTask))
    // Catch all errors and call the error handler
    .catch((err) => {
      // returns case custom error
      if (err.status) return next(err);     
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

exports.create = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

// GET User show resource action
exports.show = (req, res, next) => {
  // Receive param id
  const taskId = req.params.taskId;

  // Find task by taskId on MongoDB
  return Task.findOne({ _id: taskId })
    // When promise is ready
    .then((task) => {
      // returns error if task was not found
      if (!task) { throw errorsHelper.notFoundError(t('Task.NotFound', taskId)); }
      // returns json when find Task
      return res.json(task);
    })
    // Catch all errors and call the error handler
    .catch((err) => {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// PUT Task update resource action
exports.update = (req, res, next) => {
  // Receive param id
  const taskId = req.params.taskId;

  // Find user by friendlyId on MongoDB
  return Task.findOne({ _id: taskId })
    // When promise is ready
    .then((taskFound) => {
      const task = taskFound;

      // returns error if user was not found
      if (!user) { throw errorsHelper.notFoundError(t('Task.NotFound', taskId)); }

      // Receive body task
      if (req.body.name) task.name = req.body.name;
      if (req.body.status) task.status = req.body.status;

      // Update user on MongoDB
      return task.save();
    })
    // When promise is ready
    .then(task => res.json(task))
    // Catch all errors and call the error handler
    .catch((err) => {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};

// DELETE Task remove resource action
exports.remove = (req, res, next) => {
  // Receive param id
  const taskId = req.params.taskId;

  // Find task by _id on MongoDB
  return Task.findOne({ _id: taskId })
    // When promise is ready
    .then((task) => {
      // returns error if task was not found
      if (!task) { throw errorsHelper.notFoundError(t('Task.NotFound', userId)); }

      // Remove task on MongoDB
      return task.remove();
    })
    // When promise is ready
    .then(task => res.json({ message: t('Task.Deleted'), item: task }))
    // Catch all errors and call the error handler
    .catch((err) => {
      // returns case custom error
      if (err.status) return next(err);
      // returns case generic error
      return next(errorsHelper.dbError(err));
    });
};
