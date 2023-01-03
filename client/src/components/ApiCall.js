import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const ApiCall = () => {
    const [data, setdata] = useState([])
    const [show, setShow] = useState(false);
    const[updateinput,setupdateinput]=useState({name:'',email:'',password:''})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
      getInfo()
    
     
    }, [])

    function getInfo(){

      axios.get('/user')
      .then((res)=>{
          console.log(res.data)
          setdata(res.data)

      })

  }


    const deleteItem=(id)=>{
      console.log(id)
      axios.delete('/deleteList/'+id)
      .then(res=>{
        console.log(res.data)
       getInfo()

      })
      //window.location.reload()
      
    }
    const updateItem=(post)=>{
      console.log(post)
      setupdateinput(post)
      handleShow()
    }

    const handlesubmit=()=>{
     // e.preventDefault()
      console.log(updateinput)
     
      axios.put('/update/'+updateinput._id,updateinput)
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err))
      handleClose()
      
   // window.location.reload()
      

     

    }
    const info= data.map((element,index)=>{
          return(
              <tr key={element.email}>
                  <td>{++index}</td>
                  <td>{element.name}</td>
                  <td>{element.password}</td>
                  <td>{element.email}</td>
                  <td>
                    <div>
                    <button onClick={()=>deleteItem(element._id)}>delete</button>
                    <button onClick={()=>updateItem(element)}>Edit</button>
                    </div>
                  </td>
                 
              </tr>
          )
      })
  
  return (
    <div>
       
        <table className='table table-bordered text-center'>
            <thead>
                <th>SR</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                
            </thead>
            <tbody>
           {info}
            </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body><Form>
     <Form.Group className="mb-3" controlId="formBasicName"   >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder='Enter Name'  value={updateinput.name?updateinput.name:''} onChange={(e)=>setupdateinput({...updateinput,name:e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail"  >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  value={updateinput.email} onChange={(e)=>setupdateinput({...updateinput,email:e.target.value})}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword"  >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  value={updateinput.password} onChange={(e)=>setupdateinput({...updateinput,password:e.target.value})}/>
      </Form.Group></Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlesubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ApiCall