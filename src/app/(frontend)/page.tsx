import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateMetadata as generateMetadataHelper } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import Customers from "./_sections/customers";
import HomeHero from "./_sections/home-hero";
import Logos from "./_sections/logos";
import Numbers from "./_sections/numbers";
import PilotProject from "./_sections/pilot-project";
import Services from "./_sections/services";
import SoilRevolution from "./_sections/soil-revolution";

export const metadata: Metadata = generateMetadataHelper({
  title: "Terrapreta — Soil-based Solutions",
  description:
    "Regenerating ecosystems from the soil up. Growing equitable places for nature, people and climate.",
  url: "/",
});

interface SectionWrapperProps {
  children: React.ReactNode;
  isFirstItem?: boolean;
}

function SectionWrapper({
  children,
  isFirstItem = false,
}: SectionWrapperProps) {
  return (
    <div
      className={cn(
        isFirstItem ? "pt-10 pb-15 md:pb-30" : "py-15 md:py-30",
        "space-y-30 bg-linear-to-b from-stone-900 to-transparent md:space-y-60"
      )}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <div className="scroll-mt-16 space-y-0" id="learn-more">
        <SectionWrapper isFirstItem>
          <Numbers />
        </SectionWrapper>
        <SectionWrapper>
          <SoilRevolution />
        </SectionWrapper>
        <SectionWrapper>
          <Services />
        </SectionWrapper>
        {/*       <SectionWrapper>
          <Context />
        </SectionWrapper> */}
        <SectionWrapper>
          <Customers />
        </SectionWrapper>
        <SectionWrapper>
          <PilotProject />
        </SectionWrapper>
        <SectionWrapper>
          <Logos />
          {/* <ContactForm /> */}
          <div className="flex w-full items-center justify-center">
            <Button asChild>
              <Link href="/contacts">Get in contact</Link>
            </Button>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
}
