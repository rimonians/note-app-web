import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../api/client";
import { toast } from "react-toastify";

const initialState = {
  loading: true,
  token: null,
  isAuthenticated: false,
  error: null,
};

export const authInitiate = createAsyncThunk("auth/authInitiate", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const res = await client.get("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.result) {
      return token;
    } else {
      return Promise.reject("Your token is not valid");
    }
  } else {
    return Promise.reject("No auth token found");
  }
});

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ values, actions }, thunkAPI) => {
    try {
      const res = await client.post("/auth/signup", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ values, actions }, thunkAPI) => {
    try {
      const res = await client.post("/auth/signin", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
      toast.success("Signout successfull");
    },
  },
  extraReducers: (builder) => {
    // Builder for auth initaite
    builder.addCase(authInitiate.pending, (state) => {
      state.loading = true;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(authInitiate.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(authInitiate.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.error.message;
    });
    // Builder for signup
    builder.addCase(signup.fulfilled, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;
      state.token = payload.token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("token", payload.token);
      toast.success(payload.message);
      actions.resetForm();
      actions.setSubmitting(false);
    });
    builder.addCase(signup.rejected, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;
      const errorsForDisplay = {};
      Object.entries(payload.errors).map(
        (el) => (errorsForDisplay[el[0]] = el[1].msg)
      );
      actions.setErrors(errorsForDisplay);
    });
    // Builder for signin
    builder.addCase(signin.fulfilled, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;
      state.token = payload.token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("token", payload.token);
      toast.success(payload.message);
      actions.resetForm();
      actions.setSubmitting(false);
    });
    builder.addCase(signin.rejected, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;

      if (payload.errors) {
        const errorsForDisplay = {};
        Object.entries(payload.errors).map(
          (el) => (errorsForDisplay[el[0]] = el[1].msg)
        );
        actions.setErrors(errorsForDisplay);
      } else {
        toast.error(payload.message);
      }
    });
  },
});

export default authSlice.reducer;
export const { signout } = authSlice.actions;
