import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_BLOG } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries'; 
import Auth from '../utils/auth';
import { removeBlogId } from '../utils/localStorage'; 

const SavedBlogs = () => {
  const [removeBlog, { error }] = useMutation(REMOVE_BLOG);
  const { data, loading, refetch } = useQuery(QUERY_ME);
  let userData = data?.me || {};

  const handleDeleteBlog = async (blogId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await removeBlog({
        variables: { blogId }
      });

      const { data } = await refetch();
      userData = data.me;
      removeBlogId(blogId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  
  return (
    <>
      <div fluid='true' className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved blogs!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBlogs?.length
            ? `Viewing ${userData.savedBlogs.length} saved ${userData.savedBlogs.length === 1 ? 'blog' : 'blogs'}:`
            : 'You have no saved blogs!'}
        </h2>
        <Row>
          {userData.savedBlogs?.map((blog) => (
            <Col md="4" key={blog.blogId}>
              <Card border='dark'>
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBlog(blog.blogId)}>
                    Delete this Blog!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBlogs;
