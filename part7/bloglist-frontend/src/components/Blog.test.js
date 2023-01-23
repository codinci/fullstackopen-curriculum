import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const testBlog = {
  title: 'Testing react',
  author: 'Tester',
  url: 'jest.com',
  likes: 4,
  user: {
    username: 'normie',
    name: 'Normal user',
    id: '6jshssb87wn2s923'
  },
  id: '82hsgsdqbkju722ns'
};

const testUser = {
  username: 'normie',
  name: 'Normal user',
  id: '6jshssb87wn2s923'
};

const user = userEvent.setup();

test('renders title and author only', () => {
  render(<Blog blog={testBlog} user={testUser} />);

  const titleElement = screen.getByText('Testing react');
  const authorElement = screen.getByText('Tester');
  expect(titleElement).toBeDefined();
  expect(authorElement).toBeDefined();

  const urlElement = screen.queryByText('jest.com');
  const likesElement = screen.queryByText('Likes 4');

  expect(urlElement).toHaveStyle('display:none');
  expect(likesElement).toHaveStyle('display:none');
});

test('clicking view button makes likes and url visible', async () => {
  render(<Blog blog={testBlog} user={testUser} />);

  const urlElement = screen.queryByText('jest.com');
  const likesElement = screen.queryByText('Likes 4');

  expect(urlElement).toHaveStyle('display:none');
  expect(likesElement).toHaveStyle('display:none');

  const visibilityButton = screen.getByText('view');
  await user.click(visibilityButton);

  const urlAfterClick = screen.queryByText('jest.com');
  const likesAfterClick = screen.queryByText('Likes 4');

  expect(likesAfterClick).toHaveStyle('display:block');
  expect(urlAfterClick).toHaveStyle('display:block');
});

test('like button pressed twice', async () => {
  const mockHandler = jest.fn();
  render(<Blog blog={testBlog} user={testUser} updateBlog={mockHandler} />);

  const likeButton = screen.getByText('like');
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
