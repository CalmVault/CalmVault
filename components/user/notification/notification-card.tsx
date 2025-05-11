import Image from "next/image";
import { FC } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
export type NotificationType =
    | "session"
    | "ai-chat"
    | "message"
    | "schedule"
    | "update"
    | "subscription";
export interface NotificationCardProps {
    title: string;
    type: NotificationType;
    createdAt: string;
}

const renderIcon = (type: NotificationType) => {
    switch (type) {
        case "session":
            return <Image src={"/clock.svg"} width={30} height={30} alt="session" />;
        case "ai-chat":
            return (
                <Image src={"/robot-icon.svg"} width={30} height={30} alt="ai-chat" />
            );
        case "schedule":
            return (
                <Image
                    src={"/calendar-broken.svg"}
                    width={30}
                    height={30}
                    alt="schedule"
                />
            );
        case "message":
            return (
                <Image src={"/chat-icon.svg"} width={30} height={30} alt="message" />
            );
        case "subscription":
            return (
                <Image
                    src={"/money-filled.svg"}
                    width={30}
                    height={30}
                    alt="subscription"
                />
            );
        case "update":
            return (
                <Image src={"/confetti-icon.svg"} width={30} height={30} alt="update" />
            );

        default:
            return (
                <Image src={"/chat-icon.svg"} width={30} height={30} alt="session" />
            );
    }
};

const renderButton = (type: NotificationType) => {
    switch (type) {
        case "session":
            return (
                <div className="w-full flex items-center justify-center gap-5">
                    <Button
                        className="w-[161px] text-base font-normal bg-[#00E6E633] border border-[#00A6A6] p-8 text-white rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                        style={{
                            borderColor: "#14b8a6",
                            color: "#ffffff",
                        }}
                    >
                        Join Now
                    </Button>
                    <Button
                        className="w-[161px] text-base font-normal bg-transparent  border border-[#00A6A6] p-8 text-[#00A6A6] rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                        style={{
                            borderColor: "#14b8a6",
                            color: "#ffffff",
                        }}
                    >
                        Reschedule
                    </Button>
                </div>
            );
        case "ai-chat":
            return (
                <div className="w-full flex items-center justify-center gap-5">
                    <Button
                        className="w-[161px] text-base font-normal bg-[#00E6E633] border border-[#00A6A6] p-8 text-white rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                        style={{
                            borderColor: "#14b8a6",
                            color: "#ffffff",
                        }}
                    >
                        Continue
                    </Button>
                    <Button
                        className="w-[161px] text-base font-normal bg-transparent  border border-[#00A6A6] p-8 text-[#00A6A6] rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                        style={{
                            borderColor: "#14b8a6",
                            color: "#ffffff",
                        }}
                    >
                        Dismiss
                    </Button>
                </div>
            );
        case "schedule":
            return (
                <div className="w-full flex items-center justify-center gap-5">
                    <Button
                        className="w-[423px] text-base font-normal bg-[#00E6E633] border border-[#00A6A6] p-8 text-white rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                        style={{
                            borderColor: "#14b8a6",
                            color: "#ffffff",
                        }}
                    >
                        See Details
                    </Button>
                </div>
            );
        case "message":
            return (
                <div className="w-full flex items-center justify-center gap-5">
                    <Button
                        className="w-[161px] text-base font-normal bg-[#00E6E633] border border-[#00A6A6] p-8 text-white rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                        style={{
                            borderColor: "#14b8a6",
                            color: "#ffffff",
                        }}
                    >
                        View Message
                    </Button>
                    <Button
                        className="w-[161px] text-base font-normal bg-transparent  border border-[#00A6A6] p-8 text-[#00A6A6] rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                        style={{
                            borderColor: "#14b8a6",
                            color: "#ffffff",
                        }}
                    >
                        Schedule a Session
                    </Button>
                </div>
            );
        case "subscription":
            return (
                <div className="w-full flex items-center justify-center gap-5">
                    <Button
                        className="w-[161px] text-base font-normal bg-[#00E6E633] border border-[#00A6A6] p-8 text-white rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                        style={{
                            borderColor: "#14b8a6",
                            color: "#ffffff",
                        }}
                    >
                        Renew
                    </Button>
                    <Button
                        className="w-[161px] text-base font-normal bg-transparent  border border-[#00A6A6] p-8 text-[#00A6A6] rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                        style={{
                            borderColor: "#14b8a6",
                            color: "#ffffff",
                        }}
                    >
                        Manage plans
                    </Button>
                </div>
            );
        case "update":
            return (
                <div className="w-full flex items-center justify-center gap-5">
                    <Button
                        className="w-[161px] text-base font-normal bg-[#00E6E633] border border-[#00A6A6] p-8 text-white rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                        style={{
                            borderColor: "#14b8a6",
                            color: "#ffffff",
                        }}
                    >
                        Explore
                    </Button>
                    <Button
                        className="w-[161px] text-base font-normal bg-transparent  border border-[#00A6A6] p-8 text-[#00A6A6] rounded-lg hover:bg-teal-500/10 transition-all duration-200"
                        style={{
                            borderColor: "#14b8a6",
                            color: "#ffffff",
                        }}
                    >
                        Dismiss
                    </Button>
                </div>
            );

        default:
            return (
                <Image src={"/chat-icon.svg"} width={30} height={30} alt="session" />
            );
    }
};

const NotificationCard: FC<NotificationCardProps> = ({
    title,
    type,
    createdAt,
}) => {
    return (
        <>
            <div className="w-full rounded-2xl bg-[#EDEDED1A] py-5 px-12 mb-5">
                <div className="w-full flex items-center justify-between">
                    {renderIcon(type)}
                    <p className=" text-sm font-normal text-white">
                        {moment(createdAt).format('h:mma')}
                    </p>
                </div>

                <div className="w-full mt-3.5">
                    <p className=" font-bold text-base text-left text-white">{title}</p>
                </div>

                <div className="w-full mt-7">{renderButton(type)}</div>
            </div>
        </>
    );
};

export default NotificationCard;
