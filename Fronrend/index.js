const express = require('express')
const request = require('request')

var app = express()
const port = 5000

var catalogIP = 'http://localhost:3000'
var orderIP = 'http://localhost:4000'

app.use(express.json())


app.post('/purchase/:item_number', (req, res) => {
    var orderForwardOptions = {
        uri: orderIP + req.url,
        body: JSON.stringify(req.body),
        method: req.method,
        headers: {
            'Content-Type': req.headers['content-type']
        }
        
    }
    request(orderForwardOptions, (error, response) => {
        if (error) {
            console.log(error);
        }
        console.log('send request from front end to order')
        res.status(response.statusCode).send(response.body)
    })

})

app.all('*', (req, res) => {
    var catalogForwardOptions = {
        uri: catalogIP + req.url,
        body: JSON.stringify(req.body),
        method: req.method,
        headers: {
            'Content-Type': req.headers['content-type']
        }
    }
    request(catalogForwardOptions, (error, response) => {
        if (error) {
            console.log(error);
        }
        console.log('send request from front end to catalog')
        res.status(response.statusCode).send(response.body)
    })
})

app.listen(port, () => {
    console.log('Server has started at port ', port)
})
