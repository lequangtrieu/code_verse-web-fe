import { RoughNotation } from "react-rough-notation";

export default function UpdateProfileMockupSketch() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white font-mockup">
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <div className="w-[420px] rounded-lg p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Update Profile</h2>
                        <span className="text-black text-lg">✕</span>
                    </div>

                    {/* Full Name */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * Full Name
                    </label>
                    <div className="mb-4">
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <div className="block w-full">
                                <input
                                    className="w-full px-3 py-2 bg-white border-none outline-none"
                                    type="text"
                                    placeholder="Enter full name"
                                />
                            </div>
                        </RoughNotation>
                    </div>

                    {/* Phone Number */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * Phone Number
                    </label>
                    <div className="mb-4">
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <div className="block w-full">
                                <input
                                    className="w-full px-3 py-2 bg-white border-none outline-none"
                                    type="text"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </RoughNotation>
                    </div>

                    {/* Biography */}
                    <label className="block mb-2 text-sm font-semibold text-black">
                        * Biography
                    </label>
                    <div className="mb-6">
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <div className="block w-full">
                                <input
                                    className="w-full px-3 py-2 bg-white border-none outline-none"
                                    type="text"
                                    placeholder="Enter biography"
                                />
                            </div>
                        </RoughNotation>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <div className="inline-block">
                                <button className="px-4 py-2 bg-white font-semibold">Cancel</button>
                            </div>
                        </RoughNotation>
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <div className="inline-block">
                                <button className="px-4 py-2 bg-white font-semibold">Update</button>
                            </div>
                        </RoughNotation>
                    </div>
                </div>
            </RoughNotation>
        </div>
    );
}
