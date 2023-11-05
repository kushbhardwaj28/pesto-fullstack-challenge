import React, { useCallback, useEffect } from 'react';
import { IUser } from '../../interfaces/user';
import axios from 'axios';
import { baseAPI, getAllTask } from '../../constants';
import { ITask } from '../../interfaces/task';
import { Card, Chip, Grid, Typography } from '@mui/material';

interface UserProps {
  user: IUser;
}

export default function Tasks(props: UserProps) {
  const { user } = props;
  const [isLoading, setLoading] = React.useState(true);
  const [tasks, setTask] = React.useState<Array<ITask>>([]);

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
  }, [getTasks]);

  const getColor = (status?: string) => {
    let color: 'default' | 'warning' | 'info' | 'success' = 'default';
    switch (status) {
      case 'To Do':
        color = 'warning';
        break;
      case 'In Progress':
        color = 'info';
        break;
      case 'Done':
        color = 'success';
        break;
    }
    console.log(color);
    return color;
  };

  const getChip = (task: ITask) => {
    console.log(task.status);
    const color = getColor(task.status);
    return <Chip label={task.status} color={color} />;
  };

  return (
    <React.Fragment>
      <h1>Welcome, {user.name}</h1>
      <Grid container spacing={4}>
        {tasks.map((task) => {
          return (
            <Grid key={task._id} item xs={12} md={6} lg={4}>
              <Card sx={{ p: 4 }}>
                <Typography
                  sx={{ fontSize: 14 }}
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
                  {task.description}
                </Typography>
                {getChip(task)}
              </Card>
              {/* <Item elevation={3}>{task.title}</Item> */}
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}
