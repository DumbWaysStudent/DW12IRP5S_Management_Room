const models = require('../models')
const moment = require('moment')
const customer = models.customer
const order = models.order
const room = models.room
const user = models.user

exports.index = (req, res) => {
    room.findAll().then(data => {
        res.send(data);
    });
};

exports.add = (req, res) => {
    room.create({
        name: req.body.name
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send({
                error: true,
                Message: "Error"
            });
            console.log(err);
        });
};
exports.edit = (req, res) => {
    const id = req.params.id;

    room.update(
        {
            name: req.body.name
        },
        {
            where: { id: id }
        }
    )
        .then(data => {
            res.send({ data });

        })


};
exports.customer = (req, res) => {
    customer.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send({
                error: true
            });
        });
};

exports.addcustomer = (req, res) => {
    customer.create({
        name: req.body.name,
        identity_card: req.body.identity_card,
        phone_number: req.body.phone_number,
        image: req.body.image
    })
        .then(data => {
            res.send(data);
        })

};

exports.editcustomer = (req, res) => {
    const id = req.params.id;

    customer.update(
        {
            name: req.body.name,
            identity_card: req.body.identity_card,
            phone_number: req.body.phone_number,
            image: req.body.image
        },
        {
            where: { id: id }
        }
    )
        .then(data => {
            res.send({ data });

        })
}
exports.checkin = (req, res) => {
    room.findAll({
        include: [{
            model: customer,
            as: "custom",
            attributes: {
                exclude: ["updateAt", "createdAt"]
            },
            through: {
                model: order,
                where: { is_done: false },
                as: "roomed",
                attributes: {
                    exclude: ["updateAt", "createdAt"]
                }
            }
        }
        ],
        attributes: ["id", "name"]
    })
        .then(data => {
            res.send(data)
        })
}
exports.addcheckin = (req, res) => {
    order.create({
        room_id: req.body.room_id,
        customer_id: req.body.customer_id,
        duration: req.body.duration,
        order_time: moment().add(req.body.duration, 'minutes'),
        is_done: false,
        is_booked: true
    })
    room.findAll({
        include: [
            {
                model: customer,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                through: {
                    model: order,
                    where: { is_done: false },
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
        .then(data => {
            res.send(data);
        })
}
exports.editorder = (req, res) => {
    const id = req.params.id;

    order.update(
        {
            customer_id: req.body.customer_id,
            is_done: true,
            is_booked: false
        },
        {
            where: { room_id: id },
        })
        .then(data => {
            res.send({ data });


        })

}