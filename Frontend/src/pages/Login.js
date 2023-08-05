import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userID, setUserID] = useState('');
  const [passkey, setPasskey] = useState('');
  const [result, setResponseResult] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  

  const objReq = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `userID=${userID}&passkey=${passkey}`,
  };

  const goTO = useNavigate();

  useEffect(() => {
    const dataFetch = async () => {
      try {
        let responseData = await fetch('http://localhost:5000/api/login', objReq);
        let responseResult = await responseData.json();
        setResponseResult(responseResult);
      } catch (err) {
        setError('Failed'); 
      } finally {
        console.log('Done loading');
      }
    };
    dataFetch();
  }, [userID,passkey]); 

  const handleData = (e) => {
    e.preventDefault();
    if (result.code !== 'Success') {
      setError('Failed')
    } else {
      setSuccess(result.code);
      goTO('/success');
    }
  };

  return (
    <div className='Login'>
      <form onSubmit={handleData}>
        <label htmlFor='uID'>Username: </label>
        <input
          type='text'
          id='uID'
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
        />
        <br />
        <label htmlFor='pKey'>Password : </label>
        <input
          type='password'
          id='pKey'
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      {error}
    </div>
  );
};

export default Login;
