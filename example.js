'use strict';

const util = require('util');
const bob = require('elastic-builder');
const marshaller = require('./');

const qry = new bob.BoolQuery()
    .must(new bob.TermQuery('user', 'kimchy'))
    .must(new bob.RangeQuery('age').gte(10).lte(20))
    .must(
        new bob.BoolQuery().should([
            new bob.TermQuery('tag', 'wow'),
            new bob.TermQuery('tag', 'elasticsearch')
        ])
    );

const qryStr = marshaller.marshal(qry);

console.log('Marshalled string -', qryStr);

const unmarshalled = marshaller.unmarshal(qryStr);

console.log('Unmarshalled object -', util.inspect(unmarshalled, true, 7, true));
