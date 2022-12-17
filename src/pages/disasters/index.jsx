import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {Card, CardHeader, IconButton, Stack} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import generateClient from "../../utils/axiosClient";
import Link from "next/link";
import {Delete, Eye, Pencil, Plus} from "mdi-material-ui";
import DisasterFormDrawer from "../../views/pages/disaster/DisasterFormDrawer";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import toast from "react-hot-toast";

const client = generateClient();

const DisastersPage = () => {
  const [disasters, setDisasters] = React.useState([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedDisaster, setSelectedDisaster] = React.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteDisasterId, setDeleteDisasterId] = React.useState(null);

  const fetchDisasters = async () => {
    client.get("/disasters", {
      params: {
        sort: ['updatedAt:desc']
      }
    }).then((response) => {
      setDisasters(response.data.data);
    });
  }

  const editClick = (disaster) => {
    setSelectedDisaster(disaster);
    setDrawerOpen(true);
  }

  const deleteClick = (disaster) => {
    setDeleteDisasterId(disaster.id);
    setDeleteDialogOpen(true);
  }

  const handleDelete = async () => {
    await client.delete(`/disasters/${deleteDisasterId}`);
    toast.success('Disaster deleted successfully');
    setDeleteDialogOpen(false);
    await fetchDisasters();
  }
  useEffect(() => {
    (async () => {
      await fetchDisasters()
    })();
  }, []);
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Disasters"
            action={<IconButton color="primary" onClick={() => setDrawerOpen(true)}><Plus/></IconButton>}
          />
          <DataGrid
            autoHeight
            columns={[
              {field: 'id', headerName: 'ID', width: 70},
              {field: 'name', headerName: 'Name', flex: 1, valueGetter: (params) => params.row.attributes.name},
              {
                field: 'actions',
                headerName: 'Actions',
                align: 'center',
                headerAlign: 'center',
                width: 150,
                renderCell: (params) => {
                  return (
                    <Stack direction="row" spacing={1}>
                      <Link href={`/disasters/${params.row.id}`}>
                        <IconButton>
                          <Eye/>
                        </IconButton>
                      </Link>
                      <IconButton onClick={() => editClick(params.row)}>
                        <Pencil/>
                      </IconButton>
                      <IconButton onClick={() => deleteClick(params.row)}>
                        <Delete/>
                      </IconButton>
                    </Stack>
                  )
                }
              }
            ]}
            rows={disasters}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Card>
      </Grid>

      <DisasterFormDrawer
        open={drawerOpen}
        toggle={() => setDrawerOpen(!drawerOpen)}
        selectedDisaster={selectedDisaster}
        submitListener={async () => {
          await fetchDisasters()
        }}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(!deleteDialogOpen)}
        handleConfirm={() => handleDelete()}
      />
    </Grid>
  );
};

export default DisastersPage;
