import _ from 'lodash';
import { Catalog } from './Catalog';
import { expect, test } from 'bun:test';

const catalogData = {
  authorsById: {
    'alan-moore': {
      name: 'Alan Moore',
    },
    'dave-gibbons': {
      name: 'Dave Gibbons',
    },
  },
};

test('Catalog.authorNames()', () => {
  expect(_.isEqual(Catalog.authorNames(catalogData, []), [])).toBeTrue();
  expect(
    _.isEqual(Catalog.authorNames(catalogData, ['alan-moore']), ['Alan Moore']),
  ).toBeTrue();
  expect(
    _.isEqual(
      Catalog.authorNames(catalogData, ['alan-moore', 'dave-gibbons']),
      ['Alan Moore', 'Dave Gibbons'],
    ),
  ).toBeTrue();
});
