const express = require("express");
const router = express.Router();
const User = require("../db/models/userSchema");
const Authenticate = require('../db/auth');

//User Registration

router.post("/register", async (req, res) => {
  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    res.status(422).json({ error: "Fill all the feild" });
  }

  try {
    const preUser = await User.findOne({ email: email });

    if (preUser) {
      res.status(422).json({ error: "User already registerd" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "Password doesn't matches" });
    } else {
      const createUser = new User({
        fname,
        email,
        password,
        cpassword,
      });

      const storedata = await createUser.save();
      res.status(201).json(storedata);
    }
  } catch (error) {
    console.log(error.message);
  }
});

//User Login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "Fill all the feild" });
  }

  try {
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(422).json({ error: "Invalid details" });
      } else {
        //token generate function
        const token = await userLogin.generateAuthToken();

        res.cookie("routeProject", token, {
          expires: new Date(Date.now() + 2589000),
          httpOnly: true,
        });

        res.status(201).json({ message: "login Success" });
      }
    } else {
      res.status(422).json({ error: "No user Found" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//finding user function

router.get('/userdata',Authenticate,async(req,res)=>{
    try {
  
      const getUser = await User.findOne({_id:req.userID});
      // console.log(buyUser);
      res.status(201).json(getUser);
      
    } catch (error) {
      console.log(error.message);
    }
  });
  
  //Logout user
  
  router.get('/logout',Authenticate,(req,res)=>{
    try {
      req.rootUser.tokens = req.rootUser.tokens.filter((cruval) => {
          return cruval.token !== req.token
      });
  
      res.clearCookie("routeProject", { path: "/" });
      req.rootUser.save();
      res.status(201).json(req.rootUser.tokens);
      console.log("user logout");
  
  } catch (error) {
      console.log(error + "error in user logout");
  }
  });
  

module.exports = router;
