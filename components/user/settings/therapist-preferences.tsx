import Header from "@/components/header";
import CustomSelect from "@/components/ui/custom-select";
const TheraphistPreferences = () => {
    const genderOptions = [
        {
            label: "Male",

            value: "male",
        },
        {
            label: "Female",
            value: "female",
        },
        {
            label: "Other",
            value: "other",
        },
    ];

    const timeOfDay = [
        {
            label: "Morning",
            value: "morning"
        },
        {
            label: "Afternoon",
            value: "afternoon"
        },
        {
            label: "Evening",
            value: "evening"
        }
    ]
    // const timeZones = [
    //     {
    //         label: "GMT +1",
    //         value: "gmt+1"
    //     },
    //     {
    //         label: "GMT -1",
    //         value: "gmt-1"
    //     },
    //     {
    //         label: "UTC +1",
    //         value: "utc+1"
    //     }
    // ]
    return (
        <>
            <div className="w-full mt-5">
                <Header title="Therapist Preferences (for Human Sessions)" titleSize="text-base" />

                <div className="w-full mt-5">


                    <div className="w-full flex items-center justify-between bg-[#EDEDED1A] py-5 px-2.5 rounded-lg mb-2.5">
                        <p className=" text-base text-white text-left font-normal">
                            Gender Preference:
                        </p>
                        <div className="w-1/2" >
                            <CustomSelect

                                placeholder="Male"
                                value=""
                                onChange={() => { }}
                                options={genderOptions}
                            />
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between bg-[#EDEDED1A] py-5 px-2.5 rounded-lg mb-2.5">
                        <p className=" text-base text-white text-left font-normal">
                            Session Time Defaults (preferred days/times)
                        </p>
                        <div className="w-1/2" >
                            <CustomSelect

                                placeholder="Morning"
                                value=""
                                onChange={() => { }}
                                options={timeOfDay}
                            />
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between bg-[#EDEDED1A] py-5 px-2.5 rounded-lg mb-2.5">
                        <p className=" text-base text-white text-left font-normal">
                            Time zone
                        </p>
                        <div className="w-1/2" >
                            <CustomSelect

                                placeholder="GMT +1"
                                value=""
                                onChange={() => { }}
                                options={timeOfDay}
                            />
                        </div>
                    </div>



                </div>
            </div>
        </>
    );
};

export default TheraphistPreferences;
