"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useMediaQuery
} from "@mui/material";
import { theme } from "@/app/theme";

export const DRAWER_WIDTH = 320;

export const AppNavigationHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  justifyContent: "flex-start",
  ...theme.mixins.toolbar
}));

export function AppNavigation({ showClose, onClose }: {
  showClose?: boolean,
  onClose: () => void
}) {
  return (
    <>
      <AppNavigationHeader>
        {
          showClose &&
          <IconButton onClick={onClose}>
            {theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        }
      </AppNavigationHeader>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export const isMobileQuery = theme.breakpoints.down("md");

export default function NavigationDrawer({ open, onClose }: {
  open: boolean,
  onClose: () => void,
}) {
  const isMobile = useMediaQuery(isMobileQuery);

  return isMobile ? (
    <>
      <Box sx={{ flexShrink: 0, width: DRAWER_WIDTH }} />
      <Drawer
        keepMounted
        anchor="right"
        variant="temporary"
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH
          }
        }}
      >
        <AppNavigation onClose={onClose} />
      </Drawer>
    </>
  ) : (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH
        }
      }}
    >
      <AppNavigation showClose onClose={onClose} />
    </Drawer>
  );
}