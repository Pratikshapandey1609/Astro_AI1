import express from 'express'
import {signup , login, updateProfile} from '../controllers/userController.js'
import auth from "../middleware/authMiddleware.js"

const router = express.Router();

// testing route 
router.get('/', (req, res) => {
    console.log("test Route Working !");
    res.send("Astrology API Running...")
});

//signup route 
router.post('/signup',signup); 
// login 
router.post('/login', login)
// updating profile 
router.put("/profile",auth , updateProfile)


export default router;
