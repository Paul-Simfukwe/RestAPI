import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = [];

// All routes in here are starting with /users
router.get('/', (req, res) => {
    res.send(users);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id == id);

    if (foundUser) {
        res.send(foundUser);
    } else {
        res.status(404).send('User not found');
    }
});

router.post('/', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`User with the name ${user.firstName} added to the database`);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const initialLength = users.length;
    users = users.filter((user) => user.id != id);

    if (users.length < initialLength) {
        res.send(`User with the id ${id} has been deleted.`);
    } else {
        res.status(404).send('User not found');
    }
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id == id);

    if (user) {
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (age) user.age = age;

        res.send(`User with the id ${id} has been updated.`);
    } else {
        res.status(404).send('User not found');
    }
});

export default router;
