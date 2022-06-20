import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../helpers/auth.service";
const user = JSON.parse(localStorage.getItem("login-with-metamask:auth"));

export const login = createAsyncThunk("user/login", async (_, thunkAPI) => {
  try {
    const response = await AuthService.LogIn();
    if (response !== undefined) {
      console.log(response);
      return { user: response };
    } else {
      console.log("ERROR");
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue();
  }
});

export const checkIfUserIsvalid = createAsyncThunk(
  "user/checkIfUserIsValid",
  async ({ url, accessToken }, thunkAPI) => {
    try {
      console.log(url);
      console.log(accessToken);
      const response = await AuthService.checkIfUserIsValid(url, accessToken);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const InitliazeSmartContract = createAsyncThunk(
  "user/InitliazeSmartContract",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.initliazeSmartContract();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const initialSmartContractWithSigner = createAsyncThunk(
  "user/initialSmartContractWithSigner",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.initialSmartContractWithSigner();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const returnOwner = createAsyncThunk(
  "user/returnOwner",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.returnOwner();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const returnDegree = createAsyncThunk(
  "user/returnDegree",
  async (_sha26PDF, thunkAPI) => {
    try {
      console.log(_sha26PDF);
      const response = await AuthService.returnDegree(_sha26PDF);
      console.log(response);
      return { degree: response };
    } catch (error) {
      //dconsole.log(error);
      return thunkAPI.rejectWithValue("No degree found");
    }
  }
);

export const createDegree = createAsyncThunk(
  "user/createDegree",
  async ({ _sha26PDF, _name, _surname, _date }, thunkAPI) => {
    try {
      console.log(_sha26PDF);
      console.log(_name);
      console.log(_surname);
      const response = await AuthService.createDegree(
        _sha26PDF,
        _name,
        _surname,
        _date
      );
      console.log(response);
      if (response !== undefined) {
        console.log(response);
        return response;
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const addModerator = createAsyncThunk(
  "user/addModerator",
  async ({ _address, _name, _surname }, thunkAPI) => {
    try {
      console.log(_address);
      console.log(_name);
      console.log(_surname);
      const response = await AuthService.addModerator(
        _address,
        _name,
        _surname
      );
      console.log(response);
      if (response !== undefined) {
        console.log(response);
        return response;
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = user
  ? {
      isLoggedIn: true,
      user,
      loadingState: false,
      message: "",
      createDegree: "",
      date: "",
    }
  : {
      isLoggedIn: false,
      user: null,
      loadingState: false,
      message: "",
      createDegree: "",
      date: "",
    };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteUserJWT: (state) => {
      state.user = undefined;
    },
    setDate: (state, action) => {
      state.user.date = action.payload;
    },
  },
  middleware: [],
  devTools: process.env.NODE_ENV !== "production" ? {} : false,
  extraReducers: {
    [login.pending]: (state) => {
      state.loadingState = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loadingState = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state) => {
      state.loadingState = false;
      state.isLoggedIn = false;
      state.user = null;
    },
    [returnDegree.fulfilled]: (state, action) => {
      //state.message = `University student: ${action.payload.degree.payload[2]} ${action.payload.degree.payload[3]} owns a degree with the existing pdf hash:${action.payload.degree.payload[0]} `;
      state.message = (
        <div
          style={{
            whiteSpace: "nowrap",
            minWidth: "700px",
            height: "30px",
            margin: "1.2em 0",
            backgroundColor: "#edf2f7",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            padding: "1.2em 1.5em",
            fontSize: "18px",
            fontWeight: "10px",
          }}
        >
          University student:&nbsp;
          <span style={{ color: "red" }}>{action.payload.degree[2]}</span>&nbsp;
          <span style={{ color: "red" }}>{action.payload.degree[3]}</span>&nbsp;
          owns a degree with the existing pdf hash:&nbsp;
          <span style={{ color: "red" }}>{action.payload.degree[0]}</span>
        </div>
      );
    },
    //#62ff00b5
    [returnDegree.rejected]: (state) => {
      state.message = (
        <div
          style={{
            width: "auto",
            height: "30px",
            margin: "1.2em 0",
            backgroundColor: "#f55e3038",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            padding: "1.2em 1.5em",
          }}
        >
          This degree is not valid!
        </div>
      );
    },
    [createDegree.fulfilled]: (state, action) => {
      state.createDegree = (
        <div
          style={{
            whiteSpace: "nowrap",
            minWidth: "700px",
            height: "30px",
            margin: "1.2em 0",
            backgroundColor: "#edf2f7",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            padding: "1.2em 1.5em",
            fontSize: "18px",
            fontWeight: "10px",
          }}
        >
          Το πτυχίο προστέθηκε επιτυχώς!
        </div>
      );
    },
    [createDegree.rejected]: (state) => {
      state.createDegree = (
        <div
          style={{
            width: "auto",
            height: "30px",
            margin: "1.2em 0",
            backgroundColor: "#f55e3038",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            padding: "1.2em 1.5em",
          }}
        >
          Το πτυχίο δεν δημιουργήθηκε επιτυχώς!
        </div>
      );
    },
  },
});

export const userJWT = (state) => state.user;
export const { deleteUserJWT, setDate } = userSlice.actions;

export default userSlice.reducer;
