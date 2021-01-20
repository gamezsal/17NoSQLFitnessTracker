const express = require("express");
const compression = require('compression')
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});


const app = express();
app.use(compression({ filter: shouldCompress }))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});


// // routes
// app.use(require("./public/api"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});