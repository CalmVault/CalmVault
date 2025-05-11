import Header from "@/components/header";

const PrivacySecurity = () => {
    return (
        <>
            <div className="w-full " >
                <Header title="Privacy & Security" titleSize="text-base" />

                <div className="w-full mt-5" >
                    <div className="w-full bg-[#EDEDED1A] py-5 px-2.5 rounded-lg mb-2.5" >
                        <p className=" text-base text-white text-left font-normal" >Session Auto-Wipe toggle (clear session history on logout)</p>
                    </div>
                    <div className="w-full bg-[#EDEDED1A] py-5 px-2.5 rounded-lg mb-2.5" >
                        <p className=" text-base text-white text-left font-normal" >Data Visibility Controls (e.g., enable/disable local session tracking) </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PrivacySecurity;