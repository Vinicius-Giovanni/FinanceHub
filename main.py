import requests

url = "https://brapi.dev/api/v2/stocks/historical?symbols=PETR4%2CVALE3&range=1d"

response = requests.request("GET", url, headers = {
  "Authorization": "hnHGBv6H9Bi2ZWjZ5nDaDk"
})

print(response.text)