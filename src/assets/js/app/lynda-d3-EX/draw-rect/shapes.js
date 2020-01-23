var d3 = require("d3");

let dataArray = [5, 11, 18];

let svg = d3.select('body').append('svg').attr('height', '100%').attr('width', '100%');

// selectAll() works the same way as the DOM version.

// selectAll() will look inside of element and search for what we put inside of the argument.

// Since we are searching for a retangle ('rect') and there are not any rectangles inside of
// our svg element an empty selection will be returned.


svg.selectAll('rect')
    .data(dataArray)
    .enter()
    .append('rect');
