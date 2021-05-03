$(function(){
  let $trainingChoix = $('#training ul').children('li');
  let heightOpened = '190px';
  let heightClosed = '70px';
  let indexTraining = -1;

  let init = function(){
    choixTraining();
  };

  // Pour le développer dans la section training
  let choixTraining = function(){
    $trainingChoix.children('.training-heading').click(function(){
      let newIndexTraining = $(this).parent().index();
      checkItemTraining(newIndexTraining);
    });
  };
  let checkItemTraining = function(index){
    let $item = $trainingChoix.eq(index);
    if (index === indexTraining){
      animateTraining($item, false);
      rotateTagTraining($item, false);
      indexTraining = -1
    }else{
      let $oldItem = $trainingChoix.eq(indexTraining);
      animateTraining($oldItem, false);
      rotateTagTraining($oldItem, false);
      animateTraining($item, true);
      indexTraining = index;
    };
  };
  let animateTraining = function($item, toOpen){
    let itemParam = toOpen ? {height: heightOpened} : {height: heightClosed};
    $item.animate(itemParam);
    rotateTagTraining($item, true);
  };
  let rotateTagTraining = function($item, toOpen){
    let deg= toOpen ? [540, 0.8] : [0, 1] ;
    let color= toOpen ? 0.5 : 1;
    $item.children('.training-heading').children('.bi').css({transform: 'rotate('+ deg[0] +'deg) scale('+ deg[1] +')', transition: 'transform 500ms ease-in-out'});
    $item.children('.training-heading').children('.bi').css({color: 'rgba(30, 34, 50, '+ color +')'});
  };

  init();

});