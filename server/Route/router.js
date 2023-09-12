const express = require("express");
const router = express.Router();
const User = require("../db/models/userSchema");
const Authenticate = require("../db/auth");
const bcrypt = require("bcryptjs");
const { default: axios } = require("axios");
const chatKey = process.env.CHAT_KEY;

//User Registration

router.post("/register", async (req, res) => {
  const { fullName, email, password, cpassword } = req.body;

  if (!fullName || !email || !password || !cpassword) {
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
        fullName,
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
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(422).json({ error: "Fill all the feild" });
  }

  try {
    const userLogin = await User.findOne({ email: userName });

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

        try {
          const resp = await axios.put(
            "https://api.chatengine.io/users/",
            {
              username: userLogin.fullName,
              secret: userLogin.fullName,
              first_name: userLogin.fullName 
            },
            {
              headers: { "Private-Key": chatKey },
            }
          );
          res.status(resp.status).json(resp.data);
        } catch (error) {
          console.log(error);
          res.status(422).json({ error: error.message });
        }
      }
    } else {
      res.status(422).json({ error: "No user Found" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//finding user function

router.get("/userdata", Authenticate, async (req, res) => {
  try {
    const getUser = await User.findOne({ _id: req.userID });
    // console.log(buyUser);
    res.status(201).json(getUser);
  } catch (error) {
    console.log(error.message);
  }
});

//Logout user

router.get("/logout", Authenticate, (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((cruval) => {
      return cruval.token !== req.token;
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
