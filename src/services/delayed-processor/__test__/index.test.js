import { delayIssue } from '../index.js'
import {store, retrieve} from '../../storage'

jest.mock('../../storage')
jest.mock('uuid/v4', () => () => 'mockeduuid')

test('delayIssue stores the new issue with a uuid', async () => {
  const newIssue = {user: 'test', repo: 'test', title: 'test', body: 'test', date: '2019-06-29T23:42'};
  await delayIssue(newIssue)
  expect(store).toBeCalledWith('delayedIssues', [{
   id: 'mockeduuid',
    ...newIssue
  }])
})

