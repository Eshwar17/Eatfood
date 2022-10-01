const path = require('path');
const fs = require('fs');
const express = require('express');
const uuid = require('uuid');
const { render } = require('ejs');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    // const filePath = path.join(__dirname, 'views', 'index.html');
    // //return files
    // res.sendFile(filePath);
    res.render('index');
});


app.get('/restaurants', function(req,res) {
    // const filePath = path.join(__dirname, 'views', 'restaurants.html');
    // //return files
    // res.sendFile(filePath);
    const filePath = path.join(__dirname, 'views', 'app.json');
    const restaurantList = fs.readFileSync(filePath);
    const existingData = JSON.parse(restaurantList);
    res.render('restaurants', {numberOfRest: existingData.length, restaurants:existingData});
});
app.get('/restaurants/:id', function(req, res) {
    const restId = req.params.id;
    render('restaurant-details', {rid: restId});
});

app.get('/about', function(req,res) {
    // const filePath = path.join(__dirname, 'views', 'about.html');
    // //return files
    // res.sendFile(filePath);
    res.render('about');
});

app.get('/confirm', function(req,res) {
    // const filePath = path.join(__dirname, 'views', 'confirm.html');
    // //return files
    // res.sendFile(filePath);
    res.render('confirm');
});

app.get('/recommend', function(req,res) {
    // const filePath = path.join(__dirname, 'views', 'recommend.html');
    // //return files
    // res.sendFile(filePath);
    res.render('recommend');
});

app.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const filePath = path.join(__dirname, 'views', 'app.json');
    const restaurantList = fs.readFileSync(filePath);
    const existingData = JSON.parse(restaurantList);

    existingData.push(restaurant);
    fs.writeFileSync(filePath, JSON.stringify(existingData));
    res.redirect('/confirm');
});

app.use(function(req, res) {
    res.render('404');
});
app.listen(3000);