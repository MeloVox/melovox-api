import { User } from '../db/sequelize.js';
import auth from '../auth/auth.js';
import bcrypt from 'bcrypt';

export default (app) => {
    app.post('/api/updatepassword', auth, async (req, res) => {
        console.log(req.body);
        User.findOne({ where: { id: req.body.id } }).then(async user => {
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

            if (!isPasswordValid) {
                const message = `Le mot de passe est incorrect.`;
                return res.status(401).json({ message });
            }

            // Update user's password
            bcrypt.hash(req.body.newPassword, 10).then(async hashpassword => {
                await User.update(
                    { password: hashpassword },
                    { where: { id: req.body.id } }
                )
            })

            const message = `Your password has been updated !`;
            res.json({ message });
        })

            .catch(error => {
                console.log(error);
                const message = 'Error while updating user';
                res.status(500).json({ message, data: error });
            })
    });
};


