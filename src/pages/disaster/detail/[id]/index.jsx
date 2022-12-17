import React, {useMemo} from 'react';
import {Box, Grid, Tab, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {disasters} from "../../../../mock/disasters";
import {DataGrid} from "@mui/x-data-grid";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import PageHeader from "../../../../@core/components/page-header";

const DisasterDetailPage = () => {
  const router = useRouter();
  const {id} = router.query;
  const disaster = useMemo(() => disasters.find((disaster) => disaster.id === Number(id)), [id]);

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!disaster) {
    return null;
  }

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>{disaster.name}</Typography>}
      />
      <Grid item xs={12}>
        <TabContext value={value}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Master" value="1"/>
              <Tab label="Afet Bolgeleri" value="2"/>
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">
            <DataGrid columns={[]} rows={[]} autoHeight/>
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
};

export default DisasterDetailPage;
