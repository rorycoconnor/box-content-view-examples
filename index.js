const express = require('express')
const app = express()
const port = 3000;
const path = require('path')
const axios = require('axios');
const fs = require('fs')

var BoxSDK = require('box-node-sdk');
const folderID = "0";

app.use(express.static('files'));

// const embedClient = embedSDK.getBasicClient(embedToken)

var jsonConfig = require('./box_app_config.json');
var sdk = BoxSDK.getPreconfiguredInstance(jsonConfig);

var serviceAccountClient = sdk.getAppAuthClient('enterprise');
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
   
    const tokens = await sdk.getAppUserTokens('[APP_USER_ID]')
    console.log(tokens)
    
    //Pass the folder ID and access Token to the client to render the UI Element
    res.render('demo', { token: tokens.accessToken, folder: folderID})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})