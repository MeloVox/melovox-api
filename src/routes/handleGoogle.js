import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken';
import privateKey from '../auth/private_key.js';
import { User } from '../db/sequelize.js'

const client = new OAuth2Client({
    clientId: "29466533-q1fnr16hlq41cpbi2o8m47rql33vpcvj.apps.googleusercontent.com",
    clientSecret: "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",
    redirectUri: "http://localhost:5173",
    project_id: 'melovox'
});

export default (app) => {
    app.post('/api/handlegoogle', async (req, res) => {
        console.log(req.body);

        const { clientId, credential, code } = req.body


        if(code) {
            const { tokens } = await client.getToken(code.toString())
            client.setCredentials(tokens)
        }

        client.verifyIdToken({
            idToken: credential || client.credentials.id_token,
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