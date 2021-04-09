const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlers engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static folder location
app.use(express.static(publicDirPath))
 
// Setup routes
app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather app',
        name: 'Sameera'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About me',
        name: 'Sameera'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        message:'This is a help message',
        title: 'Help',
        name: 'Sameera'
    })
})

app.get('/weather', (req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error,{Latitude, Longitude, Location} = {})=>{
        if (error){
            return res.send({error})
        }
        forecast(Latitude,Longitude, (error, {weather,temp,feelslike} = {}) => {
            if (error) {
                return res.send({error})
            }
            const forecast = weather + ' - Temperature is ' + temp + ', it feels like ' + feelslike
            res.send({
                temp,
                place: Location,
                weather,
                feelslike,
                forecast,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search location'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Sameera',
        message: 'Help page not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Sameera',
        message: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('server is working on port' + port)
})