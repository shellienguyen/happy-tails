const router = require('express').Router();
const withAuth = require('../../utils/auth')
const sequelize = require('../../config/connection');

const { Canine } = require('../../models');

router.get( '/', ( req, res ) => {
    Canine.findAll({
       attributes: [ 'c_id', 'c_name' ]
    })
    .then( dbCanineData => {
       console.log('router.get inside home-routes.js');
       res.json(dbCanineData);
    })
    .catch( err => {
       console.log( "Error in router.get in home-route.js" );
       console.log( err );
       res.status( 500 ).json( err );
    });
 });
 
/* 
router.get('/:id', (req, res) => {
    Post.findOne({
    })
        .then();
});

router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
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
*/

module.exports = router;
