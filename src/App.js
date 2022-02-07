        import './App.css';
        import  React, { useState } from 'react'
        import Navebar from './Components/Navbar';
        import axios from 'axios'
        import AddQuestion from "./Components/AddQuestion"
        import {BrowserRouter as Router, Switch,Route, Routes, useSearchParams } from 'react-router-dom';
        import Edit from "./Components/Edit";
        import Login from "./Components/Login";


        import { useLocation } from 'react-router-dom';


        import Question from './Components/Questions';

        function App() {
          // const location = useLocation()
          // console.log(location.state)
          const [AllData, setAllData]=React.useState([])
          const [arrayLength, setLength]=React.useState()
          // const [pageNo ,setPageNo]=React.useState(1)
          const [topic , setTopic]=React.useState("")
          const [AuthorisationLink, setAuthorisationLink]=React.useState(localStorage.getItem("token") ?JSON.parse( localStorage.getItem("token")):"")
          console.log(AuthorisationLink);
          // const AuthorisationLink="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRlN2Y1Y2U2ZDdkNzdjOGU0ZmI2NDQiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQzNzA3MDM5LCJleHAiOjE2NDM3NTAyMzl9.LnY3QOSMoouFK8nEhv1C530rYUsyweL9ww3N5b6fvSc"
          // const [topic , setTopic]=React.useState("")

          console.log(localStorage.getItem("token"));

        function fetchApi(pageNo="") {
          axios.get(`http://admin.liveexamcenter.in/api/questions?page=${pageNo}&limit=&term=&topic=${topic}`, { headers: { authorization: AuthorisationLink  } })
          .then((response) => {
              setAllData(response.data)
            
          })
          .catch((error) =>
              console.log(error)
          
              )

        }

        // *********************************
        var hours = 8; // to clear the localStorage after 1 hour(if someone want to clear after 8hrs simply change hours=8)
        var now = new Date().getTime();
        var setupTime = localStorage.getItem('setupTime');
        if (setupTime == null) {
            localStorage.setItem('setupTime', now)
        } else {
            if(now-setupTime > hours*60*60*1000) {
                localStorage.clear()
                localStorage.setItem('setupTime', now);
            }
        }


        // ***************************************
        

        function TopicFunction(topic)
        {
            setTopic(topic)
            console.log(topic)
        }

        React.useEffect(() => {
          fetchApi(1,topic)
        }, [topic])

          // setLength(AllData.result.length)
    const [FullScreen , setFullScreen]=useState(false)

         const FullScreenfunction=(props)=>{
            setFullScreen(props)
         } 


        //  const setAutorisationfun =(link)=>{
        //   setAuthorisationLink(link)
        //  }





        // console.log(AllData)
          return (
            <Router>
            <div className="App">
              {FullScreen ?"":<Navebar />  } 
            <Routes>  

            <Route path="/question" element={ <Question  data={AllData} AuthorisationLink={AuthorisationLink} TopicFunction={TopicFunction}  FullScreenfunction={FullScreenfunction} />}/>
            <Route path="/add" element={<AddQuestion  AuthorisationLink={AuthorisationLink} AllData={AllData} FullScreenfunction={FullScreenfunction} />}/>
            <Route path="/edit" element={<Edit  AuthorisationLink={AuthorisationLink} AllData={AllData} FullScreenfunction={FullScreenfunction}/>}/>
            <Route path="/" element={<Login  FullScreenfunction={FullScreenfunction}  /> }/>
            </Routes>
            </div>
              
            </Router>
          );
        }

        export default App;


        // <Router>
      //  <Header />
      //  <Routes>        
         
      //   <Route path="/"     element={<ContactList contact={contact} getId={contactRemove}  getId1={ContactView}/>}/>
      //   <Route path="/add"  element={<AddContacts inputs={inputs} />}/>
      //   <Route path="/view" element={<View />}/>
      // {/* <AddContacts inputs={inputs}/> */}
      //   {/* <ContactList contact={contact} getId={contactRemove}/> */}
      //   </Routes>
      // </Router>