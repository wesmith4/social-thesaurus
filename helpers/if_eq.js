Handlebars.registerHelper('if_eq', function(a,b,opts){
  if (a==b) {
    return true
  } else {
    return false;
  }
});
