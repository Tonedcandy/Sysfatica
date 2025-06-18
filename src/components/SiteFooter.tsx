// src/components/Footer.tsx
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
    return (
        <footer className="w-full bg-black py-2 mt-4">
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-2">
                {/* Legal Links (left) */}
                <div className="flex-1 flex space-x-6 items-center">
                    <a
                        href="/privacy"
                        className="text-gray-400 underline hover:text-blue-400 transition-colors duration-200 text-xs"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="/terms"
                        className="text-gray-400 underline hover:text-blue-400 transition-colors duration-200 text-xs"
                    >
                        Terms &amp; Conditions
                    </a>
                </div>

                {/* Copyright (center) */}
                <div className="flex-1 text-center text-xs text-gray-400">
                    © 2025 Sysfatica. All rights reserved.
                </div>

                {/* Socials (right) */}
                <div className="flex-1 flex justify-end space-x-6 items-center">
                    <a
                        href="https://github.com/Tonedcandy/Sysfatica"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <AiFillGithub className="h-5 w-5 text-gray-500 hover:text-white transition-colors duration-200" />
                    </a>
                    <a
                        href="https://linkedin.com/in/ssmonish"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <AiFillLinkedin className="h-5 w-5 text-gray-500 hover:text-white transition-colors duration-200" />
                    </a>
                </div>
            </div>
        </footer>
    );
}