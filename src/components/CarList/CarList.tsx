import { useGetCarsQuery } from "../../api/apiSlice";
import { useAppSelector } from "../../hooks";
import Car from "../Car/Car";
import './CarList.css';

function CarList() {

  const params = useAppSelector((state) => state.carsReducer.carListParams);
  const { data } = useGetCarsQuery(params);


  if (data !== undefined) {
    return (
      <div className="car-list-wrapper">
        <div className='car-list'>
          {data.map((item, index) => (
            <Car car={item} key={item.id} listId={index} />
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
