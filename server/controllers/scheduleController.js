const Schedule = mongoose.model('Schedule');
const User = mongoose.model('User');

// Get all of the user's schedules
const getAllSchedules = (req, res, next) => {
    User.findById(req.payload.id).then(function (user) {
        if (!user) {
            return res.sendStatus(401);
        }

        Schedule.find({ user: user._id })
            .then(function (schedules) {
                if (!schedules) {
                    return res.sendStatus(401);
                }

                return res.json(schedules);
            })
            .catch(next);
    });
};

// Find a specific schedule
const getScheduleByID = (req, res, next) => {
    User.findById(req.payload.id).then(function (user) {
        if (!user) {
            return res.sendStatus(401);
        }

        Schedule.findById(req.params.id)
            .then(function (schedule) {
                if (!schedule) {
                    return res.sendStatus(401);
                }

                return res.json(schedule);
            })
            .catch(next);
    });
};

// Create a new schedule
const postSchedule = (req, res, next) => {
    User.findById(req.payload.id)
        .then(function (user) {
            if (!user) {
                return res.sendStatus(401);
            }

            const schedule = new Schedule(req.body);

            schedule.user = user;

            return schedule.save().then(function (schedule) {
                return res.json(schedule);
            });
        })
        .catch(next);
};

// Update schedule information
const updateSchedule = (req, res, next) => {
    User.findById(req.payload.id).then(function (user) {
        if (!user) {
            return res.sendStatus(401);
        }

        Schedule.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, schedule) {
            if (err) return next(err);
            res.send('Schedule udpated.');
        });
    });
};

// Delete a schedule
const deleteSchedule = (req, res, next) => {
    User.findById(req.payload.id).then(function (user) {
        if (!user) {
            return res.sendStatus(401);
        }

        Schedule.findByIdAndRemove(req.params.id, function (err) {
            if (err) return next(err);
            res.send('Deleted successfully!');
        });
    });
};

module.exports = {
    getAllSchedules,
    getScheduleByID,
    postSchedule,
    updateSchedule,
    deleteSchedule,
};
