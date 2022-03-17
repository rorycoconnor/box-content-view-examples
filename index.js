const express = require('express')
const app = express()
const port = 3000;
const path = require('path')
const axios = require('axios');
const fs = require('fs')

var BoxSDK = require('box-node-sdk');
const fileID = '[FILE_ID]'

// Initialize the SDK with your app credentials
var sdk = new BoxSDK({
  clientID: '[BOX_VIEW_API_CLIENT_ID]',
  clientSecret: ''
});

app.use(express.static('files'));

const embedSDK = new BoxSDK({
    clientID: '[CLIENT_ID]',
    clientSecret: '[CLIENT_SECRET]'
})

const embedToken = 'Ohau921NikxAbEt8PwfSDFnSpNc7fkkN'

// Create a basic API client, which does not automatically refresh the access token
var client = sdk.getBasicClient('[BOX VIEW TOKEN]');

const embedClient = embedSDK.getBasicClient(embedToken)
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname+'/demo.html'));
    res.render('demo', { token: embedToken, file: fileID})
})

app.get('/view', async (req, res) => {
    await client.files.getEmbedLink(fileID)
        .then(embedURL => {

            res.render('view', { title: 'Box View Demo', url: embedURL})
        })
})

app.get('/embed', async (req, res) => {
    await embedClient.files.getEmbedLink(fileID)
        .then(embedURL => {
            console.log(embedURL)
            res.render('embed', { title: 'Box View Demo', url: embedURL})
        })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})