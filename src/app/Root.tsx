import { Outlet } from "react-router";
import { PortfolioProvider } from "./store/PortfolioContext";

export function Root() {
  return (
    <PortfolioProvider>
      <div style={{ background: '#050505', minHeight: '100vh', color: 'white', fontFamily: '"Inter", sans-serif' }}>
        <Outlet />
      </div>
    </PortfolioProvider>
  );
}
