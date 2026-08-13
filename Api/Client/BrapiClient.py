import requests

from Settings.config import BRAPI_TOKEN

def client_brapi():
    """
    Cria uma sessão HTTP configurada para comunicação com a API Brapi.
    """

    session = requests.Session()

    session.headers.update({
        "Authorization": BRAPI_TOKEN
    })

    return session
