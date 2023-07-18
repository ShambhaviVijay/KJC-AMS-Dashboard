import Button from "../Common/Button";
import TextField from "../Common/TextField"
import { auth } from "../../Controllers/index";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast, ToastContainer} from 'react-toastify'
import './Login.css'
import { useNavigate } from "react-router-dom";

export default function Login({setUser}){
  const navigator = useNavigate()
  
  if(auth.currentUser){
    setUser(auth.currentUser)
    navigator('/home')
  }
  
  const loginUser = async (e) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
    .then((data)=>{
      setUser(data.user)
      navigator('/home')
      toast.success(data.user.email+" successfully logged in")
      localStorage.setItem('AuthToken', data.user.getIdToken)
    })
    .catch((error)=>{
      toast.error("error")
      console.log(error.message)
    })
  }

  return(
  <div className="login-main">
    <form className='login-card' onSubmit={(e)=>loginUser(e)} >
      <h2>AMS Web Portal</h2>
      <div style={{width:'100%'}}>
        <TextField
          name="email"
          inputStyle={{height: "3rem", flex:'1'}}
          isRequired={true}
          type="email"
          placeholder='Email'
          // inputValue={email}
          // changeHandler={(e)=> handleEmail(e.target.value)}
          inputGroupStyle={{ padding:'0rem', width:'100%'}}
        />
        {/* {validationErors.email && <span style={{fontSize:"13px", color:"red", }} >{validationErors.email}</span>} */}
        <TextField
          name="password"
          inputStyle={{height: "3rem", flex:'1'}}
          isRequired={true}
          placeholder='Password'
          type='password'
          // inputValue={password}
          // changeHandler={handlePassword}
          inputGroupStyle={{padding:'0rem', width:'100%'}}
        />
        {/* {validationErors.password && <span style={{fontSize:"13px", color:"red", }} >{validationErors.password}</span>} */}
      </div>
      <div style={{ width:'100%'}}>
        <Button
          btnClass='primary'
          type="Submit"
          btnStyle={{ padding: '10px', marginTop: '1rem', width:'100%'}}
          text={'Login'}
        />
      </div>
    </form>
    <ToastContainer autoClose={1000} />
  </div>
  )
}