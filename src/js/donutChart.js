class DonutChart {
    constructor() {
    }

    createDonutChart(selection) {
        selection.each(function (options) {
            var data = options.data;
            var idPath = options.title;
            
            var width = options.width;
            var height = options.height;
            var margin = 10;

            var radius = Math.min(width, height) / 2 - margin;
            var innerRadius = radius - margin;

            var svg = d3.select(this).selectAll('svg').data([data]);

            var svgEnter = svg.enter().append('svg')
                .attr("width", width).attr("height", height);

            svgEnter.append('path')
                .attr("id", idPath)
                .append('circle');

            svg.enter().select('#' + idPath + ' circle')
                .attr('r', innerRadius - margin);

            var gEnter = svgEnter.append('g').attr('class', 'container');
            gEnter.append('g').attr('class', 'pie');
            gEnter.append('g').attr('class', 'chart');
            gEnter.append('g').attr('class', 'slotes');

            var textEnter = gEnter.append('g').attr('class', 'numbers');
            textEnter.append('text').attr('class', 'title');
            textEnter.append('text').attr('class', 'figure');

            var g = svg.enter().select('g.container')
                .attr('transform', () => {
                    return 'translate(' + width / 2 + ', ' + height / 2 + ')';
                });

            var pie = d3.pie()
                .sort(null)
                .value((d) => {
                    return d;
                });
            var arc = d3.arc()
                .innerRadius(width / 2 - 50)
                .outerRadius(radius)
                .padAngle(.05)
                .padRadius(50);
            g.select('g.pie')
                .selectAll('path.donut-arc')
                .data(pie(data))
                .enter()
                    .append('path')
                    .attr('class', 'donut-arc')
                    .attr('d', arc)
                    .style('fill', (d, i) => {
                        return options.colors[i];
                    });
            
            var xScale = d3.scaleLinear()
                .domain([0, options.timeSeries.length - 1])
                .range([-innerRadius + margin, innerRadius - margin]);
            var yScale = d3.scaleLinear()
                .domain([0, d3.max(options.timeSeries)])
                .range([innerRadius - margin, 2 * margin]);       
            var area = d3.area()
                .x((d, i) => xScale(i))
                .y0(innerRadius)
                .y1((d, i) => yScale(d));
            g.select('g.chart')
                .selectAll('path.timeseries')
                .data([options.timeSeries])
                .enter()
                    .append('path')
                    .attr('class', 'timeseries')
                    .attr('d', area)
                    .attr('clip-path', 'circle(91px at 87.5px -15px)')
                    .style('stroke', options.colors[0])
                    .style('fill', options.colors[1])
                    .style('fill-opacity', 0.1)
                    .style('stroke-opacity', 0.8);

            g.select('text.title')
                .text(options.title)
                .style('font-size', '24px')
                .style('text-anchor', 'middle')
                .style('text-transform', 'uppercase')
                .style('fill', '#AAA')
                .attr('dy', '-1.2em');

            var formatter = d3.format(',.0f');
            g.select('text.figure')
                .text((d) => {
                    var sum = formatter(d3.sum(d));
                    return sum + options.unit;
                })
                .style('font-size', '35px')
                .style('text-anchor', 'middle')
                .style('fill', '#333')
                .attr('alignment-baseline', 'middle');

            var slotData = [0, 90, 180, 270];
            g.select('g.slotes')
                .selectAll('line.slot')
                .data(slotData)
                .enter()
                    .append('line')
                    .attr('x1', innerRadius + 3)
                    .attr('x2', innerRadius - 3)
                    .attr('stroke', '#666')
                    .attr('stroke-width', 3)
                    .attr('transform', (d) => {
                        return 'rotate(' + d + ')';
                    });

        });

        return DonutChart;
    }
}
export default DonutChart;