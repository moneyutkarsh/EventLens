const asyncHandler = require('express-async-handler');
const Event = require('../model/eventModel');
const User = require('../model/userModel');

// @desc    Get all events
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user.id });
  res.status(200).json(events);
});

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a title for the event');
  }

  const event = await Event.create({
    user: req.user.id,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    category: req.body.category
  });

  res.status(201).json(event);
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  if (event.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.status(200).json(updatedEvent);
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  if (event.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await event.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
