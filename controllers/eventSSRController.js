const Event = require("../models/eventModel");

// Render Controller: Render index.html with events using EJS
const renderEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.render("index", { events }); // Render index.ejs with events data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Event by ID
const renderEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.render("notfound");
    }
    res.render("singleevent", { event }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Event:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addevent"); // Assuming "addevent.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new event (used for rendering and API)
const addEvent = async (req, res) => {
  try {
    const { title, description, date,location } = req.body;
    // Convert the achieved field to a Boolean
   // const achieved = req.body.achieved === "on";
    const newEvent = new Event({ title, description, date,location });
    await newEvent.save();
    // Redirect to the main page after successfully adding the event
    console.log("Event added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).render("error");
  }
};

// Delete Event by ID
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete({ _id: id });
    if (!event) {
      return res.status(404).render("notfound");
    }
    console.log("Event delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Event:", error);
    res.status(500).render("error");
  }
};


// Update Event by ID
const renderUpdateEvent = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the event by id
    const event = await Event.findById(id);

    if (!event) {
      return res.render("notfound");
    }

    // Render the singleevent.ejs template with the event data
    res.render("updateevent", { event });

  } catch (error) {
    console.error("Error fetching Event:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    //const achieved = req.body.achieved === "on";
    const { title, description, date,location } = req.body;
    const updatedEventData = { title, description, date,location};

    // Update the event with the new data
    const updatedEvent = await Event.findOneAndUpdate({ _id: id }, updatedEventData, { new: true });

    if (!updatedEvent) {
      return res.render("notfound");
    }

    console.log("Event updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Event:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderEvents,
  renderEvent,
  addEvent,
  renderForm,
  deleteEvent,
  updateEvent,
  renderUpdateEvent,
};
