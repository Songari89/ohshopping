import React from "react";
import { useUserContext } from "../context/UserProvider";
import { Navigate} from 'react-router-dom'
import { BiSolidMessageSquareError } from "react-icons/bi";

export default function ProtectedRoute({children, requireAdmin}) {
  const { user, loading } = useUserContext();
  if(loading){
    return (<p><BiSolidMessageSquareError/>페이지를 읽는 중...</p>);
  }
  if(!user || (requireAdmin && !user.isAdmin)){ //만약 사용자 정보가 없거나 requireAdmin이 true인데 //즉, NewProduct 컴포넌트에 접근했는데 관리자 권한이 없다면 
    return <Navigate to="/" replace={true}/> 
  }
  return children //사용자 정보가 있거나 requireAdmin이 true인데 관리자 권한도 있다면 하위 컴포넌트를 출력  
    //로그인한 사용자 정보가 있는지 (사용자 정보가 없으면 홈으로)
    //그 사용자가 isAdmin이 true인지(관리자 권한이 있는지)
    //requireAdmin 속성 값의 여부(true면 NewProduct false면 Cart만 => children)
}
