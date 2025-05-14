"use client"
import Header from "@/components/header";
import ProfileImageSelector from "./profile-image-selector";
import ProfileUsername from "./profile-username";
import ProfileHistory from "./profile-history";
import Help from "./help";
import Account from "./account";



const Profile = () => {

    return (
        <>
            <div className="min-h-screen bg-sidebar-bg">
                <div className="max-w-7xl mx-auto px-4 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-8">
                            <div className="pt-[3.5em] sticky top-0 z-40 bg-sidebar-bg">
                                <Header title="Profile" />
                            </div>
                            <div className="px-16" >
                                <ProfileImageSelector />
                                <ProfileUsername />
                                <ProfileHistory />
                                <Help />
                                <Account />
                            </div>
                        </div>
                        <div className="hidden md:block pt-24">

                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default Profile;