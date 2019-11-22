import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { cleanup, render, fireEvent, within } from '@testing-library/react';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('We can add items to our todo list', () => {
  // Step 0. Prepare the assets for the test
  const textToAdd = 'Hi portal team';
  // Step 1. Render the app
  const { queryByText, getByLabelText, getByText } = render(<App />);
  // Step 2. Validate the pre-conditions
  expect(queryByText(textToAdd)).toBeNull();
  const inputField = getByLabelText('Item description');
  const addButton = getByText('Add to list');
  // Step 3. Perform the action
  fireEvent.change(inputField, { target: { value: textToAdd}});
  fireEvent.submit(addButton);
  // Step 4. Validate the change occurred
  expect(queryByText(textToAdd)).not.toBeNull();
});

test('We can remove items from our todo list', () => {
  // Step 0. Prepare the assets for the test
  const textToRemove = 'Learn about React';
  // Step 1. Render the app
  const { queryByText, getByText } = render(<App />);
  // Step 2. Validate the pre-conditions
  expect(queryByText(textToRemove)).not.toBeNull();
  const entryToRemove = getByText(textToRemove);
  const removeButton = within(entryToRemove).getByText('x');
  // Step 3. Perform the action
  fireEvent.click(removeButton);
  // Step 4. Validate the change occurred
  expect(queryByText(textToRemove)).toBeNull();
});

test('We can toggle a todo\'s state from Undone to Done and back again', () => {
  // Step 0. Prepare the assets for the test
  const textToToggle = 'Learn about React';
  // Step 1. Render the app
  const { getByText } = render(<App />);
  // Step 2. Validate the pre-conditions
  const entryToToggle = getByText(textToToggle);
  expect(entryToToggle.style.textDecoration).toEqual('');
  const toggleButton = within(entryToToggle).getByText('Mark as done');
  // Step 3. Perform the action(s)
  fireEvent.click(toggleButton);
  expect(entryToToggle.style.textDecoration).toEqual('line-through');
  expect(within(entryToToggle).queryByText('Mark as done')).toBeNull();
  expect(within(entryToToggle).queryByText('Mark undone')).not.toBeNull();

  fireEvent.click(toggleButton);
  expect(entryToToggle.style.textDecoration).toEqual('');
  expect(within(entryToToggle).queryByText('Mark as done')).not.toBeNull();
  expect(within(entryToToggle).queryByText('Mark undone')).toBeNull();
});