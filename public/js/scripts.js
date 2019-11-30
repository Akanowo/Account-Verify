//jshint esversion:6
let errorMessage = document.getElementById('errorMessage');

function validateForm() {
  let username = "Maria";
  let passwordValue = 123;
  let name = document.forms.login.name.value;
  let password = document.forms.login.password.value;
  if(name == username && password == passwordValue) {
    return true;
  }
  else {
    errorMessage.innerHTML = 'Invalid login details';
      return false;
  }
}

$(document).ready(function () {
  $('select').formSelect();
  var instance = M.FormSelect.getInstance();
  instance.getSelectedValues();
}); 
