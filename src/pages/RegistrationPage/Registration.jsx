import { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./Registration.css";

export const Registration = () => {
  const [updateProfile, updating, error1] = useUpdateProfile(auth);

  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [userInfo, setUserInfo] = useState({
    name: "name",
    email: "email",
    password: "password",
  });
  console.log(userInfo);
  useEffect(() => {
    console.log(user);
  }, [user]);
  // use a=await user
  console.log(error1);
  const handleSignUp = async (e) => {
    const name = userInfo.name;
    console.log(name);
    const hey1 = "hey";
    console.log(userInfo.email);
    e.preventDefault();
    await createUserWithEmailAndPassword(userInfo.email, userInfo.password);
    await updateProfile({ displayName: name });
    console.log(user);
    console.log(user);
    // const hey = );
    // console.log(hey, "hey");
    console.log(user);

    if (error) {
      return (
        <div>
          <p>Error: {error.message}</p>
        </div>
      );
    }
    if (loading) {
      return <p>Loading...</p>;
    }
    if (updating) {
      return <p>Loding....</p>;
    }

    console.log(error);
    if (user) {
      toast("Default Notification !");
      console.log(user);

      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_RIGHT,
      });

      return (
        <div>
          <p>Registered User: {user.user.email}</p>
        </div>
      );
    }
  };

  return (
    <>
      <div className="singUpContainer">
        <div className="signupBtn">
          <h2>Sign up</h2>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="type your name"
              name="name"
              onChange={(e) =>
                setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Type your email"
              name="email"
              onChange={(e) =>
                setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Type your paswword"
              name="password"
              onChange={(e) =>
                setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="retyype your paswword"
              name="password"
              onChange={(e) =>
                setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
              }
            />

            <button type="submit">Register</button>
          </form>
          {/* <ToastContainer></ToastContainer> */}
        </div>
      </div>
      {/* <button onClick={handleClick}>Go back</button> */}
      {/* <button onClick={handleGohome}>Home</button> */}
      <Link to="/login">Already have a account?</Link>
    </>
  );
};
