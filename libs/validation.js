function validation(req, res, next) {
    if (!req.body.username.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        return res.status(422).send({
            message: 'wrong username'
        });
    }
    if ((isNaN(req.body.age))) {
        if (req.body.age !== ' - ') {
            return res.status(422).send({
                message: 'wrong age, enter only number'
            });
        }
    }
    if (!["Мужской", 'Женский', ' - '].includes(req.body.gender)) {
        return res.status(422).send({
            message: 'wrong gender, enter one of "Мужской", " - ", "Женский"'
        })
    }
    next();
}

module.exports = validation;
