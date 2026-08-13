import os
from dotenv import load_dotenv

from Backend.Settings.paths import ENV_PATH

load_dotenv(dotenv_path=ENV_PATH)

BRAPI_TOKEN = os.getenv("BRAPI_TOKEN")