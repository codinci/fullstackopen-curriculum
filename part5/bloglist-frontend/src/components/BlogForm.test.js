import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('creating a blog', async() => {
  const user = userEvent.setup()
  const addBlog = jest.fn()
  render(<BlogForm createBlog = { addBlog } />)

  const titleInput = screen.getByPlaceholderText('title')
  await user.type(titleInput, 'Another test')

  const authorInput = screen.getByPlaceholderText('author')
  await user.type(authorInput, 'Tester')

  const urlInput = screen.getByPlaceholderText('url')
  await user.type(urlInput, 'jest.com')

  const createBlogButton = screen.getByText('create')
  expect(createBlogButton).toBeDefined()
  await user.click(createBlogButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Another test')
  expect(addBlog.mock.calls[0][0].author).toBe('Tester')
  expect(addBlog.mock.calls[0][0].url).toBe('jest.com')
})