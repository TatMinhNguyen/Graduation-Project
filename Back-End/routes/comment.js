const router = require("express").Router();
const upload = require("../middleware/multerConfig");
const middleware = require("../middleware");
const commentController = require("../controllers/commentController");
const CommentModel = require("../models/CommentModel");

router.post(
    '/set-comment', 
    upload.fields([{ name: 'image', maxCount: 1 }]),
    middleware.verifyToken, 
    commentController.createComment
)

router.post(
    '/update-comment/:commentId',
    upload.fields([{ name: "image", maxCount: 1 }]),
    middleware.verifyToken,
    commentController.updateComment
)

router.delete('/delete-comment/:commentId', middleware.verifyToken, commentController.deleteComment)

router.get(
    '/get-comments/:postId',
    middleware.verifyToken,
    middleware.paginatedResult(CommentModel),
    commentController.getComment
)

module.exports = router;