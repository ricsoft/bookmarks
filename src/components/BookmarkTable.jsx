import { actions } from "../utils/constants"

export default function BookmarkTable(props) {
  return (
    <div className="mx-3 has-background-white" style={{ width: "500px" }}>
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
          <tr>
            <td>Stuff</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
