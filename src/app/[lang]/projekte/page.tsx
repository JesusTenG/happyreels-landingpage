import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  buildProjectsRouteMetadata,
  ProjectsRoute,
} from "@/components/projects/ProjectsRoute";

type Props = Readonly<{ params: Promise<{ lang: string }> }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "de") notFound();
  return buildProjectsRouteMetadata("de");
}

export default async function ProjectsPage({ params }: Props) {
  const { lang } = await params;
  if (lang !== "de") notFound();
  return <ProjectsRoute locale="de" />;
}
