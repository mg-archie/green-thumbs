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
      blogText: "Embarking on a journey to explore the wonders of gardening! From planting seeds to watching them bloom into beautiful flowers, the joy of gardening knows no bounds.",
      blogAuthor: "GardeningGuru123",
    },
    {
      blogText: "In this blog, I'll share with you my top tips and tricks for maintaining a blooming garden all year round. From soil preparation to pest control, get ready to elevate your gardening game!",
      blogAuthor: "FlowerFanatic88",
    },
    {
      blogText: "Join me on my journey as a novice gardener, learning the ropes and discovering the magic of nurturing plants. Every setback is a lesson learned, and every bloom is a triumph!",
      blogAuthor: "GreenThumbNewbie",
    },
    {
      blogText: "Transforming my backyard into a paradise has been a labor of love. Follow along as I share my experiences, successes, and occasional failures in creating an oasis of beauty and tranquility.",
      blogAuthor: "BackyardBliss",
    },
    {
      blogText: "For me, gardening is more than just a hobby—it's a spiritual practice. Finding solace and peace in nature's embrace, I invite you to join me in cultivating a deeper connection with the Earth.",
      blogAuthor: "NatureLover365",
    },
    {
      blogText: "Welcome to my gardening diary, where I document the journey from seed to bloom. Each entry captures the excitement of new growth, the challenges of tending to a garden, and the beauty of nature's cycle.",
      blogAuthor: "BloomDiaries",
    },
    {
      blogText: "Exploring the therapeutic benefits of gardening: a journey towards wellness and mindfulness. From reducing stress to fostering creativity, discover how gardening can nurture both the body and soul.",
      blogAuthor: "MindfulGardener",
    },
    {
      blogText: "Unleash your inner artist with gardening as your canvas! In this blog, I'll share creative gardening ideas, from sculpting hedges to designing floral arrangements, to transform your outdoor space into a masterpiece.",
      blogAuthor: "ArtisticGardener",
    },
    {
      blogText: "From balcony gardens to rooftop oases, small-space gardening opens up endless possibilities. Join me as I explore innovative techniques and space-saving hacks to maximize greenery in compact urban environments.",
      blogAuthor: "UrbanJungleExplorer",
    },
    {
      blogText: "Discover the beauty of heirloom gardening: preserving the legacy of ancient plant varieties and connecting with generations past. Join me on a journey through history as we sow the seeds of tradition.",
      blogAuthor: "HeritageHarvester",
    },
  ]);

  console.log('blogs seeded');

  /*const plants = await Plant.insertMany([
    { name: "tree", description: "nice", plantId: "123", lowLight: "true", indoor: "false" },
    { name: "flower", description: "pretty", plantId: "456", lowLight: "true", indoor: "false" },
    { name: "leaf", description: "light as a feather", plantId: "789", lowLight: "false", indoor: "true" },
    { name: "weed", description: "not nice", plantId: "159", lowLight: "true", indoor: "false" },
    { name: "shrub", description: "beautiful!", plantId: "444", lowLight: "true", indoor: "false" },
  ]);

  console.log('plants seeded');*/

  process.exit();
});