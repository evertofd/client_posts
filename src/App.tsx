import List from "./components/List"
import Form from "./components/Form"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Filter from "./components/Filter"

const App = () => {

  return (
    <>
      <ToastContainer />
      <Filter />
      <List />
      <Form />
    </>
  )
}

export default App
