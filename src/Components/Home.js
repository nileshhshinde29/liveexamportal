import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home(props) {
    // const [array, setArray] = React.useState([])
    
    
    const navigate = useNavigate();
    




    const testElement = props.allArray.map((items) => {
        return (
            <tr>
                <td>{items.name}</td>
                <td>{items.questions.length}</td>
                <td>< button onClick = {()=>{navigate("/test",{state: items.questions})}} class="btn btn-warning">Start Test</button></td>
            </tr>
        )
    })
    return (

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-striped">
                        <thead>

                            <tr style={{color:"black",fontWeight:"bolder"}}>
                                <td>Test</td>
                                <td>No of Questions</td>
                                <th></th>
                            </tr>
                           
                        </thead>
                        <tbody>
                            {testElement}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
