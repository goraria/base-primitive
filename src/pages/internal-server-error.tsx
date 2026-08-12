import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/custom/button"
import imageUnderMaintenance from "@/assets/illustration/page-misc-error-new.png"

export default function InternalServerErrorPage() {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-2 p-6 text-center min-block-[calc(100vh-2rem*2)]">
          <h1 className="mx-2 mb-2 text-8xl leading-none font-medium">500</h1>
          {/* <h4 className="mx-2 mb-2 text-2xl font-medium tracking-tight">Internal Server Error! �️</h4> */}
          <h4 className="mx-2 mb-2 text-2xl font-medium tracking-tight">Oops! Something went wrong :'{`)`}</h4>
          <p className="mb-6 mx-2">We apologize for the inconvenience. Please try again later.</p>
          <Button nativeButton={false} render={<Link href="/" />}>
            Back to home
          </Button>
          <div className="mt-6">
            <Image src={imageUnderMaintenance} alt="page-misc" width={512} height={512} loading="eager" className="h-auto w-auto max-w-full visible"/>
          </div>
        </div>
      </div>
    </>
  )
}
