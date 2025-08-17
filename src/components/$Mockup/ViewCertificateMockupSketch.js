import { RoughNotation } from "react-rough-notation";

export default function ViewCertificateMockupSketch() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white font-mockup">
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <div className="w-[720px] rounded-lg p-8 text-center space-y-6 text-black">
                    {/* Header */}
                    <h2 className="text-2xl font-bold">CERTIFICATE OF ACHIEVEMENT</h2>

                    {/* User Info */}
                    <p className="text-sm">This is to certify that</p>
                    <p className="text-lg font-bold">trieulq@gmail.com</p>
                    <p className="text-sm">has successfully completed the course</p>

                    {/* Course Name */}
                    <p className="text-xl font-bold">JavaScript basics</p>

                    {/* Dedication Line */}
                    <p className="text-sm">
                        demonstrating outstanding dedication and proficiency in the subject matter.
                    </p>

                    {/* Quote */}
                    <p className="italic text-xs">
                        "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
                    </p>

                    {/* Footer Info */}
                    <div className="flex justify-between mt-6 text-sm px-6">
                        <p>Awarded on 06/07/2025</p>
                        <p>Signature: codeverse.ad@gmail.com</p>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-end mt-6">
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <button className="px-4 py-1 bg-white font-semibold text-sm">
                                Close
                            </button>
                        </RoughNotation>
                    </div>
                </div>
            </RoughNotation>
        </div>
    );
}
