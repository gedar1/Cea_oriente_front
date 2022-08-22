import React, { createContext, useState } from 'react';


const AuthContext = createContext();
const initialAuth = null;
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialAuth);
  const handleAuth = (e) =>{
    if(auth){
      setAuth(null);
    }else{
      setAuth(true);
    }
  }

  const data = { auth, handleAuth };
  return <AuthContext.Provider value={data}>
    { children }
    </AuthContext.Provider>;
}

export { AuthProvider };
export default AuthContext;


// interface Context {
//   userInfo: string;
//   setUserInfo: (user: String) => void;
// }

// export const AuthContext = React.createContext<Context>({
//   userInfo: "",
//   setUserInfo: (user: String) =>
//     console.log("Did you forgot to add AuthContext on top of your app?"),
// });

// export const AuthProvider: React.FunctionComponent = (props) => {
//   const { children } = props;
//   const [userInfo, setUserInfo] = React.useState<String>("");

//   return (
//     <AuthContext.Provider value={{ userInfo, setUserInfo }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
