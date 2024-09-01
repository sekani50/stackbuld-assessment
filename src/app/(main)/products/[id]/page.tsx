import SingleProduct from "@/components/singleProduct/SingleProduct";

export default function Page({params:{id}}:{params: {id:string}}) {

    return <SingleProduct id={id}/>

}