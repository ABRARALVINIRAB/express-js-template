const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

const dbConnect = require("./utils/dbConnect");
const toolsRoute = require("./routes/v1/tools.route");
const viewCount = require("./middleware/viewCount");
const errorHandler = require("./middleware/errorHandler");

//third party middleware
app.use(cors());
//builtin middleware
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs")


//application level miidleware
// app.use(viewCount)


// Apply the rate limiting middleware to all requests
// app.use(limiter)


dbConnect();
app.use('/api/v1/tools', toolsRoute);





app.get("/", (req, res) => {
  // res.sendFile(__dirname + '/public/test.html')
  // res.send("Hello World");
  res.render("home.ejs",{
    id:200,
    user:{
      name: "test"
    }
  })
});

//not found route
app.all('*', (req, res) => {
  res.send('no route found')
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});

