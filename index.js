const express = require('express')
const app = express()
const port = 3000;
const path = require('path')
const axios = require('axios');
const fs = require('fs')

var BoxSDK = require('box-node-sdk');
const folderID = "0";

app.use(express.static('files'));

// const embedSDK = new BoxSDK({
//     clientID: 'h0dk0u7e2w732cnzklz0mzyyo8embqwh',
//     clientSecret: 'jgqBiUKvE8DkaCxtN0VLqEVsQdUJXi7j'
// })

// const embedToken = '98akMgEFYmYDXD7aJ0Am6wWb6lSGrLGd'

// Create a basic API client, which does not automatically refresh the access token

// const embedClient = embedSDK.getBasicClient(embedToken)

var jsonConfig = require('./box_app_config.json');
var sdk = BoxSDK.getPreconfiguredInstance(jsonConfig);

var serviceAccountClient = sdk.getAppAuthClient('enterprise');
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
   
    //Use this space to get a user Access Token.
    // const userClient = sdk.getAppAuthClient('user', '11754509499')
    const tokens = await sdk.getAppUserTokens('11754509499')
    console.log(tokens)
    // userClient.users.get(userClient.CURRENT_USER_ID)
    //     .then(result => {
    //         console.log(result)
    //     }).catch(e => {
    //         console.log('e', e)
    //     })

    

    res.render('demo', { token: tokens.accessToken, folder: folderID})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})