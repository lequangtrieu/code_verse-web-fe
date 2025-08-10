import React from "react";
import {Checkbox, Collapse} from "antd";
import {getDiscountedPrice} from "../../../common/helper";

const {Panel} = Collapse;

const ratingsOptions = [4.5, 4, 3.5, 3];
const durationOptions = [
    {label: "Less than 2 hours", value: "lt2"},
    {label: "2–6 hours", value: "2to6"},
    {label: "6–12 hours", value: "6to12"},
    {label: "More than 12 hours", value: "gt12"},
];
const levels = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
const languages = ["JAVA", "PYTHON", "JAVASCRIPT", "C", "CPP", "CSHARP", "RUBY", "KOTLIN"];

const SidebarFilter = ({
                           searchQuery,
                           onSearch,
                           selectedCategory,
                           onCategoryChange,
                           categories,
                           allCourses,
                           selectedRatings,
                           onRatingChange,
                           selectedDuration,
                           onDurationChange,
                           selectedLevels,
                           onLevelChange,
                           filteredCourses,
                           selectedLanguages,
                           onLanguageChange,
                           selectedPrice,
                           onPriceChange,
                           onResetFilters
                       }) => {
    return (
        <aside className="bg-white rounded-2xl shadow-md p-6 h-fit space-y-6">

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800">Filter Courses</h2>

            {/* Filters */}
            <Collapse ghost defaultActiveKey={["categories"]}>
                {/* Categories */}
                <Panel header="Categories" key="categories">
                    <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
                        <Checkbox
                            checked={!selectedCategory}
                            onChange={() => onCategoryChange("all")}
                            className="text-sm"
                        >
                            All ({filteredCourses.length})
                        </Checkbox>

                        {categories.slice(1).map((cat) => {
                            const count = filteredCourses.filter((c) => c.category === cat).length;
                            return (
                                <Checkbox
                                    key={cat}
                                    checked={selectedCategory === cat}
                                    onChange={() =>
                                        onCategoryChange(selectedCategory === cat ? null : cat)
                                    }
                                    className="capitalize text-sm"
                                >
                                    {cat} <span className="text-gray-500 ml-1">({count})</span>
                                </Checkbox>
                            );
                        })}
                    </div>
                </Panel>

                {/* Ratings */}
                <Panel header="Ratings" key="ratings">
                    <div className="flex flex-col gap-2">
                        {ratingsOptions.map((r) => {
                            const count = filteredCourses.filter((c) => c.rating >= r).length;
                            return (
                                <Checkbox
                                    key={r}
                                    checked={selectedRatings === r}
                                    onChange={() => onRatingChange(r)}
                                    className="text-sm flex items-center"
                                >
                  <span className="flex items-center gap-1">
                    {r}
                      <span role="img" aria-label="star" className="text-yellow-400">⭐</span>
                    & up
                    <span className="text-gray-500 ml-1">({count})</span>
                  </span>
                                </Checkbox>
                            );
                        })}
                    </div>
                </Panel>

                {/* Price */}
                <Panel header="Price" key="price">
                    <div className="flex flex-col gap-2">
                        <Checkbox
                            checked={selectedPrice === "free"}
                            onChange={() => onPriceChange("free")}
                            className="text-sm"
                        >
                            Free (
                            {filteredCourses.filter((c) =>
                                getDiscountedPrice(c.price, c.discount) === 0
                            ).length}
                            )
                        </Checkbox>
                        <Checkbox
                            checked={selectedPrice === "paid"}
                            onChange={() => onPriceChange("paid")}
                            className="text-sm"
                        >
                            Paid (
                            {filteredCourses.filter((c) =>
                                getDiscountedPrice(c.price, c.discount) > 0
                            ).length}
                            )
                        </Checkbox>
                    </div>
                </Panel>

                {/* Duration */}
                <Panel header="Duration" key="duration">
                    <div className="flex flex-col gap-2">
                        {durationOptions.map((opt) => {
                            const count = filteredCourses.filter((c) => {
                                const d = c.totalDurations || 0;
                                switch (opt.value) {
                                    case "lt2":
                                        return d < 120;
                                    case "2to6":
                                        return d >= 120 && d < 360;
                                    case "6to12":
                                        return d >= 360 && d <= 720;
                                    case "gt12":
                                        return d > 720;
                                    default:
                                        return false;
                                }
                            }).length;

                            return (
                                <Checkbox
                                    key={opt.value}
                                    checked={selectedDuration === opt.value}
                                    onChange={() =>
                                        onDurationChange(selectedDuration === opt.value ? null : opt.value)
                                    }
                                    className="text-sm"
                                >
                                    {opt.label}
                                    <span className="text-gray-500 ml-1">({count})</span>
                                </Checkbox>
                            );
                        })}
                    </div>
                </Panel>

                {/* Level */}
                <Panel header="Level" key="level">
                    <div className="flex flex-col gap-2">
                        {levels.map((lvl) => {
                            const count = filteredCourses.filter((c) => c.level === lvl).length;
                            return (
                                <Checkbox
                                    key={lvl}
                                    checked={selectedLevels === lvl}
                                    onChange={() => onLevelChange(lvl)}
                                    className="text-sm capitalize"
                                >
                                    {lvl.charAt(0) + lvl.slice(1).toLowerCase()}
                                    <span className="text-gray-500 ml-1">({count})</span>
                                </Checkbox>
                            );
                        })}
                    </div>
                </Panel>

                {/* Language */}
                <Panel header="Language" key="language">
                    <div className="flex flex-col gap-2">
                        {languages.map((lang) => {
                            const count = filteredCourses.filter((c) => c.language === lang).length;
                            return (
                                <Checkbox
                                    key={lang}
                                    checked={selectedLanguages === lang}
                                    onChange={() => onLanguageChange(lang)}
                                    className="text-sm capitalize"
                                >
                                    {lang.charAt(0) + lang.slice(1).toLowerCase()}
                                    <span className="text-gray-500 ml-1">({count})</span>
                                </Checkbox>
                            );
                        })}
                    </div>
                </Panel>
            </Collapse>

            {/* Reset Button */}
            <div className="pt-4 border-t">
                <button
                    onClick={onResetFilters}
                    className="w-full text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                    Reset All
                </button>
            </div>
        </aside>
    );
};

export default SidebarFilter;
