import './index.css';

import Pagination from 'react-responsive-pagination';
import { useState, useEffect } from 'react';
import axios from 'axios';

import PetCard from './PetCard/index';
import { BreedType } from '../../Interfaces/PetCard/Breed';
import PetType from '../PetTypeContainer/PetType';
import Alerts from '../Alerts';

const PetCardContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [breeds, setBreeds] = useState([]);
    const [petType, setPetType] = useState(1);

    useEffect((): any => {
        let isSubscribed = true;

        let urlApi;
        switch (petType) {
            case 1:
                urlApi = process.env.REACT_APP_DOG_URL;
                break;
            case 2:
                urlApi = process.env.REACT_APP_CAT_URL;
                break;
            default:
                urlApi = process.env.REACT_APP_DOG_URL;
                break;
        }

        axios.get(`${urlApi}/v1/breeds?limit=9&page=${currentPage - 1}`)
            .then((data) => {
                if (isSubscribed) {
                    setBreeds(data.data);
                    setTotalCount(Math.floor(Number(data.headers['pagination-count']) / 9));
                } else {
                    return null;
                }
            })
            .catch((error) => isSubscribed ? Alerts.error(error.message) : null);

        return () => (isSubscribed = false);
    }, [currentPage, petType]);

    const handleClick = (event: any) => {
        const type = Number(event.target.getAttribute('data-pet'));
        setPetType(type);
        setCurrentPage(1);
    }

    return (
        <div className="home-page">
            <div className="home-page-types">
                <PetType type={1} click={handleClick} style={{marginRight: '15px'}} />
                <PetType type={2} click={handleClick} />
            </div>
            <hr className='home-page-line' />
            <div className="cards">
                {breeds.map((breed: BreedType, index) =>
                    <PetCard key={index}
                        name={breed.name}
                        origin={breed.origin}
                        life={breed.life_span}
                        group={breed.breed_group}
                        image={breed.image?.url}
                        temperament={breed.temperament} />
                )}
            </div>

            <Pagination
                current={currentPage}
                total={totalCount + 1}
                onPageChange={setCurrentPage} />
        </div>
    );
}

export default PetCardContainer;