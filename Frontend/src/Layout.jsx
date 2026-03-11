import "./globals.css";
import { ThemeProvider } from "../Context/themecontext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`
    ${geistSans.variable}
    ${geistMono.variable}
    antialiased
    min-h-screen
    bg-gradient-to-br
    from-[#9929EA]
    via-[#9929EA]/30
    to-[#FF5FCF]/30

    dark:from-[#0f0f0f]
    dark:via-[#1a1a1a]
    dark:to-[#000000]
  `}
>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}