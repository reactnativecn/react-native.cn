/**
 * Created by Yun on 2015-10-24.
 */

import React from 'react';

import { Link } from 'react-router';

import './docs.less';

export default class Subjects extends React.Component {
  static propTypes = {
    docIndex: React.PropTypes.object,
    params: React.PropTypes.object,
  };

  render() {
    const indexes = this.props.docIndex.contains;

    return (
      <ul>
        {indexes.map(v => (
          <li className="apiGroup" key={v.group}>
            {v.group}
            <ul className="apiSub">
              {v.contains.map(u => (
                <li key={u.external || u.mdlink}>
                  <Link
                    activeClassName="active"
                    to={{
                      pathname: u.external || `/docs/${this.props.params.version}/${u.mdlink}.html`,
                      hash: '#content',
                    }}
                    target={u.external && '_blank'}
                  >
                    {u.subject}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}
