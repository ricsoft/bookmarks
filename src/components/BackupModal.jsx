import { useRef } from "react";
import { fetchLinks } from "../utils/api";
import { actions } from "../utils/constants";
import { sendData } from "../utils/api";

export default function BackupModal(props) {
  const fileRef = useRef(null);

  async function backup() {
    let data = await fetchLinks(actions.backup);
    data = JSON.stringify(data);
    const file = new Blob([data], { type: "text/plain" });

    let date = new Date();
    date = date.toLocaleDateString("de-DE").replaceAll(".", "");

    const temp = document.createElement("a");
    temp.href = URL.createObjectURL(file);
    temp.download = `bookmarksbackup${date}.txt`;
    temp.click();
    URL.revokeObjectURL(temp.href);

    props.close();
  }

  async function restore() {
    const reader = new FileReader();
    const file = fileRef?.current?.files[0];

    if (!file) {
      alert("File Required");
      return;
    }

    reader.addEventListener(
      "load",
      async () => {
        await sendData({ data: reader.result, action: actions.restore });
        await props.updateLinks();
        props.close(actions.close, { updateLinks: true });
      },
      false
    );

    reader.readAsText(file);
  }

  return (
    <div className="box" style={{ margin: "auto", maxWidth: "300px" }}>
      <div>
        <button className="button is-success" onClick={backup}>
          Backup
        </button>
        <hr className="my-5" />
        <input type="file" ref={fileRef} accept=".txt" />
        <br />
        <button className="my-3 button is-success is-small" onClick={restore}>
          Restore
        </button>
      </div>
      <div className="mt-3 is-flex is-justify-content-flex-end">
        <button
          className="button is-danger is-small is-light"
          onClick={() => props.close()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
