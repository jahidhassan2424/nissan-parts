import React from 'react';

const Portfolio = () => {

    return (
        <div>
            <div className='lg:mx-28 mx-2 my-16'>
                <div className='my-16'>
                    <h3 className="text-5xl font-bold  text-center my-3 text-primary">A few words about me</h3>
                    <h2 className='text-3xl text-center font-bold'>I'm <b>Jahid Hassan</b>, a multidisciplinary developer and designer who focuses on telling my clients' stories visually, through enjoyable and meaningful experiences. I specialize in responsive react js SPA and unique user interfaces.</h2>
                </div>
                <p className='text-center text-3xl my-10 text-primary'>My skills as a web developer</p>
                <div class="flex justify-center">
                    <table class="table w-1/2">
                        <thead>
                            <tr>
                                <th>FrontEnd</th>
                                <th>BackEnd</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>HTML</td>
                                <td>NODE JS</td>
                            </tr>
                            <tr>
                                <td>CSS</td>
                                <td>EXPRESS JS</td>
                            </tr>
                            <tr>
                                <td>JAVASCRIPT</td>
                                <td>MONGODB</td>
                            </tr>
                            <tr>
                                <td>REACT JS</td>
                                <td>AXIOS JS</td>
                            </tr>
                            <tr>
                                <td>REACT BOOTSTRAP</td>
                                <td>REACT QUERY</td>
                            </tr>
                            <tr>
                                <td>REACT TAILWIND</td>
                                <td>STRIPE JS</td>
                            </tr>
                            <tr>
                                <td>REACT RECHARTS</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h1 className='text-3xl font-bold mt-32 text-center uppercase'>Some of my awesome creations</h1>
                <div>
                    <div className='flex flex-col lg:flex-row justify-center gap-10 justify-items-center mt-10'>

                        {/* greensports */}
                        {/* https://green-sports-18e07.web.app/ */}
                        <div class="card w-96 bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title text-3xl font-bold">Medi Care</h2>
                                <p className='font-bold'>Medicare is a webstite for hospial authority to manage their tasks</p>
                                <div class="card-actions justify-end">
                                    <a href="https://dental-care-2e777.web.app/" target={"_blank"}><button class="btn btn-primary">Live site</button></a>
                                </div>
                            </div>
                        </div>
                        <div class="card w-96 bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title text-3xl font-bold">Green Sports</h2>
                                <p className='font-bold'>Green Sports is a website to find to buy differnet types of sports equipments  </p>
                                <div class="card-actions justify-end">
                                    <a href="https://green-sports-18e07.web.app/" target={"_blank"}><button class="btn btn-primary">Live site</button></a>
                                </div>
                            </div>
                        </div>
                        <div class="card w-96 bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 class="card-title text-3xl font-bold">Key Chrone Review</h2>
                                <p className='font-bold'>Keychrone is a keyboard review website</p>
                                <div class="card-actions justify-end">
                                    <a href="https://keychrone.netlify.app/" target={"_blank"}><button class="btn btn-primary">Live site</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='my-16'></div>
            </div>
        </div>
    );
};

export default Portfolio;