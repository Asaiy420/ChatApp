import express from "express"

const router = express.Router();

router.get("/signup", (req, res) => {
    res.send("signup route page")
})

router.get("/login", (req, res) => {
    res.send("login route page")
})

router.get("/logout", (req, res) => {
    res.send("logout route page")
}) 

export default router;
