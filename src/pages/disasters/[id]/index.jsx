import React from 'react';
import {useRouter} from "next/router";
import generateClient from "../../../utils/axiosClient";
import Spinner from "../../../@core/components/spinner";
import {Card, Grid, IconButton} from "@mui/material";
import PageHeader from "../../../@core/components/page-header";
import CardHeader from "@mui/material/CardHeader";
import {Pencil} from "mdi-material-ui";
import {DataGrid} from "@mui/x-data-grid";

const client = generateClient();
const DisasterDetailPage = () => {
  const router = useRouter();
  const {id} = router.query;

  const [disaster, setDisaster] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      client.get(`/disasters/${id}`, {
        params: {
          populate: ['disasterAreas.district.city',]
        }
      }).then((res) => {
        setDisaster(res.data.data);
      });
    }
  }, [id]);

  if (!disaster) {
    return <Spinner/>;
  }

  return (
    <Grid container spacing={3}>
      <PageHeader title={disaster.attributes.name}/>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Disaster Areas"/>
          <DataGrid
            columns={[
              {
                field: 'id',
                headerName: 'ID',
                width: 70
              },
              {
                field: 'cityAndDistrict',
                headerName: 'Il / Ilce',
                flex: 1,
                valueGetter: (params) => {
                  const { district } = params.row.attributes;
                  const { city } = district.data.attributes;
                  return `${district.data.attributes.name} / ${city.data.attributes.name}`;
                }
              },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 100,
                renderCell: () => {
                  return (
                    <IconButton>
                      <Pencil />
                    </IconButton>
                  )
                }
              }
            ]}
            rows={disaster.attributes.disasterAreas.data}
            autoHeight
            rowsPerPageOptions={[7, 10, 20]}
            pageSize={7}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default DisasterDetailPage;
