const scheduleRouter = require('express').Router();
const scheduleController = require('../controllers/scheduleController');
const auth = require('./authRouter');

// Get all of the user's schedules: /schedules
scheduleRouter.get(`/`, auth.required, (req, res, next) => {
    scheduleController.getAllSchedules(req, res, next);
});

// Get specific schedule information: /schedules/id
scheduleRouter.get(`/:id`, auth.optional, (req, res, next) => {
    scheduleController.getScheduleByID(req, res, next);
});

// Create a new schedule: /schedules
scheduleRouter.post(`/`, auth.required, (req, res, next) => {
    scheduleController.postSchedule(req, res, next);
});

// Update the user's schedule: /schedules/id
scheduleRouter.put(`/:id`, auth.required, (req, res, next) => {
    scheduleController.updateSchedule(req, res, next);
});

// Delete the user's schedule: /schedules/id
scheduleRouter.delete(`/:id`, auth.required, (req, res, next) => {
    scheduleController.deleteSchedule(req, res, next);
});

module.exports = scheduleRouter;
