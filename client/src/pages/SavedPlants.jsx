import {
  Container,
  Card,
  Button,
  Row,
  Col,
  CardImg
} from 'react-bootstrap';

import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { REMOVE_PLANT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { removePlantId } from '../utils/localStorage';
import { QUERY_PLANTS } from '../utils/queries';

const SavedPlants = () => {
  const [removePlant, { error }] = useMutation(REMOVE_PLANT);
  const { data, loading, refetch } = useQuery(QUERY_ME);
  let userData = data?.me || { savedPlants: [] };
  const { data: plantsData, loading: plantsLoading } = useQuery(QUERY_PLANTS, { 
    variables: { plantIds: userData.savedPlants },
  });
  let plants = plantsData?.plants
  // function that accepts the plant's mongo _id value as param and deletes the plant from the database
  const handleDeletePlant = async (plantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removePlant({
        variables: { plantId: plantId }
      });

      // upon success, remove plant's id from localStorage
      const { data } = await refetch();
      userData = data.me;
      removePlantId(plantId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || plantsLoading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid='true' className="text-light ">
        <Container>
        </Container>
      </div>
      <Container className='pt-5 mt-5 mb-5 p-5'>
        <h2 >
        </h2>
        <Row className='row-gap-3'>
          {plants?.map((plant) => {
            console.log(data);
            return (
              <Col md="6">
                <Card key={plant.plant_id} border=''>
                  <Card.Body>
                    <Card.Title className='text-center title2'>{plant.name}</Card.Title>
                    <Card.Text>Amount of light: {plant.sunlight}</Card.Text>
                    <Card.Text>Frequency of watering: {plant.watering}</Card.Text>
                    <Card.Text>Description: {plant.description}</Card.Text>
                    <CardImg src={plant.image || ''} alt={plant.name} className='p-2'/>
                    <Button className='btn-block btn-danger' onClick={() => handleDeletePlant(plant.plantId)}>
                      Delete this Plant!
                    </Button>
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

export default SavedPlants;
