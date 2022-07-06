import React from "react";
import BackofficeLanding from "../../components/backoffice";
import PageLayout from "../../lib/page-layout";

export default function BackofficePage() {
  return <PageLayout children={<BackofficeLanding />} />;
}
