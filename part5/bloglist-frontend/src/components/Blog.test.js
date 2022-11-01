import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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
}

const testUser = {
  username: 'normie',
  name: 'Normal user',
  id: '6jshssb87wn2s923',
}
test('renders title and author only', () => {


  render(<Blog blog={testBlog} user={testUser} />)

  const titleElement = screen.getByText('Testing react')
  const authorElement = screen.getByText('Tester')
  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()

  const urlElement = screen.getByText('jest.com')
  const likesElement = screen.getByText(4)

  expect(urlElement).toHaveStyle('display:none')
  expect(likesElement).toHaveStyle('display:none')
})