import test from 'ava';
import isH2 from '.';

test.cb( 'is HTTP/2', t => {
  isH2( 'twitter.com' )
    .then( function( result ) {
      t.true( result.isHttp2 );
      t.end();
    } );
} );

test.cb( 'is not HTTP/2', t => {
  isH2( 'github.com' )
    .then( result => {
      t.false( result.isHttp2 );
      t.end();
    } );
} );

test.cb( 'no valid url', t => {
  isH2( 'github.' )
    .catch( error => {
      t.same(
        error.message,
        'Please enter a valid url in format like [a-b]\.[a-z] -> `example.com`'
      );
      t.end();
    } );
} );
