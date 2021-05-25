$(function(){ // Pour les acction au chargement de la page

  // Pour le développer dans la section training
  let $trainingChoix = $('#diplome ul').children('li');
  let heightOpened = '190px';
  let heightClosed = '70px';
  let indexTraining = -1;

  let init = function(){
    choixTraining();
  };

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

  // Effet déroulement lors du clik navbar
  $('.navbar a').on('click', function(event){
    event.preventDefault();
    let hash = this.hash; //récupére le #... du lien
    let position = $(hash).offset().top - 85 //défini la position du ScrollY en fonction du #... 
    $('html').animate({scrollTop: position}, 400); //Va a la position de facon animé
  });

  // Au scroll le menu descend
  $(window).on('scroll', function(event){
    if(scrollY > 525){
      $('.navbar').addClass('fixed-top scroll');
    }else{
      $('.navbar').removeClass('fixed-top scroll');
    }
  });

  // POUR LA VALIDATION DU FORMULAIRE DE CONTACT
  $('#contact-form').submit(function(e){
    e.preventDefault();                             // Permet d'enlever le comportement par défaut du formulaire
    $('.error').empty();                            // Initialise les champs .error vide
    let postdata = $('#contact-form').serialize();  // Initialise une variable pour récupérer les données du formulaire via JSON 
    $.ajax({
      type: 'POST',                                 // Le formulaire lance un POST
      url: 'public/php/contact.php',                // l'adresse du php a executer
      data: postdata,                               // les donnée seront dans cette variable
      dataType: 'json',                             // qui sera de type json
      success: function(result) {                   // Dans le cas ou tous c'est bien passé on execute la fonction
        if (result.isSuccess){                      // Vérifie si tous les champs ont été bien rempli d'après le retour du fichier PHP
          $('#merci').append("<span>Votre message est envoyé. Merci de m'avoir contacté.</span>"); // afficher comme quoi le mail est envoyé dans le html
          $('#contact-form')[0].reset();            // remet tous les champs du formulaire à zero
        }else{                                      // Si isSucces = false, indiqué d'ou vient l'erreur
          $('#nom + .error').html(result.nomError); // le message d'erreur pour le nom 
          $('#prenom + .error').html(result.prenomError);
          $('#email + .error').html(result.emailError);
          $('#errorMessage').html(result.messageError);
        }
      }
    });
  });
});

