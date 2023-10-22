import express, { Router } from "express";
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";

const router = express.Router();

const client = new PrismaClient();

// POST url/user _ 유저생성
router.post("/", async (req,res)=>{
    try{
        const {account, password} = req.body;

        if(!account || !password){
            return res.status(400).json({
                ok: true,
                message:"Not exist data.",
            })
        }

        const existUser = await client.user.findUnique({
            where:{
                account,
            },
        });

        if (existUser){
            return res.status(400).json({
                ok: true,
                message:"Already exist user."
            });
        }
    const hashedPassword = bcrypt.hashSync(password, 10);

// 유저가 존재하지 않으면 유저 생성
    const newUser = await client.user.create({
        data:{
        account,
        password : hashedPassword,
        },
    });
    // console.log(newUser);

    // return res.json({ ok: true });
    return res.json({ 
        ok: true, 
        user: {
        id: newUser.id,
        createdAt : newUser.createdAt,
        updatedAt : newUser.updatedAt,
        account: newUser.account,
    }, 
    });

        // console.log(req.body);
        // return res.json({
        //     ok: true,
        //     user: newUser,
        // });

    }catch(error){
        console.error(error);
        return res.status(500).json({
            ok: false,
            message : "Server error."
        });
    }
});

/////////////////////////////////////////////////////
router.post("/test", async (req,res)=>{
    try{
        const {account, password} = req.body;
        
        if(!account || !password){
            return res.status(400).json({
                ok: true,
                message:"Not exist data.",
            })
        }

        const user = await client.user.findUnique({
            where:{
                account,
            },
        });

        if (!user){
            return res.status(400).json({
                ok: true,
                message:"Not exist user."
            });
        }

        const result = bcrypt.compareSync(password, user.password);


        if(!result){
            return res.status(400).json({
                ok: false,
                message:"Not correct password.",
            });
        }

        return res.json({
            ok: true,
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({
            ok: false,
            message : "Server error."
        });
    }
})

export default router;