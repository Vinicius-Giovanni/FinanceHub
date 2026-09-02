from contextlib import asynccontextmanager
from fastapi import FastAPI

from Backend.Api.Client.BrapiClient import BrapiClient
from Backend.Api.Client.CoinGeckoClient import CoinGeckoClient
from Backend.Api.Client.TwelveClient import TwelveDataClient 
from Backend.Api.Client.AlternativeClient import AlternativeClient

from Backend.App.routes.Stocks import router as stocks_router
from Backend.App.routes.Crypto import router as crypto_router
from Backend.App.routes.Currencies import router as currencies_router
from Backend.App.routes.Markets import router as market_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Gerenciador do ciclo de vida das chamadas de API's
    """

    # Clientes das APIs
    app.state.brapi = BrapiClient()
    app.state.coingecko = CoinGeckoClient()
    app.state.twelve_data = TwelveDataClient()
    app.state.alternative = AlternativeClient()

    yield

    # Encerra as sessões HTTP
    app.state.brapi.close()
    app.state.coingecko.close()
    app.state.twelve_data.close()
    app.state.alternative.close()

def create_app() -> FastAPI:
    """
    Criação da aplicação FastAPI
    """

    app = FastAPI(
        title="FinanceHub API",
        version="1.0.0",
        lifespan=lifespan,
    )

    app.include_router(stocks_router)
    app.include_router(crypto_router)
    app.include_router(currencies_router)
    app.include_router(market_router)

    return app
