const router = require("express").Router();

const middleware = require("../middleware/index")
const postController = require("../controllers/postController");
const upload = require("../middleware/multerConfig");

router.post('/create-post',  
            upload.fields([{ name: 'images', maxCount: 5 }, { name: 'video', maxCount: 1 }]), 
            middleware.verifyToken,
            postController.createPost
        )

router.delete('/delete-post/:id', middleware.verifyToken, postController.deletePost)

router.get('/get-all-posts', middleware.verifyToken, postController.getPosts)

module.exports = router;
