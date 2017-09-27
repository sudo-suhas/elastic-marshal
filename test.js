'use strict';

/* eslint-env jest */

const bob = require('elastic-builder');
const cases = require('jest-in-case');
const marshaller = require('./');

cases(
    '[un]marshal',
    opts => {
        const qryStr = marshaller.marshal(opts.qry);
        expect(typeof qryStr).toBe('string');
        expect(qryStr).toMatchSnapshot();
        const unmarshalled = marshaller.unmarshal(qryStr);
        expect(unmarshalled).toBeInstanceOf(opts.constructor);
        expect(unmarshalled).toEqual(opts.qry);
    },
    [
        {
            name: 'BoolQuery',
            qry: new bob.BoolQuery()
                .must(new bob.TermQuery('user', 'kimchy'))
                .must(new bob.RangeQuery('age').gte(10).lte(20))
                .must(
                    new bob.BoolQuery().should([
                        new bob.TermQuery('tag', 'wow'),
                        new bob.TermQuery('tag', 'elasticsearch')
                    ])
                ),
            constructor: bob.BoolQuery
        },
        {
            name: 'RequestBodySearch with query',
            qry: new bob.RequestBodySearch()
                .query(new bob.MatchQuery('message', 'this is a test'))
                .from(0)
                .size(10),
            constructor: bob.RequestBodySearch
        },
        {
            name: 'RequestBodySearch with query and aggregation',
            qry: new bob.RequestBodySearch()
                .query(new bob.MatchQuery('message', 'this is a test'))
                .agg(
                    new bob.TermsAggregation('towns', 'town').agg(
                        new bob.GeoCentroidAggregation('centroid', 'location')
                    )
                )
                .from(0)
                .size(10),
            constructor: bob.RequestBodySearch,
            skip: true
        },
        {
            name: 'DateHistogramAggregation',
            qry: new bob.DateHistogramAggregation('sales_per_month', 'date')
                .interval('month')
                .agg(new bob.SumAggregation('sales', 'price'))
                .agg(new bob.DerivativeAggregation('sales_deriv', 'sales'))
                .agg(
                    new bob.DerivativeAggregation(
                        'sales_2nd_deriv',
                        'sales_deriv'
                    )
                ),
            constructor: bob.DateHistogramAggregation,
            skip: true
        }
    ]
);
