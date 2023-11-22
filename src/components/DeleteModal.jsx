import { sendData } from "../utils/api";
import { actions } from "../utils/constants";

export default function DeleteModal(props) {
  async function del() {
    const data = {
      uid: props.args.link.uid,
      action: actions.delete,
    };
    if (props?.args?.fromFolder) {
      data.fromFolder = props.args.fromFolder;
      await sendData(data);
      await props.updateFolder({ id: props.args.fromFolder });
    } else {
      await sendData(data);
      await props.updateLinks();
    }

    let args = {};
    if (props?.args?.link?.isFolder) {
      args.folderId = props.args.link.link;
    }

    props.close(args);
  }

  return (
    <div className="box" style={{ margin: "auto", maxWidth: "300px" }}>
      <p className="my-5">Delete {props.args.link.name}</p>
      <div className="is-flex is-justify-content-flex-end">
        <button
          className="button is-danger is-small is-light"
          onClick={() => props.close()}
        >
          Cancel
        </button>
        <button
          className="ml-3 button is-success is-small is-light"
          onClick={del}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
