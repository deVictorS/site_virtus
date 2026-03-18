variable "aws_region" {
  description = "Região principal para os recursos (São Paulo)"
  type        = string
  default     = "sa-east-1"
}

variable "domain_name" {
  description = "Nome do domínio principal"
  type        = string
  default     = "virtussolutions.com.br"
}

variable "project_name" {
  description = "Nome do projeto para identificação de recursos"
  type        = string
  default     = "virtus-landing-page"
}
