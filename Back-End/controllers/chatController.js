const ChatModel = require("../models/ChatModel");
const UserModel = require("../models/UserModel");

const chatController = {
    // create chat 2 people
    createChat : async (req, res) =>{
        const users = await UserModel.findById(req.user.id);
        const memberId1 = users.id;
        const memberId2 = req.params.member;

        // Kiểm tra xem phòng chat với hai thành viên đã tồn tại hay chưa
        const existingChat = await ChatModel.findOne({
            members: { $all: [memberId1, memberId2], $size: 2 } 
        });

        if (existingChat) {
            return res.status(403).json({ error: 'Phòng chat đã tồn tại' }); 
        }

        else{
            const newChat = new ChatModel({ 
                members: [memberId1, memberId2]
            });
        
            try{
                const resul = await newChat.save();
                res.status(200).json(resul);
            }catch (error){
                res.status(500).json(error);
            }
        }    
    }, 

    createGroupChat : async (req, res) => {
        try {
            const { members, name } = req.body;
            const createId = req.user.id;

            if (!members.includes(createId)) {
                members.push(createId);
            }
    
            // Kiểm tra số lượng thành viên
            if (!members || members.length < 3) {
                return res.status(400).json({ message: "Nhóm chat phải có ít nhất 3 thành viên." });
            }
    
            // Tạo nhóm chat mới
            const newChat = new ChatModel({
                members,
                name,
                createId,
            });
    
            await newChat.save();
    
            return res.status(201).json({ message: "Tạo nhóm chat thành công", chat: newChat });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi server", error });
        }
    },
    
    // Get chat from user    
    userChats: async (req, res) => {
        try {
            // Lấy danh sách các đoạn chat mà user có tham gia
            let chats = await ChatModel.find({
                members: { $in: [req.user.id] }
            }).sort({ 
                updatedAt: -1 });
    
            // Duyệt qua từng đoạn chat
            const updatedChats = await Promise.all(
                chats.map(async (chat) => {
                    // Nếu đoạn chat không có tên
                    if (!chat.name) {
                        let chatObject = chat.toObject();
                        delete chatObject.avatar;

                        // Tìm userId còn lại trong đoạn chat
                        const otherUserId = chat.members.find((id) => id !== req.user.id);
                        
                        // Truy vấn thông tin của user đó từ UserModel
                        const otherUser = await UserModel.findById(otherUserId).select('_id username profilePicture');
                        
                        // Thêm thông tin user vào chat
                        return {
                            ...chatObject,
                            name: otherUser?.username,
                            avatar: otherUser?.profilePicture,
                            userId: otherUser?._id
                        };
                    } else {
                        if (chat.createId) {
                            let chatObject = chat.toObject();
    
                            // Truy vấn thông tin của người tạo từ UserModel
                            const creatorUser = await UserModel.findById(chat.createId).select('_id username profilePicture');
    
                            // Thêm thông tin người tạo vào chat
                            return {
                                ...chatObject,
                                creatorUsername: creatorUser?.username,
                                creatorAvatar: creatorUser?.profilePicture,
                            };
                        }
                    }
                    return chat.toObject(); // Giữ nguyên nếu đã có tên
                })
            );
    
            res.status(200).json(updatedChats);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
}  

module.exports = chatController;
