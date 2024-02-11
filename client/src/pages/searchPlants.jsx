import { useState, useEffect } from 'react';
import {
  Container,
  InputGroup,
  Col,
  FormControl,
  Button,
  Card,
  Row,
  Dropdown,
  CardImg
} from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { SAVE_PLANT } from '../utils/mutations';

import Auth from '../utils/auth';
import { savePlant, searchPerenual } from '../utils/API';
import { savePlantIds, getSavedPlantIds } from '../utils/localStorage';

const SearchPlants = () => {
  // create state for holding returned plant search data
  const [searchedPlants, setSearchedPlants] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedPlantIds, setSavedPlantIds] = useState(getSavedPlantIds());
  const [savePlant, { error, data }] = useMutation(SAVE_PLANT);
  // set up useEffect hook to save `savedPlantIds` list to localStorage on component unmount
  useEffect(() => {
    return () => savePlantIds(savedPlantIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if (!searchInput) {
      return false;
    }
  
    // Clear previous search results before starting a new search
    handleClearSearch();
  
    try {
      const response = await searchPerenual(searchInput);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const plantData = await response.json();
  
      setSearchedPlants(plantData.data);
      // Save to localStorage
      localStorage.setItem('searchedPlants', JSON.stringify(plantData.data));
    } catch (err) {
      console.error(err);
    } finally {
      // Clear the search input field after search
      setSearchInput('');
    }
  };
  
  
  useEffect(() => {
    // Load saved plants data from localStorage
    const savedPlantsData = localStorage.getItem('searchedPlants');
    if (savedPlantsData) {
      setSearchedPlants(JSON.parse(savedPlantsData));
    }
  }, []);
  
  const handleClearSearch = () => {
    // Clear localStorage
    localStorage.removeItem('searchedPlants');
    // Clear state
    setSearchedPlants([]);
  };
  
  const [savePlantMutation, { error: savePlantError }] = useMutation(SAVE_PLANT);

  const handleSavePlant = async (plantId) => {
    const plantToSave = searchedPlants.find((plant) => plant.plantId === plantId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await savePlantMutation({
        variables: { plantInput: { ...plantToSave } }
      });
      setSavedPlantIds([...savedPlantIds, plantToSave.plantId]);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
    <div>
      <Container className="text-light border-2 border-white mt-5 searchB rounded p-5">
        <InputGroup>
          <FormControl
            aria-label="Text input with segmented dropdown button"
            placeholder="Search for a plant"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button variant="outline-secondary border border-white searchB" onClick={handleFormSubmit} >
            Search
          </Button>
          <Dropdown as={InputGroup.Append}>
            <Button variant="outline-secondary border border-white">
              <span className="visually-hidden">Toggle Dropdown</span>
            </Button>
            <Dropdown.Toggle split variant="outline-secondary border border-white" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </InputGroup>
      </Container>
    </div>

      <Container className='p-5'>
        <Row className='row-gap-3'>
          {searchedPlants.map((plant) => {
            return (
              <Col md="6" key={plant.plantId}>
                <Card border='white'>
                  <Card.Body>
                    <Card.Title className='text-center title2'>{plant.common_name}</Card.Title>
                    <Card.Text>Amount of light: {plant.sunlight}</Card.Text>
                    <Card.Text>Frequency of watering: {plant.watering}</Card.Text>
                    <CardImg src={plant.default_image?.medium_url || ''} alt={plant.common_name} className='p-2'/>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedPlantIds?.some((savedPlantId) => savedPlantId === plant.plantId)}
                        className='btn-block btn-info'
                        onClick={() => handleSavePlant(plant.plantId)}>
                        {savedPlantIds?.some((savedPlantId) => savedPlantId === plant.plantId)
                          ? 'This plant has already been saved!'
                          : 'Save this Plant!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchPlants;
