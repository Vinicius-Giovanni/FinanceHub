import requests

url = "https://brapi.dev/api/v2/stocks/historical"

params = {
    "symbols": "PETR4",
    "range": "1mo",
    "interval": "1d"
}

response = requests.get(url, params=params)

print(response.status_code)
print(response.json())