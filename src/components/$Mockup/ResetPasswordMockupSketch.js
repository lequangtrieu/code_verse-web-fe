import { RoughNotation } from "react-rough-notation";

export default function ResetPasswordMockupSketch() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white font-mockup">
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <div className="w-96 rounded-lg p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Reset your password</h2>
                        <span className="text-black text-lg">✕</span>
                    </div>

                    {/* Username */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * User Name
                    </label>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <input
                            className="w-full px-3 py-2 mb-6 bg-white border-none outline-none"
                            type="text"
                        />
                    </RoughNotation>

                    {/* Send reset link button */}
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <button className="w-full py-2 bg-white font-semibold">
                            Send reset link
                        </button>
                    </RoughNotation>
                </div>
            </RoughNotation>
        </div>
    );
}