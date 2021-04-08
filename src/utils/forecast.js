const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=42e554d9a557ae98775bc33cc4cf66e3&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json:true},(error,{body} = {})=>{
        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Error in user parameters', undefined)
        } else {
            callback(undefined,{
                weather: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast