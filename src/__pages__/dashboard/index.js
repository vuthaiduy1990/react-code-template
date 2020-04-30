import React from 'react';
import { Link } from 'gatsby';

const Dashboard = () => (
  <div>
    <ul>
      <li>
        <Link to="/dashboard/hero-association">Hero Association</Link>
      </li>
      <li>
        <Link to="/dashboard/monster-association">Monster Association</Link>
      </li>
    </ul>
  </div>
);
export default Dashboard;
