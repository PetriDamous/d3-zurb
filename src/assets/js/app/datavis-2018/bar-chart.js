import { select, csv } from 'd3';

const svg = select('svg');

const svgWidth = +svg.attr('width');
const svgHeight = +svg.attr('height');

const data = csv('../assets/cvs/bar-chart.csv');

console.log(data)

// console.log(csv('../cvs/bar-chart.csv'))

