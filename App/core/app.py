from contextlib import asynccontextmanager
from fastapi import FastAPI

from Api.Client.BrapiClient import client_brapi
from App.routes.Stocks import router as stocks_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Gerenciador do ciclo de vida das chamadas de API's
    """

    # Brapi
    app.state.brapi = client_brapi()

    yield

    # Encerra a sessão HTTP
    app.state.brapi.close()

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

    return app