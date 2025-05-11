"use client"
import Header from "@/components/header";
import TherapySessionSidebar from "../therapy-hub/alert-sidebar";
import NotificationCard, { NotificationCardProps } from "./notification-card";

const Notification = () => {
    const bookSession = () => {
        console.log("Book a session")
    }

    const notifications: NotificationCardProps[] = [
        {
            title: "Your private session with Amazing Listener starts in 15 minutes.",
            type: "session",
            createdAt: "2025-05-11T11:00:00Z",
        },
        {
            title: "Here’s a reflection from our last chat.",
            type: "ai-chat",
            createdAt: "2025-05-11T11:00:00Z",
        },
        {
            title: "Your therapist has responded to your message.",
            type: "message",
            createdAt: "2025-05-11T11:00:00Z",
        },
        {
            title: "Session with Amazing Listener has been rescheduled.",
            type: "schedule",
            createdAt: "2025-05-11T11:00:00Z",
        },
        {
            title: "New guided meditations are now available.",
            type: "update",
            createdAt: "2025-05-11T11:00:00Z",
        }
    ];

    return (
        <>
            <div className="min-h-screen bg-sidebar-bg">
                <div className="max-w-7xl mx-auto px-4 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-8">
                            <div className="pt-[3.5em] sticky top-0 z-40 bg-sidebar-bg">
                                <Header title="Notification" />
                            </div>
                            {notifications.map((item, index) => (
                                <NotificationCard {...item} key={index} />
                            ))}
                        </div>
                        <div className="hidden md:block pt-24">
                            <TherapySessionSidebar onStartSession={bookSession} title="" buttonText="Book a session" subtitle="" helpText="" imageUrl="/quiet-noise-bg.svg" />
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default Notification;