import {
  AppBar as MuiAppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  styled,
  AppBarProps as MuiAppBarProps,
} from '@mui/material';
import * as icons from '@mui/icons-material';
import styles from './nav-bar.module.css';
import { MouseEventHandler } from 'react';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/* eslint-disable-next-line */
export interface NavBarProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function NavBar({ isOpen, setIsOpen }: NavBarProps) {
  const handleDrawerOpen: MouseEventHandler = () => {
    if (setIsOpen) {
      setIsOpen(true);
    }
  };

  return (
    <AppBar position="fixed" open={isOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{
            marginRight: 5,
            ...(isOpen && { display: 'none' }),
          }}
          onClick={handleDrawerOpen}
        >
          <icons.Menu />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { sm: 'block' } }}
        >
          Taskaria
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { md: 'flex' } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            // onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <icons.AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
