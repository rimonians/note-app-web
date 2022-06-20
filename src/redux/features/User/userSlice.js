import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../api/client";
import { toast } from "react-toastify";
import { signout } from "../Auth/authSlice";

const initialState = {
  loading: true,
  user: null,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token, thunkAPI) => {
    try {
      const res = await client.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async ({ values, actions, token }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", values.profileImage);
      const res = await client.put("/user/update-profile-image", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateProfileInfo = createAsyncThunk(
  "user/updateProfileInfo",
  async ({ values, actions, token }, thunkAPI) => {
    try {
      const res = await client.put("/user/update-profile-info", values, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Builder for fetch user
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const payload = action.payload;
      state.loading = false;
      state.user = payload.result;
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      const payload = action.payload;
      state.loading = false;
      state.user = null;
      state.error = payload.message;
    });
    // Builder for update profile image
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;
      state.loading = false;
      state.user = payload.result;
      state.error = null;
      toast.success(payload.message);
      actions.resetForm();
      actions.setSubmitting(false);
    });
    builder.addCase(updateProfileImage.rejected, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;
      actions.setErrors({ profileImage: payload.message });
    });
    // Builder for update profile info
    builder.addCase(updateProfileInfo.fulfilled, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;
      state.loading = false;
      state.user = payload.result;
      state.error = null;
      toast.success(payload.message);
      actions.setSubmitting(false);
    });
    builder.addCase(updateProfileInfo.rejected, (state, action) => {
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
    // Builder for signout
    builder.addCase(signout, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
    });
  },
});

export default userSlice.reducer;
