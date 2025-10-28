export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{margin: 0, padding: 0, background: '#15161a', color: '#fff'}}>
        {children}
      </body>
    </html>
  );
}
