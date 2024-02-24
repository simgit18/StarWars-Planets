import React, { useState, useEffect } from 'react';
import PlanetModal from './PlanetModal';

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

const Cards: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>('https://swapi.dev/api/planets/');
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = (planet: Planet) => {
    setSelectedPlanet(planet);
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setPlanets(prevPlanets => [...prevPlanets, ...jsonData.results]);

        if (jsonData.next) {
          setNextPageUrl(jsonData.next);
        } else {
          setNextPageUrl(null); // No more pages
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(nextPageUrl!);
  }, [nextPageUrl]);

  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
        {planets.map((planet) => (
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 duration-300 hover:-translate-y-1" key={planet.name}>
            <article className="overflow-hidden rounded-lg shadow-lg">
              <a href="#">
                <img alt="Placeholder" className="block h-auto w-full" src="https://t4.ftcdn.net/jpg/05/68/36/05/360_F_568360520_44xAIsQDK12DdQU8GT9SltZoGOEceqD0.jpg"/>
              </a>
              <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <a className="no-underline hover:underline text-white" href="#">
                    {planet.name}
                  </a>
                </h1>
                <p className="text-grey-darker text-sm">
                  <button className="text-white bg-slate-400" onClick={() => toggleModal(planet)}>Read More</button>
                </p>
              </header>
              <footer className="flex items-center justify-center leading-none p-2 md:p-4 my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 ">
                <p className="ml-2 text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
                  <p>Rotation Period: {planet.rotation_period}</p>
                  <p>Orbital Period: {planet.orbital_period}</p>
                  <p>Climate: {planet.climate}</p>
                  <p>Gravity: {planet.gravity}</p>
                  <p>Terrain: {planet.terrain}</p>
                  <p>Surface Water: {planet.surface_water}</p>
                  <p>Population: {planet.population}</p>
                </p>
              </footer>
            </article>
          </div>
        ))}
      </div>
      <PlanetModal planet={selectedPlanet} isOpen={modalVisible} onClose={() => setModalVisible(false)} />
      </div>
  );
};

export default Cards;
