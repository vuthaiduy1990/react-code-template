import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSampleData } from '@@actions/sample';
import { getEmployees } from '@@selectors/sample';

import css from './styles.module.scss';

const DarkMatterThieves = () => {
  const dispatch = useDispatch();

  // select data from state
  const employees = useSelector(getEmployees);

  // Run once when component did mount
  // Ideal place for fetching data
  useEffect(() => {
    // Fetch data.
    // We can retrieve the result via selector. In this example, we use selector
    dispatch(getSampleData());

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
      <div className={css.layout}>Dark Matter Thieves</div>
      <ul>
        {employees.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};
export default DarkMatterThieves;
