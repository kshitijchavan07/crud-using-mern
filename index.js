const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config()
const path=require('path')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => console.log("connection started"))
  .catch((err) => console.log(err));


app.get("/orders", (req, res) => {
  order
    .aggregate([
      {
        $sort: {
          id: 1,
        },
      },
      {
        $limit: 1,
      },
    ])
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/lists", async (req, res) => {
  try {
    const data = await list.find();
    res.send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});
app.post("/adddata", async (req, res) => {
  // const pass=await bcrypt.hash(req.body.password,10)
  const user1 = new users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const info = await user1.save(user1);
    console.log(info);
    res.status(201).send(info);
  } catch (err) {
    console.log(err);
    res.status(500).send;
  }
});

app.get("/user", async (req, res) => {
  try {
    const userdata = await users.find();
    console.log(userdata);
    res.send(userdata);
  } catch (error) {
    console.log(error);
  }
});
app.put("/update/:id", async (req, res) => {
  try {
    const updateddata = await users.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log(updateddata)
    res.status(201).send('successfull update');
  } catch (err) {
    console.log(err);
  }
});

app.delete("/deleteList/:id", (req, res) => {
  try {
    console.log(req.params.id);
    users
      .findByIdAndDelete({ _id: req.params.id })
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

//create data

const listschema = {
  name: String,
  email: String,
  contact: Number,
  id: Number,
};
const userschema = {
  name: String,
  email: String,
  password: String,
};
const users = mongoose.model("users", userschema);
const list = mongoose.model("lists", listschema);


//

const orderSchema = {
  id: Number,
  item: String,
};

if (process.env.NODE_ENV=='production'){
  app.use(express.static('app7/build'));
  app.use('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'build','index.html'))
  })
}

app.listen(process.env.PORT || 3001, () => {
  console.log("running on port 3001");
});
