console.log("Running");
const cors = require("cors");
const express = require("express");
const db = require("./data/db.js");
const server = express();
const port = 8000;
server.use(express.json());
server.use(cors());
//get users all
server.get("/api/users", (req, res) => {
    db.find()
        .then(user => {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(500).json({
                    errorMessage: "The users information could not be retrieved."
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({});
        });
});

//get user ID
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;

    db.findById(id)

    .then(users => {
        if (users) {
            res.send(users);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            });
        }
    })

    .catch(err => {
        res
            .status(500)
            .json({ error: "The user information could not be retrieved." });
    });
});
//post user
server.post("/api/users", (req, res) => {
    const dbData = req.body;

    if (dbData.name && dbData.bio) {
        db.insert(dbData)

        .then(user => {
            res.json(user);
        })

        .catch(err => {
            res.json({
                error: "error posting user"
            });
        });
    } else {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        });
    }
});

//delete user
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    db.remove(id)

    .then(user => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            });
        }
    })

    .catch(err => {
        res.status(500).json({ error: "The user could not be removed" });
    });
});

//put user

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;

    const changes = req.body;

    db.update(id, changes)

    .then(user => {
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            });
        } else if (changes.name && changes.bio) {
            res.json(changes);
        } else {
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user."
            });
        }
    })

    .catch(err => {
        res.status(500).json({
            error: "The user information could not be modified."
        });
    });
});

server.listen(port, () => console.log(`\n ** api on port: ${port} **\n`));