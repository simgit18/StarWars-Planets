import React, { useState, useEffect } from 'react';

interface Resident {
  name: string;
height: number, 
    mass: number, 
    hair_color: string, 
    skin_color: string, 
    eye_color: string, 
    birth_year: string, 
    gender: string, 

}

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

interface Props {
  isOpen: boolean;
  planet: Planet | null;
  onClose: () => void;
}

const PlanetModal: React.FC<Props> = ({ isOpen, planet, onClose }) => {
  const [residents, setResidents] = useState<Resident[]>([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const residentsData: Resident[] = [];
      for (const residentUrl of planet?.residents || []) {
        try {
          const response = await fetch(residentUrl);
          const resident: Resident = await response.json();
          residentsData.push(resident);
        } catch (error) {
          console.error('Error fetching resident information:', error);
        }
      }
      setResidents(residentsData);
    };

    if (isOpen && planet) {
      fetchResidents();
    }
  }, [isOpen, planet]);

  const handleClose = () => {
    onClose();
  };

  const [hoveredResident, setHoveredResident] = useState<Resident | null>(null);

  const handleResidentMouseEnter = (resident: Resident) => {
    setHoveredResident(resident);
  };

  const handleResidentMouseLeave = () => {
    setHoveredResident(null);
  };


  return (
    <>
      {isOpen && planet && (
        <div
          id="extralarge-modal"
          tabIndex={-1}
          className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full md:max-w-2xl">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                  {planet.name}
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                <p>Rotation Period: {planet.rotation_period}</p>
                <p>Orbital Period: {planet.orbital_period}</p>
                <p>Diameter: {planet.diameter}</p>
                <p>Climate: {planet.climate}</p>
                <p>Gravity: {planet.gravity}</p>
                <p>Terrain: {planet.terrain}</p>
                <p>Surface Water: {planet.surface_water}</p>
                <p>Population: {planet.population}</p>
                <p>
                  Residents:
                  {residents.map((resident) => (
                    <p
                    key={resident.name}
                    className="text-blue-600 hover:underline cursor-pointer"
                    onMouseEnter={() => handleResidentMouseEnter(resident)}
                    onMouseLeave={handleResidentMouseLeave}
                  >
                    {resident.name}
                    </p>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {hoveredResident && (
        <div className="absolute bottom-0 left-0 p-4 bg-white dark:bg-gray-800 rounded shadow-md">
          <h4 className="text-lg font-semibold">{"Name:"+hoveredResident.name}</h4>
          <div>{"Gender:"+hoveredResident.gender}</div>
          <div>{"Birth Year:"+hoveredResident.birth_year}</div>
          <div>{"Height:"+hoveredResident.height}</div>
          <div>{"Eye Color:"+hoveredResident.eye_color}</div>

        </div>
      )}
    </>
  );
};

export default PlanetModal;
