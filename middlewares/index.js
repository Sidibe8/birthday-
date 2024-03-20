const User = require("../model/User");

module.exports.verifyToken = async (req, res, next) => {
    if (req.path === '/login' || req.path === '/auth_login') {
        // Si l'utilisateur accède à la page de connexion ou d'authentification, passez à la prochaine middleware sans vérification du token JWT
        next();
    } else {
        // Récupérer le nom d'utilisateur depuis le cookie
        const username = req.cookies.username;

        if (!username) {
            // Rediriger vers la page de connexion si le nom d'utilisateur n'est pas trouvé dans le cookie
            return res.redirect('/login');
        }

        try {
            // Recherchez l'utilisateur dans la base de données en fonction du nom d'utilisateur
            const user = await User.findOne({ username });

            if (!user) {
                // Rediriger vers la page de connexion si l'utilisateur n'est pas trouvé dans la base de données
                return res.redirect('/login');
            }

            // Ajouter l'ID de l'utilisateur au corps de la requête
            // req.user = { _id: user._id };

            // console.log(req.user);

            // Passer à la prochaine middleware
            next();
        } catch (error) {
            console.error('Error verifying token:', error);
            return res.redirect('/login'); // En cas d'erreur, redirigez également vers la page de connexion
        }
    }
};
