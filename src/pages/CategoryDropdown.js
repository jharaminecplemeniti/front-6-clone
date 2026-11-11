
import { useState } from "react";

function CategoryDropdown({
    categories,
    selectedCategory,
    onCategoryChange
}) {
    const [isOpen, setIsOpen] = useState(false);

    const mainCategories = categories.filter(
        category => Number(category.parent) === 0
    );

    const getSubcategories = (parentID) => {
        return categories.filter(
            category => Number(category.parent) === Number(parentID)
        );
    };

    const selectedName = categories.find(
        category => String(category.id) === selectedCategory
    )?.name || "Sve kategorije";

    const selectCategory = (value) => {
        onCategoryChange(value);
        setIsOpen(false);
    };

    return (
        <div className="recipe-category-select">

            <button
                type="button"
                className="recipe-category-select-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span>{selectedName}</span>

                <span className={`category-arrow ${isOpen ? "open" : ""}`}>
                    ▾
                </span>
            </button>

            {isOpen && (
                <div className="recipe-category-dropdown">

                    <button
                        type="button"
                        className={`recipe-category-option ${
                            selectedCategory === "" ? "active" : ""
                        }`}
                        onClick={() => selectCategory("")}
                    >
                        Sve kategorije
                    </button>

                    {mainCategories.map(category => {

                        const subcategories = getSubcategories(category.id);

                        return (
                            <div
                                className="recipe-category-group"
                                key={category.id}
                            >

                                <button
                                    type="button"
                                    className={`recipe-category-option main ${
                                        selectedCategory === String(category.id)
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        selectCategory(String(category.id))
                                    }
                                    dangerouslySetInnerHTML={{
                                        __html: category.name
                                    }}
                                />

                                {subcategories.map(subcategory => (

                                    <button
                                        type="button"
                                        key={subcategory.id}
                                        className={`recipe-category-option sub ${
                                            selectedCategory === String(subcategory.id)
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            selectCategory(String(subcategory.id))
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: subcategory.name
                                        }}
                                    />

                                ))}

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}

export default CategoryDropdown;
