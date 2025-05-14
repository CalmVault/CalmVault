import Header from "@/components/header";

const NotificationsSettings = () => {
    return (
        <>
            <div className="w-full " >
                <Header title="Notifications" titleSize="text-base" />

                <div className="w-full mt-5" >
                    <div className="w-full bg-[#EDEDED1A] py-5 px-2.5 rounded-lg mb-2.5" >
                        <p className=" text-base text-white text-left font-normal" >Session Reminders</p>
                    </div>
                    <div className="w-full bg-[#EDEDED1A] py-5 px-2.5 rounded-lg mb-2.5" >
                        <p className=" text-base text-white text-left font-normal" >AI Check-in Nudges</p>
                    </div>
                    <div className="w-full bg-[#EDEDED1A] py-5 px-2.5 rounded-lg mb-2.5" >
                        <p className=" text-base text-white text-left font-normal" >Platform updates</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotificationsSettings;