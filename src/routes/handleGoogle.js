import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken';
import privateKey from '../auth/private_key.js';
import { User } from '../db/sequelize.js'

const client = new OAuth2Client();

export default (app) => {
    app.post('/api/handlegoogle', (req, res) => {
        console.log(req.body);

        const { clientId, credential } = req.body
        client.verifyIdToken({
            idToken: credential,
            audience: clientId,
        })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
            .then((data) => {
                const { email } = data.payload
                User.findOne({ where: { email: email } }).then(user => {
                    // si il n'y a pas d'utilisateur, on le crée
                    if (!user) {
                        User.create({
                            email: email,
                            googleAuth: true
                        }).then((user) => {
                            const token = jwt.sign(
                                { userId: user.id },
                                privateKey,
                                { expiresIn: '24h' }
                            );
                            const message = `L'utilisateur a été connecté avec succès`;
                            return res.json({ message, user: user.id, data: data.payload, token })
                        }) 
                        return
                    }
                    const token = jwt.sign(
                        { userId: user.id },
                        privateKey,
                        { expiresIn: '24h' }
                    );
                    const message = `L'utilisateur a été connecté avec succès`;
                    return res.json({ message, user: user.id, data: data.payload, token })
                })
            })
    })
}