import React from "react";

const FeatureSection = ({ title, subtitle, content, buttonText, image, reverse }) => {
    return (
        <section className="py-16 px-32 bg-[#19395E] text-white items-center">
            <div className={`max-w-7xl flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center gap-20`}>
                <div className="md:w-1/2">
                    <img src={image} alt="Feature" className="rounded-lg shadow-lg" />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <h3 className="text-xl text-[#34E8C5] mb-4">{subtitle}</h3>
                    <p className="mb-6">{content}</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition">
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
