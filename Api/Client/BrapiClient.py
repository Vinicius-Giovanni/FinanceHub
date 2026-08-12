import requests

from Settings.config import BRAPI_TOKEN

response = requests.get(
    "https://brapi.dev/api/v2/stocks/quote?symbols=BBAS3",
    headers={
        "Authorization": f"Bearer {BRAPI_TOKEN}"
    }
)

data = response.json()
print(data["results"][0]["data"])