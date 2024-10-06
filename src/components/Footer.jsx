
import styled from 'styled-components';
import Logo from "/public/imgs/605a947c2d662438d332bb78_logo-nft-webflow-template.png";
import Twiter from "/public/imgs/free-twitter-logo-icon-2429-thumb.png"
import Instgram from "/public/imgs/174855.png"
function Footer() {
  return (
    <Maindiv>
      <Info>
        <Mains>
            
        <img src={Logo} alt="Company Logo" />
        <h1>EcoShade</h1>
        </Mains>
        
        <p>You can contact us and we will help you</p>
        <div className='infor'>
          <img src={Instgram} alt="Twitter Icon" /> 
          <img src={Twiter} alt="Twitter Icon" />  
        </div>
      </Info>
    </Maindiv>
  );
}

const Maindiv = styled.div`
  width: 100%;
 /* Push the footer to the bottom */
  border-top: 2px solid #ccc;
  padding: 40px;
  background-color: #20123E;
  color: #ffffff;
  text-align: center;
  margin-top: 100px;
  p{
font-size: 21px;
  }
`;
const Mains=styled.div`
    display: flex;
    gap: 20px;
`
const Info = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-around;

  img {
    width: 50px;
    height: 50px;
  }

  .infor {
    display: flex;
    gap: 10px;

    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
`;

export default Footer;
