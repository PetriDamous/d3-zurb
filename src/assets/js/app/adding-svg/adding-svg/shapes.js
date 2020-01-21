var d3 = require("d3");

// Array of data
let dataArray = [5, 11, 18];

// d3.select() method will select whatever element we pass into as an argument
// here we are selecting the body element.

// d3.append() method will append an element of our choice to the page. Just pass 
// the element of your choice in as an argument.

// d3.attr() method will allow you to set attributes for an element.
// attr() takes in two arguments as strings.
// 1st argument is the attribute property.
// 2nd argument is the value for that property.
d3.select('body').append('svg').attr('height', '100%').attr('width', '100%');