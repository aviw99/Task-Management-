// import Login from "./Login";
// import Register from "./Register";
// import * as React from "react";
// import { Link, Route, Routes} from "react-router-dom";
//
// const LoginRegister = () => {
//     const [showRegister, setShowRegister] = React.useState(false);
//     const handleRegisterClick = () => {
//         setShowRegister(true)
//     }
//     const handleBackToLoginClick = () => {
//         setShowRegister(false)
//     }
//     const headerStyle = {
//         display:'flex',
//         flexDirection:'column',
//         alignItems:'center',
//         paddingTop:'20vh'
//     }
//     return (
//         <div>
//             <div style={headerStyle}>
//                 <h1>Welcome to Task-Manager</h1>
//                 {
//                     !showRegister ? (
//                         <h2>
//                             Login to continue or{" "}
//                             <Link to={'/register'} onClick={handleRegisterClick}>
//                                 create a new account
//                             </Link>
//                         </h2>
//                     ) : (
//                         <h2>
//                             Already have an account?{" "}
//                             <Link to={'/login'} onClick={handleBackToLoginClick}>Back to login</Link>
//                         </h2>
//                     )
//                 }
//             </div>
//             <Routes>
//                 <Route path={'/login'}/>
//                 <Route path={'/register'}/>
//             </Routes>
//             {!showRegister ? <Login /> : <Register />}
//         </div>
//     );
// }
//
// export default LoginRegister