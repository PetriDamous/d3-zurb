import { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom } from 'd3';

const svg = select('svg');

const svgWidth = +svg.attr('width');
const svgHeight = +svg.attr('height');

const elmFill = 'steelblue';

const render = data => {
    const xValue = d => d.population;
    const yValue = d => d.country;

    const margin = {top: 20, right: 50, bottom: 20, left: 120};

    const innerHeight = svgHeight - margin.top - margin.bottom;
    const innerWidth = svgWidth - margin.right - margin.left;

    const xScale = scaleLinear()        
        .domain([0, max(data, xValue)])
        .range([0, innerWidth]);    
    
        
    const yScale = scaleBand()
        .domain(data.map(d => yValue(d)))
        .range([0, innerHeight])
        .padding(0.1)
         
        
    const barG = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const yAxis = axisLeft(yScale);

    const xAxis = axisBottom(xScale);

    barG.append('g').call(yAxis);

    barG.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
    
    barG.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('fill', elmFill)           
            .attr('width', d => xScale(xValue(d)))
            .attr('y', d => yScale(yValue(d)))
            .attr('height', yScale.bandwidth())                
};

csv('../assets/cvs/bar-chart.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population * 1000;
    });

    render(data);    
});



