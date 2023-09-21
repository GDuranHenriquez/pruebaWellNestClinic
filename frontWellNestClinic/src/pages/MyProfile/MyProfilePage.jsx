import BackGroundGlobal from "../../components/backgrounds/BackgroundGlobal";
import { styled } from 'styled-components';
import MyProfileComp from "../../components/MyProfileComp/MyProfileComp";
import {  getUserTwo } from "../../redux/action/actions";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../Authenticator/AuthPro";
import { useEffect, useState } from 'react'
import Loading from "../../components/Loading/Loading"

function MyProfilePage() {
  const dispatch = useDispatch();
  const auth = useAuth(); 
  const userRedux = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const renderUser = () =>{

  }

  useEffect( () => {
    setIsLoading(true)
    dispatch(getUserTwo(auth.user.id, auth.getAccessToken() )).then((data) =>{
      setIsLoading(false);
    })
        
  }, []);

  return <ContinerHomePage>
    
    <BackGroundGlobal imgBackGround="https://gacetamedica.com/wp-content/uploads/2021/10/GettyImages-1201500582.jpg"></BackGroundGlobal>

    {isLoading && <Loading></Loading>}
    {userRedux && <MyProfileComp></MyProfileComp>}
    
  </ContinerHomePage>
}


const ContinerHomePage = styled.div`
  width: 100%;
  height: 100vh;
//  padding-top: calc(100vh * (0.1));

`

export default MyProfilePage;