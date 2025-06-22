export interface User {
  id: number;
  name: string;
  salary: string;
}

export type State = {
  userList: User[];
  isShowing: boolean;
};

const initState: State = {
  userList: [],
  isShowing: false,
};
type Action =
  | { type: "CHANGE_USER_LIST"; payload: any[] }
  | { type: "UPDATE_SHOWING_LIST"; payload: boolean };

const rootReducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case "CHANGE_USER_LIST":
      return {
        ...state,
        userList: action.payload,
      };
    case "UPDATE_SHOWING_LIST":
      return {
        ...state,
        isShowing: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
