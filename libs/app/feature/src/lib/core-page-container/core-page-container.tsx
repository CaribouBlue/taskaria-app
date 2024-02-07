import { PropsWithChildren, useState } from 'react';
import styles from './core-page-container.module.css';
import { Box, CssBaseline } from '@mui/material';
import NavBar from '../nav-bar/nav-bar';
import NavDrawer, { NavDrawerHeader } from '../nav-drawer/nav-drawer';

/* eslint-disable-next-line */
export interface CorePageContainerProps extends PropsWithChildren {}

export function CorePageContainer(props: CorePageContainerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen}></NavBar>
      <NavDrawer isOpen={isOpen} setIsOpen={setIsOpen}></NavDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <NavDrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}

export default CorePageContainer;
