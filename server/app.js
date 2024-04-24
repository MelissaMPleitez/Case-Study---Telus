//Export the express module creating the constant
const express = require('express');
//RSA module
const NodeRSA = require('node-rsa');
//Create a constant for path nodule
const path = require('path');
//Declare the port in use
const port = 8080;
//We create the object of the app
const app = express();


app.use(express.json())
//Running two servers in the same network
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next();
});

//Resource to save the private key
let dbSecretKey = "";

//Decrypting tool 
resDecrypt = (text, key) =>{
    let keyPrivate = new NodeRSA(key);
    let decrypt = keyPrivate.decrypt(text, 'utf-8');
    return decrypt;
}

//Creation of keys
rsaKeys = () => {
    const keys = new NodeRSA({b:1024});
    const publicKey = keys.exportKey('public');
    const privateKey = keys.exportKey('private');
    return {
        publicKey: publicKey,
        privateKey: privateKey
    }

}

//Routes
//Route when the browser starts
app.get('/keys', (req, res) =>{
    const rsa = rsaKeys()
    dbSecretKey = rsa.privateKey
    res.status(201).json({
        package: rsa.publicKey
    })
});

//not crypted route
//app.put('/send', (req, res)=>{
    //const body = req.body;
    //console.log(body.data);
    //console.log(resDecrypt(body.data, db));
//})


app.listen(port, () => {
    console.log('app on ${port}');
})