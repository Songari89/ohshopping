import React from "react";
import { useUserContext } from "../context/UserProvider";

export default function NewProduct() {
  const {} = useUserContext();
  return <div>New Product</div>;
}
