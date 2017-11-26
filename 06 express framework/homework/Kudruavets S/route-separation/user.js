// Fake user database

var users = [
  { name: 'TJ', email: 'tj@vision-media.ca', friends: [{fName: 'Tobi', fId: '1'}, {fName: 'Zack', fId: '5'}]},
  { name: 'Tobi', email: 'tobi@vision-media.ca' , friends: []},
  { name: 'Zoz', email: 'zoz@vision-media.ca', friends: []},
  { name: 'Nick', email: 'nick@vision-media.ca', friends: []},
  { name: 'Max', email: 'max@vision-media.ca', friends: []},
  { name: 'Zack', email: 'zack@vision-media.ca', friends: []},
  { name: 'Ash', email: 'ash@vision-media.ca', friends: []},
  { name: 'Mark', email: 'mark@vision-media.ca', friends: []},
];

exports.list = function(req, res){
  res.render('users', { title: 'Users', users: users });
};

exports.load = function(req, res, next){
  var id = req.params.id;
  req.user = users[id];
  req.users = users;
  if (req.user) {
    next();
  } else {
    var err = new Error('cannot find user ' + id);
    err.status = 404;
    next(err);
  }
};

exports.view = function(req, res){
  res.render('users/view', {
    title: 'Viewing user ' + req.user.name,
    user: req.user,
  });
};

exports.edit = function(req, res){
  res.render('users/edit', {
    title: 'Editing user ' + req.user.name,
    user: req.user,
    users: req.users,
  });
};

exports.update = function(req, res){
	
  var user = req.body.user;
  req.user.name = user.name;
  req.user.email = user.email;

  var nFriends = [];
  if(typeof(user.newFriends) === 'string')
  {
	  nFriends.push(user.newFriends);
  }
  else
  {
	  nFriends = user.newFriends;
  }
  
  if(nFriends)
  {
	
	for(var i = 0; i < nFriends.length; i++)
	{
		for(var j = 0; j < users.length; j++)
		{
			if(users[j].name === nFriends[i].toString())
			{
				req.user.friends.push({fName: users[j].name, fId: j.toString()});
			}
		}
	}
  }

  res.redirect('/users');
};
