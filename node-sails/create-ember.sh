# Create the Ember application inside the Sails application.
 
# This creates the Ember source files in ./ember.
# These files are not in ./public because they are source files--not output.
 
mkdir ember
cd ember
 
ember create
 
cd ..
 
# Back up the Home controller's view (generated from the Sails boilerplate).
mv views/home/index.ejs views/home/index.ejs.old
 
# Create an empty index.ejs file for the Home controller.
touch views/home/index.ejs
