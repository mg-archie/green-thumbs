const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  savePlant,
  deletePlant,
  saveBlog,
  deleteBlog,
  login,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, savePlant);
router.route('/login').post(login);
router.route('/me').get(authMiddleware, getSingleUser);
router.route('/plants/:plantId').delete(authMiddleware, deletePlant);

router.route('/blogs').put(authMiddleware, saveBlog);
router.route('/blogs/:blogId').delete(authMiddleware, deleteBlog);

module.exports = router;
