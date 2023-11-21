import { useRef } from "react";
import { sendData } from "../utils/api";
import { actions } from "../utils/constants";

export default function EditModal(props) {
  const orderRef = useRef(null);
  const nameRef = useRef(null);
  const linkRef = useRef(null);
  let originalOrder = props.args.index;

  async function edit() {
    let order = orderRef?.current.value;
    const name = nameRef.current.value;
    const link = linkRef?.current?.value;
    const fromFolder = props.args?.fromFolder;

    if (order === "" || name === "" || (!props.args?.isFolder && link === "")) {
      alert("Input Required");
      return;
    }

    order = parseInt(orderRef?.current.value) - 1;
    if (isNaN(order) || order < 0 || order > props.args.maxLength - 1) {
      alert("Order Out of Bounds");
      return;
    }

    let data = { uid: props.args.uid, name: name, action: actions.edit };
    props.args?.isFolder ? (data.isFolder = true) : (data.link = link);
    if (fromFolder) data.fromFolder = fromFolder;

    if (originalOrder !== order) {
      data.orderChanged = [originalOrder, order];
    }

    await sendData(data);

    if (fromFolder) {
      await props.updateFolder({
        id: fromFolder,
        name: props.openedFolder.name,
      });
    } else if (props?.openedFolder?.id === props.args.link) {
      await props.updateFolder({ id: props.args.link, name: data.name });
      await props.updateLinks();
    } else {
      await props.updateLinks();
    }

    props.close();
  }

  return (
    <div className="box" style={{ margin: "auto", maxWidth: "300px" }}>
      <div className="field">
        <input
          className="input"
          ref={orderRef}
          type="text"
          defaultValue={props.args.index + 1}
        />
      </div>

      <div className="field">
        <input
          className="input"
          ref={nameRef}
          type="text"
          defaultValue={props.args.name}
        />
      </div>

      {props?.args?.isFolder ? (
        <></>
      ) : (
        <div className="field">
          <input
            className="input"
            ref={linkRef}
            type="text"
            defaultValue={props.args.link}
          />
        </div>
      )}

      <div className="is-flex is-justify-content-flex-end">
        <button
          className="button is-danger is-small is-light"
          onClick={() => props.close()}
        >
          Cancel
        </button>
        <button
          className="ml-3 button is-success is-small is-light"
          onClick={edit}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
