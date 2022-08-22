import {
  LIST_INSTRUCTOR,
  FIND_INSTRUCTOR,
  CREATE_INSTRUCTOR,
  GET_ID_INSTRUCTOR,
  RESET_ITEM
} from "../../actionTypes/Types";

const reducerInstructor = (globalInstructorState, action) => {
  console.log(action);
  switch (action.type) {
    case LIST_INSTRUCTOR:
      return {
        ...globalInstructorState,
        instructores: action.payload,
      };
    case FIND_INSTRUCTOR:
      return {
        ...globalInstructorState,
        instructor: action.payload,
      };

    case CREATE_INSTRUCTOR:
      return {
        ...globalInstructorState,
        instructorcreate: [
          ...globalInstructorState.instructorcreate,
          action.payload,
        ],
      };

      case GET_ID_INSTRUCTOR:
      return {
        ...globalInstructorState,
        idinstructor: action.payload,
        
      };
      case RESET_ITEM:
        return {
          ...globalInstructorState,instructor:action.payload,
         
        };


    default:
      return globalInstructorState;
  }
};
export default reducerInstructor;
