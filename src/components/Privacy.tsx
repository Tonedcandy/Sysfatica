// src/components/Privacy.tsx
import SiteHeader from '@/components/SiteHeader.tsx';
import SiteFooter from '@/components/SiteFooter.tsx';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-white">
            <SiteHeader />
            <main className="max-w-2xl mx-auto p-6">
                <p className="text-3xl font-bold">Privacy Policy</p>
                <br />
                <p className="mb-4">
                    <strong>Last updated:</strong> June 16 2025
                </p>
                <p className="mb-8">
                    <strong>Sysfatica</strong> (<em>we</em>, <em>our</em>) respects your privacy.
                    Our fatigue‑testing demo is designed so that{" "}
                    <u>all video processing happens locally in your browser</u>.
                    We do not collect, store, or transmit any personal data.
                </p>

                <h2 className="mt-10 text-lg font-semibold">1. No Data Collection</h2>
                <ul className="list-disc list-inside mb-8">
                    <li>Camera frames never leave your device.</li>
                    <li>We do not log IP addresses, names, e‑mails, or identifiers.</li>
                    <li>We do not use analytics, advertising, or fingerprinting scripts.</li>
                </ul>

                <h2 className="mt-8 text-lg font-semibold">2. Cookies &amp; Local Storage</h2>
                <p className="mb-8">
                    The site sets <em>one</em> first‑party item in <code className="bg-gray-100 px-1 py-0.5 rounded">localStorage</code>
                    {" "}after you dismiss the Terms &amp; Conditions banner so it does not show again.
                    No tracking cookies are placed.
                </p>

                <h2 className="mt-8 text-lg font-semibold">3. Third‑Party Content</h2>
                <p className="mb-8">
                    If you choose to play the embedded YouTube demo video, YouTube (Google LLC) may collect usage data under its own policies.
                    Viewing the video is optional.
                </p>

                <h2 className="mt-8 text-lg font-semibold">4. Security</h2>
                <p className="mb-8">
                    The site is served over HTTPS to prevent in‑transit tampering.
                    Because we do not collect data, there is nothing private stored on our servers.
                </p>

                <h2 className="mt-8 text-lg font-semibold">5. Changes</h2>
                <p className="mb-8">
                    Should our data‑handling practices change, we will update this page and require fresh consent before any collection begins.
                </p>

                <h2 className="mt-8 text-lg font-semibold">6. Contact</h2>
                <p className="mb-8">
                    Questions? Email{" "}
                    <a
                        href="mailto:privacy@sysfatica.com"
                        className="text-blue-700 underline hover:text-blue-900"
                    >
                        privacy@sysfatica.com
                    </a>
                    .
                </p>
                {/* <footer className="mt-16 text-center text-gray-500 text-sm">
                    © 2025 Sysfatica. All rights reserved.
                </footer> */}
            </main>
            <SiteFooter />

        </div>
    );
}