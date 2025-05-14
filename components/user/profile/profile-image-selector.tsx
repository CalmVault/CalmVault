import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

const ProfileImageSelector = () => {
    const [profileImage, setProfileImage] = useState("/client.svg")
    const profileImaages = [
        {
            image: "/profile-image-1.svg"
        },
        {
            image: "/profile-image-2.svg"
        },
        {
            image: "/profile-image-3.svg"
        },
        {
            image: "/profile-image-4.svg"
        },
        {
            image: "/profile-image-5.svg"
        },
    ]
    return (
        <div className="w-full" >
            <div className="w-full flex items-center justify-end gap-32" >
                <Image src={profileImage} alt="profile-image" width={150} height={150} />
                <Button
                    className="w-[100px] text-base font-normal bg-[#00E6E633] border border-[#00A6A6] p-8 text-white rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                    style={{
                        borderColor: "#14b8a6",
                        color: "#ffffff",
                    }}
                >
                    Save
                </Button>
            </div>

            <div className="w-full flex items-center justify-end gap-14 mt-11" >
                {profileImaages.map(({ image }, index) => (
                    <Image onClick={() => {
                        setProfileImage(image)
                    }} src={image} alt={`${image}-${index}`} key={index} width={80} height={80} className=" cursor-pointer" />
                ))}
            </div>
        </div>
    );
}

export default ProfileImageSelector;