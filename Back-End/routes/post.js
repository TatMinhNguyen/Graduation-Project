const router = require("express").Router();

const middleware = require("../middleware/index")
const postController = require("../controllers/postController");
const upload = require("../middleware/multerConfig");

router.post('/create-post',  
            upload.fields([{ name: 'images', maxCount: 5 }, { name: 'video', maxCount: 1 }]), 
            middleware.verifyToken,
            postController.createPost
        )

router.delete('/delete-post/:postId', middleware.verifyToken, postController.deletePost)

router.get('/get-all-posts', middleware.verifyToken, postController.getPosts)

router.get('/get-a-post/:postId', middleware.verifyToken, postController.getAPost)

router.get('/get-user-post/:userId', middleware.verifyToken, postController.getUserPost)

router.post('/update-a-post/:postId',
    upload.fields([{ name: 'images', maxCount: 5 }, { name: 'video', maxCount: 1 }]),
    middleware.verifyToken, 
    postController.updatePost
)

module.exports = router;
