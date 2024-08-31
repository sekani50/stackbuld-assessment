import ProductDetail from "@/components/admin/product/ProductDetail";

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <ProductDetail id={id} />;
}
