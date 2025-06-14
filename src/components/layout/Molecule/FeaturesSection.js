import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Button } from 'antd';
import ScrollFadeIn from "../Molecule/ScrollFadeIn";

const FeatureSection = ({ title, content, listContent, buttonText, image, reverse }) => {
    return (
        <section className="bg-[#0D2C53] text-white items-center">
            <div className={`max-w-7xl p-8 flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center gap-20`}>
                <ScrollFadeIn className="md:w-1/2">
                    <img src={image} alt="Feature" className="rounded-lg" />
                </ScrollFadeIn>
                <ScrollFadeIn className="md:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <p className="mb-6">{content}</p>
                    {/* Danh sách nội dung */}
                    {listContent?.length > 0 && (
                        <ul className="mb-6 space-y-3 text-sm text-white">
                            {listContent.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-blue-400 mt-1">●</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Button type="primary" icon={<FaArrowRight />} size="large" iconPosition="end" className="bg-[#506CF0] hover:bg-blue-600 font-semibold ">
                        Start learning
                    </Button>
                </ScrollFadeIn>
            </div>
        </section>
    );
};

export default FeatureSection;
