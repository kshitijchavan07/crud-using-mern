import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';




function AddUser() {
    const [input,setinput] = useState({name:'',email:'',password:''})
    const [data, setdata] = useState([])
    const navigate=useNavigate()
  
    console.log(input)
    //alert(input)
    function handler(e){
        e.preventDefault()
        console.log(input)
        
        setdata([{...input},data])
        axios.post('http://localhost:3001/adddata',input)
        navigate('/')

      

    }

  return (
    <Form>
     <Form.Group className="mb-3" controlId="formBasicName" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder='Enter Name ' onChange={(e)=>setinput({...input,name:e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  onChange={(e)=>setinput({...input,email:e.target.value})}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"   onChange={(e)=>setinput({...input,password:e.target.value})}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={handler}>
        Submit
      </Button>
    </Form>
  );
}

export default AddUser;