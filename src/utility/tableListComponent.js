import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Table,
  Modal,
  Icon,
} from "semantic-ui-react";

function TableListComponent({list, header, bookDetailsHandler,deletebook, showActions}) {
  return (

    <Table celled padded>
      <Table.Header>
        <Table.Row>
                      {header.map((head) => (
                <Table.HeaderCell>{head}</Table.HeaderCell>
              ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {list && list.length > 0 ? (
          list.map((list) => (
            <Table.Row>
              {header.map((head) => (
                <Table.Cell>{list[head]}</Table.Cell>
              ))}
                {showActions && <Table.Cell singleLine>
                 <Button
                   primary
                     onClick={() => bookDetailsHandler(list, "view")}
                  >
                                                  <Icon name="eye" />

                 </Button>
                   <Button
                    primary
                     onClick={() => bookDetailsHandler(list, "edit")}
                  >
                              <Icon name="edit" />
                   </Button>
                   <Button color="red" onClick={()=> deletebook(list)}>
                   <Icon name="delete" />

                 </Button>
                 </Table.Cell>        }        
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
