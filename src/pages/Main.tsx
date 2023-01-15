import Car from "../components/Car/Car";
import MyForm from "../components/MyForm/MyForm";
import { useGetAllProductsQuery } from "../features/apiSlice";
import { useAppSelector } from "../hooks";

function Main() {
    const cars = useAppSelector((store) => store.carsReducer.cars);
    const { data } = useGetAllProductsQuery('');
  return (
    <main>
      <MyForm />  
        <div>
          {cars.map((item) => (
            <Car car={item} key={item.id} />
          ))}
          {
            (data === undefined || !data.products.length)
            ? 'loading'
            : (data.products.map((item) => <span key={item.id}>{item.title}</span>))
          }
        </div>

    </main>
  );
}

export default Main;
