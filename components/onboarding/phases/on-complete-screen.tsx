import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function OnComplete() {
  const router = useRouter();

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      router.replace("/theraphy-hub")
    }, 3000)
  }, [])
  return (
    <div className="w-full max-w-[51.875rem] h-[29.875rem] mx-auto p-8 bg-[#EDEDED1A] rounded-3xl text-center flex justify-center items-center">
      <div className="flex flex-col items-center justify-center space-y-6">

        <p className='font-bold text-white text-[1.625rem]'>Preparing your Vault</p>
        {/* Logo and Brand */}
        <div className="flex items-center justify-center">
          <Image src="/logo.svg" alt="Logo" width={193.5} height={128.35} />
        </div>

        <p className='text-xs text-white'>“Your answers are encrypted and never tied to your real identity. This helps us give you a more helpful<br /> and supportive experience — while keeping you fully anonymous.”</p>

      </div>
    </div>
  )
}

export default OnComplete