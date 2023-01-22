import './MyForm.css';
import CreateCar from '../CreateCar/CreateCar';
import UpdateCar from '../UptadeCar/UpdateCar';

function MyForm() {

  return(
    <section className="form">
      <CreateCar />
      <UpdateCar />
    </section>      
    )
}

export default MyForm;
