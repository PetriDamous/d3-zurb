import { select, csv, scaleLinear, max } from 'd3';

const svg = select('svg');

const svgWidth = +svg.attr('width');
const svgHeight = +svg.attr('height');

// We are using our render() function to create a data join.

// https://www.tutorialspoint.com/d3js/d3js_data_join.htm

// https://www.tutorialsteacher.com/d3js/data-binding-in-d3js

// data() The data() function is used to join the specified array of data to the selected DOM elements and 
// return the updated selection. D3 works with different types of data like Array, CSV, TSV, JSON, XML etc.

// The enter() method dynamically creates placeholder references corresponding to the number of data values. The output of enter() can be fed to append() 
// method and append() will create DOM elements for which there are no corresponding DOM elements on the page.

// scaleLinear() Constructs a continuous linear scale where we can input data (domain) maps to the specified output range.

// linear scales are usesful when you have quantative attributes.

// https://www.tutorialsteacher.com/d3js/scales-in-d3

// https://www.tutorialspoint.com/d3js/d3js_scales_api.htm

// Domain denotes minimum and maximum values of your input data.

// .domain() takes in an array that contains two elements. 1st element is the min value for our data. 2nd element is the max value for our data.

// For example in if our data looked like [100, 400, 300, 900, 850, 1000] then the min value would be 100 and our max value would be 1000.

// Range is the output range that you would like your input values to map to.

// .range takes in array that contains two elements. 1st element is the min value of our range. 2nd element is the max value of our range.

// The values in the .range represnt pixils.  These pixils will be mapped to our values to create the chart.  

// This way we can control the size of the chart on the screen while still representing our data.

// Think of it as a way to constrain the physical size of the chart on our screen.

// For example if our .range([50, 500]) with a .domain([100, 1000]) 

const render = data => {
    const xScale = scaleLinear()
        .domain([0, max(data, d => d.population)])
        
        console.log(xScale)


    svg.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('width', 300)
            .attr('height', 300)
};

// The csv() function makes a HTTP request and 
// parse the data from the .cvs file into an array
// of JavaScript objects.

// The HTTP request returns in the form of a promise.
// Since this is a promise we are able to use the .then() method.
csv('../assets/cvs/bar-chart.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population * 1000;
    });

    render(data);    
});



