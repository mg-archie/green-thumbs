import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_BLOGS } from '../utils/queries'; 
import { Container, Card, Row, Col } from 'react-bootstrap';

const BlogsPage = () => {
  const { data, loading, error } = useQuery(QUERY_ALL_BLOGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  const blogs = data?.allBlogs || [];

  return (
    <Container className='mt-5 mb-5 p-5'>
      <h2 className='pt-5'></h2>
      <Row className='row-gap-3'> 
        {blogs.map(({_id, blogText, blogAuthor, comments}) => (
          <Col key={_id} md="6">
            <Card border='white'>
              <Card.Body>
                <Card.Title className='title2'>{blogAuthor}</Card.Title>
                <Card.Text>{blogText}</Card.Text>
                <Card.Text>{comments}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BlogsPage;

