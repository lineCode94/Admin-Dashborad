import React from "react";
import "../assets/css/tags.scss";
const TagsInputEdit = ({ watch, setValue }) => {
  const tags = watch("values");
  const removeTags = (indexToRemove) => {
    tags.splice(indexToRemove, 1);
    setValue("values", tags);
  };

  return (
    <div className="tags-input w-full">
      <ul id="tags">
        {tags?.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        id="variantTitle"
        type="text"
        onKeyUp={(e) => {
          // ['a']=>1 values[1] => b ,, ['a','b']
          if (e.key === "Enter") {
            const len = tags.length;
            setValue(`values.${len}`, e.target.value);
            e.target.value = "";
          }
        }}
        placeholder="Press enter to add tags"
      />
    </div>
  );
};

export default TagsInputEdit;
