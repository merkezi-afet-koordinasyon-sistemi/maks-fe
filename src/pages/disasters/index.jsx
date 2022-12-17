import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {Card, CardHeader, IconButton} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import generateClient from "../../utils/axiosClient";
import Link from "next/link";
import {Eye} from "mdi-material-ui";

const client = generateClient();

const DisastersPage = () => {
  const [disasters, setDisasters] = React.useState([]);

  useEffect(() => {
    client.get("/disasters").then((response) => {
      console.log(response.data.data);
      setDisasters(response.data.data);
    });
  }, []);
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Disasters"/>
          <DataGrid
            autoHeight
            columns={[
              {field: 'id', headerName: 'ID', width: 70},
              {field: 'name', headerName: 'Name', flex: 1, valueGetter: (params) => params.row.attributes.name},
              {
                field: 'actions',
                headerName: 'Actions',
                width: 100,
                renderCell: (params) => {
                  return <Link href={`/disasters/${params.row.id}`}>
                    <IconButton>
                      <Eye/>
                    </IconButton>
                  </Link>
                }
              }
            ]}
            rows={disasters}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default DisastersPage;
