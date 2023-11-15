import { User } from '../db/sequelize.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import privateKey from '../auth/private_key.js';
  
export default (app) =>  {
    app.post('/api/login', (req, res) => {
        console.log(req.body);
        User.findOne({ where: { email: req.body.email } }).then(user => {
            if(!user) {
                const message = `L'utilisateur demandé n'existe pas.`
                console.log(message);
                return res.status(404).json({ message })
            }

            if(user.authGoogle) {
                const message = `Veuillez utiliser la connexion via google`
                console.log(message);
                return res.status(404).json({ message })
            }
  
            return bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if(!isPasswordValid) {
                    const message = `Le mot de passe est incorrect.`
                    return res.status(401).json({ message })
                }

            // Générer un jeton JWT valide pendant 24 heures.
            const token = jwt.sign(
              { userId: user.id },
              privateKey,
              { expiresIn: '24h' }
            );
            
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user.id, token })
            })
        })
        .catch(error => {
            console.log(error);
            const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`
            res.status(500).json({ message, data: error })
        })
    })
}