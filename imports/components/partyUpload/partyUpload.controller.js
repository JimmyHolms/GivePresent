import { Images, upload } from '../../api/images';

export class PartyUploadCtrl {
  static get $inject () {
    return ['$scope', '$reactive'];
  }

  constructor($scope, $reactive) {
    $reactive(this).attach($scope);

    this.subscribe('images', () => [
      this.getReactively('files', true) || []
    ]);

    this.uploadedImage = null;

    this.imageSrc = null;
 
    // this.helpers({
    //   images() {
    //     let searchObj;

    //     if (this.files && this.files.length) {
    //       searchObj = {
    //         _id: this.files[0]
    //       };
    //     } else {
    //       searchObj = {};
    //     }
    //     return Images.find(searchObj);
    //       // originalStore: 'images',
    //       // originalId: {
    //       //   $in: this.getReactively('files', true) || []
    //       // }
    //     // });
    //   }
    // });
  }
 
  addImages(files) {
    if (files.length) {
      this.currentFile = files[0];
 
      const reader = new FileReader;
 
      reader.onload = this.$bindToContext((e) => {
        this.imageSrc = e.target.result;
        this.cropImgSrc = e.target.result;
        this.myCroppedImage = '';
      });
 
      reader.readAsDataURL(files[0]);
    } else {
      this.cropImgSrc = undefined;
    }
  }

  save() {
    upload(this.myCroppedImage, this.currentFile.name, this.$bindToContext((file) => {
      this.uploadedImage = file;

      if (!this.files || !this.files.length) {
        this.files = [];
      }
      this.files.push(this.uploadedImage.url);
 
      this.reset();
    }), (e) => {
      console.log('Oops, something went wrong', e);
    });
  }
 
  reset() {
    this.cropImgSrc = undefined;
    this.myCroppedImage = '';
  }
}