import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const OnlyPayCheckout = () => {
     const navigate = useNavigate();
    
    if (!window.localStorage.getItem("LoginUser")) {
      navigate("/")
    }
  const [cardholderName, setCardholderName] = useState('John Smith');
  const [cardNumber, setCardNumber] = useState('4256 7890 5678 4532');
  const [expiryMonth, setExpiryMonth] = useState('09');
  const [expiryYear, setExpiryYear] = useState('2025');
  const [cvv, setCvv] = useState('145');
  const { money } = useParams();
  let money1 = "";
  let buyitem = JSON.parse(window.localStorage.getItem("all_item"));

  for (let index = 0; index < buyitem.length; index++) {
    const element = buyitem[index];
    if (element.surname == money) {
      console.log(element);
      money1 = element.price;
    }
  }

  const handlePay = () => {
    // Perform payment processing logic here
    // For now, just show a notification

    for (let index = 0; index < buyitem.length; index++) {
      const element = buyitem[index];
    
      if (element.surname == money) {
        // جلب البيانات القديمة من localStorage
        let oldPaid = JSON.parse(window.localStorage.getItem("paid")) || [];
    
        // التأكد أن oldPaid مصفوفة
        if (!Array.isArray(oldPaid)) {
          oldPaid = [];
        }
    
        // إضافة العنصر الجديد إلى المصفوفة
        oldPaid.push(element);
    
        // تحديث localStorage بالقيمة الجديدة
        window.localStorage.setItem("paid", JSON.stringify(oldPaid));
      }
    }
    

  


    toast.success('Payment successful!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-6xl p-6 relative">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="text-2xl font-bold text-pink-500 flex items-center">
            <svg className="w-6 h-6 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            OnlyPay
          </div>
          
          {/* Navigation steps */}
          <div className="ml-auto flex border-b border-gray-200 w-2/3">
            <div className="px-4 py-2 text-pink-500 font-medium text-sm border-b-2 border-pink-500">Payment selection</div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex flex-wrap">
          {/* Left side - Card display */}
          <div className="w-full md:w-1/2 relative mb-8 md:mb-0">
            <div className="absolute w-64 h-64 rounded-full border border-gray-100 -top-8 -left-8"></div>
            <div className="absolute w-2 h-2 bg-pink-500 rounded-full opacity-50 top-8 left-0"></div>
            <div className="absolute w-2 h-2 bg-pink-500 rounded-full opacity-50 bottom-12 left-12"></div>
            
            {/* Credit card */}
            <div className="relative z-10 w-full max-w-sm bg-gradient-to-r from-pink-500 to-pink-400 rounded-xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-start mb-8">
                <div className="w-10 h-6 bg-yellow-500 rounded opacity-80"></div>
                <div className="text-xl font-bold">VISA</div>
              </div>
              
              <div className="text-lg tracking-wider mb-6">
                {cardNumber}
              </div>
              
              <div className="flex text-sm justify-between">
                <div>
                  <div className="text-xs opacity-80 mb-1">CARDHOLDER</div>
                  <div>{cardholderName}</div>
                </div>
                <div>
                  <div className="text-xs opacity-80 mb-1">EXPIRES</div>
                  <div>{expiryMonth}/{expiryYear.slice(2)}</div>
                </div>
                <div>
                  <div className="text-xs opacity-80 mb-1">CVC</div>
                  <div>{cvv}</div>
                </div>
              </div>
              
              {/* Card pattern dots */}
              <div className="absolute top-1/4 right-6 flex flex-col gap-1">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full opacity-30"></div>
                  <div className="w-1 h-1 bg-white rounded-full opacity-30"></div>
                  <div className="w-1 h-1 bg-white rounded-full opacity-30"></div>
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full opacity-30"></div>
                  <div className="w-1 h-1 bg-white rounded-full opacity-30"></div>
                  <div className="w-1 h-1 bg-white rounded-full opacity-30"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Form */}
          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="text-xl font-medium text-gray-800 mb-6">Payment details</h2>
            
            <div className="mb-4">
              <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">
                CARDHOLDER NAME
              </label>
              <div className="flex border-b border-gray-300 py-2">
                <svg className="w-5 h-5 text-pink-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <input 
                  type="text" 
                  className="w-full focus:outline-none bg-transparent" 
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">
                CARD NUMBER
              </label>
              <div className="flex border-b border-gray-300 py-2">
                <svg className="w-5 h-5 text-pink-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                <input 
                  type="text" 
                  className="w-full focus:outline-none bg-transparent" 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex mb-8">
              <div className="w-1/4 mr-4">
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">
                  EXPIRY MONTH
                </label>
                <div className="flex border-b border-gray-300 py-2">
                  <svg className="w-5 h-5 text-pink-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <input 
                    type="text" 
                    className="w-full focus:outline-none bg-transparent" 
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="w-1/4 mr-4">
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">
                  EXPIRY YEAR
                </label>
                <div className="flex border-b border-gray-300 py-2">
                  <svg className="w-5 h-5 text-pink-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <input 
                    type="text" 
                    className="w-full focus:outline-none bg-transparent" 
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="w-1/4">
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">
                  CVC
                </label>
                <div className="flex border-b border-gray-300 py-2">
                  <svg className="w-5 h-5 text-pink-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <input 
                    type="text" 
                    className="w-full focus:outline-none bg-transparent" 
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-gray-700">
                Payment amount: <span className="text-pink-500 font-bold text-lg">{money1}</span>
              </div>
              <button 
                className="bg-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                onClick={handlePay}
              >
                PAY
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OnlyPayCheckout;