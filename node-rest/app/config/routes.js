
var controllers = require('../controllers')

module.exports = function (appserver) {
  //appserver.get( '/'                           , controllers.home);
  appserver.get( '/posts'                        , controllers.post.list);
  appserver.post('/posts'                         , controllers.post.create);
  appserver.get( '/posts/:id'                     , controllers.post.get);
  
  appserver.get( '/people'                       , controllers.person.list);
  appserver.get( '/people/:id'                   , controllers.person.get);
  appserver.put( '/people/:id'					 , controllers.person.update);
  appserver.post('/people'                       , controllers.person.create);
  appserver.del( '/people/:id'					 , controllers.person.delete);
  appserver.get( '/people'						 , controllers.person.find);


};

