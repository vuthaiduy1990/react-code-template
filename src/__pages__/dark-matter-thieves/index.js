import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';

import { fetchSampleData } from '@@actions/sample';
import { getEmployees } from '@@selectors/sample';

import css from './styles.module.scss';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Employee Name',
    dataIndex: 'employee_name',
    key: 'employee_name',
  },
  {
    title: 'Age',
    dataIndex: 'employee_age',
    key: 'employee_age',
  },
  {
    title: 'Sallary',
    dataIndex: 'employee_salary',
    key: 'employee_salary',
  },
  {
    title: 'Data Source',
    dataIndex: 'source',
    key: 'source',
  },
];

const DarkMatterThieves = () => {
  const dispatch = useDispatch();

  // select data from state
  const employees = useSelector(getEmployees);

  // Run once when component did mount
  // Ideal place for fetching data
  useEffect(() => {
    // Fetch data.
    // We can retrieve the result via selector. In this example, we use selector
    dispatch(fetchSampleData());

    // Or we can retrive the data via callback function
    // dispatch(
    //   getSampleData((err, result) => {
    //     console.log(err, result);
    //   })
    // );

    // according to this post https://overreacted.io/a-complete-guide-to-useeffect/
    // We can omit dispatch, setState, and useRef container values
    // from the deps because React guarantees them to be static
  }, []);

  return (
    <>
      <div className={css.layout}>
        <Table dataSource={employees} columns={columns} />
      </div>
    </>
  );
};
export default DarkMatterThieves;
