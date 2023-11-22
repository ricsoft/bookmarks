import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import BackupModal from "./BackupModal";
import { useState, useEffect } from "react";
import { actions } from "../utils/constants";

export default function Modal(props) {
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    if (!props.modalActive) return;

    if (props.modalActive.action === actions.add) {
      setModalContent(
        <AddModal
          args={props.modalActive.args}
          close={props.toggleModal}
          updateLinks={async () => await props.updateLinks()}
          updateFolder={async (args) => await props.fetchFolder(args)}
        />
      );
    } else if (props.modalActive.action === actions.delete) {
      setModalContent(
        <DeleteModal
          args={props.modalActive.args}
          close={(args) => props.toggleModal(actions.close, args)}
          updateLinks={async () => await props.updateLinks()}
          updateFolder={async (args) => await props.fetchFolder(args)}
        />
      );
    } else if (props.modalActive.action === actions.edit) {
      setModalContent(
        <EditModal
          args={props.modalActive.args}
          close={props.toggleModal}
          updateLinks={async () => await props.updateLinks()}
          updateFolder={async (args) => await props.fetchFolder(args)}
          openedFolder={props.folder}
        />
      );
    } else if (props.modalActive.action === actions.backup) {
      setModalContent(
        <BackupModal
          close={props.toggleModal}
          updateLinks={async () => await props.updateLinks()}
        />
      );
    }
  }, [props.modalActive]);

  return (
    <div className={`modal ${props.modalActive ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-content">{modalContent}</div>
      <button
        className="modal-close is-large is-light"
        aria-label="close"
        onClick={props.toggleModal}
      />
    </div>
  );
}
