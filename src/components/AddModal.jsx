import { useRef } from "react";
import { sendData } from "../utils/api";
import { methods } from "../utils/constants";

export default function AddModal(props) {
  const nameRef = useRef(null);
  const linkRef = useRef(null);

  async function add() {
    if (
      props?.args?.folderId &&
      (!nameRef.current.value || !linkRef.current.value)
    ) {
      alert("Name and Link Required");
      return;
    }

    if (!nameRef.current.value) {
      alert("Name Required");
      return;
    }

    await sendData({
      name: nameRef.current.value,
      link: linkRef.current.value,
      method: methods.create,
      folderId: props?.args.folderId || "",
    });

    if (props?.args?.folderId) {
      await props.updateFolder({ id: props.args.folderId });
    } else {
      await props.updateLinks();
    }

    props.close();
  }

  return (
    <div className="box" style={{ margin: "auto", maxWidth: "400px" }}>
      <div className="field">
        <input className="input" ref={nameRef} type="text" placeholder="Name" />
      </div>

      <div className="field">
        <input className="input" ref={linkRef} type="text" placeholder="Link" />
      </div>

      <div className="is-flex is-justify-content-flex-end">
        <button
          className="button is-danger is-small is-light"
          onClick={() => props.close()}
        >
          Cancel
        </button>
        <button
          className="ml-3 button is-success is-small is-light"
          onClick={add}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
