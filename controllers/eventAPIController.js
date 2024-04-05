const Event = require("../models/eventModel");

// get all Events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Event
const addEvent = async (req, res) => {
  // console.log();
  try {
    const { title, description, date, location } = req.body;
    const newEvent = new Event({title, description, date, location });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Event by ID
const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Event by ID
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete({ _id: id });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Events
const deleteAllEvents = async (req, res) => {
  try {
    const result = await Event.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Event by ID
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = req.body;
    // const event = await Event.findOneAndUpdate({ _id: id }, updatedEvent);
    const event = await Event.findOneAndUpdate({ _id: id }, updatedEvent, { new: true });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getEvents,
  addEvent,
  getEvent,
  deleteEvent,
  deleteAllEvents,
  updateEvent,
};
