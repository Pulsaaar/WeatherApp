from aiohttp import ClientSession

class HTTPClient:
    def __init__(self, api_key):
        self.base_url="http://api.weatherapi.com/v1/"
        self.api_key = api_key

    async def fetch_forecast(self, city):
        async with ClientSession() as session:
            async with session.get(f'{self.base_url}forecast.json?key={self.api_key}&q={city}&days=14') as response:
                weather_data = await response.json()
                return weather_data

    async def search_city(self, desired):
        async with ClientSession() as session:
            async with session.get(f'{self.base_url}search.json?key={self.api_key}&q={desired}') as response:
                weather_data = await response.json()
                return weather_data
