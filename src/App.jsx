import { useState, useEffect } from "react";
import BookmarkTable from "./components/BookmarkTable";
import Modal from "./components/Modal";
import { actions } from "./utils/constants";
import { fetchLinks } from "./utils/api";
import { handlePin, scrollToFolder } from "./utils/utils";

function App() {
  const [links, setLinks] = useState(null);
  const [folder, setFolder] = useState(null);
  const [modalActive, setModalActive] = useState(null);

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

      setModalActive(null);
    } else {
      setModalActive({ action: action, args: args });
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
      <Modal
        folder={folder}
        modalActive={modalActive}
        toggleModal={(args) => toggleModal(args)}
        updateLinks={updateLinks}
        fetchFolder={(args) => fetchFolder(args)}
      />
    </>
  );
}

export default App;
