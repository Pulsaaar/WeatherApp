from database import CityCount, new_session
from sqlalchemy import Update, Select

async def post_data(city):
    async with new_session() as session:
        city_c = CityCount(city=city)
        session.add(city_c)
        await session.commit()

async def fetch_data(city):
    async with new_session() as session:
        select = Select(CityCount).where(CityCount.city == city)
        result = await session.execute(select)
        city = result.scalars().first()
        return city

async def increment_count(city):
    async with new_session() as session:
        stmt = (
            Update(CityCount)
            .where(CityCount.city == city)
            .values(count= CityCount.count + 1)
            .execution_options(synchronize_session="fetch")
        )
        await session.execute(stmt)
        await session.commit()