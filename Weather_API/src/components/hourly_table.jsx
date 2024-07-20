import{ Table } from "antd";

const columns = [
  {
    title: 'Hour',
    dataIndex: 'hour',
    key: 'hour',
  },
  {
    title: 'Temperature',
    dataIndex: 'temp_c',
    key: 'temp_c',
  },
  {
    title: 'Condition',
    dataIndex: 'cond',
    key: 'cond',
  },
];

function TableHour(props){
    const { weather } = props;

    if (!weather.hour) {
      return (
      <div>Loading...</div>
    )}
    
    let dataList = [];
    for (let i = 0; i <= 23; i++){
      const datetime = weather['hour'][i]['time'];
      const time = datetime.split(" ").slice(-1);
      
      dataList.push(
        {
          key: `${i}`,
          hour: time,
          temp_c: `${weather['hour'][i]['temp_c']} °C`,
          cond: 
          <div className='flex items-center'>
              {weather['hour'][i]['condition']['text']}
              <img src={`http:${weather['hour'][i]['condition']['icon']}`}/>
          </div>,
        },
      )
    }

    return(
      <div className="overflow-scroll h-screen">
          <Table columns={columns} dataSource={dataList} pagination={false} />
      </div>
    )
}

export default TableHour;