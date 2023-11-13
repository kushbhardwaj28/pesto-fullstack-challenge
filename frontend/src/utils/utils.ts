export const getColor = (status?: string) => {
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
  return color;
};
