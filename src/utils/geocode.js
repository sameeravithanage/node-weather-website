const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FtZWVyYXN2IiwiYSI6ImNrbXVud2FndjEzbmkyeHBneDl0YWNjemgifQ.JwU0aGe8FcXdE0ZLzN5MTw&limit=1'
    request({url, json:true},(error,{body} = {})=>{
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.message || body.features.length === 0) {
            callback('Cannot find location', callback)
        } else {
            callback(undefined,{
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0],
                Location: body.features[0].place_name
            })
        }
    
    })
}

module.exports = geocode