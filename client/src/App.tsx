import "./style.scss"
import Form from "./components/Form"
import BookContainer from "./components/BookContainer"
import Modal from "./components/Modal"

const App = () => {

  return (
    <>
      <Modal />
      <main className="container">
        <Form />
        <hr />
        <BookContainer />
      </main>
    </>
  )
}

export default App