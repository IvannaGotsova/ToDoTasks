const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());


app.use(express.static(__dirname + "/")); 

app.post("/add-task", (req, res) => {
    const newTask = req.body;

    fs.readFile("../db/tasks.json", "utf8", (err, data) => {
        if (err) throw err;

        let tasks = [];
        if (data) {
            tasks = JSON.parse(data);
        }

        tasks.push(newTask);

        fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), (err) => {
            if (err) throw err;
            res.json({ message: "Task added successfully!" });
        });
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
