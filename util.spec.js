import test from 'ava';
import isH2Util from './util';

test( 'getFormattedUrl', t => {
  t.same( isH2Util.getFormattedUrl( 'http://twitter.com' ), 'twitter.com' );
  t.same( isH2Util.getFormattedUrl( 'https://twitter.com' ), 'twitter.com' );
  t.same( isH2Util.getFormattedUrl( 'http://www.twitter.com' ), 'www.twitter.com' );
  t.same( isH2Util.getFormattedUrl( 'http://www.twitter.com:80' ), 'www.twitter.com' );

  t.same( isH2Util.getFormattedUrl( 'http://twitter.' ), null );
  t.same( isH2Util.getFormattedUrl( 'http://twitter' ), null );
  t.same( isH2Util.getFormattedUrl( 'twitter' ), null );
} );

test( 'getResultObject', t => {
  t.same(
    isH2Util.getResultObject( '', {} ),
    { isHttp2 : false, supportedProtocols : null }
  );

  t.same(
    isH2Util.getResultObject( '\nProtocols advertised by server: foo, bar, baz\n', {} ),
    { isHttp2 : false, supportedProtocols : [ 'foo', 'bar', 'baz' ] }
  );

  t.same(
    isH2Util.getResultObject( '\nProtocols advertised by server: h2, bar, baz\n', {} ),
    { isHttp2 : true, supportedProtocols : [ 'h2', 'bar', 'baz' ] }
  );

  t.same(
    isH2Util.getResultObject( '\nProtocols advertised by server: spdy, bar, baz\n', {} ),
    { isHttp2 : false, supportedProtocols : [ 'spdy', 'bar', 'baz' ] }
  );

  t.same(
    isH2Util.getResultObject( '\nProtocols advertised by server: spdy, bar, baz\n', { includeSpdy : true } ),
    { isHttp2 : true, supportedProtocols : [ 'spdy', 'bar', 'baz' ] }
  );
} );
