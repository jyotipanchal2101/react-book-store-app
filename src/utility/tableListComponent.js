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

function TableListComponent({list, header, bookDetailsHandler,deletebook, showActions, goToUserDetails, showUserAction, showStatus, updateStatus}) {
  return (

    <Table celled padded>
      <Table.Header>
        <Table.Row>
                      {header.map((head) => (
                <Table.HeaderCell>{head}</Table.HeaderCell>
              ))}
          {showActions &&  <Table.HeaderCell>action</Table.HeaderCell>}
          {showUserAction &&  <Table.HeaderCell>action</Table.HeaderCell>}
          {showStatus &&  <Table.HeaderCell>status</Table.HeaderCell>}

        </Table.Row>
      </Table.Header>

      <Table.Body>
        {list && list.length > 0 ? (
          list.map((list) => (
            <Table.Row>
              {header.map((head) => (
                <>    
                <Table.Cell>{list[head]}</Table.Cell>   
                </>
              )  
              )}    

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
                 {showUserAction && <Table.Cell singleLine>
                 <Button primary onClick={() => goToUserDetails(list)}>  <Icon name="eye" />View Details</Button>
                 </Table.Cell>        }  
           
                  {showStatus && <Table.Cell singleLine>{ list.status === "completed" ? "COMPLETED" : <Button primary onClick={() => updateStatus(list)}> Pending</Button> } </Table.Cell>  }

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
