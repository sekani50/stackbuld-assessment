import { Container } from "@/components/admin/_components/sideBarLayout/SideBarLayout";

export default function Layout({children}:{children: React.ReactNode}) {

    return (
        <div className="w-full">
        
          <Container>
          {children}
          </Container>
         

        </div>
    )

}