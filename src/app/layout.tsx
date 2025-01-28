import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>): React.ReactNode {
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  );
}
