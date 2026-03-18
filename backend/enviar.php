<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nome = htmlspecialchars($_POST['nome']);
  $celular = htmlspecialchars($_POST['celular']);

  $para = ""; // Altere para seu e-mail real
  $assunto = "Nova Solicitação de Contato - Virtus Solutions";
  $corpo = "Nome: $nome\nCelular: $celular";

  // Como não há mais o campo e-mail, usamos um remetente genérico ou fixo.
  $cabecalhos = "From: no-reply@virtussolutions.com.br\r\n";
  $cabecalhos .= "Content-Type: text/plain; charset=UTF-8\r\n";

  if (mail($para, $assunto, $corpo, $cabecalhos)) {
    header("Location: ../obrigado.html");
    exit();
  } else {
    echo "Erro ao enviar. Tente novamente mais tarde.";
  }
}
?>
