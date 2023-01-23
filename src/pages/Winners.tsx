import { useGetWinnersQuery } from "../api/apiSlice";

function Winners() {

    const { data } = useGetWinnersQuery('');
    if (data !== undefined) {
        return (
          <div className="car-list-wrapper">
            <div className='car-list'>
              {data.map((item) => (
                <div key={item.id}>
                    <p>{item.id}   {item.time}    {item.wins}</p>
                    <hr />
                </div>
              ))}
            </div>
          </div>
            )
      } else {
        return (
          <h1>not found</h1>
        )
      }
}

export default Winners;