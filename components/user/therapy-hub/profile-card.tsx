import Image from "next/image";

interface ProfileCardProps {
  therapist: {
    imageUrl: string;
    name: string;
    rating: number;
  };
}

function ProfileCard({ therapist }: ProfileCardProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-[2rem] p-8 mb-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-24 h-24 mb-4">
          <Image
            src={therapist.imageUrl || "/placeholder.svg"}
            alt={therapist.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h2 className="text-xl font-medium mb-3">{therapist.name}</h2>
        <p className="text-gray-400 mb-4">I can be the babe you never had...</p>

        {/* Price and Rating */}
        <div className="w-full">
          <div className="text-right mb-2">
            <p className="text-xl font-semibold">$5 per hour</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Avg. Rating</p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{therapist.rating}</span>
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <span key={star} className="text-orange-500">
                    ★
                  </span>
                ))}
                <span className="text-gray-400">☆</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
