import { useNavigate } from "react-router-dom";
import MotionDiv from "../utils/MotionDiv";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { EMPLOYEE_API_END_POINT } from "../utils/apiEndPoints";
import { setUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    officialEmail: "",
    password: "",
  });
  const changeEventHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!data.officialEmail || !data.password) {
        setLoading(false);
        throw new Error("Please fill all the fields");
      }
      const res = await axios.post(EMPLOYEE_API_END_POINT + "login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.employee));
        navigate("/dashboard");
        toast.success("Login Successful");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <MotionDiv delay={0.1}>
      <div className=" max-w-full h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 ">
        <div>
          <div className="card border-2 border-gray-300 rounded-lg shadow-lg w-96">
            <div className=" card-body shadow-lg rounded-lg w-96">
              <div className=" flex flex-col justify-center items-center mx-auto">
                <picture>
                  <img
                    src="/logo.png"
                    alt=""
                    className=" w-30 h-30 object-contain"
                  />
                </picture>
                <div>
                  <h1 className="text-2xl text-center font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    TeamHub
                  </h1>
                  <span>Where your workday begins & ends</span>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    required
                    onChange={changeEventHandler}
                    value={data?.officialEmail}
                    name="officialEmail"
                  />
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    required
                    onChange={changeEventHandler}
                    value={data?.password}
                    name="password"
                  />
                </fieldset>
                <button className=" " type="submit">
                  {loading ? (
                    <button className="mt-2 btn btn-neutral">
                      <span className="loading loading-spinner loading-lg"></span>
                    </button>
                  ) : (
                    <button className="btn mt-2 btn-primary w-full">
                      Login
                    </button>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Login;
