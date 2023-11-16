import { useState } from "react";
import BookmarkTable from "./components/BookmarkTable";
import AddModal from "./components/AddModal";
import { actions, modalState } from "./utils/constants"

function App() {
  const [modalActive, setModalActive] = useState(modalState.inactive);
  const [modalContent, setModalContent] = useState(null);

  function toggleModal(action = null) {
    if (action === actions.close) {
      setModalActive(modalState.inactive);
      setModalContent(null);
    } else {
      if (action === actions.add) {
        setModalContent(<AddModal close={() => toggleModal(actions.close)} />);
      }

      setModalActive(modalState.active);
    }
  }

  return (
    <>
      <div className="App container is-flex is-justify-content-center">
        <BookmarkTable toggleModal={toggleModal} />
      </div>
      <div className={`modal ${modalActive}`}>
        <div className="modal-background"></div>
        <div className="modal-content">{modalContent}</div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => toggleModal(actions.close)}
        />
      </div>
    </>
  );
}

export default App;
