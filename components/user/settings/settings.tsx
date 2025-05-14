"use client"
import Header from "@/components/header";
import PrivacySecurity from "./privacy-security";
import Personalization from "./personalization";
import TheraphistPreferences from "./therapist-preferences";
import NotificationsSettings from "./notification-settings";
import PaymentSettings from "./payment-settings";


const Settings = () => {

    return (
        <>
            <div className="min-h-screen bg-sidebar-bg">
                <div className="max-w-7xl mx-auto px-4 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-8">
                            <div className="pt-[3.5em] sticky top-0 z-40 bg-sidebar-bg">
                                <Header title="Settings" />
                            </div>
                            <PrivacySecurity />
                            <Personalization />
                            <TheraphistPreferences />
                            <NotificationsSettings />
                            <PaymentSettings />
                        </div>
                        <div className="hidden md:block pt-24">

                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default Settings;