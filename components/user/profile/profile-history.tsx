import Header from "@/components/header";
import { Button } from "@/components/ui/button";

const ProfileHistory = () => {
    const history = [
        {
            title: "Number of Sessions Began",
            value: "11"
        },
        {
            title: "Number of Sessions Completed",
            value: "8"
        },
        {
            title: "Number of Therapists Visited",
            value: "100"
        },
        {
            title: "Total amount spent",
            value: "$1000"
        },
    ]
    return (
        <>
            <div className="w-full " >
                <Header title="History" titleSize="text-base" />

                <div className="w-full mt-5" >
                    {history.map(({ title, value }, index) => (
                        <div key={index} className="w-full bg-[#EDEDED1A] flex items-center justify-between py-5 px-2.5 rounded-lg mb-2.5" >
                            <p className=" text-base text-white text-left font-normal" >{title}</p>
                            <p className=" text-base text-white text-left font-normal" >{value}</p>
                        </div>
                    ))}
                    <div className="w-full flex items-center justify-between bg-[#EDEDED1A] py-2 mt-5 px-2.5 rounded-lg mb-2.5">
                        <p className=" text-base text-white text-left font-normal">
                            Clear History
                        </p>
                        <div className="w-auto flex items-center justify-end gap-5 ">
                            <Button
                                className="w-[100px] text-base font-normal bg-[#00E6E633] border border-[#00A6A6] py-5 px-8 text-white rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                                style={{
                                    borderColor: "#14b8a6",
                                    color: "#ffffff",
                                }}
                            >
                                Clear
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileHistory;