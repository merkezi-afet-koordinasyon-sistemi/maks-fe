import React from 'react';
import {Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, styled, Typography} from "@mui/material";
import {DotsVertical} from "mdi-material-ui";
import {Timeline as MuiTimeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";

const items = [
  {
    id: '1',
    title: 'Create a new project for client 😎',
    date: 'April, 18',
    description: 'Invoices have been paid to the company.',
    avatar: '/images/avatars/1.png',
    name: 'John Doe (Client)',
    color: 'primary'
  },
];

const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})
const AnnouncementsPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Duyurular'
            action={
              <IconButton size='small' aria-label='settings' className='card-more-options'>
                <DotsVertical />
              </IconButton>
            }
          />
          <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
            <Timeline sx={{ my: 0, py: 0 }}>
              {items.map(item => (
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color={item.color} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2)} !important` }}>
                    <Box
                      sx={{
                        mb: 3,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography sx={{ mr: 2, fontWeight: 600 }}>{item.title}</Typography>
                      <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                        {item.date}
                      </Typography>
                    </Box>
                    <Typography variant='body2' sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={item.avatar} sx={{ mr: 2.5, width: 24, height: 24 }} />
                      <Typography variant='body2' sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {item.name}
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

AnnouncementsPage.guestGuard = false
AnnouncementsPage.authGuard = false
export default AnnouncementsPage;
