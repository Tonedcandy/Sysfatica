// src/components/TermsAndConditions.tsx
import { useState, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SiteEntryDialog() {
    // Only show dialog if NOT already accepted
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const alreadyAccepted = localStorage.getItem("termsAccepted") === "yes";
        setOpen(!alreadyAccepted);
    }, []);

    const handleAccept = () => {
        localStorage.setItem("termsAccepted", "yes");
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent onOpenAutoFocus={e => e.preventDefault()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Terms &amp; Conditions
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        By continuing, you acknowledge and accept our&nbsp;
                        <a
                            href="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-400"
                        >
                            Terms
                        </a>
                        &nbsp;and&nbsp;
                        <a
                            href="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-400"
                        >
                            Privacy Policy
                        </a>
                        .
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <a
                            href="https://google.com"
                            target="_self"
                            rel="noopener noreferrer"
                        >
                            Decline
                        </a>
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleAccept}>
                        Accept
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}