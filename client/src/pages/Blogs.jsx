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
    <Container>
      <h2 className='pt-5'>All Blogs</h2>
      <Row>
        {blogs.map(({_id, blogText, blogAuthor, comments}) => (
          <Col key={_id} md="4">
            <Card border='dark'>
              <Card.Body>
                <Card.Title>{blogAuthor}</Card.Title>
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

