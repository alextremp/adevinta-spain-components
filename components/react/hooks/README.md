# ReactHooks

> Useful hooks to be used in your React projects

## Installation

```sh
$ npm install @s-ui/react-hooks --save
```

## Avaiable hooks

### useMount

Hook that will be executed when the component mounts. Similar behaviour to old `componentDidMount` but `useMount` could return a function that will executed when the component unmounts. Useful for clearing events or timers.

```js
import { useMount } from '@s-ui/react-hooks'

export default () => {
  useMount(() => {
    window.analytics.track('component did mount!')
  })

  useMount(() => {
    const onScroll = () => console.log('scrolling')
    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  })

  const [currentUser, setCurrentUser] = useState(null)

  useMount(async () => {
    const user = await getUser()
    setCurrentUser(user)
  })

  return currentUser && <h1>Hello {currentUser.name} !!</h1>
}
```

### useOnScreen

Hook to detect if an element is on the screen. Useful for lazy loading components, images or fetching of data.

You could configure if it should only be fired `once` by using the parameter with the same name (default: `true`).

```js
import { useOnScreen } from '@s-ui/react-hooks'

export default () => {
  const [isIntersecting, outerRef] = useOnScreen({ once: true })
  const [isIntersectingBlock, outerRefBlock] = useOnScreen({ once: false })

  return (
    <div ref={outerRef}>
      {isIntersecting && <img src='huge-image.png' />}
      <div>
    </div>
  )
}
```

### useNearScreen

Similar to `useOnScreen` but it let you configure when the distance is enough to return true. By default if the element is 200px near the screen it will change the inner state of the hook. You could define the `offset` in pixels to fire the event sooner or later.

```js
import { useNearScreen } from '@s-ui/react-hooks'

export default () => {
  const [isNear, outerRef] = useNearScreen({ offset: '300px' })

  return (
    <div ref={outerRef}>
      {isNear && <p>This is 300px near to the viewport!</p>}
      <div>
    </div>
  )
}
```

### useLegacyState

Hook that provides a similar state management approach to the old `this.setState` from a class.

Useful to cover quick functional migrations in components with complex states that would cause unnecessary renders if simply divided into lots of useState hooks.

If you apply this when migrating to a functional component, please take in mind that you may later rethink the strategy of its state.

```js
import {useLegacyState} from '@s-ui/react-hooks'

export default () => {
  const initialState = {
    availableFood: 20,
    catsFood: 0,
    dogsFood: 0
  }
  const [state, setState] = useLegacyState(initialState)
  const {availableFood, catsFood, dogsFood} = state

  const giveCatsFood = () => {
    if (availableFood >= 2)
      setState({
        availableFood: availableFood - 2,
        catsFood: catsFood + 2
      })
  }
  const giveDogsFood = () => {
    if (availableFood >= 2)
      setState({
        availableFood: availableFood - 2,
        dogsFood: dogsFood + 2
      })
  }
  const giveFoodToAll = () => {
    if (availableFood >= 2)
      setState({
        availableFood: availableFood - 2,
        catsFood: catsFood + 1,
        dogsFood: dogsFood + 1
      })
  }

  return (
    <div>
      <header>Available food: {availableFood || 'No more!'}</header>
      <button onClick={giveCatsFood}>Give cats food</button>
      <button onClick={giveDogsFood}>Give dogs food</button>
      <button onClick={giveFoodToAll}>Give food to all</button>
      <ul>
        <li>Cats had {catsFood} of food.</li>
        <li>Dogs had {dogsFood} of food.</li>
      </ul>
    </div>
  )
}
```

### useMediaQuery

This is a CSS media query hook for React. It listens for matches to a CSS media query. It allows the rendering of components based on whether the query matches or not.

Hook `useMediaQuery` always returns a boolean and it indicates if query matches or not.

```js
import {useMediaQuery} from '@s-ui/react-hooks'

export default function Demo() {
  const isMatching = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${isMatching}`}</span>;
}
```

### useScroll

Hook to get the scroll position and the direction of scroll, limited to the Y axis.

The hook `useScroll` always returns an object with **position** and **direction of scroll**

```js
import {useScroll} from '@s-ui/react-hooks'

export default function Demo() {
  const {position, direction} = useScroll()

  return (
    <>
      <p>{`Scroll position: ${position}`}</p>
      <p>{`Scroll direction: ${direction}`}</p>
    </>
  )
}
```

> **Find full description and more examples in the [demo page](#).**
