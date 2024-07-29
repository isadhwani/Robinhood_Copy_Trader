import requests



class CoingeckoService:
    API_KEY = "CG-LbEcx8pgc3rAHXzQeGSX5SZS"
    url = "https://pro-api.coingecko.com/api/v3/ping"

    def ping(self):
        headers = {"accept": "application/json"}
        response = requests.get(self.url, headers=headers)
        return response.json()


