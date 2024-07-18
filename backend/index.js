const port = 4000;

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// database connection with mongoDB

mongoose.connect("mongodb+srv://Prajjwal:Bhanu%402021@cluster0.xzm1u9y.mongodb.net/e-commerce");

// api creation

app.get("/", (req, res) => {
    res.send("express app is running");
});

// image storage engine

const storage = multer.diskStorage({
    destination : './upload/images',
    filename : (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage : storage});

app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success : 1,
        image_url : `http://localhost:${port}/images/${req.file.filename}`
    })
});

// schema for creating products
const Product = mongoose.model("Product", {
    id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    new_price : {
        type : Number,
        required : true
    },
    old_price : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        default : Date.now(),
    },
    available : {
        type : Boolean,
        default : true,
    }
});

// schema for storing user details

const Users = mongoose.model("Users", {
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    cartData : {
        type : Object,
        default : {},
    },
    date : {
        type : Date,
        default : Date.now(),
    }
});

// api for creating user
app.post("/signup", async (req, res) => {
    const check = await Users.findOne({email : req.body.email});
    if(check){
        res.status(400);
        res.json({
            success : false,
            error : "user with this email already exists"
        });
        return;
    }
    // console.log(req.body);
    
    const user = new Users({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        cartData : {},
    })

    await user.save();

    const data = {
        user : {
            id : user.id
        }
    }
    const token = jwt.sign(data, "secret_ecom")

    res.send({
        success : true,
        token
    })
});

// endpoint for user login
app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Users.findOne({email : email});
    
    if(user){
        const passwordCompare = (password === user.password);
        if(passwordCompare){
            const data = {
                user : {
                    id : user.id,
                }
            }
            const token = jwt.sign(data, "secret_ecom");
    
            res.json({
                success : true,
                token,
            });
        }
        else{
            res.json({
                success : false,
                error : "Wrong password"
            });
        }
    }
    else{
        res.json({
            success : false,
            error : "Wrong email"
        });
    }
    return;
})

// api for adding product
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product = products.at(-1);
        id = last_product.id + 1;
    }
    else id = 1;

    // console.log(req.body);

    const product = new Product({
        id : id,
        name : req.body.name,
        image : req.body.image,
        category : req.body.category,
        new_price : Number.parseInt(req.body.new_price),
        old_price : Number.parseInt(req.body.old_price),
    });

    console.log(product);

    await product.save();
    console.log("Product succefully saved");

    res.json({
        success : true,
        name : req.body.name,
    });
});

// api for deleting product

app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({id : req.body.id});

    console.log("Product succefully removed");
    res.json({
        success : true,
        name : req.body.name,
    });
});

// api for getting all products
app.get("/allproducts", async (req, res) => {
    const products = await Product.find();

    console.log("all products fetched");
    res.json(products);
});

// middleware for fetching user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401);
        res.send({error : "please authneticate using valid token"});
    }
    else{
        try{
            const data = jwt.verify(token, "secret_ecom");
            req.user = data.user;
        }
        catch(error){
            res.status(401).send({error : "authenticate using valid token"})
        }
    }
    next();
}

app.post("/addtocart", fetchUser, async(req, res) => {
    // const 
    // const user = await Users.find()
    // console.log("backend add to cart :",req.body);
    // console.log(req.user);

    let userData = await Users.findOne({_id : req.user.id});
    // console.log(userData);

    userData.cartData[req.body.item.itemId] = req.body.item;
    const cart = userData.cartData;

    await Users.findOneAndUpdate({_id : req.user.id}, {cartData : userData.cartData});
    res.send({success : true, message : "Added to cart", cart : cart});
});

app.post("/removefromcart", fetchUser, async(req, res) => {
    let userData = await Users.findOne({_id : req.user.id});
    // console.log(userData);

    delete userData.cartData[req.body.item.itemId];
    const cart = userData.cartData;

    await Users.findOneAndUpdate({_id : req.user.id}, {cartData : userData.cartData});
    res.send({success : true, message : "Added to cart", cart : cart});
});

app.post("/allcartitems", fetchUser, async(req, res) => {
    let userData = await Users.findOne({_id : req.user.id});

    const cartData = userData.cartData;
    res.send({success : true, cart : cartData});
})


app.listen(port, (error) => {
    if(!error) console.log("server running on port " + port);
    else console.log("error : ",error);
});