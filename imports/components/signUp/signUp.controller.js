import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import '../partyUpload/partyUpload';

export class SignUpCtrl {
  static get $inject () {
    return ['$scope', '$reactive', '$state'];
  }

  constructor($scope, $reactive, $state) {
    this.$state = $state;

    $reactive(this).attach($scope);

    this.credentials = {
      email: null,
      password: null,
      profile: {
        name: null
        // picture: null
      }
    }

    this.error = null;

    this.form = {};

    this.uploadedImages = null;
  }

  signUp() {
    if (!Meteor.status().connected) {
      return;
    }

    // this.credentials.profile.picture = this.uploadedImages && this.uploadedImages.length > 0 ? this.uploadedImages[0] : null;

    Accounts.createUser(this.credentials, this.$bindToContext((err) => {
      if (err) {
        // error
        this.error = err;
      } else {
        // success

        // automatic login after registration
        Meteor.loginWithPassword(this.credentials.email, this.credentials.password, this.$bindToContext((err) => {
          if (err) {
            // error
            this.error = err;
          } else {
            this.$state.go('sign-in');
          }
        }));

        // this.$state.go('sign-in');
      }
    }));
  }
}