//jshint esversion:6
let errorMessage = document.getElementById('errorMessage');

// Form Validation
function validateBankForm() {
  let form = document.getElementById('form');
  let bankName = document.getElementById('bankName');
  let accountNumber = document.getElementById('accNumber');
  let regex = /[a-z]/g;
  let regex2 = /[A-Z]/g; 

  bankName.onblur = function () {
    if(bankName.value === "") {
      bankName.style.borderBottomColor = 'red';
      bankName.style.borderLeft = '5px solid red';
      errorMessage.innerHTML = 'Please fill out the required fields';
      errorMessage.style.color = 'red';
    }
    else {
      bankName.style.borderBottomColor = '#9e9e9e';
      bankName.style.borderLeft = 'none';
    }
  };

  accountNumber.onblur = function () {
    if(accountNumber.value === "" || accountNumber.value.length < 5) {
      accountNumber.style.borderBottomColor = 'red';
      accountNumber.style.borderLeft = '5px solid red';
      errorMessage.innerHTML = 'Account number should not be less than five numbers';
      errorMessage.style.color = 'red';     
      form.onsubmit = function () {
        return false;
      };
    }
    
    // Check for letters
    else if (accountNumber.value.match(regex) || accountNumber.value.match(regex2)) {
      accountNumber.style.borderBottomColor = 'red';
      accountNumber.style.borderLeft = '5px solid red';
      errorMessage.innerHTML = 'Account number should only be numbers';
      form.onsubmit = function () {
        return false;
      };
    }
    else {
      accountNumber.style.borderBottomColor = '#9e9e9e';
      accountNumber.style.borderLeft = 'none';
      errorMessage.innerHTML = "";
      form.onsubmit = function () {
        return true;
      };
    }
  };
}

validateBankForm();

// Array to store the bank names gotten from the AJAX call
let bankNames = [];

//Set the selected bank value to the input box value
function setBankName() {
  let val = document.getElementById('bankName').value;
  if (val.trim() !== "") {
    let opts = document.getElementById('banks').childNodes;
    let i;
    for (i = 0; i < opts.length; i+=1) {
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
function fetchBank () {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let response = JSON.parse(xhr.response);
      let banks = response.data;
      banks.forEach(function (bank) {
        let bankDetails = bank;
        bankNames.push(bankDetails);
      });

      //Create and append select list
      let dataList = document.getElementById("banks");

      //Create and append the options
      bankNames.forEach(function(bankName) {
        let option = document.createElement("option");
        option.value = bankName.name;
        option.text = bankName.name;
        dataList.appendChild(option);

        // Autogenerate the code
        let item = document.getElementById('bankName');
        item.onchange = function () {
          let values = [];
          let selectedValue = document.getElementById('bankName').value;
          values.push(selectedValue);
          bankNames.filter(function(val) {
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

}

fetchBank();