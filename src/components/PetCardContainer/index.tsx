import './index.css';

import Pagination from 'react-responsive-pagination';
import { useState, useEffect } from 'react';
import axios from 'axios';

import PetCard from './PetCard/index';

interface Breed {
    name: string;
    origin: string;
    life_span: string;
    breed_group: string;
    image: {
        url: string;
    };
    temperament: string;
}

const PetCardContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DOG_URL}/v1/breeds?limit=10&page=${currentPage - 1}`)
            .then((data) => {
                setBreeds(data.data);
                setTotalCount(Math.floor(Number(data.headers['pagination-count']) / 10));
            })
            .catch((error) => console.log(error));
    }, [currentPage]);

    return (
        <>
            <div className="cards">
                {breeds.map((breed: Breed, index) =>
                    <PetCard key={index}
                        name={breed.name}
                        origin={breed.origin}
                        life={breed.life_span}
                        group={breed.breed_group}
                        image={breed.image.url ? breed.image.url : ''}
                        temperament={breed.temperament} />
                )}
            </div>

            <Pagination
                current={currentPage}
                total={totalCount + 1}
                onPageChange={setCurrentPage} />
        </>
    );
}

export default PetCardContainer;