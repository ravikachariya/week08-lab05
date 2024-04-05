const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");

const eventAPI = require("./controllers/eventAPIController");
const eventSSR = require("./controllers/eventSSRController");

//Important: will be discussed next week
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//https://expressjs.com/en/resources/middleware/method-override.html
app.use(methodOverride('_method'))

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

// SSR
// Route to render index.html with events using EJS
app.get("/", eventSSR.renderEvents);
// Define a route to render the addevent.ejs view
app.get("/addevent", eventSSR.renderForm);
// Route to add  event using EJ
app.post("/addevent", eventSSR.addEvent);
// Define a route to render the singleevent.ejs view
app.get("/single-event/:id", eventSSR.renderEvent);
// Define a route to delete singleevent
app.delete("/single-event/:id", eventSSR.deleteEvent);
// Define a route to update single event.ejs
app.put("/single-event/:id", eventSSR.updateEvent);
// Define event to update
app.get("/single-event/update/:id", eventSSR.renderUpdateEvent);

// API
// GET all Events
app.get("/api/events", eventAPI.getEvents);
// POST a new Event
app.post("/api/events", eventAPI.addEvent);
// GET a single Event
app.get("/api/events/:id", eventAPI.getEvent);
// Update Event using PUT
app.put("/api/events/:id", eventAPI.updateEvent);
// DELETE a Event
app.delete("/api/events/:id", eventAPI.deleteEvent);
// DELETE all Event
app.delete("/api/events", eventAPI.deleteAllEvents);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
