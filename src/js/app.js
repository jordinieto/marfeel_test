import DataView from './dataView.js';

var htmlView = document.querySelector('#root');

(async function () {
    var min = Math.ceil(1), max = Math.floor(3);
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    const dataSet = await d3.json('/mock/mock' + random + '.json')

    dataSet.forEach((data) => {
        var el = document.createElement('div');
        el.classList.add('widget');
        htmlView.appendChild(el);
        let view = new DataView(el, data);
        view.render();
    })

})();