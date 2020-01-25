// We can import the select method from our d3 module
// Same way of importing as any other lib/module
import { select, arc } from 'd3';



/*

// select() method takes in an argument which is what we want to select.
// select() method selects the first element on the page that matches our argument.
// works the same as the DOM version.

// selectAll() method takes in an argument which is the elements we wish to select on the page.
// selectAll() will select all elements that match our argument on the page and store them in a colection.
// works the same as the DOM version.

const svg = select('svg');

// We can use the style() method to add inline styles to our element.
// Works the same way as jQuery. Give it a property and a value.

svg.style('background', 'red');

*/

const svg = select('svg');

// We can grab the values of attributes from an elment by using the attr() method.

// When you want to grab a value simply just pass the name of the property you wish to get the value
// from as a single argument.

// The values we want will return as a string number.

// When extracting values from HTML you will get a string because all attribute values in
// HTML are strings.

// While JavaScript will convert our numbers when certain operations are performed on them it
// is best to convert the numbered string values as soon as possiable if you are using
// the values as numbers for calculations.

// There are a number of ways to convert string numbers in numbers in JavaScript.

// One way is to use the parseFloat method which will convert the string number into a number.

// Another way to convert a string number into a number is to simply place the uniary + operator
// in front of the string number.

const svgWidth = +svg.attr('width');
const svgHeight = parseFloat(svg.attr('height'));

// Variables 
const cirRadius = 240;

const eyeSpacing = 100;
const eyeYOffset = -70;
const eyeRadius = 30;

const eyeBrowWidth = 70;
const eyeBrowHeight = 15;
const eyeBrowYOffset = -70;


// append() method appends a new DOM element to our <svg>.
// Works the same way as the DOM version.

// attr() method allows us to set inline attributes on our selected elements.
// works the same way as jQuery attr. 1st argument is the attribute. 2nd argument is the value.

const g = svg.append('g')
    .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`);

const circle = g
    .append('circle')
        .attr('r', cirRadius)
        .attr('fill', 'yellow')
        .attr('stroke', 'black');

const mouth = g
    .append('path')
        .attr('d', arc()({
            innerRadius: 0,
            outerRadius: 170,
            startAngle: Math.PI / 2,
            endAngle: Math.PI * 3 / 2
        }));    


const eyeG = g
    .append('g')
        .attr('transform', `translate(0, ${eyeYOffset})`);    

const leftEye = eyeG
    .append('circle')
        .attr('r', eyeRadius)
        .attr('cx', -eyeSpacing);


const rightEye = eyeG
    .append('circle')
        .attr('r', eyeRadius)
        .attr('cx', eyeSpacing);

const eyeBrowG = eyeG
    .append('g')
        .attr('transform', `translate(0, ${eyeBrowYOffset})`);

eyeBrowG        
    .transition().duration(2000)
        .attr('transform', `translate(0, ${eyeBrowYOffset - 30})`)
    .transition().duration(2000)
        .attr('transform', `translate(0, ${eyeBrowYOffset})`);


const leftEyebrow = eyeBrowG
    .append('rect')
        .attr('width', eyeBrowWidth)
        .attr('height', eyeBrowHeight)
        .attr('x', -eyeSpacing - eyeBrowWidth / 2);        



const rightEyebrow = eyeBrowG
    .append('rect')
        .attr('width', eyeBrowWidth)
        .attr('height', eyeBrowHeight)
        .attr('x', eyeSpacing - eyeBrowWidth / 2);
        



