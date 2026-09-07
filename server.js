import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const Api_URL = "http://localhost:4000"; 

// display trackersArray
app.get("/", async (req, res) => {
try {
const response = await axios.get(Api_URL + "/trackersArray");
res.render("index.ejs", { trackers: response.data });
} catch (error) {
  console.error("Error fetching trackers:", error);
  res.status(500).send("Error fetching trackers");
}
});
app.get("/", (req, res) => {
 res.render("index.ejs");
});



app.get("/startTracking", (req, res) => {
  res.render("startTracking.ejs");
})

app.get("/privacy", (req, res) => {
  res.render("privacy.ejs");
})

// Create a new tracker

app.post("/trackersArray/jobTrackers", async (req, res) => {
  try {
    const newTracker = {
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      applicationDate: req.body.applicationDate,
      applicationStatus: req.body.applicationStatus,
      ApplicationMedium: req.body.ApplicationMedium
    };
    const response = await axios.post(Api_URL + "/trackersArray", newTracker);
    console.log("New tracker created:", response.data);
    res.redirect("/trackers");
  } catch (error) {
    console.error("Error creating tracker:", error);
    res.status(500).send("Error creating tracker");
  }
})


app.get("/trackers", async(req, res) => {
  try {
    const response = await axios.get(Api_URL + "/trackersArray");
    res.render("trackers.ejs", { trackers: response.data });
  } catch(error) {
    console.error("Error fetching trackers:", error);
    res.status(500).send("Error fetching trackers");
  }

}) 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});