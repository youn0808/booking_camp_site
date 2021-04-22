const express = require('express')
const path = require('path');
const mongoose = require('mongoose');

const Campground = require('./models/campground')

mongoose.connect('mongodb://localhost/yelp-camp', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection fail"))
db.once("open",()=>{
  console.log("Database connected")
})

const app = express()
const port = 3000


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


app.get('/', (req, res) => {
  res.render('home')
})

app.get('/makeCampground',async (req,res)=>{
  const camp = new Campground({tittle:'My Backyard',description:"Basecamp"});
  await camp.save()
  res.send(camp)
})



app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})