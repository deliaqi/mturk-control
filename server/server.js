Meteor.startup(function () {
	Batches.upsert({name: "main"}, {name: "main", active: true});
	var batch = TurkServer.Batch.getBatchByName("main");
	// batch.setAssigner(new TurkServer.Assigners.SimpleAssigner);
	const assigner = new TurkServer.Assigners.PairAssigner;
	batch.setAssigner(assigner);

});

TurkServer.initialize(function() { // the start of an experiment
	var inst = TurkServer.Instance.currentInstance();
	var users = inst.users();
});

TurkServer.initialize (function () {
	var start = new Date();
    var end = new Date(start.getTime() + 1800000);
    TurkServer.Timers.startNewRound(start, end);
});

TurkServer.Timers.onRoundEnd(function(reason) {
    if (reason === TurkServer.Timers.ROUND_END_TIMEOUT)
		Meteor.call('goToExitSurvey');
});

Meteor.publish('conversations', function() {
	return Conversations.find();
});
Meteor.methods({
	goToExitSurvey: function() {
	    TurkServer.Instance.currentInstance().teardown();
	},

	// get users
	getUsersCount: function() {
		var inst = TurkServer.Instance.currentInstance();
		return inst.users().length;
	},
	saveConversation: function(_conversation) {
		Conversations.insert({user: Meteor.userId(), time: new Date(), conversation: _conversation});
	}
})