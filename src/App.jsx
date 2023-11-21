import { useState, useEffect } from "react";
import BookmarkTable from "./components/BookmarkTable";
import AddModal from "./components/AddModal";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";
import BackupModal from "./components/BackupModal";
import { actions, modalState } from "./utils/constants";
import { fetchLinks } from "./utils/api";
import { handlePin, scrollToFolder } from "./utils/utils";

function App() {
  const [links, setLinks] = useState(null);
  const [folder, setFolder] = useState(null);
  const [modalActive, setModalActive] = useState(modalState.inactive);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    handlePin();
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
            close={toggleModal}
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
      } else if (action === actions.edit) {
        setModalContent(
          <EditModal
            args={args}
            close={toggleModal}
            updateLinks={async () => await updateLinks()}
            updateFolder={async (args) => await fetchFolder(args)}
            openedFolder={folder}
          />
        );
      } else if (action === actions.backup) {
        setModalContent(
          <BackupModal
            close={toggleModal}
            updateLinks={async () => await updateLinks()}
          />
        );
      }
      setModalActive(modalState.active);
    }
  }

  return (
    <>
      <div className="App container is-flex is-flex-wrap-wrap is-justify-content-center">
        <BookmarkTable
          toggleModal={toggleModal}
          links={links}
          folderClicked={async (args) => {
            await fetchFolder(args);
            setTimeout(scrollToFolder, 0);
          }}
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
          onClick={() => toggleModal()}
        />
      </div>
    </>
  );
}

export default App;
