import React ,{useState, useEffect}from 'react'
import "../../App.css";
import RightNavbar from '../RightSide/RightNavbar';
import RightFooter from '../RightSide/RightFooter';
import RightBody from "../RightSide/RightBody"
import { useSelector } from 'react-redux';
import RightDisplay from '../RightDisplay'
import TopNavbar from './TopNavbar';
import LeftPart from "../LeftPart"
export default function ChatPage() {
  const chatdata=useSelector((state)=>state.ChatArray);
  const SelectedChat= useSelector((state)=>state.SelectedChat) 
  var t=false;
 if(chatdata.length===0){
   t=true;
 }

 const [windowWidth, setWindowWidth] = useState(window.innerWidth);

 useEffect(() => {
   const handleResize = () => {
     setWindowWidth(window.innerWidth);
   };

   window.addEventListener('resize', handleResize);

   return () => {
     window.removeEventListener('resize', handleResize);
   };
 }, []);
console.log(SelectedChat[0].checkerBool)
  return (
    <div className='CP-1'>
       {SelectedChat[0].checkerBool ?   <div className='CP-2'> <RightNavbar/>
      <RightBody/>
      <RightFooter/> </div>: 
      
      windowWidth < 480 ? <TopNavbar /> : <LeftPart />

      }
    </div>
  )
}