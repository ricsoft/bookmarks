import { actions } from "../utils/constants";

export default function BookmarkTable(props) {
  function handleClick() {}

  return (
    <div
      className="mx-3 has-background-white"
      style={{ width: "100%", maxWidth: "500px" }}
    >
      <table className="table is-fullwidth is-striped">
        <tbody>
          <tr>
            <td className="is-flex is-justify-content-space-between">
              <button
                className="button is-info is-small"
                onClick={() => props.toggleModal(actions.backup)}
              >
                Backup
              </button>
              <button
                className="button is-success is-small"
                onClick={() => props.toggleModal(actions.add)}
              >
                Add
              </button>
            </td>
          </tr>
          {props.links &&
            props.links.map((link, index) => (
              <tr key={link.uid}>
                <td className="is-flex is-justify-content-space-between">
                  <div className="is-flex is-align-items-baseline">
                    <p className="mr-3 is-size-7" style={{ opacity: "0.65" }}>
                      {index + 1}.
                    </p>
                    {link.isFolder ? (
                      <p onClick={handleClick}>{link.name}</p>
                    ) : (
                      <a href={link.link} target="_blank" rel="noreferrer">
                        {link.name}
                      </a>
                    )}
                  </div>
                  <div>
                    <button
                      className="mr-2 button is-warning is-small"
                      onClick={() => props.toggleModal(actions.edit)}
                    >
                      Edit
                    </button>
                    <button
                      className="button is-danger is-small"
                      onClick={() => props.toggleModal(actions.delete, link)}
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
