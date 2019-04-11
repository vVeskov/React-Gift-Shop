const router = require('express').Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/gifts', feedController.getGifts);
router.post('/gift/create', feedController.createGift);
router.put('/gift/edit', feedController.editGift);
router.delete('/gift/delete', feedController.deleteGift);

router.post('/user/newOrder', feedController.addNewOrderToUser)
router.get('/user/orders', feedController.getUserOrders);
router.post('/user/delete',feedController.removeUserOrders);
router.post('/user/deleteSingleGift',feedController.deleteSingleGift)
module.exports = router;