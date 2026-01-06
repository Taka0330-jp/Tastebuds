"use client";
import { DisplayH1 } from "../typography/DisplayH1";
import { BodyXlg } from "../typography/BodyXlg";
import MouthStroke from "../animation/mouthStroke";

export default function HomeHero() {
    return (
        <section className="home-hero fixed inset-x-0 top-0 h-[80vh] overflow-hidden z-0">
            <div className="flex flex-col gap-1.5 md:grid md:grid-cols-12 max-w-container mx-auto p-5 relative z-10 mt-10 mb-20 md:mt-20 lg:mt-30">
                <div className="flex flex-col gap-1 md:col-start-1 md:col-span-7">
                    <DisplayH1 className="text-text-inverse">
                        Your guide to Vancouver’s tastiest bites
                    </DisplayH1>
                    <BodyXlg className="text-text-inverse">
                        Hey foodie friends! From hole-in-the-wall dumpling shops to trendy brunch spots, we’re all about sharing the flavors that make this city so delicious.
                    </BodyXlg>
                </div>

                <MouthStroke className="mouth-stroke md:col-start-8 md:col-span-5" />
            </div>

        </section>
    );
}
