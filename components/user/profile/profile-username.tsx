import Header from "@/components/header";
import { Button } from "@/components/ui/button";
const ProfileUsername = () => {
    return (
        <>
            <div className="w-full mt-5">
                <Header title="Profile" titleSize="text-base" />

                <div className="w-full mt-5">
                    <div className="w-full " >
                        <p className=" text-base text-white text-left font-normal">Username (keep it anonymous preferably)</p>
                    </div>
                    <div className="w-full flex items-center justify-between bg-[#EDEDED1A] py-2 mt-5 px-2.5 rounded-lg mb-2.5">
                        <p className=" text-base text-white text-left font-normal">
                            kamislayer
                        </p>
                        <div className="w-auto flex items-center justify-end gap-5 ">
                            <Button
                                className="w-[100px] text-base font-normal bg-[#00E6E633] border border-[#00A6A6] py-5 px-8 text-white rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                                style={{
                                    borderColor: "#14b8a6",
                                    color: "#ffffff",
                                }}
                            >
                                Save
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileUsername;
