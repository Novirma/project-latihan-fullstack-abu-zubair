import React from 'react'

const Dashboard = () => {
    return (
      <>
        <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>
  
        <div className="grid lg:grid-cols-3 gap-5 mb-16">
          <div className="rounded bg-white h-50 shadow-sm"><img src='/logo-rog.png' className="h-full w-full object-cover" /></div>
          <div className="rounded bg-white h-50 shadow-sm"></div>
          <div className="rounded bg-white h-50 shadow-sm"></div>
        </div>
        <div className="grid col-1 bg-white h-96 shadow-sm"></div>
      </>
    );
  }

export default Dashboard