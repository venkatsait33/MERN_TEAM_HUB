import { useState } from "react";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MotionDiv from "../utils/MotionDiv";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Navbar />
      <div className=" mt-20 p-4 max-w-5xl mx-auto">
        <div>
          <MotionDiv delay={0.1}>
            <div className="flex space-x-4 items-center">
              <Link to="/dashboard" className="btn btn-outline">
                <ArrowLeft /> Back
              </Link>
              <h1 className=" text-4xl font-semibold">My Dashboard</h1>
            </div>
          </MotionDiv>
        </div>

        <div className="flex max-sm:flex-col max-md:flex-col gap-3 mt-8 w-full">
          <MotionDiv delay={0.2}>
            <div className="shadow-md rounded-md p-3 flex-1 ">
              <div className="flex justify-center gap-3 items-center mx-auto flex-col">
                <div>
                  <div className=" h-40 ">
                    <div className="btn w-40 h-40 p-1 btn-ghost border-2 border-primary btn-circle avatar">
                      <div className=" rounded-full">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center mx-auto flex-col">
                  <div>
                    <h1 className="text-xl font-semibold">User Name</h1>
                    <span className="label">User Email</span>
                  </div>
                  <div>
                    <div className=" space-x-2">
                      {" "}
                      <span className=" font-semibold">Employee ID:</span>
                      <span>PIPL0001</span>
                    </div>
                    <div className=" space-x-2">
                      <span className=" font-semibold">Domain:</span>
                      <span>Frontend</span>
                    </div>
                    <div className=" space-x-2">
                      <span className=" font-semibold">Designation:</span>
                      <span>Associate software engineer </span>
                    </div>
                    <div className=" space-x-2">
                      <span className=" font-semibold">Monthly Salary:</span>
                      <span>₹00000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
          <MotionDiv delay={0.2}>
            <div className="flex-2 p-4 shadow-md rounded-md w-full">
              <div className="space-y-4 w-full">
                <div className="collapse bg-base-100 max-w-full border border-base-300 collapse-arrow">
                  <input
                    type="checkbox"
                    checked={isOpen}
                    onChange={() => setIsOpen(!isOpen)}
                  />

                  <div className="collapse-title w-full font-semibold text-xl bg-base-200">
                    Personal Details
                  </div>

                  <div className="collapse-content text-sm">
                    <div>
                      <form>
                        <fieldset className="fieldset p-4 grid md:grid-cols-4 grid-cols-2 gap-4 ">
                          <label className="label">Name</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="User Name"
                            value="User Name"
                          />

                          <label className="label">Email</label>
                          <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            value="user@priaccinnovations.ai"
                          />
                          <label className="label">Phone</label>
                          <input
                            type="phone"
                            className="input"
                            placeholder="Phone"
                            value="9876543210"
                          />
                          <label className="label">DOB</label>
                          <input
                            type="date"
                            className="input"
                            placeholder="Date Of Birth"
                            value="1999-01-01"
                          />
                          <label className="label">Address-1</label>
                          <input
                            type="address"
                            className="input"
                            placeholder="Address-1"
                          />
                          <label className="label">Address2</label>
                          <input
                            type="address"
                            className="input"
                            placeholder="Address"
                          />
                          <label className="label">City</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="City"
                          />
                          <label className="label">State</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="State"
                          />
                          <label className="label">Country</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="Country"
                          />
                          <label className="label">PinCode</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="PinCode"
                          />
                        </fieldset>
                        <div className="flex justify-end">
                          <button className="btn btn-primary ">Edit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
