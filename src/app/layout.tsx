import './globals.css';
export const metadata = { title: 'Bootstrap' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
