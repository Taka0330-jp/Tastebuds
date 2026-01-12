import Image from "next/image";
import { DisplayH2 } from "../typography/DisplayH2";
import { BodyXlg } from "../typography/BodyXlg";
import EmailSignupBar from "../ui/SubscribeFrom";

export default function SubscribeForm() {
    return (
        <section className="bg-yellow-500 relative z-20">
            <div className="flex flex-col items-center text-center">
                <DisplayH2 as="h4" className="p-8">
                    Sign up for tasty updates
                </DisplayH2>
                <BodyXlg className="p-4 text-center">
                    No spam, just snacks. Catch our latest bites, reviews, and hidden gems weekly.
                </BodyXlg>
                <div className="flex flex-col md:flex-row gap-4 items-center ">
                    <EmailSignupBar />
                    <Image
                        src="/images/icons/mail.svg"
                        alt="mail icon"
                        width={148}
                        height={148}
                        className="pointer-events-none"
                    />
                </div>
            </div>
        </section>
    )
}