import uuidv4 from 'uuid/v4';
import {store, retrieve} from '../storage';

let existingPollingId;

/**
 * Stores an issue to be published at a later date.
 */
export const delayIssue = async newIssue => {
  let delayedIssues = (await retrieve('delayedIssues')) || [];
  await store('delayedIssues', [...delayedIssues, {id: uuidv4(), ...newIssue}]);
};

/**
 * Continuously polls the storage for delayed issues.
 * Compares their date to the current date in order to determine whether
 * or not the issue should be published.
 * Upon successfully publishing an issue, it is removed from storage.
 */
export const startPollingDelayedIssues = gh => {
  if (existingPollingId) {
    window.clearInterval(existingPollingId);
  }

  existingPollingId = window.setTimeout(
    async () => await pollPublishAndRemove(gh),
    5000,
  );
};

/**
 * Runs the actual logic for finding delayed issues, publishing them,
 * and then removing them. Additionally creates a new setTimeout
 * so that new delayed issues will be polled.
 */
async function pollPublishAndRemove(gh) {
  let delayedIssues = await retrieve('delayedIssues');
  let idsToRemove = await publishDelayedIssues(delayedIssues, gh);

  idsToRemove.forEach(id => {
    delayedIssues = delayedIssues.filter(issue => issue.id !== id);
  });

  await store('delayedIssues', delayedIssues);

  existingPollingId = window.setTimeout(
    async () => await pollPublishAndRemove(gh),
    5000,
  );
}

/**
 * Publishes an array of issues to GitHub, then returns an array
 * with their ids so they can be removed.
 */
async function publishDelayedIssues(delayedIssues, gh) {
  let idsToRemove = [];
  await Promise.all(
    delayedIssues.map(async issue => {
      if (Date.now() > new Date(issue.date).getTime()) {
        const {id, user, repo, title, body} = issue;

        const ghIssues = gh.getIssues(user, repo);
        await ghIssues.createIssue({
          title,
          body,
        });

        // Issue successfully published, now set it for removal
        idsToRemove.push(id);
      }
    }),
  );
  return idsToRemove;
}

export const stopPollingDelayedIssues = () => {
  if (existingPollingId) {
    window.clearInterval(existingPollingId);
  }
};
