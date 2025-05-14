import Header from "@/components/header";
import { Button } from "@/components/ui/button";

const Help = () => {
    return (
        <>
            <div className="w-full " >
                <Header title="Help" titleSize="text-base" />

                <div className="w-full mt-1" >

                    <div className="w-full rounded-lg mb-2.5">

                        <Button
                            className="w-full text-base font-normal h-16 bg-[#EDEDED1A] py-5 px-8 text-white rounded-lg"
                            style={{
                                borderColor: "#14b8a6",
                                color: "#ffffff",
                            }}
                        >
                            Contact Support
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Help;