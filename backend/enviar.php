<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nome = htmlspecialchars($_POST['nome']);
  $email = htmlspecialchars($_POST['email']);
  $celular = htmlspecialchars($_POST['celular']);
  $mensagem = htmlspecialchars($_POST['mensagem']);

  $para = ""; // Altere para seu e-mail real
  $assunto = "Mensagem do site Virtus Solutions";
  $corpo = "Nome: $nome\nEmail: $email\nCelular: $celular\nMensagem:\n$mensagem";

  $cabecalhos = "From: $email\r\n";
  $cabecalhos .= "Reply-To: $email\r\n";
  $cabecalhos .= "Content-Type: text/plain; charset=UTF-8\r\n";

  if (mail($para, $assunto, $corpo, $cabecalhos)) {
    header("Location: obrigado.html");
    exit();
  } else {
    echo "Erro ao enviar. Tente novamente mais tarde.";
  }
}
?>
