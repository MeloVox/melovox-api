import { User } from '../db/sequelize.js';
import auth from '../auth/auth.js';
import bcrypt from 'bcrypt';

export default (app) => {
    app.post('/api/updateemail', auth, async (req, res) => {
        console.log(req.body);
        User.findOne({ where: { id: req.body.id } }).then(async user => {
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

            if (!isPasswordValid) {
                const message = `Le mot de passe est incorrect.`;
                return res.status(401).json({ message });
            }

            // Update user's email
            await User.update(
                { email: req.body.newEmail },
                { where: { id: req.body.id } }
            )
            .then(() => {
                const message = `Email has been updated to ${req.body.newEmail}`;
                return res.json({ message });
            })
            .catch((err) => {
                console.log(err.message);
                return res.status(401).json({ message: err.message });
            })
        }).catch(error => {
            const message = 'Error while updating email';
            res.status(500).json({ message, data: error });
        })
    });
};


