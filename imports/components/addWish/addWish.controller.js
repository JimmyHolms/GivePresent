import { Wishes } from '../../api/wishes';
import { Meteor } from 'meteor/meteor';

export class AddWishCtrl {
  static get $inject() {
    return ['$scope', '$state', '$reactive', 'alternativeData'];
  }

  constructor($scope, $state, $reactive, alternativeData) {
    this.$state = $state;
    this.alternativeData = alternativeData;

    $reactive(this).attach($scope);

    this.wishName = null;
    this.giftGiver = null;
    this.showPersonField = false;
    var Amazon = require('amazon-product-api');
    this.client = Amazon.createClient({
      awsId: "AKIAJWNRLQIA6DFH5I4Q",
      awsSecret: "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",
      awsTag: ""
    });

  }

  addWish() {
    if (!Meteor.status().connected) {
      return;
    }

    if (Meteor.userId()) {
      let data = {
        name: this.wishName,
        createdAt: new Date,
        owner: Meteor.userId(),
        received: false,
        giftGiver: this.giftGiver
      };

      Wishes.insert(data, this.$bindToContext(() => {
        this.$state.go('wish-list');
      }));
    } else {
      this.alternativeData.addWish(this.wishName);
      this.$state.go('wish-list');
    }
  }

  addPerson() {
    this.showPersonField = true;
  }
  changeText() {
    this.client.itemSearch({
      director: 'Quentin Tarantino',
      actor: 'Samuel L. Jackson',
      searchIndex: 'DVD',
      audienceRating: 'R',
      responseGroup: 'ItemAttributes,Offers,Images'
    }).then(function (results) {
      console.log(results);
    }).catch(function (err) {
      console.log(err);
    });
  }
}