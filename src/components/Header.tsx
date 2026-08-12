import { LogOut } from "lucide-react";
import { useAuth, useStatus } from "@gencow/react";
import { signOut } from "../lib/gencow";

export function Header() {
  const { user, isAuthenticated } = useAuth();
  const { isConnected } = useStatus();

  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark">모두</span>
        <span className={`status-dot${isConnected ? " connected" : ""}`} title={isConnected ? "실시간 연결됨" : "연결 끊김"} />
      </div>
      {isAuthenticated && (
        <div className="user-info">
          <span>{user?.name || user?.email}</span>
          <button type="button" className="icon-btn" onClick={() => signOut()} aria-label="로그아웃">
            <LogOut size={16} />
          </button>
        </div>
      )}
    </header>
  );
}
