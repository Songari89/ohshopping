import { useUserContext } from "../context/UserProvider";
import {useQueryClient, useQuery, useMutation} from '@tanstack/react-query';
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";

export default function useCart() {
  const {uid} = useUserContext();
  const queryClient = useQueryClient();
  const cartQuery = useQuery({
    queryKey: ['carts', uid || ""],
    queryFn: () => getCart(uid),
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation(
    {mutationFn:(product) => addOrUpdateToCart(uid, product),
      onSuccess: () =>{
        queryClient.invalidateQuries(['cart', uid]) //모든 carts데이터를 업데이트하는게 아니라 로그인된 사용자의 carts 데이터만 업데이트하고 있다. 
      }
    });
  
  const removeItem = useMutation(
    {
      mutationFn: (id) => removeFromCart(uid, id),
      onSuccess : () => {
        queryClient.invalidateQuries(['carts', uid])
      }
    }
  )

  return {cartQuery, addOrUpdateItem, removeItem};
}
