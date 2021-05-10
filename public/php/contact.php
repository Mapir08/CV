<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
  <div class="row">
    <div class="col-md-6">
      <input name="nom" id="nom" placeholder="Nom *" type="text" class="form-control" value="<?php echo $nom; ?>">
      <div class="error"><?php echo $nomError?></div>
    </div>
    <div class="col-md-6">
      <input name="prenom" id="prenom" placeholder="Prénom *" type="text" class="form-control" value="<?php echo $prenom; ?>">
      <div class="error"><?php echo $prenomError?></div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <input name="email" id="email" placeholder="Email *" type="email" class="form-control" value="<?php echo $email; ?>">
      <div class="error"><?php echo $emailError?></div>
    </div>
    <div class="col-md-6">
      <input name="telephone" id="telephone" placeholder="Téléphone" type="tel" class="form-control" value="<?php echo $telephone; ?>">
      <div class="error"></div>
    </div>
  </div>
  <div class="col-12">
    <textarea name="message" id="message" placeholder="Message *" cols="80" rows="5" class="form-control"><?php echo $message; ?></textarea>
  </div>

  <div class="col-12"><span>* informations requises</span></div>
  <div class="error" style='text-align:center;'><?php echo $messageError?></div>
  <button type="submit" class="btn">Envoyer</button>
  <div class="merci"><span <?php if($isSucces) echo ''; else echo 'hidden'; ?>>Votre message est envoyé. Merci de m'avoir contacté.</span></div>
</form>