import _ from 'lodash';

const apiHost = "http://localhost:5023";

const restURLs = {
  login: '/Auth/login',
  register: '/Auth/register',
  user: '/Auth/user',
  users: '/Users',
  tasks: '/Tasks',
  taskUpdate: '/Tasks/:id',
  taskHistory: '/Tasks/:taskId/History',
};

export default restURLs;

(function init(urlPrefix) {

  if (!_.isString(urlPrefix)) {
    return;
  }

  Object.keys(restURLs).forEach(key => {
    const suffix = restURLs[key];

    if (suffix.indexOf('http') !== 0) {
      restURLs[key] = urlPrefix + suffix;
    }
  });
}(`${apiHost}/api`));
