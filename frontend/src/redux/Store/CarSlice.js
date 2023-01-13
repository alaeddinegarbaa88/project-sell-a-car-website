import { createSlice } from "@reduxjs/toolkit";

 const CarSlice = createSlice({
  name: "Car",
  initialState: [{
    name: "none",
    image: "none",
    fuelType: "none",
    price: "none",
    capacity:"none"
  }],
  reducers: {
    
    setCars:(state,action)=>{
      console.log('you')

      return action.payload    }

  },
});

// Action creators are generated for each case reducer function
export const {setCars} = CarSlice.actions;

export default CarSlice.reducer;
