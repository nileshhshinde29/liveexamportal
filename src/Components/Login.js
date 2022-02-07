import React from 'react';
import "./Questions.css"
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
// import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import { GoogleLogin } from "react-google-login"

import axios from "axios"


function Login(props) {
 
    
    
    props.FullScreenfunction(true)

    const navigate = useNavigate()
    const [loginstate, setloginstate] = React.useState(false)
    const [link, setTokan] = React.useState("")
    const recaptchaRef = React.createRef();
    const [formErrors, setformErrors] = useState({})
    const [responseFromGoogle, setResponse] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    const [loginInfo, setLoginInfo] = React.useState({

        email: "",
        password: "",
        reCaptchaToken: ""

    })
    const [loginWithGoogle, setLoginWithGoogle] = useState({

        idToken:"",
        reCaptchaToken: ""
    })
    //************************************************************************************************************** */
    const responseGoogle =async (response) => {
        // responseFromGoogle(response.tokenId)
        const token = await recaptchaRef.current.executeAsync();
        setLoginWithGoogle({idToken : response.tokenId, reCaptchaToken: token})

    
        
      }

      

      React.useEffect(()=>{
        // if(!localStorage.getItem("token"))
        {
            setLoginInfo({ email: "",
                         password: "",
                         reCaptchaToken: ""})
            setloginstate(false)
            setTokan("")
            setformErrors({})
            setIsSubmit(false)
            setLoginWithGoogle({
                idToken:"",
                reCaptchaToken: ""
            })

        }
      },[])

      console.log(loginInfo);



      
    // console.log(responseFromGoogle.tokenId);

    React.useEffect(() => {
        if (loginWithGoogle.idToken!== "") {
            // setformErrors(validate(loginInfo))

            // LoginWithInfo()
            LoginWithGoogleInfo()
            //  fetchApi()
        }

    }, [loginWithGoogle.idToken])

 

    function LoginWithGoogleInfo() {
        // console.log("hello");
        // onSubmitWithReCAPTCHA()
        // console.log(loginInfo.reCaptchaToken)
        // setLoginWithGoogle((prv) => ({ ...prv, reCaptchaToken: loginInfo.reCaptchaToken }))
        axios(`http://admin.liveexamcenter.in/api/auth/google`,

            {
                method: 'POST',
                data: loginWithGoogle,

                headers: {

                    "Content-Type": 'application/json'
                }
            })
            .then((response) => {
                // console.log( response.data.token);


                response.data.token ? (localStorage.setItem("token", JSON.stringify(response.data.token))):localStorage.setItem("token", JSON.stringify(""))
                
                fetchApi()


            })
            .catch((error) => {
                console.log(error)
                setformErrors({ password: "You are not ragistered candidate , please signup " })
            }

            )
    }





   



    //***************************************************************************************************************** */

    function setValue(e) {
        const { name, value } = e.target
        setLoginInfo(prv => ({ ...prv, [name]: value }))

    }

    function fetchApi() {
        axios.get(`http://admin.liveexamcenter.in/api/auth/self`, { headers: { authorization: JSON.parse(localStorage.getItem("token")) } })
            .then((response) => {
                console.log("success");
                console.log(localStorage.getItem("token"))
                // props.setAutorisationfun(link)    
                setloginstate(true)
                
                navigate("/question")

            })
            .catch((error) =>
               { console.log(error)
                console.log(localStorage.getItem("token"))
            }

            )

    }

    //   useEffect(()=>
    //   {
    //     setformErrors(validate(loginInfo))

    //   },[loginInfo])

    function onLogin(e, data) {

        setIsSubmit(true)
        onSubmitWithReCAPTCHA()



        e.preventDefault();

        setformErrors(validate(data))


    }

    useEffect(() => {
        if (Object.keys(formErrors).length == 0 && isSubmit) {

            // navigate("/")
            LoginWithInfo()


        }
    }, [formErrors])

    useEffect(() => {
        if (link) {
            // fetchApi()
        }
    }, [link])







    function LoginWithInfo() {
        axios(` https://admin.liveexamcenter.in/api/auth/login`,

            {
                method: 'POST',
                data: loginInfo,

                headers: {

                    "Content-Type": 'application/json'
                }
            })
            .then((response) => {
                // console.log("success")
                // props.setAutorisationfun(link) 
                console.log(response.data.token);
                setloginstate(true)
                setTokan(response.data.token)
                // console.log("success")
               


                localStorage.setItem("token", JSON.stringify(response.data.token))
                fetchApi()




            })
            .catch((error) => {
                console.log(error)
                setformErrors({ password: "Plese check your Information" })
            }

            )




    }

    const onSubmitWithReCAPTCHA = async (data) => {
        const token = await recaptchaRef.current.executeAsync();
        setLoginInfo(prv => ({ ...prv, reCaptchaToken: token }))

        // setTimeout(() => {
        //     setformErrors(validate(data))
        // },10000)


    }

    React.useEffect(() => {
        if (loginInfo.reCaptchaToken !== "") {
            setformErrors(validate(loginInfo))

            // LoginWithInfo()
            //  fetchApi()
        }

    }, [loginInfo.reCaptchaToken])

    React.useEffect(() => {
        if (link !== "") {
            // fetchApi()
        }
    })
    // ****************************************************Validation*************************************************
    const [formValues, setFormValues] = React.useState(loginInfo)
    useEffect(() => {
        setFormValues(loginInfo)

    }, [loginInfo])

    // const [formErrors, setformErrors] = useState({})

    const validate = (values) => {
        const errors = {}

        if (!values.email) {
            errors.email = "Email is Required"

        }
        if (!values.reCaptchaToken) {
            errors.password = "Somthing went wrong,Please try after some time"

        }
        if (!values.password) {
            errors.password = "password is required"
        }




        return (errors)




    }
    //************************************************************************************************************** */
    return <div>

        <div11 >
            <form onSubmit={(e) => { onLogin(e, loginInfo) }}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" name='email' value={loginInfo.email} onChange={(e => setValue(e))} aria-describedby="emailHelp" />
                    {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <warnning>{formErrors.email}</warnning>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" name="password" value={loginInfo.password} onChange={(e => setValue(e))} id="exampleInputPassword1" />
                </div>
                <warnning>{formErrors.password}</warnning>



                <div class="mb-3 form-check">
                    {/* <input type="checkbox" class="form-check-input" id="exampleCheck1"/> */}
                    {/* <label class="form-check-label" for="exampleCheck1">Check me out</label> */}
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey="6Ld3COIZAAAAAC3A_RbO1waRz6QhrhdObYOk7b_5"
                    // onChange={onChange}
                    />


                </div>
                {loginstate ? (<button class="btn btn-primary  float-start" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>) : <button type="submit" class={"btn btn-primary float-start"}>Login</button>}
                <GoogleLogin
                    clientId="971623344603-0qquan9pcdb9iu7oq9genvpnel77i7oa.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </form>

        </div11>
    </div>;


}

export default Login;
