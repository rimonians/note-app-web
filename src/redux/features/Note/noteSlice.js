import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../api/client";
import { toast } from "react-toastify";
import { signout } from "../Auth/authSlice";

const initialState = {
  loading: true,
  notes: [],
  notesSafe: [], // notes for extra safety
  tracked: null, // track note for update or delete
  error: null,
};

export const fetchNotes = createAsyncThunk(
  "note/fetchNotes",
  async (token, thunkAPI) => {
    try {
      const res = await client.get("/note/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createNote = createAsyncThunk(
  "note/createNote",
  async ({ values, actions, token }, thunkAPI) => {
    try {
      const res = await client.post("/note/create", values, {
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

export const updateNote = createAsyncThunk(
  "note/updateNote",
  async ({ values, actions, _id, token }, thunkAPI) => {
    try {
      const res = await client.put(`/note/${_id}`, values, {
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

export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async ({ _id, token }, thunkAPI) => {
    try {
      const res = await client.delete(`/note/${_id}`, {
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

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    trackNote: (state, action) => {
      state.tracked = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Builder for fetch notes
    builder.addCase(fetchNotes.pending, (state) => {
      state.loading = true;
      state.notes = [];
      state.notesSafe = [];
      state.error = null;
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      const payload = action.payload;
      payload.results.reverse();
      state.loading = false;
      state.notes = payload.results;
      state.notesSafe = payload.results;
      state.error = null;
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      const payload = action.payload;
      state.loading = false;
      state.notes = [];
      state.notesSafe = [];
      state.error = payload.message;
    });
    // Builder for create note
    builder.addCase(createNote.fulfilled, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;

      state.notes.unshift(payload.result);
      state.notesSafe.unshift(payload.result);

      toast.success(payload.message);
      actions.resetForm();
      actions.setSubmitting(false);
    });
    builder.addCase(createNote.rejected, (state, action) => {
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
    // Builder for update note
    builder.addCase(updateNote.fulfilled, (state, action) => {
      const payload = action.payload;
      const actions = action.meta.arg.actions;
      state.notesSafe = state.notesSafe.map((note) => {
        if (note._id === payload.result._id) {
          return payload.result;
        }
        return note;
      });
      state.notes = state.notes.map((note) => {
        if (note._id === payload.result._id) {
          return payload.result;
        }
        return note;
      });
      toast.success(payload.message);
      actions.setSubmitting(false);
    });
    builder.addCase(updateNote.rejected, (state, action) => {
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
    // Builder for delete note
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      const payload = action.payload;
      state.notesSafe = state.notesSafe.filter(
        (note) => note._id !== payload.result._id
      );
      state.notes = state.notes.filter(
        (note) => note._id !== payload.result._id
      );
      toast.success(payload.message);
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      const payload = action.payload;
      toast.error(payload.message);
    });
    // Builder for signout
    builder.addCase(signout, (state) => {
      state.loading = true;
      state.notes = [];
      state.notesSafe = [];
      state.tracked = null;
      state.error = null;
    });
  },
});

export default noteSlice.reducer;
export const { trackNote } = noteSlice.actions;
