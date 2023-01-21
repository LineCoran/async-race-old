import { useGetAllCarsQuery } from "../../features/apiSlice";
import Car from "../Car/Car";
import './CarList.css';

function CarList() {

  const { data } = useGetAllCarsQuery('');

  if (data !== undefined) {
    return (
      <div className="car-list-wrapper">
        <h1 className='car-list-title'>GARAGE({data.length})</h1>
        <div className='car-list'>
          {data.map((item) => (
            <Car car={item} key={item.id} />
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

export default CarList;
