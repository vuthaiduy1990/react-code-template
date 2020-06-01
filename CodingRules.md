## ✎Coding Rules

#### Also refer to https://reactjs.org/docs/hooks-faq.html
#### Also refer to https://redux.js.org/style-guide/style-guide

#### 1. [Readability] Always wrap render in React.Fragment
```javascript
👍👍👍👍👍
const ReactComponent = () => {
    return (
        <React.Fragment>
            <div>content1</div>
            <div>content2</div>
            <div>...</div>
        </React.Fragment>
    );
};
// we can replace React.Fragment by <>
<>
    <div>...</div>
    <div>...</div>
</>
```

#### 2. [Readability] Don't use arrow-body-style
```javascript
❌❌❌❌❌
const ReactComponent = () => (
    <>
        <div>...</div>
        <div>...</div>
    </>
);

👍👍👍👍👍
const ReactComponent = () => {
    return (
        <>
            <div>...</div>
            <div>...</div>
        </>
    );
};
```

#### 3. [Performance] Pass [] to useEffect() to run code once on ComponentDidMount
```javascript
👍👍👍👍👍
useEffect(() => {
    fetchData(); // only run once when component did mount
}, []);
```
Furthermore, according to this post https://overreacted.io/a-complete-guide-to-useeffect/
We can omit dispatch, setState, and useRef container values from the deps because React guarantees them to be static

--->>> Sometimes, your effect may be using state that changes too often, we may need to specify dependencies
```javascript
❌❌❌❌❌
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // This effect depends on the `count` state
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` is not specified as a dependency

  return <h1>{count}</h1>;
}

👍👍👍👍👍
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ This doesn't depend on `count` variable outside
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ Our effect doesn't use any variables in the component scope

  return <h1>{count}</h1>;
}
```

#### 4. [Performance] Pass [] as a dependency array to useCallback
To ensures that our ref callback doesn’t change between the re-renders
```javascript
👍👍👍👍👍
const onItemClick = useCallback(() => {
    doSomething(); // don't use *any* values from component scope
}, []);
const onItemClick = useCallback(() => {
    doSomething(prop1, prop2, ...); // use some props
}, [prop1, prop2, ...]);
```

#### 5. [Performance] Combine useCallback and React.memo
To avoid rendering Child component unneccessarily
```javascript
import React, { memo } from 'react';
const Child = ({ onItemClick }) => {
    return (
        <>
            <button onClick={onItemClick} />
        </>
    );
};
export default memo (Child); 👍👍👍👍👍

import React, { useCallback } from 'react';
const Parent = () => {
    // This function will not be re-created when component re-render
    const handleClick = useCallback(() => { 👍👍👍👍👍
        // do something here
    }, []);
    return (
        <>
            <OtherComponents props />
            // This child component will not be re-rendered each time parent is renderer
            // due to
            <Child onItemClick={handleClick} />
        </>
    );
};
```

#### 5. [Performance] Use loadable for loading page or big components
```javascript
👍👍👍👍👍
const Dashboard = loadable(() => pMinDelay(import('@@pages/dashboard'), DELAY));
```

#### 6. [Performance] Use Redux batch to avoid Dispatching Many Actions Sequentially
```
👍👍👍👍👍
import { batch } from 'react-redux'
useEffect(() => {
    batch(() => {
        dispatch(increment())
        dispatch(increment())
    });
}, []);
```

#### 7. [Performance]  Avoid re-creating the ignored initial state, we can pass a function to useState
```javascript
❌❌❌❌❌
function Table(props) {
  // createRows() is called on every render
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}

👍👍👍👍👍
function Table(props) {
  // createRows() is only called once
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```
