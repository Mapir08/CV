<?php


  // Le fait de créer un array avec toutes les variables utile au formulaire, pour facilité la communication AJAX en JSON
  $array = array('nom' => '', 'prenom' => '', 'email' => '', 'telephone' => '', 'message' => '', 'nomError' => '', 'prenomError' => '', 'emailError' => '', 'messageError' => '', 'isSuccess' => true);

  if ($_SERVER['REQUEST_METHOD']=="POST"){ // Ouvert via la méthode POST du formulaire
    $array['nom']=verif($_POST['nom']); // on intègre les données du formulaire dans le array
    $array['prenom']=verif($_POST['prenom']);
    $array['email']=verif($_POST['email']);
    $array['telephone']= verif(($_POST['telephone'])) ? $_POST['telephone'] : "";
    $array['message']=verif($_POST['message']);
    $emailText = ''; // Pour construire le contenu du mail

    if (empty($array['nom'])){
      $array['nomError'] = 'Tu n\'indiques pas ton Nom.';
      $array['isSuccess'] = false; 
    }else{
      $emailText .= $array['nom'] . " ";
    }
    if (empty($array['prenom'])){
      $array['prenomError'] = 'Tu n\'indiques pas ton Prénom.\n';
      $array['isSuccess'] = false;
    }else{
      $emailText .= $array['prenom'] . " a envoyé le message suivant :\n\n";
    }
    if (empty($array['message'])){
      $array['messageError']= "Message vide";
      $array['isSuccess'] = false;
    }else{
      $emailText .= $array['message'] . "\n\n";
    }
    if (!isEmail($array['email'])){
      $array['emailError'] = "Mail non valide";
      $array['isSuccess'] = false;
    }else{
      $emailText .= "Son Mail : " . $array['email'] . "\n";
      if (!($array['telephone'] == '')){
        $emailText .= "Et son numéro de téléphone : " . $array['telephone'] ;
      }
    }
    if ($array['isSuccess']) {
      $headers = "From: {$array['nom']} {$array['prenom']} <{$array['email']}>\r\nReply-To: {$array['email']}"; // de qui provient le message, a qui répondre
      // ENVOI DU MAL //
      mail('math.perlier@gmail.com', 'Un message du Site CV', $emailText, $headers);
      // ENVOI DU MAL //
    }
    echo json_encode($array); // Après le remplissage du $array avec les valeurs on l'encode pour le reprendre dans le fichier ajax.js qui sera maintenant 'result'

}

  function isEmail($var){
    return filter_var($var, FILTER_VALIDATE_EMAIL); // Vérifi si c'est bien un mail
  }

  function verif($var){
    $var=strip_tags($var); // retire toutes les balises qui auraient pu être entré par malveillance
    return $var;
  }
?>