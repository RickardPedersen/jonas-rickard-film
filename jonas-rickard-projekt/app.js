const express = require("express");
const app = express();
const port = 1337;

app.use("/assets", express.static("pages/assets"));

app.get("/", function(request, response) {
    response.sendFile("./pages/index.html", {root: __dirname});
});

app.get("/actors", function(request, response) {
    response.sendFile("./pages/actors.html", {root: __dirname});
});

app.listen(port, () => console.log(`FAN VAD LEET ${port}`));