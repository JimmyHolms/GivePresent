import { Wishes } from '../../api/wishes';
import { Meteor } from 'meteor/meteor';

export class EditWishCtrl {
  static get $inject () {
    return ['$scope', '$state', '$reactive', '$stateParams', 'alternativeData'];
  }

  constructor($scope, $state, $reactive, $stateParams, alternativeData) {
    this.$state = $state;
    this.alternativeData = alternativeData;

    $reactive(this).attach($scope);

    this.subscribe('wishes');

    this.giftGiver = null;
    this.showPersonField = false;

    if (Meteor.userId()) {
      this.helpers({
        wish() {
          return Wishes.findOne({
            _id: $stateParams.id,
            owner: Meteor.userId()
          });
        }
      });
    } else {
      this.wish = angular.copy(alternativeData.findWish($stateParams.id));
    }

    this.autorun(this.$bindToContext(() => {
      this.giftGiver = this.wish ? this.wish.giftGiver : null;
      this.showPersonField = this.wish ? this.wish.received : false;
    }));
    
  }

  editWish() {
    if (!Meteor.status().connected) {
      return;
    }
    
    if (Meteor.userId()) {
      Wishes.update({
        _id: this.wish._id
      }, {
        $set: {
          name: this.wish.name,
          received: !!this.showPersonField,
          giftGiver: this.giftGiver
        }
      }, {}, this.$bindToContext(() => {
        this.$state.go('wish-list');
      }));
    } else {
      this.alternativeData.editWish(this.wish._id, this.wish.name);
      this.$state.go('wish-list');
    }
  }

  addPerson() {
    this.showPersonField = true;
  }
}