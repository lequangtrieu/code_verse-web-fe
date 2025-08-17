import { RoughNotation } from "react-rough-notation";

export default function RegisterInstructorMockupSketch() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white font-mockup">
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <div className="w-[420px] rounded-lg p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-center w-full">
                            Create an Account
                        </h2>
                        <span className="text-black text-lg absolute right-6 top-6">✕</span>
                    </div>

                    {/* Role select */}
                    <div className="flex justify-center gap-8 mb-6">
                        <label className="flex items-center gap-2">
                            <input type="radio" name="role" /> Learner
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" name="role" /> Instructor
                        </label>
                    </div>

                    {/* Email */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * Email
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <input
                            className="w-full px-3 py-2 mb-4 bg-white border-none outline-none"
                            type="email"
                        />
                    </RoughNotation>

                    {/* Full Name */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * Full Name
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <input
                            className="w-full px-3 py-2 mb-4 bg-white border-none outline-none"
                            type="text"
                        />
                    </RoughNotation>

                    {/* Password */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * Password
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <input
                            className="w-full px-3 py-2 mb-4 bg-white border-none outline-none"
                            type="password"
                        />
                    </RoughNotation>

                    {/* Confirm Password */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * Confirm Password
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <input
                            className="w-full px-3 py-2 mb-4 bg-white border-none outline-none"
                            type="password"
                        />
                    </RoughNotation>

                    {/* Phone Number */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * Phone Number
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <input
                            className="w-full px-3 py-2 mb-4 bg-white border-none outline-none"
                            type="text"
                        />
                    </RoughNotation>

                    {/* Teaching Credentials */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * Teaching Credentials
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="w-full h-24 flex items-center justify-center bg-white mb-2">
                            Upload Here
                        </div>
                    </RoughNotation>

                    {/* QR Code */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * QR Code
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="w-full h-24 flex items-center justify-center bg-white mb-2">
                            Upload Here
                        </div>
                    </RoughNotation>

                    {/* Educational Background (Optional) */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        Educational Background (Optional)
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <input
                            className="w-full px-3 py-2 mb-4 bg-white border-none outline-none"
                            type="text"
                        />
                    </RoughNotation>

                    {/* Register button */}
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <button className="w-full py-2 bg-white font-semibold">
                            Register
                        </button>
                    </RoughNotation>
                </div>
            </RoughNotation>
        </div>
    );
}
