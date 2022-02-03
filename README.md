# StickySideBar

A **React** sticky component that can stick to top when scrolling up and can stick to bottom when scrolling down.

## Demo

https://user-images.githubusercontent.com/55064969/143556256-2f143e35-1895-4cd1-9e80-af040c7e1c12.mov

## CodeSandbox Demo

https://codesandbox.io/s/test-sticky-n-scroll-qr1p3

## Setup

`npm install sticky-n-scroll`  

or  

`yarn add sticky-n-scroll`  

## Use in React

```
import StickySideBar from "sticky-n-scroll"

...

class Demo extends React.Components {
  render() 
  {
    return (
      <StickySideBar topSpace={20} bottomSpace{20}>
        <div> 
          Your content 
        </div>
      </StickySideBar>
    )
  }

}
export default Demo;
```  

## Extra Power

Now you can freely manipulate StickySideBar with StickySideBar_ID: `imported { StickySideBar_ID } from "sticky-n-scroll"`

There are 3 main parts of StickySideBar: **Parent**, **Space**, **Content**. These 3 parts are all div with id equals to corresponding StickySideBar_ID values. You can either use jQuery or any DOM manipulations (such as ResizeObserver, etc.) to get to these elements by ids.

## Important Note

In order for StickySideBar to be able to scroll, **Parent** should have larger height than **Content**.

## Props of StickySideBar

| Props                | Type        | Description                                                                                                                 |
| -------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| topSpace             | number      | **(in pixels)** Determine how much space between the content's **top** and screen's **top** when scrolling **up**.          |
| bottomSpace          | number      | **(in pixels)** Determine how much space between the content's **bottom** and screen's **bottom** when scrolling **down**.  |
| turnOff (optional)   | boolean     | Turn off sticky mode -> Become a normal div                                                                                 |
| initialSpaceDivHeight (optional) | number | Force initial height of space div when StickySideBar mounts |

