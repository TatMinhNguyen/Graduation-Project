const GroupModel = require("../models/GroupModel");
const UserModel = require("../models/UserModel");

const groupController = {
    createGroup : async (req, res) => {
        try {
            const { members, name, type } = req.body;
            const createId = req.user.id;

            if (!members.includes(createId)) {
                members.push(createId);
            }
    
            // Tạo nhóm group mới
            const newGroup = new GroupModel({
                members,
                name,
                createId,
                type
            });

            await newGroup.save();
    
            return res.status(201).json({ message: "Tạo nhóm thành công", group: newGroup });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error });
        }
    },
    getAGroup : async(req, res) => {
        try {
            const groupId = req.params.groupId;

            const group = await GroupModel.findById(groupId)
            if(!group) {
                return res.status(404).json({ message: "Not found group" })
            }

            return res.status(200).json(group)
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error });
        }
    },

    getSuggestGroup : async (req, res) => {
        try {
            const currentUserId = req.user.id;
    
            // Tìm các nhóm mà người dùng hiện tại chưa tham gia
            const suggestedGroups = await GroupModel.find({
                members: { $ne: currentUserId }
            })
    
            return res.status(200).json( suggestedGroups );
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error });
        }
    },

    getUserGroups : async (req, res) => {
        try {
            const currentUserId = req.user.id;
    
            // Tìm các nhóm mà người dùng hiện tại đã tham gia
            const groups = await GroupModel.find({
                members: { $in: [currentUserId] }
            })
    
            return res.status(200).json(groups);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error });
        }
    },

    getMembers: async (req, res) => {
        try {
          const groupId = req.params.groupId;
          const group = await GroupModel.findById(groupId).select('members'); 
          
          if (!group) {
            return res.status(404).json({ error: 'group not found' });
          }
      
          const memberIds = group.members; 
          const members = await UserModel.find({ _id: { $in: memberIds } }).select('id username profilePicture'); 
      
          res.status(200).json( members );
        } catch (error) {
          res.status(500).json(error);
        }
    },

    addMembers: async (req, res) => {
        try {
            const { groupId } = req.params; 
            const { newMembers } = req.body; 
            const userId = req.user.id; 
    
            // Kiểm tra nếu không có thành viên mới nào được gửi lên
            if (!newMembers || newMembers.length === 0) {
                return res.status(400).json({ message: "Không có thành viên nào để thêm vào nhóm group." });
            }
    
            const group = await GroupModel.findById(groupId);
            if (!group) {
                return res.status(404).json({ message: "Không tìm thấy nhóm group." });
            }
    
            // Kiểm tra xem người dùng có phải là thành viên của nhóm không
            if (!group.members.includes(userId)) {
                return res.status(403).json({ message: "Bạn không phải là thành viên của nhóm group này." });
            }
            
            if(group.type === false){
                if(group.createId.toString() === userId) {
                    // Thêm thành viên mới nếu chưa có trong danh sách thành viên của nhóm
                    newMembers.forEach(member => {
                        if (!group.members.includes(member)) {
                            group.members.push(member);
                        }
                    });                
                }else{
                    newMembers.forEach(member => {
                        if (!group.pendingMembers.includes(member)) {
                            group.pendingMembers.push(member);
                        }
                    });     
                }                
            }
            else{
                newMembers.forEach(member => {
                    if (!group.members.includes(member)) {
                        group.members.push(member);
                    }
                });                 
            }

            // Lưu lại nhóm group
            await group.save();
    
            return res.status(200).json({ message: "Thêm thành viên vào nhóm group thành công" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error });
        }
    },
    removeMember: async (req, res) => {
        try {
            const { groupId } = req.params; 
            const { memberId } = req.body; 
            const userId = req.user.id;
    
           
            const group = await GroupModel.findById(groupId);
            if (!group) {
                return res.status(404).json({ message: "Không tìm thấy nhóm group." });
            }
    
            // Kiểm tra quyền: chỉ người tạo nhóm group mới có quyền xóa thành viên
            if (group.createId.toString() !== userId) {
                return res.status(403).json({ message: "Bạn không có quyền xóa thành viên khỏi nhóm group này." });
            }
               
            // Kiểm tra nếu thành viên cần xóa có trong nhóm
            if (!group.members.includes(memberId)) {
                return res.status(400).json({ message: "Thành viên không có trong nhóm group." });
            }
    
            // Xóa thành viên khỏi danh sách
            group.members = group.members.filter(member => member.toString() !== memberId);
    
            // Lưu lại nhóm group
            await group.save();
    
            return res.status(200).json({ message: "Xóa thành viên khỏi nhóm group thành công" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error });
        }
    },

    leaveGroup: async (req, res) => {
        try {
            const { groupId } = req.params; // Lấy ID của nhóm group từ params
            const userId = req.user.id; // ID của người thực hiện yêu cầu
    
            // Tìm nhóm group bằng groupId
            const group = await GroupModel.findById(groupId);
            if (!group) {
                return res.status(404).json({ message: "Không tìm thấy nhóm group." });
            }
    
            // Kiểm tra nếu người dùng không phải là thành viên của nhóm
            if (!group.members.map(member => member.toString()).includes(userId)) {
                return res.status(400).json({ message: "Bạn không phải là thành viên của nhóm group này." });
            }
    
            if (group.members.length === 1) {
                await GroupModel.findByIdAndDelete(groupId);
                return res.status(200).json({ message: "Rời nhóm thành công và nhóm đã bị xóa vì không còn thành viên nào." });
            }
    
            // Xóa thành viên khỏi danh sách
            group.members = group.members.filter(member => member.toString() !== userId);
    
            // Nếu người dùng rời là nhóm trưởng
            if (group.createId.toString() === userId) {
                // Chuyển quyền nhóm trưởng cho một thành viên ngẫu nhiên còn lại
                if (group.members.length > 0) {
                    group.createId = group.members[Math.floor(Math.random() * group.members.length)];
                }
            }
    
            // Lưu lại nhóm group
            await group.save();
    
            return res.status(200).json({ message: "Rời nhóm group thành công" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error });
        }
    },

    joinGroup : async (req, res) => {
        try {
            const { groupId } = req.params; // Lấy ID của nhóm từ params
            const userId = req.user.id; // ID của người dùng hiện tại
    
            // Tìm nhóm bằng groupId
            const group = await GroupModel.findById(groupId);
            if (!group) {
                return res.status(404).json({ message: "Không tìm thấy nhóm." });
            }
    
            // Kiểm tra nếu người dùng đã là thành viên của nhóm
            if (group.members.includes(userId)) {
                return res.status(400).json({ message: "Bạn đã là thành viên của nhóm này." });
            }
    
            // Thêm người dùng vào danh sách thành viên
            if(group.type === true) {
                group.members.push(userId);
            }else {
                if(!group.pendingMembers.includes(userId)){
                   group.pendingMembers.push(userId) 
                }  
            }
            
            // Lưu lại nhóm
            await group.save();
    
            return res.status(200).json({ group });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error });
        }
    },

    deleteGroup: async (req, res) => {
        try {
            const { groupId } = req.params; // Lấy ID của nhóm chat từ params
            const userId = req.user.id; // ID của người thực hiện yêu cầu
    
            // Tìm nhóm chat bằng groupId
            const chat = await GroupModel.findById(groupId);
            if (!chat) {
                return res.status(404).json({ message: "Không tìm thấy nhóm chat." });
            }
    
            // Kiểm tra quyền: chỉ người tạo nhóm mới có quyền xóa nhóm
            if (chat.createId.toString() !== userId) {
                return res.status(403).json({ message: "Bạn không có quyền xóa nhóm chat này." });
            }
    
            // Xóa nhóm chat
            await ChatModel.findByIdAndDelete(groupId);
    
            return res.status(200).json({ message: "Xóa nhóm chat thành công." });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error });
        }
    },

    // Admin accept members join
    approveRequest: async (req, res) => {
        const userId = req.user.id;
        const groupId = req.params.groupId;
        try{
            const group = await GroupModel.findById(groupId);
            
            const requestId = req.params.requestId; // ID của yêu cầu cần phê duyệt
            const index = group.pendingMembers.indexOf(requestId);

            if (index === -1) {
                return res.status(404).json("Request not found");
            }

            if(userId !== group.createId.toString()) {
                return res.status(403).json("You're not the admin of this group")
            }

            // Xóa yêu cầu từ danh sách pendingMembers
            group.pendingMembers.splice(index, 1);

            // Thêm thành viên vào danh sách members
            group.members.push(requestId);

            await group.save();

            return res.status(200).json("Request approved successfully");
        }
        catch (err) {
            return res.status(500).json(`ERROR: ${err}`);
        }
    },

    refuseRequest: async (req, res) => {
        const userId = req.user.id;
        const groupId = req.params.groupId;
        try{
            const group = await GroupModel.findById(groupId);
            
            const requestId = req.params.requestId; // ID của yêu cầu cần phê duyệt
            const index = group.pendingMembers.indexOf(requestId);

            if (index === -1) {
                return res.status(404).json("Request not found");
            }

            if(userId !== group.createId.toString()) {
                return res.status(403).json("You're not the admin of this group")
            }

            // Xóa yêu cầu từ danh sách pendingMembers
            group.pendingMembers.splice(index, 1);

            await group.save();

            return res.status(200).json("Request refuse successfully");
        }
        catch (err) {
            return res.status(500).json(`ERROR: ${err}`);
        }
    },

    getPendingMembers: async (req, res) => {
        try {
            const groupId = req.params.groupId;
            const group = await GroupModel.findById(groupId).select('pendingMembers'); 
            
            if (!group) {
              return res.status(404).json({ error: 'group not found' });
            }
        
            const memberIds = group.pendingMembers; 
            const members = await UserModel.find({ _id: { $in: memberIds } }).select('id username profilePicture'); 
        
            res.status(200).json( members );
          } catch (error) {
            res.status(500).json(error);
        }
    },
}

module.exports = groupController