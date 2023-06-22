const express = require("express")
const jwt = require("jsonwebtoken");
const router = express.Router()
const User = require("../schemas/user.js")

// 회원가입 API
router.post("/users", async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(400).json({
            errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
        });
        return;
    }

    // email 또는 nickname이 동일한 데이터가 있는지 확인하기 위해 가져온다.
    const existsUsers = await User.findOne({
        $or: [{ nickname }],
    });
    if (existsUsers) {
        // NOTE: 보안을 위해 인증 메세지는 자세히 설명하지 않습니다.
        res.status(400).json({
            errorMessage: "중복된 닉네임입니다.",
        });
        return;
    }

    const user = new User({ nickname, password });
    await user.save();

    res.status(201).json({
        success: true,
            message: "가입되었습니다."
        })
});

module.exports = router;