# elastic-marshal [![Build Status](https://travis-ci.org/sudo-suhas/elastic-marshal.svg?branch=master)](https://travis-ci.org/sudo-suhas/elastic-marshal)

> Helper library for [un]marshalling elastic-builder objects

## Install

```
$ npm install elastic-marshal
```

## Usage

```js
'use strict';

const util = require('util');
const bob = require('elastic-builder');
const marshaller = require('elastic-marshal');

const qry = bob.boolQuery()
    .must(bob.termQuery('user', 'kimchy'))
    .must(bob.rangeQuery('age').gte(10).lte(20))
    .must(
        bob.boolQuery().should([
            bob.termQuery('tag', 'wow'),
            bob.termQuery('tag', 'elasticsearch')
        ])
    );

const qryStr = marshaller.marshal(qry);

console.log('Marshalled string -', qryStr);

const unmarshalled = marshaller.unmarshal(qryStr);

console.log('Unmarshalled object -', util.inspect(unmarshalled, true, 7, true));
```

The module uses [elastic-builder](https://github.com/sudo-suhas/elastic-builder) and [serialijse](https://github.com/erossignon/serialijse) for serialisation and deserialisation of `elastic-builder` query objects.

## Related

- [elastic-builder](https://github.com/sudo-suhas/elastic-builder) - elasticsearch query builder
- [serialijse](https://github.com/erossignon/serialijse) - serialize and deserialize javascript objects
- [elastic-muto](https://github.com/booleanapp/elastic-muto) - easy expressive search queries for elasticsearch

## License

MIT © [Suhas Karanth](https://github.com/sudo-suhas)
