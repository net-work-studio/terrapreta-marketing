import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/sonner";
import { SanityLive } from "@/sanity/lib/live";

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
      <Toaster />
      <SanityLive />
      {(await draftMode()).isEnabled ? (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      ) : null}
    </>
  );
}
