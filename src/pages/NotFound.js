/**
 * Created by Yun on 2015-11-29.
 */
import React from 'react';
import {Panel} from 'react-bootstrap';
import Container from '../components/Container';
import styles from './Site.less';

export default class NotFound extends React.Component {
  render() {
    return (
      <section className={styles.content}>
        <Container>
          <Panel header="404 Not Found" bsStyle="danger">
            ——你所寻找的页面已经不存在了。
          </Panel>
        </Container>
      </section>
    );
  }
}
