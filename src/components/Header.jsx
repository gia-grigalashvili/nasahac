import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Logo from "/public/imgs/605a947c2d662438d332bb78_logo-nft-webflow-template.png";
import { Link } from 'react-router-dom';
function Header() {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [passwordError, setPasswordError] = useState(''); // State for password error

  const onSubmit = (data) => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (isLogin) {
     
      if (storedUserData && data.username === storedUserData.username && data.password === storedUserData.password) {
        console.log("Login successful!"); 
        setShowModal(false);
        reset();
        setPasswordError(''); 
      } else {
        setPasswordError('Invalid username or password'); 
      }
    } else {
      console.log(data); 
      localStorage.setItem('userData', JSON.stringify(data)); 
      reset();
      setShowModal(false);
      setPasswordError(''); 
    }
  };

  const toggleModal = (type) => {
    setIsLogin(type === 'login');
    setShowModal(!showModal);
    reset(); // Reset the form when modal is toggled
    setPasswordError(''); // Clear error when modal opens
  };

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Link  to="/">
        <img src={Logo} alt="Company Logo" />
        <h1>EcoShade</h1>
        </Link>
        
      </LogoWrapper>

      <ButtonContainer>
        <button className="loginButton" onClick={() => toggleModal('login')}>
          <span>Login</span>
        </button>
        <button className="signupButton" onClick={() => toggleModal('signup')}>
          <span>Signup</span>
        </button>
      </ButtonContainer>

      {showModal && (
        <ModalOverlay aria-modal="true" role="dialog">
          <ModalContent>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <Error>{errors.username.message}</Error>}

              {isLogin ? (
                <>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: 'Password is required' })}
                  />
                  {errors.password && <Error>{errors.password.message}</Error>}
                  {passwordError && <Error>{passwordError}</Error>} {/* Display password error */}
                </>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && <Error>{errors.email.message}</Error>}

                  <input
                    type="text"
                    placeholder="Country"
                    {...register('country', { required: 'Country is required' })}
                  />
                  {errors.country && <Error>{errors.country.message}</Error>}

                  <input
                    type="text"
                    placeholder="Region"
                    {...register('region', { required: 'Region is required' })}
                  />
                  {errors.region && <Error>{errors.region.message}</Error>}

                  <input className='textswrite'
                    type="text"
                    placeholder="Write text"
                    {...register('text', { required: 'Text is required' })}
                  />
                  {errors.text && <Error>{errors.text.message}</Error>}

                  <input
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 7,
                        message: 'Password must be at least 7 characters long',
                      },
                    })}
                  />
                  {errors.password && <Error>{errors.password.message}</Error>}
                </>
              )}
              <button type="submit">Submit</button>
            </form>
            <CloseButton onClick={() => {
              setShowModal(false);
              reset(); // Clear form and errors on modal close
              setPasswordError(''); // Clear error on modal close
            }}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </HeaderWrapper>
  );
}

const Error = styled.p`
  color: red;
  font-size: 12px;
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 5%;
  color: white;
  h1 {
    font-size: 24px;
    font-family: 'Edu AU VIC WA NT Guides', sans-serif;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
  }
  h1 {
    color: #e4e4e4e8;
  }
  a{
    display: flex;
   align-items: center;
   gap: 20px;
   text-decoration: none; /* Remove underline */
  color: inherit;
  }

`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  button {
    background: none;
    border: 2px solid #8900f1;
    border-radius: 30px;
    cursor: pointer;
    padding: 10px 20px;
    color: white;
    transition: color 0.3s ease, border-color 0.3s ease;
    span {
      font-size: 16px;
    }
    &:hover {
      color: red;
      border-color: red;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 450px;
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .textswrite {
      height: 100px; /* Height of the textarea */
      text-align: left; /* Align text to the left */
      resize: none; /* Prevent resizing if not needed */
      padding: 10px; /* Add padding */
      font-size: 16px; /* Font size */
      border: 1px solid #ccc; /* Border styling */
      border-radius: 5px; /* Rounded corners */
      overflow-y: auto; /* Allow scrolling for overflow text */
    }
  }
  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    &:hover {
      background-color: #0056b3;
    }
  }
`;

const CloseButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
`;

export default Header;