import { sendData } from "../utils/api";
import { methods } from "../utils/constants";

export default function DeleteModal(props) {
  async function del() {
    await sendData({
      uid: props.args.uid,
      method: methods.delete,
    });

    await props.update();
    props.close();
  }

  return (
    <div className="box" style={{ margin: "auto", maxWidth: "300px" }}>
      <p className="my-5">Delete {props.args.name}</p>
      <div className="is-flex is-justify-content-flex-end">
        <button
          className="button is-danger is-small"
          onClick={() => props.close()}
        >
          Cancel
        </button>
        <button className="ml-3 button is-success is-small" onClick={del}>
          Ok
        </button>
      </div>
    </div>
  );
}
