import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export class ChangePasswordCtrl {
  static get $inject () {
    return ['$scope', '$state', '$reactive'];
  }

  constructor($scope, $state, $reactive) {
    this.$state = $state;

    $reactive(this).attach($scope);

    this.form = {};

    this.data = {
      currentPassword: null,
      newPassword: null
    };

    this.err = null;
  }

  changePassword() {
    if (!Meteor.status().connected) {
      return;
    }
    
    Accounts.changePassword(this.data.currentPassword, this.data.newPassword, this.$bindToContext((err) => {
      if (!err) {
        this.$state.go('settings');
      } else {
        this.err = err;
      }
    }));
  }
}