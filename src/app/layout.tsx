"use server";

import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>): Promise<React.ReactNode> {
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  );
}
