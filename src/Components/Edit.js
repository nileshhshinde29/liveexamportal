import React from 'react';
import "./Questions.css"
import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { Navigate, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import ReactQuill from "react-quill"
// import screenFull from "screenfull"

import 'react-quill/dist/quill.snow.css';

// https://admin.liveexamcenter.in/api/questions/61ea8bfee6d7d77c8e51294e

function AddQuestion(props) {
    props.FullScreenfunction(false)

    const location = useLocation()
    const navigate=useNavigate()
    const RecivedObject= location.state.questionsObj

    // console.log(location.state.questionsObj)
    const propsAllArray = props.AllData.result ? props.AllData.result : []
    const [questionTopic, setTopic] = React.useState([])
    const [topic, setTopicOnClick] = React.useState(RecivedObject.topic)//
    const [topicName, setTopicName] = React.useState("")
    const [subject, setSubject] = React.useState([])
    const [subjectName, setSubjectName] = React.useState("")
    const [subjectId, setSubjectOnClick] = React.useState(RecivedObject.subject)//
    const [txtEditor,setTxteditor]=useState(false)


// console.log(RecivedObject)
// console.log(subject)
// console.log(RecivedObject.subject)
    const [OPTIONS, setOPTIONS] = useState([
        { option: "", isCorrect: false, richTextEditor: false },
        { option: "", isCorrect: false, richTextEditor: false },
        { option: "", isCorrect: false, richTextEditor: false },
        { option: "", isCorrect: false, richTextEditor: false }
    ])

     React.useEffect(()=>{ 
     if(RecivedObject.options!==null)
      {
        console.log(OPTIONS)
        console.log(RecivedObject.options)
             setOPTIONS(RecivedObject.options)    
          
         
      }
     
    },[])
    


   
    // const testString=(string)=>{
    //     let htmlRegex = new RegExp("<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)</\\1>");
    //     return htmlRegex.test(string)
    // }
    // console.log(     testString("<p>hello</p>")
    function isHTML(str) {
        var a = document.createElement('div');
        a.innerHTML = str;
      
        for (var c = a.childNodes, i = c.length; i--; ) {
          if (c[i].nodeType == 1) return true; 
        }
      
        return false;
      }
    
    
    const [questionsObj, setQuetionObj] = useState({})
     React.useEffect(()=>{
     setQuetionObj({
        diffLevel: RecivedObject.diffLevel,
        type:RecivedObject.type,
        options:RecivedObject.options,

        questionText: RecivedObject.questionText,
        rightMarks: RecivedObject.rightMarks,
        subject: subjectId,
        topic: RecivedObject.topic,
        type: RecivedObject.type,
        wrongMarks: RecivedObject.wrongMarks

    })},[])
useEffect(()=>{
},[questionsObj])
    // console.log(props.AllData ? props.AllData.result.map(item => item.type):"type")

    // function OnChangeHandaler(e) {

    //     // console.log(e)
    //     const { name, value } = e.target
    //     setQuetionObj(prv => ({
    //         ...prv,
    //         [name]: value
    //     }))
    // }
    const [count , setCount]=useState(0)
    console.log(typeof(questionsObj.questionText));
    console.log(isHTML(JSON.stringify(questionsObj.questionText)));

    function OnChangeHandaler(e, no) {

        console.log(e + no)
        if (no == 0) {
            const { name, value } = e.target
            setQuetionObj(prv => ({
                ...prv,
                [name]: value
            }))
        }
        if (no == 1) {
            // const { name,  } = e
            setQuetionObj(prv => ({
                ...prv,
                ["questionText"]: e
            }))
        }
    }

    React.useEffect(()=>{
        if(!localStorage.getItem("token"))
        {
            navigate("/")
        }
      },[localStorage.getItem("token")])
   
    useEffect(()=>{
        if(isHTML(JSON.stringify(questionsObj.questionText)) && count==0)
        {
            console.log("iam in");
            setTxteditor(true)
            setCount(1)
        }
    })
    console.log(txtEditor);






    React.useEffect(() => {
        axios.get(`http://admin.liveexamcenter.in/api/topics?page=1&limit=9007199254740991&term=`, { headers: { authorization: props.AuthorisationLink } })
            .then((response) => {
                // setTopic(response.data.result.map(items => <li><a class="dropdown-item" onClick={() => { setTopicOnClick(items._id); setTopicName(items.name) }} >{items.name}</a></li>))
            })
            .catch((error) =>
                console.log(error)
            )
    }, [topic])

    // const unic = subject.filter(items=>{return(items.props.children.props.children) } )

    const uni = propsAllArray.map(items => items.type)
    // console.log(propsAllArray)
    const types = [...new Set(uni)]
    const newTypes = types.map(items => { return (<li><a class="dropdown-item" name="type" onClick={() => setQuetionObj(prv => ({ ...prv, ["type"]: items }))}  >{items}</a></li>) })

    // console.log(questionsObj.type);


    //****************************************************************************************** */


    const handleOptionChecked = (index) => {
        // console.log(index)

        setOPTIONS(OPTIONS.map((items , index1)=>{
            return(index==index1 ? {...items, isCorrect:(items.isCorrect ? false:true)} 
            :( questionsObj.type=="MULTIPLE RESPONSE" ? items : {...items,isCorrect:false}))}))
           }

  const handleTextEditor=(index)=>{
        console.log(index)            // ************************************************
        
        setOPTIONS(OPTIONS.map((items, index1) => {
                return (index == index1 ? { ...items, richTextEditor: (items.richTextEditor ? false : true) }
                    : items)
            }))
 }



    React.useEffect(()=>{
        setQuetionObj(prv => ({ ...prv, options:OPTIONS }))
        // console.log(questionsObj.options)
    },[OPTIONS])

        
    const handleOptionText = (e, index ,no) => {

        no==0 ?(
            setOPTIONS((prev) =>
                prev.map((opt, ind) => {
                    return ind === index ? { ...opt, option: e.target.value } : opt
                }))
            ):
            ( setOPTIONS((prev) =>
            prev.map((opt, ind) => {
                return ind === index ? { ...opt, option: e } : opt
            })))
    
            setQuetionObj(prv => ({ ...prv, options: OPTIONS }))
        }


    //     setOPTIONS((prev) =>
    //         prev.map((opt, ind) => {
    //             return ind === index ? { ...opt, option: e.target.value } : opt
    //         }))
    //     setQuetionObj(prv => ({ ...prv, options: OPTIONS }))
    // }

    function addOptionHandler() {
        setOPTIONS(prv => ([...prv, { option: "", isCorrect: false, richTextEditor: false }]))
    }
    function deleteOptionHandler(index) {
        setOPTIONS(OPTIONS.filter((items, index1) => index1 !== index))
    }


// 000000000000000000000000000000000000000000000000000 Topics 000000000000000000000000000000000000000000000000000000000
// http://admin.liveexamcenter.in/api/subjects?term=
//https://admin.liveexamcenter.in/api/topics/subject


React.useEffect(() => {
    axios.get(` http://admin.liveexamcenter.in/api/subjects?term=`, { headers: { authorization: props.AuthorisationLink } })
        .then((response) => {
            setSubject(response.data.result.map(items => <li><a class="dropdown-item" onClick={() => {setQuetionObj(prv=>({...prv, subject:items._id})); setSubjectOnClick(items._id); setSubjectName(items.name) }} >{items.name}</a></li>))
            // subjectId === response.setSubjectName()
            setSubjectName(response.data.result.filter(items=>(subjectId === items._id )).map(items=> items.name))
        })
        .catch((error) =>
            console.log(error)
        )
}, [topic])


React.useEffect(() => {
    axios.get(`https://admin.liveexamcenter.in/api/topics/subject/${subjectId}`, { headers: { authorization: props.AuthorisationLink } })
        .then((response) => {
            // setSubject(response.data.result.map(items => <li><a class="dropdown-item" onClick={() => { setSubjectOnClick(items._id); setSubjectName(items.name) }} >{items.name}</a></li>))
            setTopic(response.data.map(items => <li><a class="dropdown-item" onClick={() => {setQuetionObj(prv=>({...prv,topic:items._id})); setTopicOnClick(items._id); setTopicName(items.name) }} >{items.name}</a></li>))
           if(questionsObj.topic === RecivedObject.topic)
           {
            setTopicName(response.data.filter(items=>items._id===questionsObj.topic).map(items=> items.name))
           }
        },)
        .catch((error) =>
            console.log(error)
        )
},[questionsObj])

// React.useEffect(() => {
//     axios.get(`https://admin.liveexamcenter.in/api/topics/subject/61e95864e6d7d77c8e50e6eb`, { headers: { authorization: props.AuthorisationLink } })
//         .then((response) => {
//             console.log(response.data)
//             // setSubject(response.data.result.map(items => <li><a class="dropdown-item" onClick={() => { setSubjectOnClick(items._id); setSubjectName(items.name) }} >{items.name}</a></li>))

//         })
//         .catch((error) =>
//             console.log(error)
//         )
// })











    // 0: {option: "hgjhfjfghjg", isCorrect: false, richTextEditor: false}
    // 1: {option: "ghjgfjghjfghjfghj", isCorrect: false, richTextEditor: false}
    // 2: {option: "jfkfhjkjhlhjlghjklh", isCorrect: true, richTextEditor: false}
    // 3: {option: "fghjfhjfghj", isCorrect: false, richTextEditor: false}
    // questionText: "gdfhhfhgfjhjhgjhgkjkjhkjhk"
    // rightMarks: 1
    // subject: "61e678dde6d7d77c8e5087e6"
    // topic: "61e7af57e6d7d77c8e508c59"
    // type: "MULTIPLE CHOICE"
    // wrongMarks: 0


    // *********************************************************************************************

    // function AddQuestionIntoArray(data) {
    //     if (window.confirm("are you sure want to Add Queston ?")) {
    //         axios(`https://admin.liveexamcenter.in/api/questions/${RecivedObject.id}`,

    //             {
    //                 method: 'PUT',
    //                 data: data,

    //                 headers: {
    //                     'Authorization': props.AuthorisationLink,
    //                     "Content-Type": 'application/json'
    //                 }
    //             })



    //             .then((response) => {
    //                 console.log("success")
    //             })
    //             .catch((error) =>
    //                 console.log(error)
    //             )
    //     }

    // }
    //  *******************************************************************************

    const redioOrCheckBox = questionsObj.type == "MULTIPLE RESPONSE" ? "checkbox" : "radio"
    const inputOptions = OPTIONS.map((opt, ind) => {

        console.log(opt)
        if(('richTextEditor' in opt)==false)
        {
            return( isHTML(opt.option)==false ?
                (<>
                   <div class="input-group">
                       <span class="input-group-text"><input id={ind}
                           type={redioOrCheckBox}
                           checked={opt.isCorrect}
                           onChange={() => handleOptionChecked(ind)}
                           name="option"
                       /><label for={ind}>{" "} option {ind + 1} </label> </span>
       
                       <textarea class="form-control"
                           value={OPTIONS[ind].option}
                           onChange={(e) => handleOptionText(e, ind,0)}
                           aria-label="With textarea"></textarea>
                   </div>
                   <button type="button" onClick={() => deleteOptionHandler(ind)}  class="btn grayButton btn float-start">Remove{" |"}</button>
                   <button type="button" class=" btn float-start grayButton" onClick={()=>{handleTextEditor(ind)}}>{"Enable Rich text editor"}</button>
       
                   <p></p>
               </>) 
               :
                (<>
                   <div class="input-group">
                       <span class="input-group-text"><input id={ind}
                           type={redioOrCheckBox}
                           checked={opt.isCorrect}
                           onChange={() => handleOptionChecked(ind)}
                           name="option"
                       /><label for={ind}>{" "} option {ind + 1} </label> </span>
       
                       <ReactQuill style={{overflow:"scroll", width:"89%",}}
                       theme="snow"
                           value={OPTIONS[ind].option}
                           onChange={(e) => handleOptionText(e,ind,1)}
                           />
                            {/* <ReactQuill theme="snow"value={values} onChange={(e)=>tediter(e)} /> */}
                   </div>
                   <button type="button" onClick={() => deleteOptionHandler(ind)}  class="btn btn grayButton float-start">{"Remove |"}</button>
                   <button type="button" class=" btn float-start grayButton" onClick={()=>{handleTextEditor(ind)}}>{"Disable Rich text button"}r</button>
       
                   <p></p>
               </>) 
               )
        }
        else{
            return( opt.richTextEditor== false ?
                (<>
                   <div class="input-group">
                       <span class="input-group-text"><input id={ind}
                           type={redioOrCheckBox}
                           checked={opt.isCorrect}
                           onChange={() => handleOptionChecked(ind)}
                           name="option"
                       /><label for={ind}>{" "} option {ind + 1} </label> </span>
       
                       <textarea class="form-control"
                           value={OPTIONS[ind].option}
                           onChange={(e) => handleOptionText(e, ind,0)}
                           aria-label="With textarea"></textarea>
                   </div>
                   <button type="button" onClick={() => deleteOptionHandler(ind)}  class="btn grayButton btn float-start">Remove</button>
                   <button type="button" class=" btn float-start grayButton"  onClick={()=>{handleTextEditor(ind)}}>{opt.richTextEditor ? "Disable Rich text editor":"Enable Rich text editor"}</button>
       
                   <p></p>
               </>) 
               :
                (<>
                   <div class="input-group">
                       <span class="input-group-text"><input id={ind}
                           type={redioOrCheckBox}
                           checked={opt.isCorrect}
                           onChange={() => handleOptionChecked(ind)}
                           name="option"
                       /><label for={ind}>{" "} option {ind + 1} </label> </span>
       
                       <ReactQuill style={{overflow:"scroll", width:"89%",}}
                       theme="snow"
                           value={OPTIONS[ind].option}
                           onChange={(e) => handleOptionText(e,ind,1)}
                           />
                            {/* <ReactQuill theme="snow"value={values} onChange={(e)=>tediter(e)} /> */}
                   </div>
                   <button type="button" onClick={() => deleteOptionHandler(ind)} style={{ width: "100px", margin: "1px ", fontSize: "15x" }} class="btn grayButton btn float-start">Remove</button>
                   <button type="button" class=" btn float-start grayButton" onClick={()=>{handleTextEditor(ind)}}>{opt.richTextEditor ? "Disable Rich text editor ":"Enable Rich text editor"}</button>
       
                   <p></p>
               </>) 
               )
       
       
        }
       


        // return (<>
        //     <div class="input-group">
        //         <span class="input-group-text"><input id={ind}
        //             type={redioOrCheckBox}
        //             checked={opt.isCorrect}
        //             onChange={() => handleOptionChecked(ind)}
        //             name="option"
        //         /><label for={ind}>{" "} option {ind + 1}</label></span>

        //         <textarea class="form-control"
        //             value={OPTIONS[ind].option}
        //             onChange={(e) => handleOptionText(e, ind)}
        //             aria-label="With textarea"></textarea>
        //     </div>
        //     <button type="button" onClick={() => deleteOptionHandler(ind)} style={{ width: "100px", margin: "1px ", fontSize: "15x" }} class="btn btn float-start">Remove</button>
        //     <p></p>
        // </>)




    })


    //********************************************** Validation ********************************************** */

    const myObj = questionsObj
    const [formValues, setFormValues] = React.useState(myObj)
    useEffect(() => {
        setFormValues(myObj)

    }, [questionsObj])

    const [formErrors, setformErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    
    const AddQuestionIntoArray = (e, data) => {
        e.preventDefault();
       
        setformErrors(validate(data))

          setIsSubmit(true)
       
        // console.log(Object.keys(formErrors).length )
        // if(Object.keys(formErrors).length ==0 && isSubmit)
        // {

        // // if (window.confirm("are you sure want to add question?")) {
        //     axios(` https://admin.liveexamcenter.in/api/questions`,

        //         {
        //             method: 'POST',
        //             data: data,

        //             headers: {
        //                 'Authorization': props.AuthorisationLink,
        //                 "Content-Type": 'application/json'
        //             }
        //         })
        //         .then((response) => {
        //             console.log("success")
        //             // window.location.reload()



        //         })
        //         .catch((error) =>
        //             console.log(error)
        //         )

        // // }
        // // else{
        // //     isSubmit(false)
        // // }
        // }


    }
    useEffect(() =>{
        if(Object.keys(formErrors).length ==0 && isSubmit)
        {

        if (window.confirm("are you sure want to add question?")) {
            axios(`https://admin.liveexamcenter.in/api/questions/${RecivedObject.id}`,

                        {
                            method: 'PUT',
                            data: formValues,
        
                            headers: {
                                'Authorization': props.AuthorisationLink,
                                "Content-Type": 'application/json'
                            }
                        })
        
        
        
                        .then((response) => {
                            console.log("success")
                            navigate('/question')
                            window.alert('Your Question is Saved Successfully!')
                            
                        })
                        .catch((error) =>
                            console.log(error)
                        )
                }
        
            }
        
    },[formErrors])

    const validate = (values) => {
        const errors = {}

        if (!values.questionText) {
            errors.questionText = "question text is require"

        }
        if (!values.subject) {
            errors.subject = "Subject is required !"
        }
        if (!values.topic) {
            errors.topic = "Topic is required"
        }
        if (values.rightMarks <= 0) {
            errors.rightMarks = "value should be greater than zero"
        }
        if (!values.rightMarks) {
            errors.rightMarks = "Please entre valid marks"
        }
      
        if (values.wrongMarks == "" && values.wrongMarks !== 0) {
            errors.wrongMarks = "Please entre valid marks"
        }

        if (formValues.options == false) {
            errors.options = "Atleast One Option Is mendetory"
        }
        if (formValues.options.filter(items => items.isCorrect == true) == "") {
            errors.options = "You must have to provide atleast one option!"
        }
        if ((new Set(formValues.options.map(items => items.option)).size == questionsObj.options.length) == false) {
            errors.options = "option Must be Unique"
        }

        if (formValues.options.filter(items => items.option == "") == "") {

        }
        else {
            errors.options = "All options are Mendatory!, other wise you can remove unneccesory option field"
        }

        return (errors)
    }
    // useEffect(()=>{
    //     validate(formValues)
    // },[questionsObj])
    // var el =document.documentElement; 
    // el.requestFullscreen()

    // let element= document.documentElement;
    // const makeFullscreen = () => {
    //     document.requestFullscreen()
    //   }
    // //   makeFullscreen()
    // let element = document.getElementById("myForm")
    //  screenFull.request()

     const [FullScreen ,setFullScreen]=useState(false)
   useEffect(()=>
   {
    props.FullScreenfunction(FullScreen)
   },[FullScreen])


    // *********************************************************************************************

console.log(questionsObj)

    return (
        <div>  <div className="border " style={{ margin: "5% 5% 0 5%", padding: "20px",width:"90%", display:"inline-flex",justifyContent:"space-between"  }}>
        <h3 style={{ display: "flex", }}>Edit Question</h3>
        <b onClick={() => { setFullScreen(!FullScreen) }} style={{ display: "flex",width:"40px",fontSize:"40px",color:"gray",marginRight:"2%"}}>{FullScreen==false ? "???":"???"}</b>
    </div>

            <form className="border" id="myForm" onSubmit={(e)=>{ AddQuestionIntoArray(e,questionsObj) }} style={{ margin: "0% 5% 5% 5%", padding: "1%" }}>

                <div class="row ">

                <div className="col ">
                        <p className="floatLeft">Search Subject<star>*</star></p>
                        <button class="btn border floatLeft dropdown-toggle " style={{ width: "95%" }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {/* {subjectName ? subjectName:"Type To Search Subject"} */}
                            {subjectName!=="" ? (subjectName) : "Type To searh"}  
                            {subjectName ? (<b style={{ fontSize: "20px" }} onClick={() =>{ setSubjectName("") ;setTopicName("");setQuetionObj(prv=>({...prv,subject:"",topic:""})); setTopic([])}} className="onhour">  x</b>) : ""}

                        </button>
                        <warnning>{formErrors.subject}</warnning>

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {subject }
                        </ul>
                    </div>
                    <div class="col">
                        {/* <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" /> */}
                        <p className="floatLeft">Select Topic<star>*</star></p>
                        <button class="btn border dropdown-toggle floatLeft" style={{ width: "95%" }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {topicName!=="" ? (topicName) : "Type To Search"}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                         {questionTopic.length!==0 ? (questionTopic) :  <li><a class="dropdown-item disabled" name="type"  >No Topic </a></li>}
                            {/* {questionTopic} */}

                        </ul>
                        <warnning>{formErrors.topic}</warnning>
                    </div>
                    <br></br>

                    <div class="row " style={{ marginTop: "20px" }}>
                        <div class="col">
                            <p className="floatLeft">Question type<star>*</star></p>
                            <button class="btn border dropdown-toggle floatLeft" style={{ width: "95%" }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {questionsObj.type}
                            </button>

                            <ul class="dropdown-menu" name="type" style={{ width: "230px" }} aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" name="type" onClick={(e) => OnChangeHandaler(e)} >Medium</a></li>
                                {newTypes}

                            </ul>
                        </div>
                        <div class="col">
                            {/* <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" /> */}
                            <p className="floatLeft">Difficulty Level<star>*</star></p>
                            <button class="btn border dropdown-toggle floatLeft" type="button" style={{ width: "95%" }} id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {questionsObj.diffLevel}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" onClick={() => setQuetionObj(prv => ({ ...prv, ["diffLevel"]: "Medium" }))} >Medium</a></li>
                                <li><a class="dropdown-item" onClick={() => setQuetionObj(prv => ({ ...prv, ["diffLevel"]: "Hard" }))} >Hard</a></li>
                                <li><a class="dropdown-item" onClick={() => setQuetionObj(prv => ({ ...prv, ["diffLevel"]: "Easy" }))} >Easy</a></li>

                            </ul>
                        </div>
                        <div class="col">
                            <p className="floatLeft">Right Marks<star>*</star></p>
                            <input className="form-control"
                                value={questionsObj.rightMarks}
                                name="rightMarks"
                                onChange={(e) => OnChangeHandaler(e)}
                                style={{ width: "95%" }} />

                        <warnning>{formErrors.rightMarks}</warnning>
                        </div>
                        <div class="col">
                            {/* <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" /> */}
                            <p className="floatLeft">Wrong Marks<star>*</star></p>
                            <input className="form-control" name="wrongMarks" onChange={(e) => OnChangeHandaler(e)} value={questionsObj.wrongMarks} style={{ width: "95%" }} ></input>


                            <warnning>{formErrors.wrongMarks}</warnning>
                        </div>
                    </div>
                    <div>
                    <div class="form-floating" style={{ margin: "10px" }}>
                            <p style={{ float: "left" }}>Question<star>*</star></p>
                            { txtEditor==false ? <textarea class="form-control" name="questionText" value={questionsObj.questionText} onChange={(e) => { OnChangeHandaler(e,0) }} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                :
                                (<> <br></br> <ReactQuill theme="snow"value={questionsObj.questionText} name="questionText" onChange={(e)=>OnChangeHandaler(e,1)} /></>)
                                
                                    }
                            <label for="floatingTextarea"></label>
                            <warnning>{formErrors.questionText}</warnning>
                            <button type="button" class=" btn float-start grayButton"  onClick={()=>{setTxteditor(!txtEditor)}}>{txtEditor ? "Disable Rich text editor":"Enable Rich text editor "}</button>
                        </div>
                    </div>

                    {/*****************************Options********************************************************/}

                    <div>
                        <p style={{ float: "left" }}>Options <star>*</star></p>
                        {inputOptions}
                        <warnning>{formErrors.options}</warnning>
                    </div>
                    <p></p>
                    <button type="button" onClick={() => addOptionHandler()} style={{ width: "200px" }} class="btn  boldFont nave-link float-start">+ Add Option</button>
                    <p></p>
                    <button type="submit" style={{ width: "200px", margin: "10px" }}  class="btn btn-primary float-start">Update Question</button>
                    <button type="button" style={{ width: "100px", margin: "10px" }} onClick={()=>navigate('/question')} class="btn btn-light float-start">Cancel</button>
                </div>
                
            </form>;
        </div>
    )
}

export default AddQuestion;




