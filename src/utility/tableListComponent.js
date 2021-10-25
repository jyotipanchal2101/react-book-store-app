import React from "react";
import { Table } from "semantic-ui-react";

function TableListComponent({ list, header, actions, showStatus }) {
  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          {header.map((head) => (
            <Table.HeaderCell>{head.toUpperCase()}</Table.HeaderCell>
          ))}
          {actions && (
            <Table.HeaderCell>{showStatus ? "status".toUpperCase(): "action".toUpperCase()}</Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {list && list.length > 0 ? (
          list.map((list) => (
            <Table.Row>
              {header.map((head) => (
                  <Table.Cell>{list[head]}</Table.Cell>
              ))}
              {actions && !showStatus && (
                <Table.Cell singleLine>{actions(list)}</Table.Cell>
              )}
              {showStatus && <Table.Cell singleLine>
              {list.status === "completed" ? "COMPLETED" : actions(list)}
            </Table.Cell>}
            </Table.Row>
          ))
        ) : (
          <Table.Row>Records not found</Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}

export default TableListComponent;
