
function TagDropdown({ tags, selectedTag, onTagChange }) {

    return (
        <div className="recipe-tag-select">

            <select
                className="recipe-tag-select-input"
                value={selectedTag}
                onChange={(e) => onTagChange(e.target.value)}
            >
                <option value="">Sve oznake</option>

                {tags.map(tag => (
                    <option key={tag.id} value={tag.id}>
                        {tag.name}
                    </option>
                ))}

            </select>

            <span className="recipe-tag-arrow">▾</span>

        </div>
    );
}

export default TagDropdown;
