import WeatherCard from "./components/weather"
import TableHour from "./components/hourly_table"
import { AutoComplete, Button, Menu } from 'antd';
import React, { useState, useEffect } from 'react'
import axios from 'axios';

export function App() {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState('');
  const [city, setCity] = useState(["Moscow"]);
  const [info, setInfo] = useState([]);
  const [weather, setWeather] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [count, setCount] = useState([1]);

  const getCount = () => {
      axios.get(`http://127.0.0.1:8000/fetch_count?city=${city}`).then(r => {
        if (r.data !== null){
          setCount(r.data['count'])
        }
        else {
          setCount([1]);
        }
      })
  };

  const SearchCity = () => {
    axios.get(`http://127.0.0.1:8000/search_city?desired=${value}`).then(r => {
      if (r.data[0]){
        const cityNames = [];
        const uniqueCityNames = new Set();
        for (let i = 0; i < r.data.length; i++) {
          let city_name = `${r.data[i].name} in ${r.data[i].country}`;
          if (!uniqueCityNames.has(city_name)) {
            cityNames.push({
              value: city_name
            });
            uniqueCityNames.add(city_name);
          }
        }
        setOptions(cityNames)
      }
    })
  };

  const fetchCityWeather = () => {
    axios.get(`http://127.0.0.1:8000/fetch_forecast?city=${city}`).then(r => {
        const information = r.data;
        setInfo(information);
        
        const tempItems = []; 
        for (let i = 0; i <= 13; i++){
          const date = new Date(information['forecast']['forecastday'][i]['date']);
          const options = { month: 'short', day: 'numeric' };
          const formattedDate = date.toLocaleDateString('en-US', options);
            tempItems.push(
              {
                key: i,
                label: formattedDate
              }
            );
        }
        setMenuItems(tempItems);
        setWeather(information['forecast']['forecastday'][0]);
      });
      getCount();        
};
  const onSelect = (value) => {
    setCity(value.split(" in ")[0]);
    setValue('');
  };

  const onClick = () => {
      if (value){
        setCity(value);
    }
  };

  const onChange = (data) => {
    setValue(data);
  };

  useEffect(() => {
    fetchCityWeather();
  }, [city])

  useEffect(() => {
    SearchCity()
  }, [value])

  const onClickMenu = (e) => {
    setWeather(info['forecast']['forecastday'][e.key])
  };

  return (
      <div className="flex h-screen">
        <div className="flex-shrink-0">
          <Menu
            onClick={onClickMenu}
            style={{ width: 128 }}
            defaultSelectedKeys={['1']}
            mode="inline"
            items={menuItems}

          />
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <div className="flex space-x-2">
              <AutoComplete
                value={value}
                onChange={onChange}
                onSelect={onSelect}
                className="w-full"
                options={options}
                placeholder="Enter city"
                filterOption={(inputValue, option) => 
                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              />
              <Button type="primary" onClick={onClick} className="bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </div>
            <div className="mt-4">
              <WeatherCard info={info} count={count} />
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <TableHour weather={weather} />
        </div>
      </div>

  )
}
