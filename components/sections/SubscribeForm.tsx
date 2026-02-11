import Image from "next/image";
import { DisplayH2 } from "../typography/DisplayH2";
import { BodyXlg } from "../typography/BodyXlg";
import EmailSignupBar from "../ui/SubscribeInputFrom";

export default function SubscribeForm() {
    return (
        <section className="bg-home-section p-8 relative z-20">

            <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-16  p-12 bg-gray-50 rounded-lg">
            <Image
                src={"/images/svg/tastebuds-letter.svg"}
                alt="tastebuds latter illustration"
                width={300}
                height={300}
                className="w-60 h-auto md:w-75"
            />                <div>
                    <DisplayH2 as="h4" className="p-4 relative text-center
                    after:content-['']
                    after:absolute
                    after:h-1
                    after:bg-black
                    after:w-40
                    after:left-1/2
                    after:bottom-0
                    after:-translate-x-1/2">
                        Sign up for tasty updates
                    </DisplayH2>
                    <BodyXlg className="py-8 text-center text-gray-600">
                        No spam, just snacks. Catch our latest bites, reviews, and hidden gems weekly.
                    </BodyXlg>
                    <div className="py-4">
                        <EmailSignupBar />
                    </div>
                </div>
            </div>
        </section>
    )
}