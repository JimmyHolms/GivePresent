import { Meteor } from 'meteor/meteor';

export class NetworkWatcherCtrl {
  static get $inject () {
    return ['$scope', '$reactive', '$state'];
  }

  constructor($scope, $reactive, $state) {
    this.$state = $state;

    $reactive(this).attach($scope);

    this.status = null;

    var intervalId = null;

    this.autorun(this.$bindToContext(() => {
      if (Meteor.status().status != "connected" && this.status == "connecting") {
        setTimeout(this.$bindToContext(() => {
          this.status = Meteor.status().status;
        }), 700);
      } else {
        this.status = Meteor.status().status;
      }

      if(Meteor.status().status === "waiting" && intervalId === null) {
        intervalId = Meteor.setInterval(function () {
          Meteor.reconnect();
        }, 4000);
      }
      // Stop Trying to Reconnect If Connected, and clear Interval
      if(Meteor.status().status === "connected" && intervalId != null) {
          Meteor.clearInterval(intervalId);
          intervalId = null;
      }
    }));
  }
}