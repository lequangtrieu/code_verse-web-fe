import { RoughNotation } from "react-rough-notation";

export default function LoginMockupSketch() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white font-mockup">
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <div className="w-96 rounded-lg p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Login</h2>
                        <span className="text-black text-lg">✕</span>
                    </div>

                    {/* Username */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * User name
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <input
                            className="w-full px-3 py-2 mb-4 bg-white"
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
                                className="w-full px-3 py-2 bg-white"
                                type="password"
                            />
                        </RoughNotation>
                    </div>

                    {/* Login button */}
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <button className="w-full py-2 mb-6 bg-white font-semibold">
                            Login
                        </button>
                    </RoughNotation>

                    {/* Divider */}
                    <div className="flex items-center mb-6">
                        <div className="flex-grow h-px bg-black"></div>
                        <span className="px-2 text-sm text-black">or login with</span>
                        <div className="flex-grow h-px bg-black"></div>
                    </div>

                    {/* Google button */}
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <button className="w-full py-2 flex items-center justify-center gap-2 bg-white">
                            <span className="font-bold text-lg">G</span>
                            <span>Google</span>
                        </button>
                    </RoughNotation>
                </div>
            </RoughNotation>
        </div>
    );
}
