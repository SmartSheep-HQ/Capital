import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Box, CardContent, Divider, Typography } from "@mui/material";
import UserAgreement from "@/app/information/[id]/user-agreement.mdx";
import PrivacyPolicy from "@/app/information/[id]/privacy-policy.mdx";
import CommunityGuidelines from "@/app/information/[id]/community-guidelines.mdx";

interface InfoMeta {
  title: string;
  content: ReactNode;
  updatedAt: Date;
}

const INFO_DIRECTORY: { [id: string]: InfoMeta } = {
  "user-agreement": {
    title: "User Agreement",
    content: <UserAgreement />,
    updatedAt: new Date("2019-01-28 01:28")
  },
  "privacy-policy": {
    title: "Privacy Policy",
    content: <PrivacyPolicy />,
    updatedAt: new Date("2019-01-28 01:28")
  },
  "community-guidelines": {
    title: "Goatworks Community Guidelines",
    content: <CommunityGuidelines />,
    updatedAt: new Date("2019-01-28 01:28")
  }
};

export default function InfoPage({ params }: { params: { id: string } }) {
  const info = INFO_DIRECTORY[params.id];

  if (!info) {
    return notFound();
  }

  return (
    <CardContent sx={{ paddingX: 5, paddingY: 3 }}>
      <Typography variant="h2">
        {info.title}
      </Typography>
      <Typography color="text.secondary" variant="body2" sx={{ mt: 0.25 }}>
        Last Updated At: {info.updatedAt.toLocaleString()}
      </Typography>


      <Divider sx={{ my: 2.5, mx: -5 }} />
      <Box className="prose max-w-none">
        {info.content}
      </Box>
    </CardContent>
  );
}