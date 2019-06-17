import React from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
    <img src={props.show.image.medium} />
  </Layout>
);

Post.getInitialProps = async(context) => {
  const { id } = context.query;
  const show = await axios.get(`https://api.tvmaze.com/shows/${id}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      // Error (copied catch error from https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;
