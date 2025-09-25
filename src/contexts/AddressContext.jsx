import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
const AddressContext = createContext();

export const useAddressContext = () => useContext(AddressContext);
export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("address");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedAddress, setSelectedAddress] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(addresses));
  }, [addresses]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addNewAddressHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://drip-district-backend.vercel.app/address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw "failed to save address";
      }
      const data = await response.json();
      console.log("Address Added", data);
    } catch (error) {
      throw error;
    }
    const {
      houseNumber,
      street,
      city,
      state,
      pincode,
      fullName,
      phone,
      country,
    } = formData;

    if (
      !houseNumber ||
      !street ||
      !city ||
      !state ||
      !pincode ||
      !fullName ||
      !phone ||
      !country
    ) {
      alert("Please fill all fields!");
      return;
    }

    const newAddress = `${fullName},${houseNumber}, ${street}, ${city}, ${state}, - ${pincode}, - ${country}, - ${phone}}`;
    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newAddress);
    // Reset form
    setFormData({
      houseNumber: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      phone: "",
      fullName: "",
    });
  };
  return (
    <AddressContext.Provider
      value={{
        addNewAddressHandler,
        handleChange,
        selectedAddress,
        setSelectedAddress,
        addresses,
        formData,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
