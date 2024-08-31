import Singlecategory from "@/components/singleCategory/SingleCategory";

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <Singlecategory id={id} />;
}
