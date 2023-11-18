import { actions } from "../utils/constants";

export default function BookmarkTable(props) {
  function handleAdd() {
    const args = {};
    if (props.isFolder) args.folderId = props.id;
    props.toggleModal(actions.add, args);
  }

  function handleDelete(link) {
    if (props?.isFolder) {
      props.toggleModal(actions.delete, { fromFolder: props.id, link: link });
    } else {
      props.toggleModal(actions.delete, { link: link });
    }
  }

  return (
    <div
      className="m-3 has-background-white"
      style={{ width: "100%", maxWidth: "475px" }}
    >
      <table className="table is-fullwidth is-striped">
        <tbody>
          <tr>
            <td className="is-flex is-justify-content-space-between">
              {props.isFolder ? (
                <button
                  className="button is-danger is-small is-light"
                  onClick={props.close}
                >
                  Close
                </button>
              ) : (
                <button
                  className="button is-info is-small is-light"
                  onClick={() => props.toggleModal(actions.backup)}
                >
                  Backup
                </button>
              )}
              {props.isFolder ? (
                <p className="has-text-weight-semibold">{props.name}</p>
              ) : (
                <></>
              )}
              <button
                className="button is-success is-small is-light"
                onClick={handleAdd}
              >
                Add
              </button>
            </td>
          </tr>
          {props.links &&
            props.links.map((link, index) => (
              <tr key={index}>
                <td className="is-flex is-justify-content-space-between">
                  <div className="is-flex is-align-items-baseline">
                    <p className="mr-3 is-size-7" style={{ opacity: "0.65" }}>
                      {index + 1}.
                    </p>
                    {link.isFolder ? (
                      <p
                        className="is-clickable has-text-weight-semibold"
                        onClick={() =>
                          props.folderClicked({
                            name: link.name,
                            id: link.link,
                          })
                        }
                      >
                        {link.name}
                      </p>
                    ) : (
                      <a href={link.link} target="_blank" rel="noreferrer">
                        {link.name}
                      </a>
                    )}
                  </div>
                  <div>
                    <button
                      className="mr-2 button is-warning is-small is-light"
                      onClick={() => props.toggleModal(actions.edit)}
                    >
                      Edit
                    </button>
                    <button
                      className="button is-danger is-small is-light"
                      onClick={() => handleDelete(link)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
