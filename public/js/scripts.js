//jshint esversion:6
$(document).ready(function(){
    $('select').formSelect();
    var instance = M.FormSelect.getInstance();
    instance.getSelectedValues();
  });