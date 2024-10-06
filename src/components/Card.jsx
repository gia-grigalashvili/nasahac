
import styled from 'styled-components';
import graped from "/public/imgs/32c9bf9577d8e7d5f6582544b4df596d.jpg";
import saz from "/public/imgs/086e8ae63e53bbc5caa3b6b3a4300d18.jpg";
import sim from "/public/imgs/a2d4df827ca8300d68614bfc2337b052.jpg";

const values = [
    { img: graped, name:"Grape", text: "Grapes are small, sweet fruits used for eating, wine production, and making raisins." },
    { img: saz, name:"Watermelon", text: "Watermelon is a juicy, sweet fruit, rich in water, and popular in summer." },
    { img: sim, name:"Corn", text: "Corn is a versatile grain used for food, animal feed, and various industrial products." }
  ];
   // Array to hold image paths

function Card() {
  return (
    <Maindiv>
      <h1>F R U I T</h1>
      <div className='inf'>
      <p>Grape ipsum dolor sit amet, watermelon adipiscing elit. Corn tincidunt magna non, grape turpis sem vitae et.
         Watermelon ut egestas sit volutpat etiam enim. Corn adipiscing rhoncus.</p>
         </div>
         <CARDS>
        {values.map(({ img, name , text}, index) => ( // Destructure img and name from the object
          <ImageContainer key={index}>
            <img src={img} alt={`NFT ${index + 1}`} />
            <h1>{name}</h1>
            <p>{text}</p> {/* Display the name */}
          </ImageContainer>
        ))}
      </CARDS>
    </Maindiv>
  );
}

const Maindiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  margin-top: 150px;
  h1{
    color: #fff;
    font-size: 76px;
    font-family: Arial, Helvetica, sans-serif;

  }
  .inf{
    display: flex;
    text-align: center;
    width: 450px;
    justify-content: center;
    align-items: center;
    p{
    color: #dddddd;
    font-family: Arial, Helvetica, sans-serif;
  }
  }
  
`;

const CARDS = styled.div`
  display: flex; 
  gap: 40px; 
  padding: 20px;
 
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px; /* Optional: add some border-radius */
  overflow: hidden; /* Clip the image to fit the rounded corners */
  width: 320px;
  padding: 20px;
  text-align: center;
  
  box-shadow: 2px 4px 20px rgba(54, 54, 54, 0.3); 
  border: 3px solid #4102ac;
  
  img {
    width: 300px; /* Ensure images are responsive */
    height: 400px; /* Maintain aspect ratio */
    display: block; /* Remove any bottom space */
    border-radius: 10px; /* Ensure image has rounded corners */
  }
  
  h1 {
    font-size: 25px;
    margin-top: 20px;
    font-family: 'Courier New', Courier, monospace;
  }
  
  p {
    font-size: 14px;
    margin-top: 20px;
    color: #e7e7e7bc;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }

  /* Hover effect */
  &:hover {
    transform: scale(1.05); /* Slightly increase size */
    box-shadow: 0 8px 30px rgba(54, 54, 54, 0.5); /* Increase shadow intensity */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition */
  }
`;




export default Card;
