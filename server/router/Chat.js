const express = require("express")

const router= express.Router();
const chatModel = require("../models/chatModel");
const { find } = require("../models/userModel");

router.post("/chatcreated",async(req,res)=>{

    try {
        // console.log("users")
        const chatName=req.body.chatName;
        const users= req.body.users;
        // const users=[];
        // users.push(usersT)
        const messageAccesser=req.body.messageAccesser
        console.log(users[0])
        console.log(typeof(Object.entries(users)))

        // if (!Array.isArray(users) || users.length < 2) {
        //           return res.status(400).json({ success: false, message: "Invalid users array" });
        //         }
            
        //         // Check for existing chat with the same chatName
        //         const chatWithSameName = await chatModel.findOne({ chatName: chatName });
        //         if (chatWithSameName) {
        //             const data2= await chatModel.find( {
        //                                 $and:[ {users:{$elemMatch:{$eq:users[0]}}
                            
        //                                 },
        //                                 {users:{$elemMatch:{$eq:users[1]}}
        //                                 }
        //                     ]
        //                              }).populate("users messageAccesser")
            
        //           return res.status(200).json({ success: true,data:data2, message: "Chat name already exists" });
        //         }

         const chatExists= await chatModel.find(
            {
            $and:[ {users:{$elemMatch:{$eq:users[0]}}

            },
            {users:{$elemMatch:{$eq:users[1]}}
            }
]
         }
         )

         console.log(chatExists);
           console.log("1")

        
         if(chatExists.length!=0){
            console.log("2")
            const data2= await chatModel.find(
                {
                    $and:[ {users:{$elemMatch:{$eq:users[0]}}
                    },
                    {users:{$elemMatch:{$eq:users[1]}}
                    }
        ]
                 }
            ).populate("users messageAccesser")
            // console.log(data2)
            return res.json({data:data2,
                info:"chat already craeted"})
         }else {
            console.log("3")
            console.log(users[0])
            const newuser=[];
            newuser.push(users[0]);
            newuser.push(users[1]);
            console.log(typeof(newuser))
            const data = await chatModel.create({
                chatName:users[0]+users[1],
                users:[users[0],users[1]],
                messageAccesser:messageAccesser
            })
            console.log(data)
            console.log(typeof(newuser))
            const data2= await chatModel.find( {
                $and:[ {users:{$elemMatch:{$eq:users[0]}}
    
                },
                {users:{$elemMatch:{$eq:users[1]}}
                }
    ]
             }).populate("users messageAccesser")
             console.log(data2)
            return res.json({data:data2,
                info:"chat now created"})
         }

    
        
    } catch (error) {
        // console.log("error in creating chat")
         return res.json({success:false,
           issue:"error in creating chat"})
    }

})

module.exports=router



// const express = require("express");
// const router = express.Router();
// const chatModel = require("../models/chatModel");

// router.post("/chatcreated", async (req, res) => {
//   try {
//     const { chatName, users, messageAccesser } = req.body;

//     if (!Array.isArray(users) || users.length < 2) {
//       return res.status(400).json({ success: false, message: "Invalid users array" });
//     }

//     // Check for existing chat with the same chatName
//     const chatWithSameName = await chatModel.findOne({ chatName: chatName });
//     if (chatWithSameName) {
//         const data2= await chatModel.find( {
//                             $and:[ {users:{$elemMatch:{$eq:users[0]}}
                
//                             },
//                             {users:{$elemMatch:{$eq:users[1]}}
//                             }
//                 ]
//                          }).populate("users messageAccesser")

//       return res.status(400).json({ success: true,data:data2, message: "Chat name already exists" });
//     }

//     // Check if a chat with the same users already exists
//     const chatExists = await chatModel.find({
//       $and: [
//         { users: { $elemMatch: { $eq: users[0] } } },
//         { users: { $elemMatch: { $eq: users[1] } } }
//       ]
//     });

//     if (chatExists.length > 0) {
//       const populatedChat = await chatModel.findOne({
//         $and: [
//           { users: { $elemMatch: { $eq: users[0] } } },
//           { users: { $elemMatch: { $eq: users[1] } } }
//         ]
//       }).populate("users messageAccesser");

//       return res.json({
//         data: populatedChat,
//         info: "Chat already created"
//       });
//     } else {
//       const newChat = await chatModel.create({
//         chatName: chatName,
//         users: [users[0], users[1]],
//         messageAccesser: messageAccesser
//       });

//       const populatedNewChat = await chatModel.findOne({
//         _id: newChat._id
//       }).populate("users messageAccesser");

//       return res.json({
//         data: populatedNewChat,
//         info: "Chat now created"
//       });
//     }
//   } catch (error) {
//     console.error("Error in creating chat:", error);
//     return res.status(500).json({ success: false, message: "Error in creating chat" });
//   }
// });

// module.exports = router;
