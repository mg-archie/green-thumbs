import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_PLANT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { removePlantId } from '../utils/localStorage';

const SavedPlants = () => {
  const [removePlant, { error }] = useMutation(REMOVE_PLANT);
  const { data, loading, refetch } = useQuery(QUERY_ME);
  let userData = data?.me || { savedPlants: [] };

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

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid='true' className="text-light p-5">
        <Container>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedPlants?.length
            ? `Viewing ${userData.savedPlants.length} saved ${userData.savedPlants.length === 1 ? 'plant' : 'plants'}:`
            : 'You have no saved plants!'}
        </h2>
        <Row>
          {userData.savedPlants?.map((plant) => {
            return (
              <Col md="4">
                <Card key={plant.plant_id} border='dark'>
                  <Card.Body>
                    <Card.Title>{plant.name}</Card.Title>
                    <Card.Text>{plant.description}</Card.Text>
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
