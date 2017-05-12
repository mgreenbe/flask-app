import {standardAction} from './actions'

// ACTION = (args, props) => redux action

const change = ([path, value], {_mount}) => {
  const fullPath = [..._mount, ...path];
  return standardAction('CHANGE', {fullPath, value});
};

const push = ([path, item], {_mount}) => {
  const fullPath = [..._mount, ...path];
  return standardAction('CHANGE', {fullPath, item});
}


