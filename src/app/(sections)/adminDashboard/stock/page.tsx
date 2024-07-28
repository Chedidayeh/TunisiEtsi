import { getAllCategories } from "@/actions/actions";
import CategoryView from "./CategoryView";



const Page = async () => {


  try {
    const data = await getAllCategories();
    return (
      <>
        <CategoryView categories={data} />
      </>
      );
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }


  
}

export default Page;
