// import React, { useState, useContext } from "react";
// import AuthContext from "../../store/auth-context";
// import classes from "./AuthForm.module.css";
// import logo from "../img/Logo.png";
// import LoadingSpinner from "../UI/LoadingSpinner";
// import Button from "../UI/Button";
// import Modal from "../UI/Modal";

// export default function AuthForm() {
//   const [enteredEmail, setEnteredEmail] = useState("");
//   const [enteredName, setEnteredName] = useState("");
//   const [enteredPassword, setEnteredPassword] = useState("");
//   const [signinForm, setSigninForm] = useState(true);
//   const [trytoLogin, setTryToLogin] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const authCtx = useContext(AuthContext);
//   const errorWhilelogin = authCtx.error;

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     setErrMsg("");
//     setTryToLogin(true);
//     if (
//       enteredEmail.trim().length === 0 ||
//       !enteredEmail.includes("@") ||
//       !enteredEmail.includes(".")
//     ) {
//       setErrMsg("Please check the entered E-mail");
//       setTryToLogin(false);

//       return;
//     }
//     if (enteredPassword.trim().length < 5) {
//       setErrMsg("Password should be at least 5 characters long");
//       setTryToLogin(false);
//       return;
//     }
//     if (!signinForm && enteredName.trim().length < 3) {
//       setErrMsg("Name should be at least 3 characters long");
//       setTryToLogin(false);
//       return;
//     }

//     if (signinForm) {
//       authCtx.login(enteredEmail, enteredPassword);
//     } else {
//       authCtx.signup(enteredEmail, enteredName, enteredPassword);
//     }
//   };

//   const signinToggleHanlder = () => {
//     setSigninForm((prevState) => {
//       setSigninForm(!prevState);
//     });
//   };

//   const modalHandler = () => {
//     authCtx.toggleError();
//     authCtx.errorMsg = "";
//     setShowModal(false);
//     setTryToLogin(false);
//   };

//   return (
//     <section className={classes.auth}>
//       {showModal || errorWhilelogin ? (
//         <Modal onClose={modalHandler}>
//           <p>
//             {authCtx.errorMsg ? authCtx.errorMsg : "Something went wrong"}
//             <br /> Please try again :)
//           </p>
//           <Button title="Close" onClick={modalHandler} />
//         </Modal>
//       ) : (
//         ""
//       )}
//       <form onSubmit={submitHandler}>
//         <div className={classes.control}>
//           <img alt="logo" src={logo} width="75%" draggable="false" />
//           <h1>{signinForm ? "Sign in" : "Sign up"}</h1>
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="example@exmaple.com"
//             onChange={(e) => {
//               setEnteredEmail(e.target.value);
//             }}
//             value={enteredEmail}
//             required
//           ></input>
//         </div>
//         {signinForm ? (
//           ""
//         ) : (
//           <div className={classes.control}>
//             <label>Name</label>
//             <input
//               type="text"
//               placeholder="At least 3 characters name"
//               minLength={3}
//               onChange={(e) => {
//                 setEnteredName(e.target.value);
//               }}
//               value={enteredName}
//               required
//             ></input>
//           </div>
//         )}
//         <div className={classes.control}>
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="At least 5 digits password"
//             minLength={5}
//             onChange={(e) => {
//               setEnteredPassword(e.target.value);
//             }}
//             value={enteredPassword}
//             required
//           ></input>
//         </div>
//         <div className={classes.actions}>
//           {errMsg ? <p className={classes.error}>{errMsg}</p> : ""}
//           {trytoLogin ? (
//             <LoadingSpinner />
//           ) : (
//             <button type="submit">{signinForm ? "Sign in" : "Submit"}</button>
//           )}
//         </div>
//         <div>
//           {signinForm ? (
//             <Button
//               type="button"
//               title="Create account"
//               onClick={signinToggleHanlder}
//             />
//           ) : (
//             <Button
//               type="button"
//               title="Already have an account? Sign in"
//               onClick={signinToggleHanlder}
//             />
//           )}
//         </div>
//       </form>
//     </section>
//   );
// }
