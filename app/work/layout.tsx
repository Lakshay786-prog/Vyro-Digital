import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work — Portfolio & Case Studies",
  description:
    "Explore selected projects, web development case studies, and branding work created by VYRO Digital for ambitious businesses.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
