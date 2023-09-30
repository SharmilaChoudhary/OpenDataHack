import React, { useState } from 'react';
import {create } from 'ipfs-http-client'; // Import the IPFS library
import Web3 from 'web3';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
const ipfs = create();
const sourceMinterAbi=  [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "dob",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "addresss",
        "type": "string"
      }
    ],
    "name": "KYCDataStored",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getKYCData",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "kycRecords",
    "outputs": [
      {
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dob",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "addresss",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_dob",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_address",
        "type": "string"
      }
    ],
    "name": "storeKYCData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const KYCForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0], // Store the selected image file
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission with formData, including images
    console.log(formData);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
		const signer = await provider.getSigner();
		const contract = new ethers.Contract("0x4807F9173539e661986d18c2E350c0bbdB3Ea1d3", sourceMinterAbi, signer);
		const txn = await contract.storeKYCData(formData.firstName,formData.lastName,formData.dob,formData.address);
    const rxn= await contract.getKYCData();
    console.log(rxn);
  };

  const [ipfsLink, setIpfsLink] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        // Upload image to IPFS
        const { cid } = await ipfs.add(file);

        // Generate IPFS link
        const generatedLink = `https://gateway.ipfs.io/ipfs/${cid.toString()}`;

        // Store the link in FVM (You would need to implement this part)
      

        setIpfsLink(generatedLink);
      } catch (error) {
        console.error('Error uploading image to IPFS:', error);
      }
    }
  };



  return (
    <div className="max-w-md mx-auto">


      <h2 className="text-2xl font-semibold text-center mb-4 text-black">KYC Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Existing input fields */}
        {/* ... */}
        <div className="mb-4 ">
//           <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//             First Name
//           </label>
//           <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none bg-white text-black"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none  bg-white text-black"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none  bg-white text-black"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none  bg-white text-black"
          />
        </div>



        {/* ID Front Image Input */}
        {/* <div className="mb-4">
          <label htmlFor="idFrontImage" className="block text-sm font-medium text-gray-700">
            ID Front Image
          </label>
          <input
            type="file"
            id="idFrontImage"
            name="idFrontImage"
            accept="image/*" // Allow only image files
            onChange={handleImageUpload}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none bg-white text-black"
          />
        </div>

        {/* ID Back Image Input */}
        {/* <div className="mb-4">
          <label htmlFor="idBackImage" className="block text-sm font-medium text-gray-700">
            ID Back Image
          </label>
          <input
            type="file"
            id="idBackImage"
            name="idBackImage"
            accept="image/*" // Allow only image files
            onChange={handleImageUpload}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none bg-white text-black"
          />
        </div>  */}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-400 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default KYCForm;










// import React, { useState } from 'react';

// const KYCForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     dob: '',
//     address: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission with formData
//     console.log(formData);
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <h2 className="text-2xl font-semibold text-center mb-4 text-black">KYC Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4 ">
//           <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//             First Name
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none bg-white text-black"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//             Last Name
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none  bg-white text-black"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
//             Date of Birth
//           </label>
//           <input
//             type="date"
//             id="dob"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none  bg-white text-black"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//             Address
//           </label>
//           <textarea
//             id="address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 focus:outline-none  bg-white text-black"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-400 w-full"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default KYCForm;
