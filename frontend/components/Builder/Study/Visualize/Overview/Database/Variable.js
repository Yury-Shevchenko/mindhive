import { Dropdown, DropdownMenu, DropdownItem } from "semantic-ui-react";

export default function Variable({ column, onVariableChange }) {
  const onRename = ({ variable }) => {
    const newName = prompt("Please enter new name:");
    if (newName && newName !== "") {
      onVariableChange({
        variable,
        property: "displayName",
        value: newName,
      });
    }
  };

  const onDelete = ({ variable }) => {
    onVariableChange({
      variable,
      property: "isDeleted",
      value: true,
    });
  };

  return (
    <div className={column?.hide ? `hidden variable` : `variable`}>
      <div
        className="name"
        onClick={() =>
          onVariableChange({
            variable: column?.field,
            property: "hide",
            value: !column?.hide,
          })
        }
      >
        <img src={`/assets/icons/visualize/tag.svg`} />
        <label for={column?.field}>
          {column?.displayName || column?.field}
        </label>
      </div>
      {!column?.hide && (
        <div className="icons">
          <div
            className="visibilityIcon"
            onClick={() =>
              onVariableChange({
                variable: column?.field,
                property: "hide",
                value: !column?.hide,
              })
            }
          >
            <img src={`/assets/icons/visualize/visibility.svg`} />
          </div>

          <div>
            <Dropdown
              icon={<img src={`/assets/icons/visualize/more_vert.svg`} />}
              direction="left"
            >
              <DropdownMenu>
                <DropdownItem
                  onClick={() =>
                    onVariableChange({
                      variable: column?.field,
                      property: "hide",
                      value: !column?.hide,
                    })
                  }
                >
                  <div className="menuItem">
                    <img src={`/assets/icons/visualize/visibility.svg`} />
                    <div>Toggle in workspace</div>
                  </div>
                </DropdownItem>

                <DropdownItem
                  onClick={() => onRename({ variable: column?.field })}
                >
                  <div className="menuItem">
                    <img src={`/assets/icons/visualize/edit.svg`} />
                    <div>Rename</div>
                  </div>
                </DropdownItem>

                <DropdownItem
                  onClick={() =>
                    onDelete({
                      variable: column?.field,
                    })
                  }
                >
                  <div className="menuItem">
                    <img src={`/assets/icons/visualize/delete.svg`} />
                    <div>Delete</div>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      )}
    </div>
  );
}
