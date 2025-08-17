import { RoughNotation } from "react-rough-notation";

export default function RegisterMockupSketch() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white font-mockup">
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <div className="w-96 rounded-lg p-6">
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
                    <div className="relative mb-6">
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <input
                                className="w-full px-3 py-2 bg-white border-none outline-none"
                                type="password"
                            />
                        </RoughNotation>
                    </div>

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
