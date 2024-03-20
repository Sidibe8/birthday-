const Message = require("../model/Message");

exports.createMessage = async (req, res) => {
    try {
        // Ajoutez l'ID de l'utilisateur aux données du message
        const messageData = { ...req.body };

        // console.log(messageData, 'adada');

        const newMessage = await Message.create(messageData);
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate('user');
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        res.status(200).json(message);
    } catch (err) {
        res.status(404).json({ message: 'Message not found' });
    }
};


exports.updateMessage = async (req, res) => {
    try {
        await Message.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'Message updated successfully' });
    } catch (err) {
        res.status(404).json({ message: 'Message not found' });
    }
};


exports.deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(404).json({ message: 'Message not found' });
    }
};
