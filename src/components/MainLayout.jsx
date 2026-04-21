import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  ExitToApp,
  Menu as MenuIcon,
  Home as HomeIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 260;

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'INICIO', icon: <HomeIcon />, path: '/home' },
    { text: 'Consulta Clientes', icon: <PeopleIcon />, path: '/clients' },
  ];

  const drawerContent = (
    <Box>
      <Toolbar />

      {/* SECCIÓN PERFIL */}
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 70,
            height: 70,
            margin: '0 auto',
            bgcolor: '#d1d5db',
            color: '#4b5563',
            fontSize: '2rem',
            fontWeight: 800,
          }}
        >
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
        <Typography
          variant='body1'
          sx={{ mt: 2, fontWeight: 700, color: '#1f2937' }}
        >
          {user?.username || 'Usuario'}
        </Typography>
      </Box>

      {/* TÍTULO MENÚ */}
      <Box
        sx={{
          py: 1.5,
          mb: 2,
          textAlign: 'center',
          borderTop: '1px solid #d1d5db',
          borderBottom: '1px solid #d1d5db',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
        }}
      >
        <Typography
          variant='caption'
          sx={{
            fontWeight: 800,
            color: '#374151',
            letterSpacing: 3,
            fontSize: '0.75rem',
          }}
        >
          MENÚ
        </Typography>
      </Box>

      {/* LISTA DE NAVEGACIÓN */}
      <List sx={{ p: 0 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.text}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                py: 1.8,
                px: 3,
                backgroundColor: 'transparent !important',
                // Barra lateral azul de indicación
                borderLeft: isSelected
                  ? '5px solid #1890ff'
                  : '5px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04) !important',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 45,
                  color: isSelected ? '#1890ff' : '#6b7280',
                  '& svg': { fontSize: '1.5rem' },
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.85rem',
                  // FIJAMOS EL GROSOR EN 600 PARA AMBOS ESTADOS
                  fontWeight: 600,
                  color: isSelected ? '#1890ff' : '#4b5563',
                  transition: 'color 0.2s ease', // Transición suave de color
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* HEADER */}
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#001529',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                color='inherit'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: 600, letterSpacing: 1 }}
            >
              COMPAÑIA PRUEBA
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant='body2'
              sx={{ fontWeight: 500, display: { xs: 'none', sm: 'block' } }}
            >
              {user?.username || 'Usuario'}
            </Typography>

            <IconButton
              onClick={handleLogout}
              sx={{
                backgroundColor: '#e0e0e0',
                color: '#001529',
                p: 0.8,
                boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: '#ffffff',
                  transform: 'scale(1.08)',
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.5)',
                },
              }}
            >
              <ExitToApp sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* DRAWER RESPONSIVE */}
      <Box
        component='nav'
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: '#eceef1',
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: '#eceef1',
              borderRight: '1px solid #d1d5db',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* CONTENIDO PRINCIPAL */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, display: 'flex', width: '100%' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
