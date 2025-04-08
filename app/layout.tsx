import "./globals.css";
import QueryClientProviderComponent from "@/components/queryClientProviderComponent";

/**
 * @기본_레이아웃
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-background-primary min-h-screen">
        <QueryClientProviderComponent>{children}</QueryClientProviderComponent>
      </body>
    </html>
  );
}
