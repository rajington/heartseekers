import { connect } from 'react-refetch';
import urlJoin from 'url-join';

const baseUrl = 'https://d84bes6j9l.execute-api.us-east-1.amazonaws.com/dev/';

export default connect.defaults({
  Request: (url, options) => (new Request(urlJoin(baseUrl, url), options)),
});
