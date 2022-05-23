import React from 'react';
import './Category.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';

const Category = () => {
    return (
        <div className='pt-[1rem]'>
            <div tabIndex="0" className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box shadow-lg">
                <input type="checkbox" />
                <div className="collapse-title font-medium bg-primary text-2xl text-white  ">
                    <FontAwesomeIcon icon={faBarsStaggered} /> Category
                </div>
                <div className="collapse-content">
                    <p>Steering Wheel</p>
                    <p>Wheels</p>
                    <p>Bumper</p>
                    <p>Cowl screen</p>
                    <p>Decklid</p>
                    <p>Bonnet</p>
                </div>
            </div>

        </div>
    );
};

export default Category;