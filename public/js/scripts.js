//jshint esversion:6
$(document).ready(function () {
  $('select').formSelect();
  var instance = M.FormSelect.getInstance();
  instance.getSelectedValues();
});

let errorMessage = document.getElementById('errorMessage');

// Validate Login form
function validateForm() {
  let username = "Maria";
  let passwordValue = 123;
  let name = document.forms.login.name.value;
  let password = document.forms.login.password.value;
  if (name == username && password == passwordValue) {
    return true;
  } else {
    errorMessage.innerHTML = 'Invalid login details';
    return false;
  }
}

// Array to store the bank names gotten from the AJAX call
let bankNames = [];

//Set the selected bank value to the input box value
function setBankName() {
  var val = document.getElementById('bankName').value;
  if (val.trim() != "") {
    var opts = document.getElementById('banks').childNodes;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value !== undefined) {
        if (opts[i].value === val) {
          document.getElementById('bankName').value = opts[i].innerText;
          break;
        }
      }
    }
  } else {
    document.getElementById('bank_name').innerText = "";
  }
}

// Function to fecth the banks
let fetchBank = () => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let response = JSON.parse(xhr.response);
      let banks = response.data;
      banks.forEach(bank => {
        let bankDetails = bank;
        bankNames.push(bankDetails);
      });

      //Create and append select list
      let dataList = document.getElementById("banks");

      //Create and append the options
      bankNames.forEach(bankName => {
        let option = document.createElement("option");
        console.log(bankName);
        option.value = bankName.name;
        option.text = bankName.name;
        dataList.appendChild(option);

        // Autogenerate the code
        let item = document.getElementById('bankName');
        item.onchange = function () {
          let values = [];
          let selectedValue = document.getElementById('bankName').value;
          values.push(selectedValue);
          console.log(values);
          bankNames.filter(val => {
            if (values.includes(val.name)) {
              document.getElementById('bankCode').value = val.code;
            }
          });

        };
      });
    }
  };
  xhr.open("GET", `https://api.paystack.co/bank`);
  xhr.setRequestHeader("Authorization", "Bearer sk_test_d09893caef32725fbd69191965eb39d1d9597cd4");
  xhr.send();

};

fetchBank();