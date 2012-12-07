$(document).ready(function() {

   var isClicked = false;

   var $win = $(window);
   var lis = $('#bad-todo li');
   var ball = $('#bad-ball');
   var trash = $('#trash');
   var current = 0;
   var max = lis.size();
   var t = null;
   var $win = $(window);

   var top = 100;
   var left = $win.width() / 2;
   var ballSize = 120;

   var balls = [];

   var init = function() {
      lis = $('#bad-todo li');
      current = 0;
      max = lis.size();
      left = $win.width() / 2;
      balls = [];

      trash.css({
         'top': $win.height(),
         'left': $win.width() / 2 - 70,
      });
      isClicked = false;
      $('#done').removeAttr('disabled');
   }

   $('#done').click(function() {
      if (isClicked) return;
      $(this).attr('disabled', 'disabled');
      isClicked = true;

      var newBall = function() {
         var el = $('<img id="bad-ball" src="/img/waste.png" />');
         balls.push(el);
         $('body').append(el);
         return el;
      };

      var move = function(li, curr) {
         var n1 = Math.floor((Math.random() - 0.5)) == 0 ? 1 : -1;
         var n2 = Math.floor((Math.random() - 0.5)) == 0 ? 1 : -1;
         var rand1 = Math.random() * 30 * n1;
         var rand2 = Math.random() * 30 * n2;

         li.css({'position': 'absolute'});
         li.animate({
            'top': top + rand1,
            'left': left + rand2,
            'width': 1,
            'height': 1,
         }, 1000, 'linear', function() {
            console.log(li);
            li.remove();

            var ball = newBall();
            ball.css({
               'top': top,
               'left': left,
            });
            ball.show();
            ball.animate({
               'width': ballSize,
               'height': ballSize,
               'top': ball.offset().top - ballSize / 2 + rand1,
               'left': ball.offset().left - ballSize / 2 + rand2,
               'background-position-x': 0,
               'background-position-y': 0,
            }, 300, 'swing');

            if (curr + 1 == max) {
               setTimeout(function() {
                  $.each(balls, function() {
                     var ball = this;
                     ball.animate({
                        'top': trash.offset().top,
                        'left': trash.offset().left + 10,
                     }, 1000, function() {
                        ball.hide();
                        setTimeout(function() {
                           trash.animate({
                              'top': trash.offset().top + 172,
                           }, function() {
                              trash.hide();
                              isClicked = false;
                           });
                        });
                     });
                  });
               }, 1500);

               trash.show();
               trash.animate({
                  'top': trash.offset().top - 172,
               });
            }
         });
      }

      var start = function() {
         init();

         // Animate.
         move(lis.eq(0), current);
         current++;
         t = setInterval(function() {
            var li = lis.eq(current);

            move(li, current);

            current++;

            if (current == max) {
               clearInterval(t);
            }
         }, 500);
      };

      start();

   });


   init();
});