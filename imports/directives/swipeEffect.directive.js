import app from '../../client/app';

export default app.directive('swipeEffect', function () {
  return {
    restrict: 'A',
    link: function (scope, $elm, attrs) {

      let startX;
      let swipeWidth = screen.width/6;

      $elm.on('touchstart', function (e) {
        startX = e.originalEvent.changedTouches[0].clientX;

        $elm.css({
          position: 'relative'
        });
      });

      $elm.on('touchmove', function (e) {
        var xDiff = e.originalEvent.changedTouches[0].clientX - startX;

        if (xDiff > 0) {
          xDiff = 0;
        }

        if (xDiff < -1 * swipeWidth) {
          xDiff = -1 * swipeWidth;
        }

        $elm.css({
          left: xDiff
        });
      });

      $elm.on('touchend', function () {
        $elm.animate({
          left: 0
        }, 'fast');
      });
    }
  };
});
