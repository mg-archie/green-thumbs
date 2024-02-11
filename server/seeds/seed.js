const db = require('../config/connection');
const { User, Plant, Blog, Comment } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('User', 'users');
  await cleanDB('Plant', 'plants');
  await cleanDB('Blog', 'blogs');
  await cleanDB('Comment', 'comments');

  const comments = await Comment.insertMany([
    {
    commentBody: "great idea",
    commentAuthor: "Mike",
  },
  {
    commentBody: "wow",
    commentAuthor: "Peter",
  },
  {
    commentBody: "nice",
    commentAuthor: "Myles",
  },
  {
    commentBody: "excellent",
    commentAuthor: "Jane",
  },
]);

console.log('comments seeded');
  

  const users = await User.insertMany([{
    username: 'Jane',
    email: 'jane@abc.com',
    password: '12345678',
  },
  {
    username: 'Fred',
    email: 'fred@abc.com',
    password: '87654321',
  },
  {
    username: 'Mike',
    email: 'mike@abc.com',
    password: '11112222',
  },
  {
    username: 'Myles',
    email: 'myles@abc.com',
    password: '22221111',
  },
  {
    username: 'Peter',
    email: 'peter@abc.com',
    password: '12341234',
  }
]);

  console.log('users seeded');

  const blogs = await Blog.insertMany([
    {
      blogText: 'My garden is the best!',
      blogAuthor: 'Jane',
    },
    {
      blogText: 'Nice garden!',
      blogAuthor: 'Mike',
    },
    {
      blogText: 'Pretty!',
      blogAuthor: 'Fred',
    },
  ]);

  console.log('blogs seeded');

  const plants = await Plant.insertMany([
    { name: "tree", description: "nice", plantId: "123", lowLight: "true", indoor: "false" },
    { name: "flower", description: "pretty", plantId: "456", lowLight: "true", indoor: "false" },
    { name: "leaf", description: "light as a feather", plantId: "789", lowLight: "false", indoor: "true" },
    { name: "weed", description: "not nice", plantId: "159", lowLight: "true", indoor: "false" },
    { name: "shrub", description: "beautiful!", plantId: "444", lowLight: "true", indoor: "false" },
  ]);

  console.log('plants seeded');

  process.exit();
});