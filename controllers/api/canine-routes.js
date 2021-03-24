const router = require('express').Router();
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection');

// const { Canine, Volunteer, Demeaner} = require('../../models');
const { Canine } = require('../../models');
// get all users
router.get('/', (req, res) => {
    console.log('======================');
    Canine.findAll({})
        .then();
});

router.get('/:id', (req, res) => {
    Post.findOne({
    })
        .then();
});
//create dog functionality will be added to route, however volunteers won't have ability to create dog in this first pass
router.post('/', (req, res) => {
    Post.create({
        dogName: req.body.title,
        post_body: req.body.post_body,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_body: req.body.post_body  
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
module.exports = router;
