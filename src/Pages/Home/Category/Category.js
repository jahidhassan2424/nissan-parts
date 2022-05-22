import React from 'react';
import './Category.css';

const Category = () => {
    return (
        <div className=' '>
            <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                <input type="checkbox" />
                <div active class="collapse-title font-medium bg-accent text-2xl text-white ">
                    Category
                </div>
                <div class="collapse-content">
                    <p>Steering Wheel</p>
                    <p>Wheels</p>
                    <p>Bumper</p>
                    <p>Cowl screen</p>
                    <p>Decklid</p>
                    <p>fascia</p>
                </div>
            </div>

        </div>
    );
};

export default Category;