from Backend.Api.Client.AlternativeClient import AlternativeClient

class AlternativeService:

    def __init__(self, client: AlternativeClient):
        self.client = client

    def get_index(self, limit: int = 1):
        """
        Retorna os dados do Fear and Greed Index.
        Por padrão, retorna apenas o valor atual.
        """

        response = self.client.get(
            "fng/",
            params={
                "limit": limit
            }
        )

        response.raise_for_status()

        return response.json()