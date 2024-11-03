const groupController = require("../controllers/groupController");
const middleware = require("../middleware");

const router = require("express").Router();

router.post('/create-group', middleware.verifyToken, groupController.createGroup)

router.get('/get-a-group/:groupId', middleware.verifyToken, groupController.getAGroup)

router.get('/get-suggest', middleware.verifyToken, groupController.getSuggestGroup)

router.get('/get-user-group', middleware.verifyToken, groupController.getUserGroups)

router.get('/get-members/:groupId', middleware.verifyToken, groupController.getMembers)

router.get('/get-pending-members/:groupId', middleware.verifyToken, groupController.getPendingMembers)

router.post('/add-members/:groupId', middleware.verifyToken, groupController.addMembers)

router.post('/remove-members/:groupId', middleware.verifyToken, groupController.removeMember)

router.post('/leave-group/:groupId', middleware.verifyToken, groupController.leaveGroup)

router.post('/join-group/:groupId', middleware.verifyToken, groupController.joinGroup)

router.post('/cancel-join/:groupId', middleware.verifyToken, groupController.cancelJoinGroup)

router.delete('/delete-group/:groupId', middleware.verifyToken, groupController.deleteGroup)

router.post('/accept-members/:groupId/:requestId', middleware.verifyToken, groupController.approveRequest)

router.post('/refuse-members/:groupId/:requestId', middleware.verifyToken, groupController.refuseRequest)


module.exports = router;