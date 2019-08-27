var Entity = require('./entity.js').default;
var Template = require('./template.js').default;
var DonutChart = require('./donutChart.js').default;

class DataView {
    constructor(el, attrs) {
        this.entity = new Entity().getEntity(attrs);
        this.el = el;
        this.chart = new DonutChart();
    }

    render() {
        this.entity.calcPercentages();
        this.entity.formatData();
        var props = this.entity.toJSON();
        this.el.innerHTML = new Template().getTemplate(props);

        var dataObject = {
            width: 350,
            height: 250,
            data: [
                props.data.phoneAmount,
                props.data.tabletAmount
            ],
            title: props.title,
            unit: props.unit,
            timeSeries: props.timeSeries,
            colors: [
                props.phoneColor,
                props.tabletColor
            ]
        }

        var container = this.el.querySelector('.graphic');
        d3.select(container)
            .datum(dataObject)
            .call(this.chart.createDonutChart);
    }
}
export default DataView;