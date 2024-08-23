import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/base";
import { authHeader } from "helper/authHelper";
const initialState = {
  patientLoader: false,
  patientInfo: [],
};

export const GetActivePatientInfo = createAsyncThunk(
  "/patients/active-patients",
  async ({ search }) => {
    try {
      const response = await axiosInstance.get(
        `patients/active-patients${search && `?search=${search}`}`
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const createPatient = createAsyncThunk("/patients/add-patient", async (body) => {
  try {
    const response = await axiosInstance.post(`patients/add-patient`, body, {
      headers: authHeader(),
    });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});

export const patientSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(GetActivePatientInfo.pending, (state) => {
        state.patientLoader = true;
      })
      .addCase(GetActivePatientInfo.fulfilled, (state, action) => {
        state.patientLoader = false;
      })
      .addCase(GetActivePatientInfo.rejected, (state, action) => {
        state.patientLoader = false;
      })
      .addCase(createPatient.pending, (state) => {
        state.patientLoader = true;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.patientLoader = false;
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.patientLoader = false;
      });
  },
});

export default patientSlice.reducer;
