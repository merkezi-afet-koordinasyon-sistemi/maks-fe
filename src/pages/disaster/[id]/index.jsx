import React, {useEffect, useMemo} from 'react';
import {Card, CardHeader, Grid, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import generateClient from "../../../utils/axiosClient";
import {useRouter} from "next/router";
import Spinner from "../../../@core/components/spinner";
import {DataGrid} from "@mui/x-data-grid";

const client = generateClient()
const DisasterDetail = () => {
  const router = useRouter();
  const {id} = router.query;
  const [value, setValue] = React.useState(0);
  const [disaster, setDisaster] = React.useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const fetchDisaster = async () => {
    const response = await client.get(`/disasters/${id}`, {
      params: {
        populate: [
          'disasterAreas.district',
          'disasterAreas.disasterAreaMaterials.material',
          'disasterAreas.requestedVolunteers.competences',
        ]
      }
    })
    setDisaster(response.data.data)
  }

  useEffect(() => {
    (async () => {
      await fetchDisaster()
    })();
  }, [id])

  if (!disaster) {
    return <Spinner/>
  }

  return (
    <TabContext value={value}>
      <TabList variant='fullWidth' onChange={handleChange} aria-label='full width tabs example'>
        {disaster.attributes.disasterAreas.data.map((item, index) => (
          <Tab value={index} label={item.attributes.district.data.attributes.name}/>
        ))}
      </TabList>
      {disaster.attributes.disasterAreas.data.map((item, index) => (
        <TabPanel value={index}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Card>
                <CardHeader title="Erzaklar"/>
                <DataGrid
                  sx={{
                    '& .MuiDataGrid-columnHeaders': {
                      borderRadius: '0px',
                    }
                  }}
                  columns={[
                    {field: 'id', headerName: 'ID', width: 70},
                    {
                      field: 'name',
                      headerName: 'Urun',
                      flex: 1,
                      valueGetter: (params) => params.row.attributes.material.data.attributes.name
                    },
                    {
                      field: 'quantity',
                      headerName: 'Gelen/Toplam',
                      flex: 1,
                      renderCell: (params) => {
                        return `%${params.row.attributes.quantity}`
                      }
                    },
                  ]}
                  rows={item.attributes.disasterAreaMaterials.data}
                  pageSize={7}
                  rowsPerPageOptions={[7, 10, 20]}
                  autoHeight
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardHeader title="Gonulluler"/>
                <DataGrid
                  sx={{
                    '& .MuiDataGrid-columnHeaders': {
                      borderRadius: '0px',
                    }
                  }}
                  columns={[
                    {
                      field: 'id',
                      headerName: 'ID',
                      width: 70
                    },
                    {
                      field: 'quantity',
                      headerName: 'Sayi',
                      width: 100,
                      valueGetter: (params) => params.row.attributes.quantity,
                      align: 'center',
                      headerAlign: 'center'
                    },
                    {
                      field: 'competences',
                      headerName: 'Yetenekler',
                      flex: 1,
                      valueGetter: (params) => params.row.attributes.competences.data.map(item => item.attributes.name).join(', '),
                    }
                  ]}
                  rows={item.attributes.requestedVolunteers.data}
                  autoHeight
                  pageSize={7}
                  rowsPerPageOptions={[7, 10, 20]}
                />
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      ))}
    </TabContext>
  );
};

DisasterDetail.guestGuard = false;
DisasterDetail.authGuard = false;

export default DisasterDetail;
