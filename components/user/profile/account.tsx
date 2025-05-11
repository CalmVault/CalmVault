import Header from "@/components/header";
import { Button } from "@/components/ui/button";

const Account = () => {
    return (
        <>
            <div className="w-full " >
                <Header title="Account" titleSize="text-base" />

                <div className="w-full mt-1" >

                    <div className="w-full rounded-lg mb-2.5">

                        <Button
                            className="w-full text-base font-normal h-16 bg-[#FF385C1A] py-5 px-8 text-white rounded-lg"
                            style={{
                                borderColor: "#14b8a6",
                                color: "#ffffff",
                            }}
                        >
                            Delete/Deactivate Account
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Account;