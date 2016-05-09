import React from 'react';
import { PromiseState } from 'react-refetch';
import { isEmpty } from 'lodash';
import Loading from './Loading';
import Error from './Error';

function PromiseStateContainer({ ps, onPending, onNoResults, onRejection, onFulfillment }) {
  if (ps.pending) {
    return onPending(ps.meta);
  } else if (ps.rejected) {
    return onRejection(ps.reason, ps.meta);
  } else if (ps.fulfilled && isEmpty(ps.value)) {
    return onNoResults(ps.value, ps.meta);
  } else if (ps.fulfilled) {
    return onFulfillment(ps.value, ps.meta);
  }
  return null;
}

PromiseStateContainer.propTypes = {
  ps: React.PropTypes.instanceOf(PromiseState).isRequired,
  onPending: React.PropTypes.func,
  onNoResults: React.PropTypes.func,
  onRejection: React.PropTypes.func,
  onFulfillment: React.PropTypes.func.isRequired,
};

PromiseStateContainer.defaultProps = {
  onPending: () => <Loading />,
  onNoResults: () => <Error error="No results" />,
  onRejection: (reason) => <Error error={reason} />,
};

export default PromiseStateContainer;
