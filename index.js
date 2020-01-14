console.log("Running");

const express = require("express");
const db = require("./data/db.js");
const server = express();
const port = 8000;
server.use(express.json());

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
server.get("/api/users/:id", function(req, res) {
    const id = req.params;
    db.findById(id).then(user => {
        if (user) {
            res.send(user);
        }
    });
});

//post user
server.post("/api/users", (req, res) => {
    const dbData = req.body;
    db.add(dbData)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: "There was an error while saving the user to the database"
            });
        });
});

//delete user
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(deletedUser => {
            // res.status(204).end();
            res.status(200).json(deletedUser);
        })
        .catch(error => {
            console.log(error);
            // handle the error
            res.status(500).json({
                errorMessage: "The user could not be removed"
            });
        });
});

//put user

server.put("api/users/:id"),
    (req, res) => {
        const id = req.params;
        const edit = req.body;
        db.update(id, edit).then(user => {
            if (user === !null) {
                res.status(404).json({});
            }
        });
    };

server.listen(port, () => console.log(`\n ** api on port: ${port} **\n`));