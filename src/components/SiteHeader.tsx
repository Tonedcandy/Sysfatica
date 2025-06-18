// components/SiteHeader.tsx
import { Link } from "react-router-dom";

export default function SiteHeader() {
    return (
        <header className="w-full border-b bg-black backdrop-blur p-2">
            <div className="container mx-auto flex h-16 items-center justify-center">
                <Link
                    to="/"
                    className="text-5xl tracking-tight text-white"
                    aria-label="Sysfatica — home"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                    Sysfatica
                </Link>
            </div>
        </header>
    );
}