const adminController = require("../controllers/adminController");
const middleware = require("../middleware");

const router = require("express").Router();

router.get('/get-post-reported', middleware.verifyToken, adminController.getPostReported)

router.post('/keep-post/:postId', middleware.verifyToken, adminController.keepPost)

router.delete('/delete-post/:postId', middleware.verifyToken, adminController.deletePost)

module.exports = router;