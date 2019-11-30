//jshint esversion:6
$(document).ready(function () {
  $('select').formSelect();
  var instance = M.FormSelect.getInstance();
  instance.getSelectedValues();
});
let name = document.getElementById('name');
let password = document.getElementById('password');

let submitBtn = document.getElementById('submit');

let errorMessage = document.getElementById('errorMessage');

submitBtn.addEventListener('click', () => {
  if (name.value !== "Maria" && password.value !== 1) {
    errorMessage.innerHTML = 'Invalid login details';
    event.preventDefault();
    return false;
  } else {
    return true;
  }
});

