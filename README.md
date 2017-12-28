[![Build Status](http://img.shields.io/travis/stefanjudis/is-http2.svg?style=flat)](https://travis-ci.org/stefanjudis/is-http2) [![npm version](http://img.shields.io/npm/v/is-http2.svg?style=flat)](https://www.npmjs.org/package/is-http2) [![npm downloads](http://img.shields.io/npm/dm/is-http2.svg?style=flat)](https://www.npmjs.org/package/is-http2) [![Coverage Status](http://img.shields.io/coveralls/stefanjudis/is-http2.svg?style=flat)](https://coveralls.io/r/stefanjudis/is-http2?branch=master) [![Uses greenkeeper.io](https://img.shields.io/badge/Uses-greenkeeper.io-green.svg)](http://greenkeeper.io/)

# is-http2

Simple module to check if certain servers out there support HTTP/2.

## install

```
$ npm install --save is-http2
```

## Pre-requisites

To make `is-http2` work, you need to have [openssl](http://openssl.org/) in a version greater than 1.0.0 installed and available in your `$path`.

## Basic usage

### isHttp2( url, options )

**Description** : Check if server behind given url supports HTTP/2

**url** : Url to check HTTP/2 support for

#### Options 
* **includeSpdy** : optional: should SPDY be considered HTTP/2
* **openssl** : optional: specify custom openssl command (i.e. '/usr/local/Cellar/openssl/1.0.2k/bin/openssl') 


`isHttp2` returns a Promise which will be resolved with an Object containing `isHttp2` and `supportedProtocols`.

```javascript
const isHttp2 = require( 'is-http2' );

isHttp2( 'twitter.com', { includeSpdy : true } )
  .then( function( result ) {
    if ( result.isHttp2 ) {
      console.log( `${ chalk.green( '✓' ) } HTTP/2 supported by ${ host }` );
    } else {
      console.log( `${ chalk.red( '×' ) } HTTP/2 not supported by ${ host }` );
    }

    if ( result.supportedProtocols ) {
      console.log(
        `Supported protocols: ${ result.supportedProtocols.join( ' ' ) }`
      );
    }
  } )
  .catch( function( error ) {
    console.error( chalk.red( error ) );

    process.exit( 1 );
  } );
```

--------------------------------------------------------

#### I want to thank all these [people](./THANKS.md) for their great work!!!
