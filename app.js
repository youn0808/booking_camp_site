const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Campground = require('./models/campground')
const engine = require('ejs-mate')


mongoose.connect('mongodb://localhost/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
  });

const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection fail"))
db.once("open",()=>{
  console.log("Database connected")
})

const app = express()
const port = 3000

app.engine('ejs', engine);

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/campgrounds',async (req,res)=>{
  const campgrounds = await Campground.find({});   //get all objects in campgrounds 
  res.render('campgrounds/index',{campgrounds});
})

app.get('/campgrounds/new',(req,res)=>{
  res.render('campgrounds/new')
})

app.post('/campgrounds',async(req,res)=>{
  const newCampground = new Campground(req.body.campground);
  // res.send(newCampground);
  await newCampground.save();
  res.redirect(`campgrounds/${newCampground._id}`)
})


app.get('/campgrounds/:id',async (req,res)=>{
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/show',{campground})
})

app.get('/campgrounds/:id/edit', async(req,res)=>{
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/edit',{campground});
})

app.put('/campgrounds/:id',async(req,res)=>{
  const {id}= req.params; 
  //const campground = await Campground.findByIdAndUpdate(id,{req.body.campground}); 
  //instaed this use spread operator 
  const campground = await Campground.findByIdAndUpdate(id,{ ...req.body.campground},{new:true}); 
  res.redirect(`/campgrounds/${campground._id}`)

})
app.delete('/campgrounds/:id',async(req,res)=>{
  const {id}= req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');

})



app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})


  
  
