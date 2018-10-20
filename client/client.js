

var myInterval = Meteor.setInterval(function() {
	// var timer = Timer.findOne({user:Meteor.userId()});
	Session.set("current", new Date());
	// var progress = parseInt(100 * curtimer / ( 60 * 15 ));
	// console.log("Interval called " + curtimer + " times" + "width: "+ progress +"%");
}, 1000);

Tracker.autorun(function() {
	if (TurkServer.inExperiment()) {
	    Router.go('/experiment');
	} else if (TurkServer.inExitSurvey()) {
	    Router.go('/survey');
	} else if (TurkServer.inLobby()) {
		Router.go('/lobby');
	}
 });

Tracker.autorun(function() { //every time the value of this variable changes
	var group = TurkServer.group(); //returns the id of the experiment that a user is currently in
	if (group == null) return;	// If the value is not null, then the user is indeed in an experiment

    Meteor.subscribe('conversations', group);
});

Template.hello.created = function () {
	Meteor.call('getUsersCount', function (error, result) {
		if (error) {
			console.log(error);
		} else {
			Session.set("peopleCount", result)
		}
	});
}

Template.hello.helpers(
{
	people: function () {
 		return Session.get("peopleCount") || "Loading";
	},
	conversations: function () {
		var conversations = Conversations.find().fetch();
		var user = Meteor.userId()
		for (var i = 0; i < conversations.length; i++) {
			if (conversations[i].user == user)
				conversations[i].style = "msgRight";
			else
				conversations[i].style = "msgLeft";
		}
		return conversations;
	},
	timer: function () {
		var currentRound = RoundTimers.findOne({}, { sort: { index: -1 }});
		var current = Session.get("current");
		var curTimer = (current - currentRound.startTime) / 1000;
		var m = parseInt(curTimer / 60);
        var s = parseInt(curTimer % 60);
		return m + "分" + s + "秒";
	},
	// progress: function () {
	// 	var progress = 0;
	// 	progress = Session.get("curTimer");
	// 	return parseInt(100 * progress / ( 1000 * 60 * 15 ));
	// },
});


Template.hello.events(
{
	'click button#exitSurvey': function () {
	    Meteor.call('goToExitSurvey');
	},
	'keydown textarea': function (e) {
		if (e.keyCode == 13) {
			var conversation = e.target.value;
			e.target.value = "";
			Meteor.call('saveConversation', conversation);
		}
	},
	'click button#send': function (e) {
		var conversation = document.getElementById("sentence").value;
		document.getElementById("sentence").value = "";
		Meteor.call('saveConversation', conversation);
	}
});

Template.survey.events({
	'submit .survey': function (e) {
	    e.preventDefault();
	    var results = {confusing: e.target.confusing.value,
			   feedback: e.target.feedback.value};
	    TurkServer.submitExitSurvey(results);
	}
});