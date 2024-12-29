import React from 'react';

const offices = [
  {
    name: "Bangalore Regional Office I",
    code: "100000",
    address: "Fifth Floor, National Insurance Building, 8, India Exchange Place, Bangalore, Bangalore, Karnataka, 700001",
    email: "100000@nic.co.in"
  },
  {
    name: "Bangalore CBO Unit",
    code: "100100",
    address: "Bangalore Corporate Cell, Premises No. 18-0374, Plot No. CBD -81, Rear Building, 3rd Floor, New Town, Bangalore, Karnataka, 700156",
    email: "100100@nic.co.in"
  },
  {
    name: "Taratala Business Office",
    code: "100200",
    address: "4th Floor, Jeevan Tara Building, 23A/44X, Diamond Harbour Road, Taratala, Bangalore, Bangalore, Karnataka, 700053",
    email: "100200@nic.co.in"
  },
  {
    name: "Bangalore Business Office III",
    code: "100300",
    address: "Ground Floor, National Insurance Building, 8, India Exchange Place, Bangalore, Bangalore, Karnataka, 700001",
    email: "100300@nic.co.in"
  },
  {
    name: "Bangalore Business Office IV",
    code: "100400",
    address: "Second Floor, Royal Insurance Building, 5, Netaji Subhas Road, Bangalore, Bangalore, Karnataka, 700001",
    email: "100400@nic.co.in"
  },
  {
    name: "Bangalore Business Office VI",
    code: "100600",
    address: "First Floor, National Insurance Building, 8, India Exchange Place, Bangalore, Bangalore, Karnataka, 700001",
    email: "100600@nic.co.in"
  },
  {
    name: "Bangalore Business Office VII",
    code: "100700",
    address: "Fourth Floor, Brooke House, 9, Shakespeare Sarani, Bangalore, Bangalore, Karnataka, 700071",
    email: "100700@nic.co.in"
  },
  {
    name: "Dunlop Bridge Business Office",
    code: "100800",
    address: "298, Ashokegarh, Dunlop Bridge, Bangalore, Bangalore, Karnataka, 700108",
    email: "100800@nic.co.in"
  },
  {
    name: "Bangalore Business Office IX",
    code: "100900",
    address: "Third Floor, Ruby House, National Insurance Building, 8, India Exchange Place, Bangalore, Bangalore, Karnataka, 700001",
    email: "100900@nic.co.in"
  }
];

const ContactUs = () => {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg">
      <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Contact Us</h3>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((office, index) => (
            <div 
              key={index} 
              className="bg-glass-light dark:bg-glass-dark backdrop-blur-md p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{office.name}</h4>
              <p className="text-gray-600 dark:text-gray-200 mb-1">Code: <span className="font-bold">{office.code}</span></p>
              <p className="text-gray-600 dark:text-gray-200 mb-1">{office.address}</p>
              <p className="text-gray-600 dark:text-gray-200">Email: <a href={`mailto:${office.email}`} className="underline">{office.email}</a></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
