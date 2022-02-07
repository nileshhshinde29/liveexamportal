import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Text() {
    const [no, setNo] = React.useState(0)
    const location = useLocation();   // location.sate = all quetions and options array
    const [state, setState] = React.useState([])

  
     function storeToHook(itemsToStore)
     {
         setState(prevState => [...prevState, itemsToStore])
            // setState(state.map((items)=>{return([...items , itemsToStore])}))


     }
     console.log(state)



    const options = location.state.map((items) => {
        if (items.type) {
            return (items.options.map((items1) => {
                return (

                    <div className="radio" style={{ display: "flex", marginLeft: "100px" }} >
                        <fieldset id={items._id}>
                            <input
                            
                                type="checkbox"
                                name={items._id}
                                value={items1}
                                onClick={() => { storeToHook(items1) }}
                                checked={state == items1}


                            />{items1}
                        </fieldset>

                    </div>



                )
            }))

        }
        else {
            return (items.options.map((items1) => {
                return (

                    <div className="radio" style={{ display: "flex", marginLeft: "100px" }}>
                        <fieldset >
                            <input

                                type="radio"
                                name={items1}
                                value={items1}
                                onClick={() => { setState(items1) }}
                                checked={state == items1}

                            />{items1}

                        </fieldset>
                    </div>



                )
            }))
        }
    })



    console.log(options)

    const que = location.state.map((items) => { return (items.questionText) })




    // console.log(que)

    return (
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">AngularJS Test</div>
                            <div class="panel-body">
                                <form>
                                    <label style={{ display: "flex", marginLeft: "100px" }}>{que[no]}</label>

                                    {options[no]}

                                </form >
                            </div>
                            <div class="panel-footer">

                                <button onClick={() => setNo((pre) => { if (no > 0) { return (pre - 1) } else { return (pre) } })} class="btn btn-success">Pre</button>
                                <button type="submit" onClick={() => setNo((pre) => { if (no < que.length - 1) { return (pre + 1) } else { return (pre) } })} class="btn btn-success">Next</button>
                                <a href="/result" class="pull-right btn btn-danger">Finish</a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


{/* <div class="radio">
<label>
    <input type="radio" name="option" value="option1"/> Javascript Framework
</label>
</div>
<div class="radio">
<label>
    <input type="radio" name="option" value="option2"/> Java Library
</label>
</div>
<div class="radio">
<label>
    <input type="radio" name="option" value="option2"/> Programming Language
</label>
</div> */}
