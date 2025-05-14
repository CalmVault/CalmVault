import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
const Personalization = () => {
    const languageOptions = [
        {
            label: "English",

            value: "english",
        },
        {
            label: "French",
            value: "french",
        },
        {
            label: "German",
            value: "german",
        },
    ];
    return (
        <>
            <div className="w-full mt-5">
                <Header title="Personalization" titleSize="text-base" />

                <div className="w-full mt-5">
                    <div className="w-full flex items-center justify-between bg-[#EDEDED1A] py-5 px-2.5 rounded-lg mb-2.5">
                        <p className=" text-base text-white text-left font-normal">
                            Default Session Type
                        </p>
                        <div className="w-auto flex items-center justify-end gap-5 ">
                            <Button
                                className="w-[103px] text-base font-normal bg-[#00E6E633] border border-[#00A6A6] p-8 text-white rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                                style={{
                                    borderColor: "#14b8a6",
                                    color: "#ffffff",
                                }}
                            >
                                Human
                            </Button>
                            <Button
                                className="w-[103px] text-base font-normal bg-transparent  border border-[#00A6A6] p-8 text-[#00A6A6] rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                                style={{
                                    borderColor: "#14b8a6",
                                    color: "#ffffff",
                                }}
                            >
                                Ai
                            </Button>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between bg-[#EDEDED1A] py-5 px-2.5 rounded-lg mb-2.5">
                        <p className=" text-base text-white text-left font-normal">
                            Language Preferences
                        </p>
                        <div className="w-1/2" >
                            <CustomSelect

                                placeholder="English"
                                value=""
                                onChange={() => { }}
                                options={languageOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Personalization;
