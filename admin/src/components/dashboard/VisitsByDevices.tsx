import { Pie } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';

const VisitsByDevices = (props: any) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 4,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Desktop', 'Tablet', 'Mobile']
  };

  const options: any = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Desktop',
      value: 63,
      icon: LaptopMacIcon,
      color: '#3F51B5'
    },
    {
      title: 'Tablet',
      value: 15,
      icon: TabletIcon,
      color: '#E53935'
    },
    {
      title: 'Mobile',
      value: 23,
      icon: PhoneIcon,
      color: '#FB8C00'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Traffic Stats" style={{paddingBottom: '16px'}}/>
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 260,
            position: 'relative'
          }}
        >
          <Pie
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography style={{ color }}>{value}%</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default VisitsByDevices;