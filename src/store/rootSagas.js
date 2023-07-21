import { all, fork } from 'redux-saga/effects';
// import ProfileSaga from 'store/profile/saga';

export default function* rootSaga() {
  yield all([
    // fork(ProfileSaga),
  ]);
}