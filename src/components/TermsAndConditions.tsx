// src/components/TermsAndConditions.tsx
import SiteHeader from '@/components/SiteHeader.tsx';
import SiteFooter from '@/components/SiteFooter.tsx';


export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-white">
            <SiteHeader />
            <main className="max-w-2xl mx-auto p-6">
                <p className="text-3xl font-bold">Terms and Conditions</p>
                <br />
                <p className="mb-4">
                    <strong>Last updated:</strong> June 16 2025
                </p>
                <p className="mb-8">
                    Welcome to <strong>Sysfatica</strong> (“<em>we</em>”, “<em>our</em>”, “<em>us</em>”). By accessing or using our fatigue-testing demo, you agree to these Terms and Conditions (“Terms”). If you do not agree with these Terms, please do not use the demo.
                </p>

                <h2 className="mt-10 text-lg font-semibold">1. Use of the Demo</h2>
                <p className="mb-8">
                    The Sysfatica fatigue-testing demo is provided for personal, non-commercial use only. You may not use the demo for any unlawful or harmful purpose, or in any way that might damage, disable, or impair the site or interfere with other users.
                </p>

                <h2 className="mt-8 text-lg font-semibold">2. No Warranty</h2>
                <p className="mb-8">
                    The demo is provided “as is” and without warranties of any kind, whether express or implied. We make no guarantees regarding the accuracy, reliability, or suitability of the demo for any purpose. Use it at your own risk.
                </p>

                <h2 className="mt-8 text-lg font-semibold">3. User Responsibility</h2>
                <p className="mb-8">
                    You are responsible for any activity that occurs through your use of the demo. Do not attempt to misuse, modify, or reverse engineer any part of the system.
                </p>

                <h2 className="mt-8 text-lg font-semibold">4. Intellectual Property</h2>
                <p className="mb-8">
                    All content, design, and code on this site are the property of Sysfatica or its licensors. You may not reproduce, distribute, or create derivative works without written permission.
                </p>

                <h2 className="mt-8 text-lg font-semibold">5. Changes to the Terms</h2>
                <p className="mb-8">
                    We may update these Terms from time to time. If we make changes, we will update the date above and provide notice as appropriate. Continued use of the demo constitutes acceptance of the new Terms.
                </p>

                <h2 className="mt-8 text-lg font-semibold">6. Limitation of Liability</h2>
                <p className="mb-8">
                    To the maximum extent permitted by law, Sysfatica and its affiliates shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the demo.
                </p>

                <h2 className="mt-8 text-lg font-semibold">7. Governing Law</h2>
                <p className="mb-8">
                    These Terms are governed by and construed in accordance with the laws of the jurisdiction in which Sysfatica operates, without regard to its conflict of law principles.
                </p>

                <h2 className="mt-8 text-lg font-semibold">8. Contact</h2>
                <p className="mb-8">
                    If you have questions about these Terms, please contact us at{" "}
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