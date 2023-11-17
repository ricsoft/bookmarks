import { useState, useEffect } from "react";
import BookmarkTable from "./components/BookmarkTable";
import AddModal from "./components/AddModal";
import DeleteModal from "./components/DeleteModal";
import { actions, modalState } from "./utils/constants";
import { fetchLinks } from "./utils/api";

function App() {
  const [links, setLinks] = useState(null);
  const [modalActive, setModalActive] = useState(modalState.inactive);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    updateLinks();
  }, []);

  async function updateLinks() {
    const data = await fetchLinks();
    if (data && data.length > 0) setLinks(data);
  }

  function toggleModal(action = actions.close, args = {}) {
    if (action === actions.close) {
      setModalActive(modalState.inactive);
      setModalContent(null);
    } else {
      if (action === actions.add) {
        setModalContent(
          <AddModal
            close={() => toggleModal(actions.close)}
            update={async () => await updateLinks()}
          />
        );
      } else if (action === actions.delete) {
        setModalContent(
          <DeleteModal
            args={args}
            close={() => toggleModal(actions.close)}
            update={async () => await updateLinks()}
          />
        );
      }

      setModalActive(modalState.active);
    }
  }

  return (
    <>
      <div className="App container is-flex is-justify-content-center">
        <BookmarkTable toggleModal={toggleModal} links={links} />
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
