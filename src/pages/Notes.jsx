import { Box, Card, ListItemButton, ListItemText, Typography } from '@mui/material';

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
      name: 'Airbnb JavaScript Style Guide() {',
      path: 'https://github.com/airbnb/javascript/blob/master/README.md'
    },
  ]
};

export default function Notes({ theme }) {
  return (
    <Box flex={4} p={2} height={'calc(100vh - 97px)'}>
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
        <ul>
          {links.list.map(({ name, path }, index) => (
            <li key={index}>
              <ListItemButton component='a' href={path} target='_blank'>
                <ListItemText primary={name} sx={{ color: theme.palette.text.primary }}/>
              </ListItemButton>
            </li>
          ))}
        </ul>
      </Card>

    </Box>
  );
}