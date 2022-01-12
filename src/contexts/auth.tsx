import React, { useReducer } from "react";

interface IInitialState {
  user?: any;
}
const initialState: IInitialState = {
  // TODO: implement authentication
  // user: undefined,
  user: { email: "anon@gmail.com" },
};

export interface IAuthContext extends IInitialState {
  dispatch: any;
}

export const AuthContext = React.createContext<IAuthContext>({} as any);

const reducer = (state: IInitialState, action: any) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "RESET_AUTH":
      return initialState;
    default:
      return state;
  }
};

interface IProps {
  children?: JSX.Element;
}

const AuthContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer<any>(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{ ...(state as IInitialState), dispatch } as IAuthContext}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
