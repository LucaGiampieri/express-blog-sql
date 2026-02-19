const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

const indexRequest = require('../middlewares/request/indexRequest');
const showRequest = require('../middlewares/request/showRequest');
const storeRequest = require('../middlewares/request/storeRequest');
const modifyRequest = require('../middlewares/request/modifyRequest');
const updateRequest = require('../middlewares/request/updateRequest');
const destroyRequest = require('../middlewares/request/destroyRequest');


//rotte du CRUD

// index
router.get('/', indexRequest, postController.index);

// show
router.get('/:id', showRequest, postController.show);

// store
router.post('/', storeRequest, postController.store);

// update
router.put('/:id', updateRequest, postController.update);

// modify
router.patch('/:id', modifyRequest, postController.modify);

// destroy
router.delete('/:id', destroyRequest, postController.destroy);

module.exports = router;