"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useMediaQuery
} from "@mui/material";
import { theme } from "@/app/theme";
import { ReactNode } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import Link from "next/link";

export interface NavigationItem {
  icon: ReactNode;
  title: string;
  link: string;
}

export const DRAWER_WIDTH = 320;
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { icon: <HomeIcon />, title: "首页", link: "/" },
  { icon: <ArticleIcon />, title: "新闻", link: "/posts" },
];

export const AppNavigationHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  justifyContent: "flex-start",
  height: 64,
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
        {NAVIGATION_ITEMS.map((item, idx) => (
          <Link key={idx} href={item.link} passHref>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </Link>
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