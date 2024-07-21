import CategoryView from "./CategoryView"
import { getAllCategoriesWithDetails } from "./actions"


const Page = async () =>{

    const categories = await getAllCategoriesWithDetails()

    return (
        <CategoryView categories={categories} />
    )

}

export default Page