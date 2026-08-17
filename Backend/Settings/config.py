import os
from dotenv import load_dotenv

from Backend.Settings.paths import ENV_PATH

load_dotenv(dotenv_path=ENV_PATH)

BRAPI_TOKEN = os.getenv("BRAPI_TOKEN")
BRAPI_URL = "https://brapi.dev/api/v2/stocks/"

COINGECKO_TOKEN = os.getenv("COINGECKO_TOKEN")
COINGECKO_URL = "https://api.coingecko.com/api/v3/"

TWELVE_TOKEN = os.getenv("TWELVE_TOKEN")
TWELVE_URL = "https://api.twelvedata.com/"