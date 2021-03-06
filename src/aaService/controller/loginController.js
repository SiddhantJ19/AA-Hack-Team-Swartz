const mongoose = require('mongoose');
const CRED = {
  'user': 'admin',
  'pass': 'secure',
};

var request = require('request');
const {userModel} = require('../models/user');

const registerFromBankController = async (req, res) => {
  // validation
  console.log('register from bank correspondent controller');
  const {username, mobile} = req.body;
  if (!username) {
    return res.status(400).send('Username cannot be empty')
  }
  if (!mobile) {
    return res.status(400).send('Please specify mobile number')
  }
  try {
    const newUser = new userModel({aaId: username, phone: mobile, inBuffer: true});
    await newUser.save();
  } catch (error) {
    return res.status(400).send("username already exist or bad phone number");
  }
  return res.status(200).send('User Registeration Started');
}


const loginController = async (req, res) => {
  var userId = req.body['userId'];      // swartzaman
  var password = req.body['password'];  // 1234
  var options = {
    'method': 'POST',
    'url': 'https://finsense.finvu.in/ConnectHub/FIU/API/V1/User/Login',
    'headers': {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'header': {
        'rid': '42c06b9f-cc5b-4a53-9119-9ca9d8e9acdb',
        'ts': '2019-07-15T11:03:44.427+0000',
        'channelId': 'finsense'
      },
      'body': {'userId': userId, 'password': password}
    })

  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    return res.send(response.body)
  });
};

module.exports = {
  registerFromBankController,
  loginController
};
