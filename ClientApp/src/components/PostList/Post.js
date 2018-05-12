import React from 'react';
import Joi from 'joi';

const schema = {
  name: Joi.string().min(3).required()
}

export default ({postId, title, price, forRent}) => {
  const { error } = Joi.validate({ name: 'Test validation'}, schema);

  if (error)
  {
    console.log(error);
  }
  return (
    <div>
      <h3>PostList</h3>
     
    </div>);
}