import os
from dotenv import load_dotenv

from Backend.Settings.paths import ENV_PATH

load_dotenv(dotenv_path=ENV_PATH)

BRAPI_TOKEN = os.getenv("BRAPI_TOKEN")
BRAPI_URL = "https://brapi.dev/api/v2/stocks/"

COINGECKO_TOKEN = os.getenv("COINGECKO_TOKEN")
COINGECKO_URL = ...