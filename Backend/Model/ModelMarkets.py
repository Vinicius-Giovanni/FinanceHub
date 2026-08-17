from pydantic import BaseModel


class FearAndGreedData(BaseModel):
    """
    Representa um registro do Fear and Greed Index.
    """

    value: int
    value_classification: str
    timestamp: int
    time_until_update: int | None = None


class FearAndGreedMetadata(BaseModel):
    """
    Representa os metadados da resposta do Fear and Greed Index.
    """

    error: str | None = None


class FearAndGreedResponse(BaseModel):
    """
    Representa a resposta da API do Fear and Greed Index.
    """

    name: str
    data: list[FearAndGreedData]
    metadata: FearAndGreedMetadata