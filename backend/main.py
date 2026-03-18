from fastapi import FastAPI, Form
from fastapi.responses import RedirectResponse
from typing import Annotated
import boto3
from mangum import Mangum # O adaptador para AWS Lambda

app = FastAPI()

# Inicializa o cliente do Amazon SES
# Se sua região for diferente (ex: sa-east-1), altere aqui
ses_client = boto3.client('ses', region_name='us-east-1')

@app.post("/enviar")
async def enviar_contato(
    nome: Annotated[str, Form()],
    celular: Annotated[str, Form()]
):
    # IMPORTANTE: Ambos os e-mails precisam estar verificados no AWS SES 
    # enquanto sua conta estiver no modo "Sandbox" (ambiente de testes da AWS).
    remetente = "no-reply@virtussolutions.com.br"
    destinatario = "seu-email@dominio.com.br"
    
    assunto = "Nova Solicitação de Contato - Virtus Solutions"
    corpo = f"Nome: {nome}\nCelular: {celular}"

    try:
        # Envio de e-mail usando a API nativa da AWS
        response = ses_client.send_email(
            Source=remetente,
            Destination={
                'ToAddresses': [destinatario]
            },
            Message={
                'Subject': {'Data': assunto, 'Charset': 'UTF-8'},
                'Body': {
                    'Text': {'Data': corpo, 'Charset': 'UTF-8'}
                }
            }
        )
        print(f"E-mail enviado! Message ID: {response['MessageId']}")
    except Exception as e:
        print(f"Erro ao enviar pelo SES: {e}")
        # Em produção, você poderia redirecionar para uma página de "erro.html"

    # Redireciona de volta para a página de obrigado do seu site estático no S3
    return RedirectResponse(url="https://www.virtussolutions.com.br/obrigado.html", status_code=303)

# Esta é a variável que a AWS Lambda vai chamar para executar sua API
handler = Mangum(app)