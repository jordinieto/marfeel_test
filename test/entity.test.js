import Entity from '../src/js/entity.js';

const attrs = {
  "title": "Revenue",
  "unit": "€",
  "tabletColor": "#5fe334",
  "phoneColor": "#1e6907",
  "data": {
    "tabletAmount": 120000,
    "phoneAmount": 80000
  }
};

test('attributes test', () => {
  var entityRecived = new Entity().getEntity(attrs).toJSON();
  expect(entityRecived.title).toBe(attrs.title);
  expect(entityRecived.unit).toBe(attrs.unit);
  expect(entityRecived.tabletColor).toBe(attrs.tabletColor);
  expect(entityRecived.phoneColor).toBe(attrs.phoneColor);
  expect(entityRecived.data.tabletAmount).toBe(attrs.data.tabletAmount);
  expect(entityRecived.data.phoneAmount).toBe(attrs.data.phoneAmount);
});

test('calcPercentatge test', () => {
  var entityRecived = new Entity().getEntity(attrs);
  entityRecived.calcPercentages();
  var propsRecived = entityRecived.toJSON();
  expect(propsRecived.data.tabletPct).toBe(60);
  expect(propsRecived.data.phonePct).toBe(40);
});

test('formatData test', () => {
  var entityRecived = new Entity().getEntity(attrs);
  entityRecived.calcPercentages();
  entityRecived.formatData();
  var propsRecived = entityRecived.toJSON();
  expect(propsRecived.tabletPct).toBe('60%');
  expect(propsRecived.phonePct).toBe('40%');
  expect(propsRecived.tabletAmount).toBe('120,000 €');
  expect(propsRecived.phoneAmount).toBe('80,000 €');
});