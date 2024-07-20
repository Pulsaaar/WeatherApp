import { Card } from 'antd';

function WeatherCard(props){
    const {info, count} = props

    if (!info.current) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Card className='bg-slate-200' bordered={false}
                title={
                <div className='flex justify-center items-center'>
                    <span>{info.location.name}</span>
                </div>}
    
                style={{
                    width: 300,
                }}>
                <p>
                    <div className='flex items-center'> 
                        {info.current.condition.text}
                        <img src={`http:${info.current.condition.icon}`}/>
                    </div>  
                </p>
                <p>Temperature: {info.current.temp_c} °C</p>
                <p>Feels: {info.current.feelslike_c} °C</p>
                <p>How many: {count.count}</p>
            </Card>
        </div>
    )
}

export default WeatherCard;