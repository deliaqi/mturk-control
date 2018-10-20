Router.route('/', function() {
    this.render('home');
});


Router.route('/experiment', function() {
    this.render('experiment');
});

Router.route('/survey', function() {
    this.render('survey');
});

// Router.route('/lobby', function() {
//   this.render('lobby');
// });
