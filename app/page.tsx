import {
  Avatar,
  Box,
  Button,
  Card, colors,
  Container,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import { RELATED_ACCOUNTS } from "@/app/consts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Container sx={{ scrollBehavior: "smooth", px: 5 }}>
      <Grid
        container
        id="introduce"
        alignItems="center"
        sx={{ height: "calc(100vh - 64px)" }}
      >
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "initial" } }}>
          <Typography variant="h3" component="h1" gutterBottom>你好呀 👋</Typography>
          <Typography paragraph>
            欢迎来到 SmartSheep Studio 的官方网站！在这里了解，订阅，跟踪我们的最新消息。
            接触我们最大的官方社区，并且尝试最新产品，参与各种活动，提供反馈，让我们更好的服务您。
          </Typography>
          <Button variant="contained" href="#about-us" size="large">探索更多</Button>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "end" }}>
          <Box>
            <Image src="smartsheep.svg" alt="Logo" width={256} height={256} />
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        id="about-us"
        alignItems="center"
        sx={{ height: "calc(100vh - 64px)" }}
      >
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "start" }}>
          <Card sx={{ flexGrow: 1, mr: { xs: 0, md: 8 } }}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {RELATED_ACCOUNTS.map((item, idx) => (
                <Link key={idx} href={item.link} target="_blank" passHref>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: colors.blueGrey[700] }}>{item.icon}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.platform} secondary={item.accountName} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "initial" } }}>
          <Typography variant="h3" component="h1" gutterBottom>关于我们</Typography>
          <Typography paragraph>
            我们是一群充满活力、对开源充满热情的开发者。成立于 2019 年。自那年起我们一直在开发让人喜欢的开源软件。
            在我们这里，“取之于开源，用之于开源” 不仅是原则，更是我们信仰的座右铭。
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
