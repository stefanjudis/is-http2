'use strict';

var exec         = require( 'child_process' ).exec;
var Promise      = require( 'pinkie-promise' );
var findVersions = require( 'find-versions' );
var semver       = require( 'semver' );
var isH2Util     = require( './util' );


/**
 * Has a given host HTTP/2 support
 *
 * @param  {String}  url     host url
 * @param  {Object}  options options
 *
 * @return {Promise}
 */
function isH2( url, options ) {
  options = options || {};

  return new Promise( function( resolve, reject ) {
    exec( 'openssl version', function( error, result ) {
      if ( error ) {
        if ( error.code === 127 ) {
          return reject(
            new Error(
              'Command `openssl` not found. Please make sure it\'s installed.'
            )
          );
        }

        return reject( error );
      }

      var version = findVersions( result, { loose : true } )[ 0 ];

      if ( semver.lt( version, '1.0.0' ) ) {
        return reject(
          new Error(
            'Your `openssl` version is too old. Please update to at least 1.0.0'
          )
        );
      }

      url = isH2Util.getFormattedUrl( url );

      if ( ! url ) {
        return reject(
          new Error(
            'Please enter a valid url in format like [a-b]\.[a-z] -> `example.com`'
          )
        );
      }

      exec(
        'true | openssl s_client -connect ' + url + ':443 -servername ' + url + ' -nextprotoneg ""',
        function( error, result ) {
          if ( error ) {
            if (
              /gethostbyname failure/.test( error.message ) ||
              /Connection refused/.test( error.message )
            ) {
              return reject(
                new Error( 'Connection to host `' + url + '` failed.' )
              );
            }
          }

          resolve( isH2Util.getResultObject( result, options ) );
        }
      );
    } );
  } );
}


module.exports = isH2;
