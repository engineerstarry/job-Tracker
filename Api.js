import express from "express";
const app = express();
const PORT = 4000;


const trackerArray = [
  {
    id: 1,
    jobName: "Software Engineer",
    companyName: "Tech Company",
    applicationStatus: "Applied",
    dateApplied: "2023-06-01",
    ApplicationMedium: "Linkedin",
  },
  { id: 2,
    jobName: "Data Analyst",
    companyName: "Data Company",
    applicationStatus: "Interviewing",
    dateApplied: "2023-06-05",
    ApplicationMedium: "Indeed",
  },
  {
    id: 3,
    jobName: "Product Manager",
    companyName: "Product Company",
    applicationStatus: "Offer Received",
    dateApplied: "2023-06-10",
    applicationMedium: "Company Website",
  },
]
 
app.use(express.json());

// Get all trackers
app.get("/trackersArray", (req, res) => {
  res.json(trackerArray);
});

// Get a specific tracker by ID
app.get("/trackersArray/:id", (req, res) => {
  const trackerId = parseInt(req.params.id);
  const tracker = trackerArray.find((t) => t.id === trackerId);
  res.json(tracker);
})

//CHALLENGE 3: POST a new tracker
app.post("/trackersArray", (req, res) => {
  const id = trackerArray.length + 1; // Assign a new ID
const newTracker = {    id: id,
    jobName: req.body.jobName,
    companyName: req.body.companyName,
    applicationStatus: req.body.applicationStatus,
    dateApplied:  req.body.dateApplied,
    ApplicationMedium: req.body.ApplicationMedium
  };
trackerArray.push(newTracker);
res.json(newTracker);
res.status(201);
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});