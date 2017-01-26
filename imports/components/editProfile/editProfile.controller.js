import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export class EditProfileCtrl {
  static get $inject () {
    return ['$scope', '$state', '$reactive'];
  }

  constructor($scope, $state, $reactive) {
    this.$state = $state;

    $reactive(this).attach($scope);

    this.form = {};

    this.init();

    Accounts.onLogin(this.$bindToContext(() => {
      this.init();
    }));
  }

  save() {
    if (!Meteor.status().connected) {
      return;
    }
    
    Meteor.users.update(Meteor.userId(), {
      $set: {
        'emails.0.address': this.userData.email,
        'profile.name': this.userData.name
      }
    }, this.$bindToContext((err) => {
      if (!err) {
        this.$state.go('settings');
      }
    }));
  }

  init() {
    this.userData = {
      name: Meteor.user() && Meteor.user().profile ? Meteor.user().profile.name : null,
      email: Meteor.user() ? Meteor.user().emails[0].address : null
    };
  }
}