from brapi import AsyncBrapi, DefaultAioHttpClient

from Settings.config import BRAPI_TOKEN

def client_brapi() -> AsyncBrapi:
    """
    Criação do cliente da API Brapi
    """
    return AsyncBrapi(
        api_key=BRAPI_TOKEN,
        http_client=DefaultAioHttpClient()
    )