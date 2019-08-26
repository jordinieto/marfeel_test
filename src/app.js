import * as d3 from 'd3';

var Model = require('./model.js').default;
var Template = require('./template.js').default;

var htmlView = document.querySelector('#root');

class View {
  constructor(el, attrs) {
      this.model = Model(attrs);
      this.el = el;
      //this.chart = DonutChart();
  }

  render () {
    this.model.calcPercentages();
    this.model.formatData();
    var props = this.model.toJSON();
    this.el.innerHTML = Template(props);
  }
}



(async function () {

  const dataSet = await d3.json('/data/data.json')

  dataSet.forEach((data) => {
    var el = document.createElement('div');
    el.classList.add('widget');
    htmlView.appendChild(el);
    let view = new View(el,data);
    view.render();
  })
  

}) ();