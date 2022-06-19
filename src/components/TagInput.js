import React from 'react';
import { useState, useEffect } from 'react';

const TagInput  = ({tags, handleKeyDown, removeTag}) => {
    return (<>
    <h3>Tag Input</h3> 
    <div className='tag-container'>
        {/* <div className='tag-item'>
            <span className='text'>hello</span>
            <span className='close'>&times;</span>
        </div> */}
        {tags.map((tag, index) => (<div className='tag-item' key={index}>
            <span className='text'>{tag.value}</span>
            <span className='close' onClick={() => removeTag(index)}>&times;</span>
        </div>) )}
        <input onKeyDown={handleKeyDown} type="text" className='tag-input' placeholder='Type to add tag' />
    </div>
    </>
    );
}

export default TagInput;