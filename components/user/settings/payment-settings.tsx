import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
const PaymentSettings = () => {
    const paymentOptions = [
        {
            label: "AZ Money",

            value: "az-money",
        },
        {
            label: "Metamask",
            value: "metamask",
        },
        {
            label: "Binance",
            value: "binance",
        },
    ];
    return (
        <>
            <div className="w-full mt-5">
                <Header title="Payment" titleSize="text-base" />

                <div className="w-full mt-5">
                    <div className="w-full flex items-center justify-between bg-[#EDEDED1A] py-5 px-2.5 rounded-lg mb-2.5">
                        <p className=" text-base text-white text-left font-normal">
                            Wallet Preference
                        </p>
                        <div className="w-1/2" >
                            <CustomSelect

                                placeholder="AZ Money"
                                value=""
                                onChange={() => { }}
                                options={paymentOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentSettings;
