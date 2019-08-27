import * as d3 from 'd3'; 
var assign = require('object-assign')
var SimplexNoise = require('simplex-noise');

class Entity {
  constructor() {
    this.entity = {};
  }

  getEntity(options) {
    var defaults = {
      title: 'title',
      unit: '',
      radius: 500,
      tabletColor: '#5fe334',
      phoneColor: '#1e6907',
      data: {
        phoneAmount: 80000,
        tabletAmount: 120000
      },
      timeSeries: this.makeRandomAmounts()
    };

    this.entity = {
      props: assign(defaults, options),
      toJSON: function () {
        return JSON.parse(JSON.stringify(this.props));
      },
      calcPercentages: function () {
        var tabletAmt = this.props.data.tabletAmount;
        var phoneAmt = this.props.data.phoneAmount;
        var total = tabletAmt + phoneAmt;
        this.props.data.tabletPct = Math.round((tabletAmt / total * 100));
        this.props.data.phonePct = Math.round((phoneAmt / total * 100));
      },
      formatData: function () {
        var formatter = d3.format(",.0f");
        var unit = this.props.unit;
        this.props.tabletAmount = formatter(this.props.data.tabletAmount) + ' ' + unit;
        this.props.phoneAmount = formatter(this.props.data.phoneAmount) + ' ' + unit;
        this.props.tabletPct = this.props.data.tabletPct + '%';
        this.props.phonePct = this.props.data.phonePct + '%';
      }

    }

    return this.entity;
  }
  makeRandomAmounts() {
    var simplex = new SimplexNoise();
    var amounts = [];
    for (var i = 0; i < 10; i++) {
      amounts.push(2.5 + simplex.noise2D(i, i));
    }
    return amounts;
  }
}
export default Entity;