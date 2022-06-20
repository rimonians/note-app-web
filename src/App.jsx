import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PublicOutlet from "./components/Outlet/PublicOutlet";
import PrivateOutlet from "./components/Outlet/PrivateOutlet";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Note from "./pages/Note";
import NoteView from "./pages/NoteView";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Loading from "./components/Shared/Loading";
import { useSelector, useDispatch } from "react-redux";
import { authInitiate } from "./redux/features/Auth/authSlice";
import { fetchUser } from "./redux/features/User/userSlice";
import { fetchNotes } from "./redux/features/Note/noteSlice";

const App = () => {
  const { loading, isAuthenticated, token } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authInitiate());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUser(token));
      dispatch(fetchNotes(token));
    }
  }, [isAuthenticated]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/*" element={<PublicOutlet />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/*" element={<PrivateOutlet />}>
          <Route path="" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="note" element={<Note />} />
          <Route path="note/:id" element={<NoteView />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
