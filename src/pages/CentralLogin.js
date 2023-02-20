import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@windmill/react-ui';

import Error from '../components/form/Error';
import LabelArea from '../components/form/LabelArea';
import InputArea from '../components/form/InputArea';
 
import BrandDark from '../assets/img/logo/logo-dark.png';
import useLoginSubmit from '../hooks/useLoginSubmit';
const CentralLogin = () => {
    const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();
 
  return (
    <>
     
      <div className=" min-h-screen  p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className='  brand'><img src={BrandDark} alt="brand Icon" /> </h1>
      <h1 className="mt-12 text-2xl bg-gray-50 dark:bg-gray-900    text-center font-semibold text-gray-700 dark:text-gray-200">
                  Login to your account
                <p className="mt-1">
                  <Link
                    className="text-sm font-medium text-yellow-400 dark:text-green-400 hover:underline"
                    to="/signup"
                  >
                  Or Create a new account
                  </Link>
                </p>
                </h1>
        <div className="   items-center h-full max-w-xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
 
          <div className="flex flex-col overflow-y-auto md:flex-row">
          
            <main className="flex items-center justify-center p-2 sm:p-12 md:w-full">
              <div className="w-full">
     

              
                <form onSubmit={handleSubmit(onSubmit)}>
                  <LabelArea label="Email address" />
                  <InputArea
                    register={register}
                    defaultValue="admin@gmail.com"
                    label="Email "
                    name="email"
                    type="email"
                    placeholder="john@doe.com"
                  />
                  <Error errorName={errors.email} />
                  <div className="mt-2"></div>
               
                 
                

                  <Button
                    disabled={loading}
                    type="submit"
                    className="mt-4 h-12 w-full"
                    to="/dashboard"
                  >
                    Log in
                  </Button>
                
                
               
                </form>

                
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default CentralLogin