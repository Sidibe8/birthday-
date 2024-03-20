const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controller/User.controller');
const { createMessage, getAllMessages, getMessageById, updateMessage, deleteMessage } = require('../controller/Message.controller');
const router = express.Router();



// Routes pour les utilisateurs
router.post('/users', createUser);
// router.get('/users', getAllUsers);
// router.get('/users/:id', getUserById);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

// Routes pour les messages
router.post('/messages', createMessage);
router.get('/messages', getAllMessages);
router.get('/messages/:id', getMessageById);
router.put('/messages/:id', updateMessage);
router.delete('/messages/:id', deleteMessage);

module.exports = router;
