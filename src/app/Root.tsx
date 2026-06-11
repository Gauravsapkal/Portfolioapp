import { Outlet } from "react-router";

export function Root() {
  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: 'white', fontFamily: '"Inter", sans-serif' }}>
      <Outlet />
    </div>
  );
}
