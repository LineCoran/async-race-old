import MyForm from "../components/MyForm/MyForm";
import CarList from "../components/CarList/CarList";

function Garage() {
  return (
    <main>
      <MyForm />  
        <section>
            <CarList />
        </section>
    </main>
  );
}

export default Garage;
