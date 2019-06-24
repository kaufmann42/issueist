import {store, retrieve} from '../storage';

export const delayIssue = async (ghIssue, meta) => {
  console.log('edlayign issue')
  let delayedIssues = await retrieve('delayedIssues') || []
  let newIssue = {
    ghIssue,
    ...meta
  };
  console.log([...delayedIssues, newIssue]);
  await store('delayedIssues', [...delayedIssues, newIssue]);
};


window.setInterval(async () => {
  console.log('checking delayed issues...');
  let delayedIssues = await retrieve('delayedIssues');

  if (delayedIssues) {
    delayedIssues.forEach(issue => {
      console.log('issue: ', issue);
    });
  }
}, 5000);
