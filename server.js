//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const request = require('request');

const app = express();

let bankList = [];

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// Fetch the list of banks

let fetchBankDetails = () => {
    let options = {
        url: 'https://api.paystack.co/bank',
        Authorization: 'Bearer sk_test_d09893caef32725fbd69191965eb39d1d9597cd4'
    };
    request(options, (error, response, body) => {
        let data = JSON.parse(body);
        let banks = data.data;
        console.log(response.statusCode);
        banks.forEach(bank => {
            let bankDetails = bank;
            bankList.push(bankDetails);
        });
        
    });
};

fetchBankDetails();

// Get request to the home route

app.get('/', (_req, _res) => {
    _res.render('index', {
        banks: bankList
    });
});

// Post request to the home route

app.post('/', (_req, _res) => {
    _res.redirect('/banks');
});

// Get request to the banks route
app.get('/banks', (_req, _res) => {
    _res.render('banks', {
        banks: bankList,
    });
});

// Post request to the banks route

app.post('/banks', (_req, _res) => {
    let bank_code = _req.body.bank_code;
    let account_number = _req.body.account_number;
    let options = {
        url: `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
        headers: {
            Authorization: 'Bearer sk_test_d09893caef32725fbd69191965eb39d1d9597cd4 '
        }
    };
    request(options, (error, response, body) => {
        let jsonData = JSON.parse(body);
        console.log(response.statusCode);
        console.log(jsonData);
        if(response.statusCode === 200) {
            _res.render('success', {
                success: 'Account number found!! The account name is ' + jsonData.data.account_name
            });
        }
        else {
            _res.render('failure', {
                failure: 'Account number not found!! The account number does not exist'
            });
        }
    });
});


app.listen(3000, () => {
    console.log('Server started on port 3000 \nCopy link in browser: http://localhost:3000 ');

});

// Test key: sk_test_d09893caef32725fbd69191965eb39d1d9597cd4

// Resolve account number API: https://api.paystack.co/bank/resolve