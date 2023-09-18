import React, { useState, useRef } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './style.css'

const OTP: React.FC = () => {
  const [Load, setLoad] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const otpFieldsRef = useRef<HTMLInputElement[]>([]);
  const [otpStore, setOtpstore] = useState<string[]>([]);
//   setOtpstore(otpValues)
 
  console.log(otpStore,"uemda");

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) {
      return;
    }
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    if (value.length === 1 && index < otpValues.length - 1) {
      otpFieldsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (otpValues[index] !== '') {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = '';
      setOtpValues(newOtpValues);
    } else if (index > 0) {
      otpFieldsRef.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otpValues.every(value => value !== '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isOtpComplete) {
      // If OTP is not complete, display an error or alert
      console.log('Please enter the complete OTP.');
      return;
    }
    setOtpValues(['', '', '', '', '', '']);
    setLoad(true);
  
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
    
    <div className="cardss">
      <div className="j">
        <h3>Enter One Time Password</h3>
      </div>
      <form className='form_out'
        onSubmit={handleSubmit}
      >
        {otpValues.map((value, index) => (
          <div
            className="inputClas"
           
            key={index}
          >
            <input
              key={index}
              type="text"
              maxLength={1}
              className="inu"
              value={value}
              onChange={(e) => handleInput(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  handleBackspace(index);
                }
              }}
              ref={(ref) => {
                otpFieldsRef.current[index] = ref as HTMLInputElement;
              }}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="verify"
          style={{
                    background: isOtpComplete ? 'rgb(36, 133, 177) ' : "",
                    cursor: isOtpComplete ? 'pointer' : 'not-allowed',
                }}
             disabled={!isOtpComplete || Load}
        >
          {!Load ? <span> Login</span> : <Spin indicator={antIcon} />}
        </button>
      </form>
    </div>
  </>

  );
};

export default OTP;
