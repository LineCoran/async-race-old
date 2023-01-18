import { useGetAllCarsQuery } from "../../features/apiSlice";
import Car from "../Car/Car";

function CarList() {

  const { data } = useGetAllCarsQuery('');

  if (data !== undefined) {
    return (
      <div>
        <h1>GARAGE({data.length})</h1>
        {data.map((item) => (
          <Car car={item} key={item.id} />
        ))}
      </div>
        )
  } else {
    return (
      <h1>not found</h1>
    )
  }
}

export default CarList;
