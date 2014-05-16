# Copy the Bootstrap JS files into the vendor directory.
cp -R bootstrap/js/*.js ember/js/vendor
 
# Remove the already-minified JS files. (Sails will handle this.)
rm ember/js/vendor/*.min.js
 
# Remove normalize.css (included by Sails).
# Normalize.css (or equivalent) is included in Bootstrap.
rm assets/mixins/normalize.css
 
# Copy the Bootstrap library to public.
cp -R bootstrap public/bootstrap