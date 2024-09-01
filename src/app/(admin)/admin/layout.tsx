import type { Metadata } from "next";
import { Container } from "@/components/admin/_components/sideBarLayout/SideBarLayout";
import { metaGenerator } from "./meta";


export const generateMetadata = async (): Promise<Metadata> =>
  await metaGenerator();
export default function Layout({children}:{children: React.ReactNode}) {

    return (
        <div className="w-full">
        
          <Container>
          {children}
          </Container>
         

        </div>
    )

}