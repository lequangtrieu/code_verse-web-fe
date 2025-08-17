import { RoughNotation } from "react-rough-notation";

export default function PurchaseCourseMockupSketch() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white font-mockup">
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <div className="w-[900px] rounded-lg p-6 flex gap-6">

                    {/* Course Cart */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-4">Course Cart</h2>

                        <table className="w-full text-sm mb-4">
                            <thead>
                            <tr className="text-left">
                                <th className="p-2">Select</th>
                                <th className="p-2">Image</th>
                                <th className="p-2">Course Name</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Remove</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>[IMG]</td>
                                <td>Complete Web Development Bootcamp</td>
                                <td>89.100 ₫</td>
                                <td><button>Remove</button></td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>[IMG]</td>
                                <td>iOS App Development with Swift</td>
                                <td>67.150 ₫</td>
                                <td><button>Remove</button></td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-between items-center">
                            <span>Total Items: 2</span>
                            <button className="underline">Clear All</button>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="w-[280px]">
                        <h3 className="font-bold mb-4">Payment Method</h3>

                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <div className="p-3 mb-4">
                                <p>Pay via PayOS</p>
                            </div>
                        </RoughNotation>

                        <p className="mb-2">Total Amount: <b>156.250 ₫</b></p>

                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <button className="w-full py-2 bg-white font-semibold">Pay Now</button>
                        </RoughNotation>
                    </div>
                </div>
            </RoughNotation>
        </div>
    );
}
