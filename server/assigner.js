var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
hasProp = {}.hasOwnProperty;
 TurkServer.Assigners.PairAssigner = (function(superClass) {
    extend(PairAssigner, superClass);
     function PairAssigner() {
    return PairAssigner.__super__.constructor.apply(this, arguments);
    }
     PairAssigner.prototype.initialize = function() {
    PairAssigner.__super__.initialize.apply(this, arguments);
  }
  PairAssigner.prototype.userJoined = function(asst) {
    if (asst.getInstances().length > 0) {
        this.lobby.pluckUsers([asst.userId]);
          asst.showExitSurvey();
        } else {
          var assts = this.lobby.getAssignments();
          if (assts.length >= 2){
            this.assignToNewInstance([assts[0], assts[1]]);
          }
        }
    };
  return PairAssigner;
}) (TurkServer.Assigner); 