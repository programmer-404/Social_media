var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var middleware=require("./middleware")
const cors = require('cors');

// these line is important. Include it before setting up the webhook handler.
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json());


router.post("/register",cors(),middleware.registerUser)
router.post("/login",cors(),middleware.userLogin)
router.get("/",function (req,res,next){ res.send("working fine") } )
module.exports = router;