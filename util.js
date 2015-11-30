'use strict';

module.exports = {
  /**
   * Check url and return formatted url to continue working with it
   *
   * @param  {String} url url
   *
   * @return {String}     formatted url
   *
   * @tested
   */
  getFormattedUrl : function getFormattedUrl( url ) {
    var result = url.match( /^(http(s)?:\/\/)?(.+\..+?)(:\d+)?$/ );

    if ( result ) {
      return result[ 3 ];
    }

    return result;
  },


  /**
   * Format the result object and bring all
   * evaluated data in right place
   *
   * @param  {String} opensslOutput openssl output
   * @param  {Object} options       option
   *
   * @return {Object}               formatted result object
   *
   * @tested
   */
  getResultObject : function getResultObject( opensslOutput, options ) {
    var protocolMatch = opensslOutput.match(
      /\nProtocols advertised by server:\s(.*?)\n/
    );

    if ( protocolMatch ) {
      var supportedProtocols = protocolMatch[ 1 ].split( ', ' );
      var isH2Supported      = supportedProtocols.indexOf( 'h2' ) !== - 1 ;

      if ( options.includeSpdy ) {
        var isSpdySupported = !! supportedProtocols.filter( function( protocol ) {
          return /spdy/.test( protocol );
        } ).length;

        isH2Supported = isH2Supported || isSpdySupported;
      }

      return {
        isHttp2            : isH2Supported,
        supportedProtocols : supportedProtocols
      };
    }

    return {
      isHttp2            : false,
      supportedProtocols : null
    };
  }
};
