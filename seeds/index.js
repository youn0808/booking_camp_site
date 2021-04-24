const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const {descriptors,places} = require('./seedHelpers')
mongoose.connect('mongodb://localhost/yelp-camp', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection fail"))
db.once("open",()=>{
  console.log("Database connected")
})

const sample = array =>array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    
    for(let i = 0; i<10; i++){
        const random1000 =Math.floor(Math.random()*1000);
        const randomPrice =Math.floor(Math.random()*50)+10;
        const camp = new Campground({
            tittle:`${sample(places)} in ${sample(descriptors)}`,
            location:`${cities[random1000].city} - ${cities[random1000].state} `,
            image:'https://source.unsplash.com/collection/10019480',
            description:'description',
            price:randomPrice

        })
        await camp.save();
    }
}

seedDB();