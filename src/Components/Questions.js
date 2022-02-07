import React, { useRef } from "react";
import "./Questions.css"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { useNavigate } from "react-router";

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Edit from "./Edit";



export default function Question(props) {

    
    props.FullScreenfunction(false)

    const navigate = useNavigate()
    const [hello, set] = React.useState("hello")
    const [data, setAllData] = React.useState([])
    const allArray = data.result ? data.result : []
    const propsAllArray = props.data.result ? props.data.result : []
    const AllQuestions = allArray.map(items => { return (<tr dangerouslySetInnerHTML={{ __html: `<myDiv>${items.questionText}</myDiv>` }} />) })
    const AllOptions = allArray.map(items => { return (items.options) })


    //*******************************************************************************

    const [pageNo, setPageNo] = React.useState(1)
    const [limit, setLimit] = React.useState(5)
    const [search, setSearch] = React.useState("")
    const [questionTopic, setTopic] = React.useState([])  //61d963cce6d7d77c8e4f302e
    const [topic, setTopicOnClick] = React.useState("")
    const [topicName, setTopicName] = React.useState("")


    // ******************************************************************************
    function fetching() {
        axios.get(`http://admin.liveexamcenter.in/api/questions?page=${pageNo}&limit=${limit}&term=${search}&topic=${topic}`, { headers: { authorization:JSON.parse(localStorage.getItem("token")) } })
            .then((response) => {
                setAllData(response.data)
            })
            .catch((error) =>
                console.log(error)
            )
        props.TopicFunction(topic)
        pagination.current.setState({ selected: pageNo - 1 })
    }

    React.useEffect(() => {
        fetching()
    }, [pageNo, limit, search, topic,localStorage.getItem("token")])

    const pagination = useRef()

    //********************************************************************************************* */

    React.useEffect(() => {
        axios.get(`http://admin.liveexamcenter.in/api/topics?page=1&limit=9007199254740991&term=`, { headers: { authorization: JSON.parse(localStorage.getItem("token")) } })
            .then((response) => {
                setTopic(response.data.result.map(items => <li><a class="dropdown-item" onClick={() => { setTopicOnClick(items._id); setPageNo(1); setTopicName(items.name) }} >{items.name}</a></li>))
            })
            .catch((error) =>
                console.log(error)
            )
    }, [topic,localStorage.getItem("token")])


    //*********************************************************************************************** */

  React.useEffect(()=>{
    if(!localStorage.getItem("token"))
    {
        navigate("/login")
    }
  },[localStorage.getItem("token")])

    //******************************************************************************

    const optionSet = AllOptions.map((items2, index) => {

        return (
            items2.map((itm) => {

                return (

                    <tr >
                        {allArray[index].type == "MULTIPLE RESPONSE" ? (<label3 style={{ color: "gray" }}><input disabled="true" type="checkbox" checked={itm.isCorrect} /><lablel3></lablel3>{<a dangerouslySetInnerHTML={{ __html: `${itm.option}` }} />}</label3>) : <label3 style={{ color: "gray" }} style={{ color: "gray" }}><input type="radio" disabled="true"  checked={itm.isCorrect} />{<a dangerouslySetInnerHTML={{ __html: `${itm.option}` }} />}</label3>}
                    </tr>
                )
            })
        )
    })

    //********************************************************************************* */ 


    function deleteById(id) {
        if (window.confirm("are you sure want to delete ?")) {
            axios.delete(`http://admin.liveexamcenter.in/api/questions/${id}`, { headers: { authorization: props.AuthorisationLink } })
                .then((response) => {
                    fetching()
                    console.log("success")
                })
                .catch((error) =>
                    console.log(error)
                )
        }

    }
    const [questionsObj, setQuetionObj] = React.useState(null)
    const EditByID = (obj) => {

        setQuetionObj({
            diffLevel: obj.diffLevel,
            type: obj.type,
            options: obj.options,

            questionText: obj.questionText,
            rightMarks: obj.rightMarks,
            subject: obj.subject,
            topic: obj.topic,
            type: obj.type,
            wrongMarks: obj.wrongMarks,
            id: obj._id


        })
        // console.log("61eaa2fbe6d7d77c8e512a21   "+obj._id)


    }//http://admin.liveexamcenter.in/api/subjects?term=


    React.useEffect(() => {
        // props.functionForEdit(questionsObj)
        if (questionsObj !== null) {
            if (window.confirm("are you sure want to Edit?")) {

                navigate("./edit", { state: { questionsObj } })


            }
        }

    }, [questionsObj])
    // console.log(questionsObj)

    //********************************************************************************* */ 

    const mainArray = AllQuestions.map((items, index) => {

        //   { console.log(allArray[index].topic==questionTopic)}

        return (<>
         <label for={index} style={{ display: "flex" }}>
            <input id={index} style={{ float: "left" , display:"inline-block" }} className="form" type="checkbox" />{items} </label>
               

            <br></br>
            <br></br>


            {optionSet[index]}
            <button class="myButton" onClick={() => { EditByID(allArray[index]) }}   >edit</button><button onClick={() => deleteById(allArray[index]._id)} class="myButton">Delete</button>
            <br></br>
            <hr class="style17"></hr>
            <br></br>


        </>)


    }
    )

    // const mainArray2 = mainArray.filter(items => {
    //     if (items !== null) {
    //         return (
    //             items
    //         )

    //     }
    // })


    // const [usersPerPage, setUsersPerPage] = React.useState(5)
    // const pageVisited = (pageNo - 1) * usersPerPage;
    // const displayUsers = mainArray2.slice(pageVisited, pageVisited + usersPerPage)
    // const [categary, setCategary] = React.useState("")


    // console.log(mainArray2)

    const handlePageClick = (data) => {
        setPageNo(data.selected + 1)
    }

    const searchinng = (e) => {
        setSearch(e.target.value)
        setPageNo(1)


        // const searchedTerm= 
    }

    const searchedArray = (propsAllArray.filter(items => items.questionText.toLowerCase().includes(search.toLowerCase())))




    return (
        <div>
            <button type="button" style={{ float: "right", marginRight: "6%", marginTop: "10px" }} onClick={() => navigate("/add")} class="btn btn-primary">+ Add Question</button>
            <div1 class="border"  >
                


                <div2>
                    <div class="dropdown" style={{ float: "left" }}>
                        Show <button class="btn border dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {limit}
                        </button> Records Per Page
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" onClick={() => { setLimit(5); setPageNo(1) }}>5</a></li>
                            <li><a class="dropdown-item" onClick={() => { setLimit(10); setPageNo(1) }}>10</a></li>
                            <li><a class="dropdown-item" onClick={() => { setLimit(20); setPageNo(1) }}>20</a></li>
                            <li><a class="dropdown-item" onClick={() => { setLimit(30); setPageNo(1) }}>30</a></li>
                            <li><a class="dropdown-item" onClick={() => { setLimit(50); setPageNo(1) }}>50</a></li>
                        </ul>
                    </div>


                    <input style={{ height: "40px", marginLeft: "60%", display: "flex", width: "200px" }} class="form-control me-2" type="search" placeholder="   search" onChange={searchinng} />


                    <div class="dropdown form-control  " style={{ marginLeft: "10px", height: "40px", width: "200px" }}>
                        <h class="  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {(topic ? (topicName) : "choose topic")}{topic ? (<a style={{ fontSize: "20px" }} onClick={() => setTopicOnClick("")}>  x</a>) : ""}
                        </h>
                        <ul class="dropdown-menu" placeholder="Choose topic" aria-labelledby="dropdownMenuButton1">
                            {questionTopic}
                        </ul>
                    </div>


                </div2>

                <br></br>
                <br></br>
                <hr class="style17"></hr>

                <>
                    {mainArray}
                    <ReactPaginate
                        ref={pagination}
                        previousLabel={"privious"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(searchedArray.length / limit)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                        containerClassName={"pagination justify-content-center"}

                    />
                </>
            </div1>

            <div className="App">
                <Routes>

                    <Route path="/edit" element={<Edit />} />

                </Routes>
            </div>


        </div>

    )
}