import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  buildProjectsRouteMetadata,
  ProjectsRoute,
} from "@/components/projects/ProjectsRoute";

type Props = Readonly<{ params: Promise<{ lang: string }> }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") notFound();
  return buildProjectsRouteMetadata("en");
}

export default async function EnglishProjectsPage({ params }: Props) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  return <ProjectsRoute locale="en" />;
}
