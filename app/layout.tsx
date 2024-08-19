import { GeistSans } from "geist/font/sans";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "KAOS ",
  description: "Accounting made easy",
};

export default function RootLayout({
  children,
}: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
     <head>


     </head><link rel="manifest" href="/manifest.json" />
      <body className="bg-background text-foreground">
      <Theme accentColor="blue" grayColor="sand" radius="large" scaling="95%">
  
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        </Theme>

      </body>
    </html>
  );
}
