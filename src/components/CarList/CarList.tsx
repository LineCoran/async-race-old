import { useGetAllCarsQuery } from "../../features/apiSlice";
import Car from "../Car/Car";

function CarList() {

  const { data } = useGetAllCarsQuery('');

  if (data !== undefined) {
    return (
      <>
        {data.map((item) => (
          <Car car={item} key={item.id} />
        ))}
      </>
        )
  } else {
    return (
      <h1>not found</h1>
    )
  }
}

export default CarList;
