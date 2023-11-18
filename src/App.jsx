import { useState, useEffect } from "react";
import BookmarkTable from "./components/BookmarkTable";
import AddModal from "./components/AddModal";
import DeleteModal from "./components/DeleteModal";
import { actions, modalState } from "./utils/constants";
import { fetchLinks } from "./utils/api";

function App() {
  const [links, setLinks] = useState(null);
  const [folder, setFolder] = useState(null);
  const [modalActive, setModalActive] = useState(modalState.inactive);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    updateLinks();
  }, []);

  async function updateLinks() {
    const data = await fetchLinks();
    if (data) {
      if (data.length > 0) setLinks(data);
      else setLinks(null);
    }
  }

  async function fetchFolder(args) {
    const data = await fetchLinks(args.id);

    if (data) {
      if (data.length > 0)
        setFolder({ id: args.id, name: args.name, data: data });
      else setFolder({ id: args.id, name: args.name, data: [] });
    }
  }

  function toggleModal(action = actions.close, args = {}) {
    if (action === actions.close) {
      if (folder && args?.folderId && folder.id === args.folderId) {
        setFolder(null);
      }

      setModalActive(modalState.inactive);
      setModalContent(null);
    } else {
      if (action === actions.add) {
        setModalContent(
          <AddModal
            args={args}
            close={() => toggleModal(actions.close)}
            updateLinks={async () => await updateLinks()}
            updateFolder={async (args) => await fetchFolder(args)}
          />
        );
      } else if (action === actions.delete) {
        setModalContent(
          <DeleteModal
            args={args}
            close={(args) => toggleModal(actions.close, args)}
            updateLinks={async () => await updateLinks()}
            updateFolder={async (args) => await fetchFolder(args)}
          />
        );
      }

      setModalActive(modalState.active);
    }
  }

  return (
    <>
      <div className="App container is-flex is-justify-content-center">
        <BookmarkTable
          toggleModal={toggleModal}
          links={links}
          folderClicked={(args) => fetchFolder(args)}
        />
        {!folder ? (
          <></>
        ) : (
          <BookmarkTable
            isFolder
            toggleModal={toggleModal}
            close={() => setFolder(null)}
            links={folder.data}
            name={folder.name}
            id={folder.id}
          />
        )}
      </div>
      <div className={`modal ${modalActive}`}>
        <div className="modal-background"></div>
        <div className="modal-content">{modalContent}</div>
        <button
          className="modal-close is-large is-light"
          aria-label="close"
          onClick={() => toggleModal(actions.close)}
        />
      </div>
    </>
  );
}

export default App;
