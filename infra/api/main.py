import os
import boto3
from fastapi import FastAPI, Form
from fastapi.responses import RedirectResponse
from mangum import Mangum
from typing import Annotated

app = FastAPI()

# Inicializa o cliente do SES (Simple Email Service)
# A região deve ser a mesma onde você verificou seus e-mails no SES
ses_client = boto3.client('ses', region_name=os.getenv("SES_REGION", "sa-east-1"))

@app.post("/enviar")
async def enviar_contato(
    nome: Annotated[str, Form()],
    celular: Annotated[str, Form()]
):
    # ATENÇÃO: Configure os e-mails abaixo. 
    # Ambos precisam estar verificados no console da AWS SES para funcionar.
    remetente = "no-reply@virtussolutions.com.br"
    destinatario = "seu-email@dominio.com.br" # Coloque seu e-mail de recebimento aqui
    
    assunto = "Nova Solicitação de Contato - Virtus Solutions"
    corpo = f"Novo contato recebido pelo site:\n\nNome: {nome}\nCelular: {celular}"

    try:
        # Envio de e-mail via API nativa da AWS (mais seguro que SMTP para Lambda)
        ses_client.send_email(
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
        print("E-mail enviado com sucesso!")
    except Exception as e:
        # Log do erro para depuração no CloudWatch
        print(f"Erro ao enviar e-mail via SES: {str(e)}")

    # Redireciona para a página de agradecimento no frontend
    # O uso de URL relativa '/' garante que funcione no domínio final ou no CloudFront
    return RedirectResponse(url="/obrigado.html", status_code=303)

# O handler Mangum permite que a AWS Lambda "entenda" a aplicação FastAPI
handler = Mangum(app)
