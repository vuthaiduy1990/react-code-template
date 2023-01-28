/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import React from 'react';
import { Row, Col } from 'antd';

import NotFoundIcon from '@@datas/404-error.svg';
import * as css from './styles.module.scss';

const license =
  "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.";
function NotFound() {
  return (
    <Row style={{ height: '100%', alignItems: 'center' }}>
      <Col span={12} offset={6} style={{ textAlign: 'center' }}>
        <img src={NotFoundIcon} alt="" className={css.icon} />
        <div className={css.spacing}>
          Icons made by &nbsp;
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik &nbsp;
          </a>
          from &nbsp;
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
        <h2 className={css.spacing}>MIT License</h2>
        <h2>Copyright (c) 2020 Vu Thai Duy</h2>
        <div className={css.license}>{license}</div>
      </Col>
    </Row>
  );
}
export default NotFound;
