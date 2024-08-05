
import iAx from "./ConfigAXIOS";

import React, {useState} from 'react';

import {Form, FormGroup, Button, Card ,Table, Pagination , Alert } from 'react-bootstrap';

function App() {
  const [met, setMet] = useState('');
  const [pag, setPag] = useState('');
  const [resp, setRes] = useState(null);
  const [err, setErr] = useState('');




  async function getData() {
    console.log(pag);
    console.log(met);
    try {
      if ( met === 'get'){
        var rta = await iAx.get(pag);
        console.log(rta.data);
      }else if (met === 'post'){
        var rta = await iAx.post(pag);
        console.log(rta);
      }
      setRes(rta.data);
      setErr('');
     console.log(resp)

    } catch (error) {
      if(error.response){
        setRes(error.response.data);
        setErr('');
      }else{
        setRes({error: ' Error en la peticion'});
       
        setErr('Error en la solicitud');
      }
      
    }
    
  } ;

  async function getDatos() {
   
      console.log("holaaa");
     
    
  } ;

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '20rem' }}>
        <Card.Header>Laboratorio #6</Card.Header>
        <Card.Body>
          <Card.Title>Escoge alguna de las opciones</Card.Title>
          
            <div>
          <Form>
              
          <FormGroup controlId='idPagina'>
                <Form.Label>PAGINA</Form.Label>
                <Form.Select onChange={(event) => {setPag(event.target.value); }} aria-label="Default select example">
                    <option value="b"> Escoge una pagina</option>
                    <option value="pag2.html">Pag2.html</option>
                    <option value="index.html">Index.html</option>
                </Form.Select>
              </FormGroup>
              <FormGroup controlId='idMetodo'>
                <Form.Label>METODO</Form.Label>
                <Form.Select  onChange={(event) => {setMet(event.target.value); }} aria-label="Default select example">
                    <option value="a"> Escoge un metodo</option>
                    
                    <option value="get">GET</option>
                    <option value="post">POST</option>
                </Form.Select>
              </FormGroup>
              <br/>
                    
              <Button onClick={getData} type='button' variant='dark'>Guardar</Button>
              
              
            </Form>
            </div>
         
        </Card.Body>
        <Card.Footer className="text-muted">
        
       
                    {resp && (
          <iframe srcDoc={`${resp}`} title="Descripción del iFrame" allowFullScreen></iframe>
                    )}
        </Card.Footer>
      </Card>
        
      </div>
    </div>
  );
}

export default App;
