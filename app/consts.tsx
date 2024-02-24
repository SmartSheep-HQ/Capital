import { ReactNode } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import CoffeeIcon from "@mui/icons-material/Coffee";

export interface RelatedAccount {
  icon: ReactNode;
  platform: string;
  accountName: string;
  link: string;
}

export const SITE_NAME = "Goatshed";

export const RELATED_ACCOUNTS: RelatedAccount[] = [
  { icon: <GitHubIcon />, platform: "GitHub", accountName: "@smartsheep-hq", link: "https://github.com/smartsheep-hq" },
  { icon: <TwitterIcon />, platform: "Twitter", accountName: "@littlesheepovo", link: "https://twitter.com/littlesheepovo" },
  { icon: <CoffeeIcon />, platform: "Ko-fi", accountName: "@littlesheep2code", link: "https://ko-fi.com/littlesheep2code" },
];