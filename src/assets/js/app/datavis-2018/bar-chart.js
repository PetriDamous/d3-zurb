import { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom } from 'd3';

const svg = select('svg');

const svgWidth = +svg.attr('width');
const svgHeight = +svg.attr('height');

const elmFill = 'steelblue';

const fontSize = '1rem';

// We are using our render() function to create a data join.

// https://www.tutorialspoint.com/d3js/d3js_data_join.htm

// https://www.tutorialsteacher.com/d3js/data-binding-in-d3js

// data() The data() function is used to join the specified array of data to the selected DOM elements and 
// return the updated selection. D3 works with different types of data like Array, CSV, TSV, JSON, XML etc.

// data() will join data to elements in order. If we are drawing 3 rects and our data set looked like [5, 10, 25]
// then d3 would map 5 to the 1st rect, 10 to the second rect, and 25 to the 3rd rect.

// If we only had 2 rects on the stage then d3 will map 5 to the 1st rect, 10 to the 2nd rect, and place 25 in
// an enter selection if .enter() method is present.

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

// For example if our .range([50, 500]) with a .domain([100, 1000]) 100 would map to 50 and 1000 would map to 500.

// domain is the data space.

// range is the screen space.

/*

Band Scales

Band scales are like ordinal scales except the output range is continuous and numeric. Discrete output values are automatically 
computed by the scale by dividing the continuous range into uniform bands. Band scales are typically used for bar charts with 
an ordinal or categorical dimension. The unknown value of a band scale is effectively undefined: they do not allow implicit domain construction.

scaleBand() Constructs a new band scale with the specified domain and range, no padding, no rounding and center 
alignment. If domain is not specified, it defaults to the empty domain. If range is not specified, 
it defaults to the unit range [0, 1].

Band scales are useful for oridinal attributes.

https://github.com/d3/d3-scale/blob/v2.2.2/README.md#scaleBand

*/



const render = data => {
    const xValue = d => d.population;
    const yValue = d => d.country;

    const margin = {top: 20, right: 50, bottom: 20, left: 120};

    const innerHeight = svgHeight - margin.top - margin.bottom;
    const innerWidth = svgWidth - margin.right - margin.left;

    // Note: d represents one row in our data table.
    const xScale = scaleLinear()        
        .domain([0, max(data, xValue)])
        .range([0, innerWidth]);    
    
        
    const yScale = scaleBand()

        // Sets our domain to the country values
        .domain(data.map(d => yValue(d)))

        // Arranges data elements (rects/bars) to go from top to bottom.
        .range([0, innerHeight])

        // Adds padding between elements.
        // Argument takes a numeric value that represents the pixils to pad by.
        .padding(0.1)
         
        
    const barG = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    /*

    axisLeft() Constructs a new left-oriented axis generator for the given scale, with empty tick arguments, 
    a tick size of 6 and padding of 3. In this orientation, ticks are drawn to the left of the vertical domain path.

    axisBottom() Constructs a new bottom-oriented axis generator for the given scale, with empty tick arguments, 
    a tick size of 6 and padding of 3. In this orientation, ticks are drawn below the horizontal domain path.

    https://github.com/d3/d3-axis/blob/v1.0.12/README.md#axis_scale

    https://www.tutorialspoint.com/d3js/d3js_axis_api.htm

    https://www.tutorialsteacher.com/d3js/axes-in-d3
    
    */

    const yAxis = axisLeft(yScale);

    const xAxis = axisBottom(xScale);

    /*
    
    selection.call() Invokes the specified function exactly once, passing in this selection along with any optional arguments. Returns this selection. 
    This is equivalent to invoking the function by hand but facilitates method chaining.
    
    We can call a function on a d3 selected element.

    */
    barG.append('g').call(yAxis);

    barG.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);

    // First we select all the rect elements which there are not any currently.

    // Then we bind the data to the rect elements using the data() method
    // and passing in our data as an argument.
    
    barG.selectAll('rect').data(data)
        // Since there are no rects inside the svg currently we store the data using the .enter() method
        // We then take the stored data and append them to rects
        .enter().append('rect')
            .attr('fill', elmFill)
            // Calculates the height of each bar but since these bars are side ways it is used to calculate how long they
            // or the width of the bar.            
            .attr('width', d => xScale(xValue(d)))

            // Will seperate our bars/rects along the y-axis based on the number of countries in our data.
            .attr('y', d => yScale(yValue(d)))
            // bandwidth is the computed value of a single bar.

            // band.bandwith() Returns the width of each band.
            // https://github.com/d3/d3-scale/blob/v2.2.2/README.md#band_bandwidth
            // Since our bar chart moves from left to right rather than top to bottom
            // we will be using bandwidth to calculate the height.
            
            // This code controls how wide the bars are but in this case the height of each bar since they are sitting side ways.
            .attr('height', yScale.bandwidth())
                
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



