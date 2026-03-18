output "nameservers_registro_br" {
  description = "Servidores NS gerados pelo Route 53 para configurar no Registro.br"
  value       = aws_route53_zone.main.name_servers
}

output "api_endpoint_url" {
  description = "URL final da rota POST para o formulário HTML"
  value       = "${aws_apigatewayv2_api.http_api.api_endpoint}/enviar"
}

output "cloudfront_domain_name" {
  description = "Domínio gerado pelo CloudFront"
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}
