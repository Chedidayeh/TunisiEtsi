
import { getUserPreOrder } from './actions';
import OrderPreview from './OrderPreview';
import { getUser } from '@/actions/actions';

interface PageProps {
    params: {
      preOrderId: string
    }
  }
const Page = async ({ params }: PageProps) => {

    const { preOrderId } = params

    const user = await getUser()

    const preOrder = await getUserPreOrder(preOrderId !== "" ? preOrderId : user!.id);



    return  <OrderPreview preOrder={preOrder!} user={user!} />

 

};

export default Page;
