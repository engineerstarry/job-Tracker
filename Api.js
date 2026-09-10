import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override"

const app = express();
const PORT = 4000;


app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


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

//CHALLENGE 4: PATCH a tracker when you just want to update one parameter
app.patch("/trackersArray/:id", (req, res) => {
  const trackerId = parseInt(req.params.id);
  const tracker = trackerArray.find((t) => t.id === trackerId);
const patchedPost = {
    id: tracker.id,
    jobName: req.body.jobName || tracker.jobName,
    companyName: req.body.companyName || tracker.companyName,
    applicationStatus: req.body.applicationStatus ||tracker.applicationStatus,
    dateApplied:  req.body.dateApplied || tracker.dateApplied,
    ApplicationMedium: req.body.ApplicationMedium || tracker.ApplicationMedium
}
const index = trackerArray.findIndex((tracker) => tracker.id === trackerId);
 const newPatchedPost = trackerArray[index] = patchedPost;

res.json(newPatchedPost);
})

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/trackerArray/:id",(req, res)=>{
  const id = parseInt(req.params.id);
  const arrayIndex = trackerArray.findIndex((index)=> index.id === id);
  if (arrayIndex > -1){
trackerArray.splice(arrayIndex,1);
   res.sendStatus(200)
  } else {
   res.status(400).json({error:`Nothing was deleted`})
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});