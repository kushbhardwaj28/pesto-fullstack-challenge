import React, { useCallback, useEffect } from 'react';
import { IUser } from '../../interfaces/user';
import axios from 'axios';
import { baseAPI, getAllTask } from '../../constants';
import { ITask } from '../../interfaces/task';
import {
  ButtonGroup,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from '@mui/material';
import { getColor } from '../../utils/utils';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import TableRowsIcon from '@mui/icons-material/TableRows';

interface UserProps {
  user: IUser;
}

export default function Tasks(props: UserProps) {
  const { user } = props;
  const [isLoading, setLoading] = React.useState(true);
  const [tasks, setTask] = React.useState<Array<ITask>>([]);
  const [isGrid, toggleGrid] = React.useState<boolean>(true);

  const getTasks = useCallback(async () => {
    if (isLoading) {
      const user = await axios.get(baseAPI + getAllTask, {
        withCredentials: true,
      });
      setTask(user.data);
      setLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (tasks.length === 0) {
      getTasks();
    }
  }, [getTasks, tasks.length]);

  const getChip = (task: ITask) => {
    const color = getColor(task.status);
    return <Chip label={task.status} color={color} />;
  };

  const gridView = () => {
    return (
      <Grid container spacing={4}>
        {tasks.map((task) => {
          return (
            <Grid key={task._id} item xs={12} md={6} lg={4}>
              <Card sx={{ p: 4, height: 150 }}>
                <Typography
                  sx={{ fontSize: 16, fontWeight: 'bold' }}
                  color="text.secondary"
                  gutterBottom
                >
                  {task.title}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {task.description ? task.description : '-'}
                </Typography>
                {getChip(task)}
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#9966ff',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const tableView = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Task</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <StyledTableRow
                key={task._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {task.title}
                </TableCell>
                <TableCell align="left">{task.description}</TableCell>
                <TableCell align="center">{getChip(task)}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Container>
      <React.Fragment>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1>Welcome, {user.name}</h1>
          <ButtonGroup
            disableElevation
            variant="outlined"
            aria-label="outlined primary view-toggle"
          >
            <IconButton aria-label="grid-view" onClick={() => toggleGrid(true)}>
              <CalendarViewMonthIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton
              aria-label="table-view"
              onClick={() => toggleGrid(false)}
            >
              <TableRowsIcon />
            </IconButton>
          </ButtonGroup>
          {/* <Button onClick={() => toggleGrid(!isGrid)}>Toggle</Button> */}
        </Container>
        {isGrid ? gridView() : tableView()}
      </React.Fragment>
    </Container>
  );
}
