import { Box, Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { SubdirectoryArrowRight } from '@mui/icons-material';

const frameworks = {
  title: 'Frameworks used',
  list: [
    'Nest',
    'Node.js',
    'React.js'
  ]
};

const programming = {
  title: 'Knowledge of programming languages',
  list: [
    'C++',
    'CSS',
    'Html',
    'Java',
    'JavaScript',
    'PHP',
    'Python'
  ]
};

const links = {
  title: 'Useful links',
  list: [
    {
      name: 'Timesheet (Табель учета рабочего времени)',
      path: 'https://docs.google.com/spreadsheets/d/1wdfyoOuGd3dmAnepfHkOxXx5QnksQOFd/edit?usp=sharing&ouid=100295123914234906588&rtpof=true&sd=true'
    },
    {
      name: 'The JavaScript language',
      path: 'https://javascript.info/js'
    },
    {
      name: 'Git Tutorial',
      path: 'https://www.w3schools.com/git/default.asp'
    },
    {
      name: 'React',
      path: 'https://legacy.reactjs.org/'
    },
    {
      name: 'Redux ',
      path: 'https://redux.js.org/'
    },
    {
      name: 'Airbnb JavaScript Style Guide() {',
      path: 'https://github.com/airbnb/javascript/blob/master/README.md'
    },
    {
      name: 'Developer Roadmaps ',
      path: 'https://roadmap.sh/'
    },
  ]
};

export default function Notes({ theme }) {
  return (
    <Box flex={4} p={2} minHeight={'calc(100vh - 97px)'}>
      <Typography variant='h6'>
        {'Here will be my notes, records, comments, links...'}
      </Typography>

      {/*  Frameworks used  */}
      <Card variant={'outlined'} color={'neutral'} sx={{ padding: 2, marginTop: 2 }}>
        <ListItemText primary={frameworks.title} />
        <ul>
          {frameworks.list.map((item, index) => (
            <li key={index}>
              <ListItemText primary={item} />
            </li>
          ))}
        </ul>
      </Card>

      {/*  Knowledge of programming languages  */}
      <Card variant={'outlined'} color={'neutral'} sx={{ padding: 2, marginTop: 2 }}>
        <ListItemText primary={programming.title} />
        <ul>
          {programming.list.map((item, index) => (
            <li key={index}>
              <ListItemText primary={item} sx={{ color: theme.palette.text.primary }}/>
            </li>
          ))}
        </ul>
      </Card>

      {/*  Useful links  */}
      <Card variant={'outlined'} color={'neutral'} sx={{ padding: 2, marginTop: 2 }}>
        <ListItemText primary={links.title} />
        <List sx={{ padding: 0 }}>
          {links.list.map(({ name, path }, index) => (
            <ListItem key={index} sx={{ padding: 0 }}>
              <ListItemButton component='a' href={path} target='_blank' sx={{ padding:0 }}>
                <SubdirectoryArrowRight sx={{ marginLeft: '15px', marginRight: '10px' }}/>
                <ListItemText primary={name} sx={{ color: theme.palette.text.primary }}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Card>

    </Box>
  );
}