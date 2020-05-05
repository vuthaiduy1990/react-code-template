## ✎Coding Rules

#### Also refer to https://reactjs.org/docs/hooks-faq.html

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
👍👍👍👍👍
```javascript
const Dashboard = loadable(() => pMinDelay(import('@@pages/dashboard'), DELAY));
```


