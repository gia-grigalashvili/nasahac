
import styled from 'styled-components'
import { Link } from 'react-router-dom';
function Main() {
  return (
    <Maindiv>
        <div className='info'>
      <h1>Hello! Welcome to EcoShade!</h1>
      <p>Weve developed a virtual assistant to help farmers protect their crops from potential threats such as droughts.</p>
         </div>
         <Link to="/information"> 
        <button>
          <h2>Demo application</h2>
        </button>
      </Link>
    </Maindiv>
  )
}
const Maindiv=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 100px;
    padding: 20px 200px 0px 200px;
  
    gap: 50px;
    .info{
        width: 610px;
        h1{
       
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
       margin-bottom: 24px;
       font-size: 80px;
       font-weight: 700;
    
       color: #ffffff;
       }
       p{
           font-size: 24px;
       line-height: 38px;
       color: #e2e2e2e2;
       }
    }
    
    button {
    padding: 16px;
    color: #ffffff;
    background: none; 
    border: 2px solid #ca00e4; /* Set border to transparent */
    cursor: pointer;
    font-size: 20px;
    width: 300px;
    box-shadow: 0 24px 34px rgba(74, 58, 255, 0.05), 0 9px 24px rgba(0, 0, 0, 0.45);

    border-radius: 30px; /* Apply border-radius for rounded corners */
}


`
export default  Main