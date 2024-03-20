const User = require("../model/User");

exports.createUser = async (req, res) => {
    const { username } = req.body;

    try {
        // Vérifier si l'utilisateur avec le même username existe déjà
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            // Si un utilisateur avec le même username existe déjà, renvoyer un message d'erreur
            return res.status(400).json({ message: "Username already exists. Please choose another username." });
        }

        // Si l'utilisateur avec le même username n'existe pas, créer un nouvel utilisateur
        const newUser = await User.create({ username });

        // Renvoyer les données de l'utilisateur créé avec le statut 201 (Created)
        // et rediriger l'utilisateur vers une page spécifique
        res.status(201).json({ user: newUser });
        // Redirection
        res.redirect('/'); // Changez l'URL en fonction de votre structure de routes
    } catch (err) {
        // En cas d'erreur lors de la création de l'utilisateur, renvoyer un message d'erreur avec le statut 400 (Bad Request)
        res.status(400).json({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// exports.getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(404).json({ message: 'User not found' });
//     }
// };


// exports.updateUser = async (req, res) => {
//     try {
//         await User.findByIdAndUpdate(req.params.id, req.body);
//         res.status(200).json({ message: 'User updated successfully' });
//     } catch (err) {
//         res.status(404).json({ message: 'User not found' });
//     }
// };



// exports.deleteUser = async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (err) {
//         res.status(404).json({ message: 'User not found' });
//     }
// };
