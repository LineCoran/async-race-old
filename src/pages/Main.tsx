import MyForm from "../components/MyForm/MyForm";
import CarList from "../components/CarList/CarList";

function Main() {
  return (
    <main>
      <MyForm />  
        <section>
            <CarList />
        </section>
    </main>
  );
}

export default Main;
