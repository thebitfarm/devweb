# Build the ember application. Output is assets/js/application.js
# Since the application.js file is in the assets folder, Sails will combine/minify it with other files automatically.
# The reference to application.js is inserted into the HTML via the assets.js() call in layout-ember.ejs.
 
cd ember
ember build --out-file ../assets/linker/js/application.js
cd ..