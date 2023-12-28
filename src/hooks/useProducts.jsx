import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getProducts as fetchProducts, addNewProduct } from "../api/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();
  const getProducts = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60,
  }); //여기서 getProducts는 데이터베이스에서 데이터를 query하는 함수
  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: () => queryClient.invalidateQueries(["products"]), //queryKey
  }); //addProduct가 호출되면서 받은 객체(product, url를 분해할당)를 addNewProduct에 전달
  return { getProducts, addProduct };
}
