


module.exports = {
	addReplacementTokens: function( suite, replacements ) {
		// Handles string replacements for 'suite' as the paths are built before
		suite.before('replaceTokens', function (outgoing) {
		  for(var replacementIndex in replacements) {
		      var replacement = replacements[replacementIndex];
		      var token = '$' + replacementIndex;
		      var encodedToken = "%24" + replacementIndex;  // for encoded urls

		      outgoing.uri = outgoing.uri.replace(token, replacement);

		      outgoing.uri = outgoing.uri.replace(encodedToken, replacement);

		      if(Object.prototype.toString.call(outgoing.body) == '[object String]') // POST bodies
		        outgoing.body = outgoing.body.replace(token, replacement);
		    }
		  return outgoing;
		});
	}
}