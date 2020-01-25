import { select, arc } from 'd3';

const svg = select('svg');

const svgWidth = +svg.attr('width');
const svgHeight = parseFloat(svg.attr('height'));

const cirRadius = 240;

const eyeSpacing = 100;
const eyeYOffset = -70;
const eyeRadius = 30;

const eyeBrowWidth = 70;
const eyeBrowHeight = 15;
const eyeBrowYOffset = -70;

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